'use server';

import { supabaseAdmin } from '@/lib/supabase/admin-client';
import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type PendingClaim = {
  id: string;
  gymId: string;
  gymName: string;
  gymSlug: string;
  userId: string;
  userEmail: string | null;
  createdAt: string;
};

export type PendingClaimsResult = { ok: true; claims: PendingClaim[] } | { ok: false; error: string };
export type ApproveClaimResult = { ok: true } | { ok: false; error: string };

/**
 * List pending claim requests. Admin only (checks ADMIN_EMAILS).
 */
export async function getPendingClaimsAction(): Promise<PendingClaimsResult> {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return { ok: false, error: 'Unauthorized' };
  }

  const { data: rows, error } = await supabaseAdmin
    .from('gym_claim_requests')
    .select('id, gym_id, user_id, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getPendingClaimsAction:', error);
    return { ok: false, error: error.message };
  }

  if (!rows?.length) {
    return { ok: true, claims: [] };
  }

  const gymIds = [...new Set(rows.map((r) => r.gym_id))];
  const { data: gyms, error: gymsError } = await supabaseAdmin
    .from('gyms')
    .select('id, name, slug')
    .in('id', gymIds);

  if (gymsError || !gyms) {
    return { ok: false, error: gymsError?.message ?? 'Failed to load gyms' };
  }

  const gymMap = new Map(gyms.map((g) => [g.id, g]));
  const userIds = [...new Set(rows.map((r) => r.user_id))];
  const emails = new Map<string, string>();

  for (const uid of userIds) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(uid);
    if (authUser?.user?.email) emails.set(uid, authUser.user.email);
  }

  const claims: PendingClaim[] = rows.map((r) => {
    const gym = gymMap.get(r.gym_id);
    return {
      id: r.id,
      gymId: r.gym_id,
      gymName: gym?.name ?? 'Unknown',
      gymSlug: gym?.slug ?? '',
      userId: r.user_id,
      userEmail: emails.get(r.user_id) ?? null,
      createdAt: r.created_at,
    };
  });

  return { ok: true, claims };
}

/**
 * Approve a claim: set gym.owner_id and mark claim as approved. Admin only.
 * Can be called with (gymId, userId) or via form with FormData (gym_id, user_id).
 */
export async function approveClaimAction(
  gymIdOrFormData: string | FormData,
  userId?: string
): Promise<ApproveClaimResult> {
  let gymId: string;
  let uid: string;
  if (gymIdOrFormData instanceof FormData) {
    gymId = (gymIdOrFormData.get('gym_id') as string) ?? '';
    uid = (gymIdOrFormData.get('user_id') as string) ?? '';
  } else {
    gymId = gymIdOrFormData;
    uid = userId ?? '';
  }
  if (!gymId || !uid) return { ok: false, error: 'Missing gym_id or user_id' };

  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return { ok: false, error: 'Unauthorized' };
  }

  const { error: gymError } = await supabaseAdmin
    .from('gyms')
    .update({ owner_id: uid })
    .eq('id', gymId);

  if (gymError) {
    console.error('approveClaimAction gym update:', gymError);
    return { ok: false, error: gymError.message };
  }

  const { error: claimError } = await supabaseAdmin
    .from('gym_claim_requests')
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('gym_id', gymId)
    .eq('user_id', uid);

  if (claimError) {
    console.error('approveClaimAction claim update:', claimError);
    return { ok: false, error: claimError.message };
  }

  revalidatePath('/admin/claims');
  revalidatePath('/dashboard');
  revalidatePath('/gyms/[slug]', 'page');
  return { ok: true };
}

/**
 * Reject a claim: set claim status to rejected. Request disappears from pending list. Admin only.
 */
export async function rejectClaimAction(
  gymIdOrFormData: string | FormData,
  userId?: string
): Promise<ApproveClaimResult> {
  let gymId: string;
  let uid: string;
  if (gymIdOrFormData instanceof FormData) {
    gymId = (gymIdOrFormData.get('gym_id') as string) ?? '';
    uid = (gymIdOrFormData.get('user_id') as string) ?? '';
  } else {
    gymId = gymIdOrFormData;
    uid = userId ?? '';
  }
  if (!gymId || !uid) return { ok: false, error: 'Missing gym_id or user_id' };

  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return { ok: false, error: 'Unauthorized' };
  }

  const { error } = await supabaseAdmin
    .from('gym_claim_requests')
    .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
    .eq('gym_id', gymId)
    .eq('user_id', uid);

  if (error) {
    console.error('rejectClaimAction:', error);
    return { ok: false, error: error.message };
  }

  revalidatePath('/admin/claims');
  return { ok: true };
}
