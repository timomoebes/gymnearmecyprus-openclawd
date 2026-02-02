'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type SubmitClaimResult = { ok: true } | { ok: false; error: string };

/**
 * Submit a claim request for a gym. User must be authenticated.
 * Inserts into gym_claim_requests with status 'pending'; admin approves later.
 */
export async function submitClaimRequest(gymId: string): Promise<SubmitClaimResult> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { ok: false, error: 'You must be signed in to claim a gym.' };
  }

  const { error } = await supabase.from('gym_claim_requests').insert({
    gym_id: gymId,
    user_id: user.id,
    status: 'pending',
  });

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: 'You have already submitted a claim request for this gym.' };
    }
    console.error('submitClaimRequest error:', error);
    return { ok: false, error: error.message || 'Failed to submit claim request.' };
  }

  revalidatePath('/gyms/[slug]', 'page');
  return { ok: true };
}
