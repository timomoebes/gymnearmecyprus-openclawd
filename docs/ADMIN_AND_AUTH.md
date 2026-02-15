# Admin access and auth (localhost)

## Where is the “admin” stored?

**Admin is not stored in any Supabase table.** The app does not have an “admin” row in `user_profiles` or elsewhere.

- **How it works:** In `.env.local` you set `ADMIN_EMAILS=your@email.com` (comma-separated). When you **sign in**, the app reads your email from Supabase Auth and checks if it is in that list. If it is, you can access `/admin/claims` and other admin routes.
- **So:** Your admin user is simply the Supabase Auth account (email + password) whose email is listed in `ADMIN_EMAILS`. You don’t need to “find” the admin in the database; you just need to be able to sign in with that email.

## Forgot password (can’t sign in)

If you forgot your password or never confirmed your email:

1. **Do not sign up again with the same email.** Supabase will not send a new confirmation email for an existing user.
2. On the **Login** page, click **Forgot password?**
3. Enter your email (e.g. `timomoebes11@gmail.com`) and submit. You’ll get an email with a “Reset password” link.
4. Click the link. You’ll be sent to **Set new password**. Enter a new password twice and submit. Then sign in with the new password.

### Redirect URL for password reset (required)

For the reset link to open your app, Supabase must allow that URL:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL Configuration**.
2. Under **Redirect URLs**, add (one per line):
   - `http://localhost:3000/reset-password` (local)
   - `https://gymnearmecyprus-openclawd.vercel.app/reset-password` (current live app)
   - `https://gymnearme.cy/reset-password` and `https://www.gymnearme.cy/reset-password` (when you switch domain)
3. Save. The app uses the current site origin for the reset link, so it works on localhost, Vercel, or gymnearme.cy without code changes.

## Summary

| Goal | What to do |
|------|------------|
| Be an admin | Put your email in `ADMIN_EMAILS` in `.env.local` and sign in with that account. |
| Can’t sign in (forgot password) | Use **Forgot password?** on the login page; add `http://localhost:3000/reset-password` to Supabase Redirect URLs. |
| “Signed up again” but no new email | Use **Forgot password?** instead; Supabase does not resend confirmation for an existing email. |
