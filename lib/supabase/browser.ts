import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for Client Components.
 * Uses cookies so the session stays in sync with the server and middleware.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
