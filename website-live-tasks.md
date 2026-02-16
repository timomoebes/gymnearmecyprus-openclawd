# Website Live Tasks

## What you need to do in Supabase

Ensure `/auth/callback` is in your allowed redirect URLs:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL Configuration**.
2. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback` (local)
   - `https://gymnearmecyprus-openclawd.vercel.app/auth/callback` (current live)
   - When you switch: `https://gymnearme.cy/auth/callback` and `https://www.gymnearme.cy/auth/callback`
3. Save.

## Test

1. Sign up with a new email.
2. Check your inbox for the confirmation email.
3. Click the confirmation link.
4. You should be redirected to `/auth/callback`, then to `/dashboard` (or your intended page), and be signed in.

The code changes are ready. After adding the redirect URLs in Supabase, the confirmation flow should work.
