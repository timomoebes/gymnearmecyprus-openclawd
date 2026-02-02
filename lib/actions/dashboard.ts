'use server';

import { getCurrentUserId } from '@/lib/supabase/server';
import { getMyGymsFromDB } from '@/lib/api/gyms';
import type { Gym } from '@/lib/types';

export type MyGymsResult = { gyms: Gym[]; userId: string | null };

/**
 * Get gyms owned by the current user. Returns empty array if not signed in.
 */
export async function getMyGymsAction(): Promise<MyGymsResult> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { gyms: [], userId: null };
  }
  const gyms = await getMyGymsFromDB(userId);
  return { gyms, userId };
}
