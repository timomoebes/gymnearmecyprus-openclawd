# Website Live Tasks

## What you need to do in Supabase

### 1. Fix Site URL (CRITICAL - Must be base URL only!)

**You currently have:** `https://gymnearmecyprus-openclawd.vercel.app/auth/callback` ❌

**Change it to:** `https://gymnearmecyprus-openclawd.vercel.app` ✅

1. Go to **Authentication** → **URL Configuration**.
2. Set **Site URL** to the **base URL only** (no paths):
   - For local: `http://localhost:3000`
   - For live: `https://gymnearmecyprus-openclawd.vercel.app`
   - When you switch: `https://gymnearme.cy` or `https://www.gymnearme.cy`
3. Save.

**Why:** The email template uses `{{ .SiteURL }}/auth/callback`. If Site URL already includes `/auth/callback`, you get `/auth/callback/auth/callback` (double path).

### 2. Update Email Template (CRITICAL - Fixes confirmation redirect)

The email template currently uses `{{ .ConfirmationURL }}` which redirects to root. Update it to use `/auth/callback` with `token_hash`:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **Email Templates**.
2. Select **Confirm signup** template.
3. Replace the link in the template with:
   ```html
   <a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&redirectTo={{ .RedirectTo }}">Confirm my email</a>
   ```
   Or if you want to keep your custom text:
   ```html
   <h2>Confirm Your Gym Near Me Cyprus Account</h2>
   <p>Hello,</p>
   <p>You signed up for <strong>Gym Near Me </strong> — the #1 fitness directory for the best gyms across Cyprus. To confirm your email and complete your account, click the link below:</p>
   <p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&redirectTo={{ .RedirectTo }}">Confirm my email</a></p>
   <p>If you didn't request this, you can ignore this email.</p>
   <p>— Gym Near Me Cyprus</p>
   ```
4. Save the template.

**Important Notes:** 
- Use `token_hash` (not `code`) for email confirmation PKCE flow
- `{{ .RedirectTo }}` contains the FULL URL from `emailRedirectTo` (e.g., `https://gymnearmecyprus-openclawd.vercel.app/dashboard` or `https://gymnearmecyprus-openclawd.vercel.app/claim/bhava-nicosia`). The callback route will extract just the path.
- `{{ .SiteURL }}` should be your base URL (e.g., `https://gymnearmecyprus-openclawd.vercel.app`) - NOT `/auth/callback`

### 2. Set Site URL (CRITICAL - Must be base URL, NOT callback URL)

**IMPORTANT:** Site URL must be your **base URL**, NOT `/auth/callback`!

1. Go to **Authentication** → **URL Configuration**.
2. Set **Site URL** to (base URL only, no paths):
   - For local: `http://localhost:3000` ✅
   - For live: `https://gymnearmecyprus-openclawd.vercel.app` ✅
   - When you switch: `https://gymnearme.cy` or `https://www.gymnearme.cy` ✅
   
   **WRONG:** `https://gymnearmecyprus-openclawd.vercel.app/auth/callback` ❌ (This causes double `/auth/callback` in email links!)
   
   **WHY:** The email template uses `{{ .SiteURL }}/auth/callback`, so if Site URL already includes `/auth/callback`, you get `/auth/callback/auth/callback`.

### 3. Add Redirect URLs

Under **Redirect URLs**, add:
- `http://localhost:3000/auth/callback` (local)
- `https://gymnearmecyprus-openclawd.vercel.app/auth/callback` (current live)
- When you switch: `https://gymnearme.cy/auth/callback` and `https://www.gymnearme.cy/auth/callback`

**Note:** These are separate from Site URL. Site URL = base URL, Redirect URLs = allowed callback paths.

## Test

**IMPORTANT:** Make sure your dev server is running (`npm run dev`) before testing!

1. Sign up with a new email.
2. Check your inbox for the confirmation email.
3. Click the confirmation link in the email.
4. You should be redirected to `/auth/callback`, then to `/dashboard` (or your intended page), and be signed in.

**Troubleshooting:**
- If you see `ERR_CONNECTION_ABORTED`: Make sure `npm run dev` is running on port 3000
- If you see `/login?error=...`: Check the browser console and server logs for the specific error
- If redirectTo shows as `http://localhost:3000` instead of `/dashboard`: The email template might not be using `{{ .RedirectTo }}` correctly - check that you saved the template
- Verify the email link URL contains `token_hash` and `type=email` parameters

The code changes are ready. After updating the email template and adding redirect URLs in Supabase, the confirmation flow should work.
