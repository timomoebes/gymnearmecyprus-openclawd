'use server';

import { getCurrentUser, isAdminEmail } from '@/lib/supabase/server';

/**
 * Check if the current user is an admin.
 * Returns { isAdmin: true } if admin, { isAdmin: false } otherwise.
 */
export async function checkAdminStatus(): Promise<{ isAdmin: boolean }> {
  const user = await getCurrentUser();
  if (!user) {
    return { isAdmin: false };
  }
  return { isAdmin: isAdminEmail(user.email) };
}
