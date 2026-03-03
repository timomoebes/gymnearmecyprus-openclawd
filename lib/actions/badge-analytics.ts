'use server';

import { supabaseAdmin } from '@/lib/supabase/admin-client';
import { getCurrentUser, getCurrentUserId, isAdminEmail } from '@/lib/supabase/server';
import type { BadgeMetrics, BadgeTrendPoint, BadgeStyleBreakdown } from '@/lib/types';

export type OwnerBadgeResult =
  | { ok: true; metrics: BadgeMetrics }
  | { ok: false; error: string };

export type AdminGymRow = {
  gymId: string;
  gymName: string;
  gymSlug: string;
  ownerEmail: string | null;
  totalClicks: number;
  clicksLast30d: number;
  minimalClicks: number;
  cardClicks: number;
  buttonClicks: number;
};

export type AdminStyleRow = {
  style: string;
  totalClicks: number;
  percentage: number;
};

export type AdminBadgeResult =
  | { ok: true; gyms: AdminGymRow[]; styles: AdminStyleRow[] }
  | { ok: false; error: string };

/**
 * Get badge analytics for the current owner. Gym-scoped: pass gymId for one gym or omit for all owner's gyms.
 */
export async function getBadgeAnalyticsForOwner(gymId?: string): Promise<OwnerBadgeResult> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, error: 'Not authenticated' };
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    let query = supabaseAdmin
      .from('badge_analytics')
      .select('gym_id, click_timestamp, utm_medium')
      .eq('owner_id', userId);

    if (gymId) {
      query = query.eq('gym_id', gymId);
    }

    const { data: rows, error } = await query;

    if (error) {
      console.error('getBadgeAnalyticsForOwner:', error);
      return { ok: false, error: error.message };
    }

    const all = rows ?? [];
    const totalClicks = all.length;
    const monthlyClicks = all.filter((r) => r.click_timestamp >= startOfMonth).length;
    const lastClick = all.length
      ? all.reduce((a, r) => (r.click_timestamp > a ? r.click_timestamp : a), all[0].click_timestamp)
      : undefined;

    const last30 = all.filter((r) => r.click_timestamp >= thirtyDaysAgo);
    const byStyle: Record<string, number> = { minimal: 0, card: 0, button: 0 };
    last30.forEach((r) => {
      const s = r.utm_medium ?? 'minimal';
      if (byStyle[s] !== undefined) byStyle[s]++;
      else byStyle.minimal++;
    });
    const total30 = last30.length;
    const styleBreakdown: BadgeStyleBreakdown[] = [
      { style: 'minimal', clicks: byStyle.minimal, percentage: total30 ? (byStyle.minimal / total30) * 100 : 0 },
      { style: 'card', clicks: byStyle.card, percentage: total30 ? (byStyle.card / total30) * 100 : 0 },
      { style: 'button', clicks: byStyle.button, percentage: total30 ? (byStyle.button / total30) * 100 : 0 },
    ];

    const byDay: Record<string, number> = {};
    for (let d = 0; d < 30; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (29 - d));
      const key = date.toISOString().slice(0, 10);
      byDay[key] = 0;
    }
    last30.forEach((r) => {
      const key = r.click_timestamp.slice(0, 10);
      if (byDay[key] !== undefined) byDay[key]++;
    });
    const trendPoints: BadgeTrendPoint[] = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, clicks]) => ({ date, clicks }));

    const mostEffective = styleBreakdown.reduce((best, s) =>
      s.clicks > best.clicks ? s : best
    );

    const metrics: BadgeMetrics = {
      totalClicks,
      monthlyClicks,
      lastClickDate: lastClick,
      styleBreakdown,
      trendPoints,
    };

    return { ok: true, metrics };
  } catch (err) {
    console.error('getBadgeAnalyticsForOwner:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to load metrics' };
  }
}

/**
 * Admin only: gym ranking and style totals.
 */
export async function getBadgeAnalyticsForAdmin(): Promise<AdminBadgeResult> {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return { ok: false, error: 'Unauthorized' };
  }

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { data: rows, error } = await supabaseAdmin
      .from('badge_analytics')
      .select('gym_id, click_timestamp, utm_medium');

    if (error) {
      console.error('getBadgeAnalyticsForAdmin:', error);
      return { ok: false, error: error.message };
    }

    const all = rows ?? [];
    const gymIds = [...new Set(all.map((r) => r.gym_id))];

    const { data: gyms, error: gymsError } = await supabaseAdmin
      .from('gyms')
      .select('id, name, slug, owner_id')
      .in('id', gymIds);

    if (gymsError || !gyms) {
      return { ok: false, error: gymsError?.message ?? 'Failed to load gyms' };
    }

    const ownerIds = [...new Set(gyms.map((g) => g.owner_id).filter(Boolean))] as string[];
    const ownerEmails = new Map<string, string>();
    for (const uid of ownerIds) {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(uid);
      if (authUser?.user?.email) ownerEmails.set(uid, authUser.user.email);
    }

    const byGym: Record<
      string,
      { total: number; last30: number; minimal: number; card: number; button: number }
    > = {};
    gyms.forEach((g) => {
      byGym[g.id] = { total: 0, last30: 0, minimal: 0, card: 0, button: 0 };
    });
    let styleTotals = { minimal: 0, card: 0, button: 0 };

    all.forEach((r) => {
      const g = byGym[r.gym_id];
      if (!g) return;
      g.total++;
      if (r.click_timestamp >= thirtyDaysAgo) g.last30++;
      const s = r.utm_medium ?? 'minimal';
      if (s === 'minimal') g.minimal++;
      else if (s === 'card') g.card++;
      else g.button++;
      if (styleTotals[s as keyof typeof styleTotals] !== undefined) styleTotals[s as keyof typeof styleTotals]++;
    });

    const totalClicksAll = all.length;
    const gymRows: AdminGymRow[] = gyms.map((g) => ({
      gymId: g.id,
      gymName: g.name,
      gymSlug: g.slug,
      ownerEmail: g.owner_id ? ownerEmails.get(g.owner_id) ?? null : null,
      totalClicks: byGym[g.id]?.total ?? 0,
      clicksLast30d: byGym[g.id]?.last30 ?? 0,
      minimalClicks: byGym[g.id]?.minimal ?? 0,
      cardClicks: byGym[g.id]?.card ?? 0,
      buttonClicks: byGym[g.id]?.button ?? 0,
    }));

    gymRows.sort((a, b) => b.totalClicks - a.totalClicks);

    const styles: AdminStyleRow[] = [
      {
        style: 'minimal',
        totalClicks: styleTotals.minimal,
        percentage: totalClicksAll ? (styleTotals.minimal / totalClicksAll) * 100 : 0,
      },
      {
        style: 'card',
        totalClicks: styleTotals.card,
        percentage: totalClicksAll ? (styleTotals.card / totalClicksAll) * 100 : 0,
      },
      {
        style: 'button',
        totalClicks: styleTotals.button,
        percentage: totalClicksAll ? (styleTotals.button / totalClicksAll) * 100 : 0,
      },
    ];

    return { ok: true, gyms: gymRows, styles };
  } catch (err) {
    console.error('getBadgeAnalyticsForAdmin:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to load admin analytics' };
  }
}
