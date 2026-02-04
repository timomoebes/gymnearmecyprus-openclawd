# hCaptcha setup

hCaptcha protects the app from bots on claim requests, login, and signup. You need an hCaptcha account, a **Site Key** (public) and a **Secret** (server-only).

---

## Turn off hCaptcha (e.g. localhost or while testing)

To **disable hCaptcha completely** so login, signup, and claim work without the widget or verification, add to `.env.local`:

```env
NEXT_PUBLIC_DISABLE_HCAPTCHA=true
```

Restart the dev server. The captcha widget will not appear and the server will not verify. **Do not set this in production.** When you deploy, remove this line (or set it to `false`) and add your production domain in the hCaptcha site hostnames.

### Supabase: disable CAPTCHA protection for local development

If you see **"captcha verification process failed"** on login or signup even with the widget hidden, Supabase Auth is requiring a captcha token. When CAPTCHA is disabled in the app (e.g. on localhost), we do not send a token, so Supabase rejects the request.

**Fix for local development:** In the [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **Bot and Abuse Protection** (or **Protection**), turn **OFF** "Enable CAPTCHA protection". Then login and signup will work on localhost without a token. Re-enable it for production; the app passes the hCaptcha token to Supabase when captcha is enabled.

---

## 1. Add a site in the hCaptcha dashboard

1. Open the [hCaptcha Dashboard](https://dashboard.hcaptcha.com/sites) and sign in.
2. Click **Sites** (or **Add Site** on the overview).
3. **Add Site**:
   - **Site name:** e.g. `GymNearMe Cyprus` or `gymnearme-local`
   - **Hostnames:** Add the host(s) where the app runs. Many dashboards do **not** accept `localhost`; you can leave hostnames blank for development (see “Development (localhost)” below) or add only your **production domain** (e.g. `gymnearme.com`) when you deploy.
   - Save.

4. After creating the site you see **Site Key** and **Secret**.
   - **Site Key** → use in the app as `NEXT_PUBLIC_HCAPTCHA_SITEKEY`
   - **Secret** → use in the app as `HCAPTCHA_SECRET` (never use in the frontend or commit it)

You can add more hostnames (e.g. production domain) in the site settings later.

---

## 2. Set environment variables

In **`.env.local`** (not committed to the repo):

```env
# hCaptcha (from https://dashboard.hcaptcha.com/ → Sites → your site)
NEXT_PUBLIC_HCAPTCHA_SITEKEY=your-sitekey-here
HCAPTCHA_SECRET=your-secret-here
```

- **NEXT_PUBLIC_HCAPTCHA_SITEKEY:** The **Site Key** from the hCaptcha dashboard (safe to be public; used in the browser).
- **HCAPTCHA_SECRET:** The **Secret** from the hCaptcha dashboard. Use only on the server; never in the frontend or in Git.

Restart the dev server after changing `.env.local` (`npm run dev`).

---

## 3. Where hCaptcha is used

| Location | Description |
|----------|-------------|
| **Claim form** | On “Submit claim request” the captcha must be solved first; the token is verified server-side before the claim is written to the DB. |
| **Login** | On the login page the captcha is verified before signing in. |
| **Signup** | On signup the captcha is verified before creating the account. |
| **Claim page (sign-in/sign-up)** | The inline auth form on the claim page uses the same verification. |

If **neither** variable is set, the **claim page** shows a notice that captcha is not configured; login and signup then run without captcha (for local testing only).

---

## 4. Development (localhost)

The hCaptcha dashboard often does **not** allow `localhost` (or `127.0.0.1`) as a hostname. To avoid “captcha verification failed” when testing locally:

- **In development** (`NODE_ENV=development`, i.e. when you run `npm run dev`), the app **skips** server-side hCaptcha verification. You can complete the captcha widget and log in / sign up / submit claims on localhost without adding localhost to your hCaptcha site.
- **In production** (`NODE_ENV=production`), verification runs as usual. Add your **production domain** in the hCaptcha site hostnames so tokens from your live app are accepted.

If you still see "captcha verification failed" on localhost after restarting the dev server, add to `.env.local` and restart:

```env
HCAPTCHA_SKIP_VERIFY_IN_DEV=true
```

Use only for local development; do **not** set in production.

---

## 5. Checklist

- [ ] Created a **site** in the hCaptcha dashboard
- [ ] Set **hostnames** when you deploy (production domain); optional for local dev (verification is skipped in development)
- [ ] Copied **Site Key** and **Secret** from the dashboard
- [ ] Set `NEXT_PUBLIC_HCAPTCHA_SITEKEY` and `HCAPTCHA_SECRET` in `.env.local`
- [ ] If you see "captcha verification process failed" on localhost: turn **off** "Enable CAPTCHA protection" in Supabase Dashboard → Authentication → Bot and Abuse Protection (see above)
- [ ] If our app’s verification still fails on localhost, add `HCAPTCHA_SKIP_VERIFY_IN_DEV=true` to `.env.local` and restart
- [ ] Restarted the dev server
- [ ] Tested: claim page, login, signup — captcha appears and submit works after solving it

---

## 6. Technical details

- **Client:** [@hcaptcha/react-hcaptcha](https://github.com/hCaptcha/react-hcaptcha) — widget with `sitekey`, `onVerify`, `theme="dark"`.
- **Server:** Token verification via `https://hcaptcha.com/siteverify` (see `lib/hcaptcha.ts`). The claim action and auth verify use this check before running the actual operation. Verification is skipped when `NODE_ENV=development` or `HCAPTCHA_SKIP_VERIFY_IN_DEV=true` (see Development section) so localhost works without a hostname in hCaptcha.
- Use the **secret** only in server actions or API routes; never in `NEXT_PUBLIC_*` or frontend code.
