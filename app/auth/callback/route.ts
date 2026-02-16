import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { isAdminEmail } from '@/lib/supabase/server';

/**
 * Supabase auth callback: exchange code/token_hash for session and redirect.
 * Used after OAuth, magic link sign-in, or email confirmation.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = request.nextUrl;
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    
    // Extract redirectTo from query params
    let redirectTo = searchParams.get('redirectTo') ?? searchParams.get('next') ?? '/dashboard';
    
    // If redirectTo is a full URL (from emailRedirectTo), extract just the path
    // Handle nested redirectTo URLs (e.g., from old emails: /auth/callback?redirectTo=/claim/...)
    try {
      if (redirectTo.startsWith('http://') || redirectTo.startsWith('https://')) {
        const url = new URL(redirectTo);
        // If the URL path is /auth/callback, extract redirectTo from its query params
        if (url.pathname === '/auth/callback' && url.searchParams.has('redirectTo')) {
          redirectTo = url.searchParams.get('redirectTo')!;
        } else {
          redirectTo = url.pathname + (url.search || '');
        }
      }
      // Also handle if redirectTo is a path that contains /auth/callback?redirectTo=...
      if (redirectTo.includes('/auth/callback') && redirectTo.includes('redirectTo=')) {
        const match = redirectTo.match(/redirectTo=([^&]+)/);
        if (match) {
          redirectTo = decodeURIComponent(match[1]);
        }
      }
    } catch {
      // If URL parsing fails, use default
      redirectTo = '/dashboard';
    }
    
    // Only allow relative paths: single leading /, no protocol-relative (//) or backslashes
    const path =
      typeof redirectTo === 'string' &&
      redirectTo.startsWith('/') &&
      !redirectTo.startsWith('//') &&
      !redirectTo.includes('\\')
        ? redirectTo
        : '/dashboard';

    // Create response first - cookies will be set during verification
    const response = NextResponse.redirect(`${origin}${path}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Handle OAuth/magic link flow (code parameter)
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        // Verify session was created
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          console.error('[auth/callback] Session not created after exchangeCodeForSession:', sessionError);
          return NextResponse.redirect(`${origin}/login?error=session_not_created`);
        }
        // Check if user is admin and redirect to admin dashboard if defaulting to dashboard
        if (path === '/dashboard' && session.user.email && isAdminEmail(session.user.email)) {
          return NextResponse.redirect(`${origin}/admin`);
        }
        return response;
      }
      console.error('[auth/callback] exchangeCodeForSession error:', error);
      return NextResponse.redirect(`${origin}/login?error=code_exchange_failed`);
    }

    // Handle email confirmation flow (token_hash parameter, PKCE)
    if (token_hash && type) {
      const { data: verifyData, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });
      
      if (error) {
        console.error('[auth/callback] verifyOtp error:', error);
        return NextResponse.redirect(`${origin}/login?error=token_verification_failed&details=${encodeURIComponent(error.message)}`);
      }

      // verifyOtp should return a session if successful
      // Check both the response data and fetch session to ensure it's set
      let session = verifyData?.session;
      if (!session) {
        const { data: { session: fetchedSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('[auth/callback] Error fetching session after verifyOtp:', sessionError);
        }
        session = fetchedSession;
      }
      
      if (!session) {
        console.log('[auth/callback] verifyOtp succeeded but no session created - email should be confirmed, redirecting to login');
        // Email should be confirmed even without session - redirect to login with success message
        // User can now sign in normally
        return NextResponse.redirect(`${origin}/login?message=email_confirmed&redirectTo=${encodeURIComponent(path)}`);
      }

      // Verify email is confirmed
      if (!session.user.email_confirmed_at) {
        console.warn('[auth/callback] Session created but email_confirmed_at is null - this may be a timing issue');
        // Still redirect - the email should be confirmed, user can sign in
        // Check if user is admin and redirect to admin dashboard if defaulting to dashboard
        if (path === '/dashboard' && session.user.email && isAdminEmail(session.user.email)) {
          return NextResponse.redirect(`${origin}/admin`);
        }
        return response;
      }

      // Success: session created and email confirmed
      // Check if user is admin and redirect to admin dashboard if defaulting to dashboard
      if (path === '/dashboard' && session.user.email && isAdminEmail(session.user.email)) {
        return NextResponse.redirect(`${origin}/admin`);
      }
      console.log('[auth/callback] Email confirmed successfully, redirecting to:', path);
      return response;
    }

    // If we get here, no valid auth parameters were provided
    console.error('[auth/callback] No code or token_hash provided');
    return NextResponse.redirect(`${origin}/login?error=missing_auth_params`);
  } catch (error) {
    console.error('[auth/callback] Unexpected error:', error);
    return NextResponse.redirect(`${request.nextUrl.origin}/login?error=callback_error`);
  }
}
