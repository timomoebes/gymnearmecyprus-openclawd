import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Create a Supabase client for Server Components, Server Actions, and Route Handlers.
 * Uses cookies so the session is available on the server.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component - middleware will refresh session
          }
        },
      },
    }
  );
}

/**
 * Get the current authenticated user's id (auth.users.id) or null.
 * Use in Server Components or Server Actions.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

/**
 * Current user { id, email } or null. Use when you need email (e.g. admin checks).
 */
export async function getCurrentUser(): Promise<{ id: string; email?: string } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? undefined };
}

/** Comma-separated list of emails that can access /admin. Set ADMIN_EMAILS in .env.local. */
export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const list = process.env.ADMIN_EMAILS ?? '';
  return list.split(',').map((e) => e.trim().toLowerCase()).includes(email.toLowerCase());
}
