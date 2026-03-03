import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin-client';
import { isBadgeStyle } from '@/lib/utils/badge-generator';

const DEDUPE_WINDOW_SEC = 60;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip + (process.env.BADGE_ANALYTICS_SALT ?? '')).digest('hex');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gymSlug = searchParams.get('gym')?.trim();
  const styleParam = searchParams.get('style')?.trim();
  const style = styleParam && isBadgeStyle(styleParam) ? styleParam : 'minimal';

  let slug = gymSlug ?? '';
  if (!slug) {
    try {
      const res = NextResponse.redirect(new URL('/gyms', request.url), 302);
      return res;
    } catch {
      return NextResponse.redirect(new URL('/', request.url), 302);
    }
  }

  try {
    const { data: gym, error: gymError } = await supabaseAdmin
      .from('gyms')
      .select('id, slug, owner_id')
      .eq('slug', slug)
      .single();

    if (gymError || !gym) {
      const base = new URL(request.url).origin;
      return NextResponse.redirect(new URL('/gyms', base), 302);
    }

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);
    const since = new Date(Date.now() - DEDUPE_WINDOW_SEC * 1000).toISOString();

    const { data: recent } = await supabaseAdmin
      .from('badge_analytics')
      .select('id')
      .eq('gym_id', gym.id)
      .eq('utm_medium', style)
      .eq('ip_hash', ipHash)
      .gte('click_timestamp', since)
      .limit(1);

    if (recent && recent.length > 0) {
      const base = new URL(request.url).origin;
      return NextResponse.redirect(new URL(`/gyms/${gym.slug}`, base), 302);
    }

    const userAgent = request.headers.get('user-agent') ?? undefined;
    const referrer = request.headers.get('referer') ?? undefined;

    await supabaseAdmin.from('badge_analytics').insert({
      gym_id: gym.id,
      owner_id: gym.owner_id ?? null,
      click_timestamp: new Date().toISOString(),
      utm_source: 'badge',
      utm_medium: style,
      utm_campaign: 'owner-dashboard-badge',
      source_device: userAgent?.length ? (userAgent.toLowerCase().includes('mobile') ? 'mobile' : 'desktop') : null,
      referrer: referrer ?? null,
      ip_hash: ipHash,
      created_at: new Date().toISOString(),
    });

    const base = new URL(request.url).origin;
    return NextResponse.redirect(new URL(`/gyms/${gym.slug}`, base), 302);
  } catch (err) {
    console.error('badge-click route error:', err);
  }

  const base = new URL(request.url).origin;
  return NextResponse.redirect(new URL('/gyms', base), 302);
}
