import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refreshes the Supabase auth session (cookies) on each request.
 * Required so Server Components and the browser stay in sync with the session.
 * Only redirects to login for protected routes (e.g. /dashboard).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session - do not remove; prevents random logouts with SSR
  await supabase.auth.getUser();

  // Protect dashboard: redirect unauthenticated users to login
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/callback');
  const isAdmin = request.nextUrl.pathname.startsWith('/admin');

  if (isDashboard && !isAuthCallback) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    // Send admins to the admin dashboard instead of the owner dashboard
    const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e: string) => e.trim().toLowerCase())
      .filter(Boolean);
    const email = user.email?.trim().toLowerCase();
    if (email && adminEmails.length > 0 && adminEmails.includes(email)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect admin: only allow emails listed in ADMIN_EMAILS (comma-separated)
  if (isAdmin) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const email = user.email?.trim().toLowerCase();
    if (!email || adminEmails.length === 0 || !adminEmails.includes(email)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse;
}
