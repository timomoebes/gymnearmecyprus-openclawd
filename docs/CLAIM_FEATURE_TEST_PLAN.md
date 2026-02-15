# Gym claim feature – test plan (live app)

Use this to test the full claim flow on the live app ([gymnearmecyprus-openclawd.vercel.app](https://gymnearmecyprus-openclawd.vercel.app/)). When you move to **gymnearme.cy**, repeat the same steps; only the domain changes (and you add that domain in hCaptcha and Supabase redirect URLs).

---

## Before you start

- **hCaptcha:** In [hCaptcha Dashboard](https://dashboard.hcaptcha.com/sites) → your site → **Hostnames**, add:
  - `gymnearmecyprus-openclawd.vercel.app` (current live)
  - When you switch: `gymnearme.cy` and `www.gymnearme.cy`
- **Vercel env:** `NEXT_PUBLIC_HCAPTCHA_SITEKEY`, `HCAPTCHA_SECRET` set; **do not** set `NEXT_PUBLIC_DISABLE_HCAPTCHA` in production.
- **Supabase Redirect URLs:** Include `https://gymnearmecyprus-openclawd.vercel.app/reset-password` (and later `https://gymnearme.cy/reset-password` etc.) so password reset works on live.
- **Admin:** Your admin email is in **Vercel** env as `ADMIN_EMAILS` (same as in `.env.local` for local). You sign in with that email to access `/admin/claims`.

---

## Part A: Gym owner side (claim a gym)

**Goal:** A gym owner finds a gym, signs in (or signs up), completes captcha, and submits a claim request.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Open the live app. Go to **Gyms** (or a city) and pick an **unclaimed** gym (e.g. “Claim this gym” visible). | Gym detail page with “Claim this gym” link. |
| 2 | Click **Claim this gym**. | Claim page for that gym. If not signed in, you see sign-in/sign-up form. |
| 3 | Sign in (or sign up). Use a **non-admin** email for this test (e.g. a second account). | After auth, page refreshes and shows the claim form. |
| 4 | Complete the **hCaptcha** (tick/ challenge). | Captcha verified. |
| 5 | Click **Submit claim request**. | Message like “Your claim request has been submitted…” and option to go to dashboard. |
| 6 | Go to **Dashboard** (with that gym owner account). | Dashboard may still show “You haven’t claimed any gyms yet” until the claim is **approved** by admin. |

**Notes:**

- If you see “Captcha is not configured” or “Captcha verification failed”, check hCaptcha hostnames and Vercel env (see above).
- After submitting, the request is **pending** until an admin approves it.

---

## Part B: Admin side (approve the claim)

**Goal:** You sign in as admin and approve the pending claim so the gym owner gets the gym in their dashboard.

| Step | Action | Expected result |
|------|--------|-----------------|
| 1 | Sign out (if you were the gym owner). Open the live app and go to **Log in**. | Login page. |
| 2 | Sign in with your **admin** email (the one in `ADMIN_EMAILS` on Vercel). | Signed in; you can go to dashboard or home. |
| 3 | In the browser, go to **`/admin/claims`**  
    (e.g. `https://gymnearmecyprus-openclawd.vercel.app/admin/claims`). | **Pending claims** page. If you’re not admin, you’re redirected. |
| 4 | Find the claim you submitted in Part A (gym name + claimant email). | One row with **Approve** and **Reject**. |
| 5 | Click **Approve**. | Row disappears from the list; the gym is now owned by that user. |
| 6 | (Optional) Sign in again as the **gym owner** and open **Dashboard**. | The approved gym appears in “Your gyms” / dashboard. |

**Reject:** If you click **Reject**, the row disappears and the gym stays unclaimed (no owner).

---

## Quick checklist (live)

- [ ] hCaptcha hostnames include `gymnearmecyprus-openclawd.vercel.app` (and later `gymnearme.cy` / `www.gymnearme.cy`).
- [ ] Vercel env: `NEXT_PUBLIC_HCAPTCHA_SITEKEY`, `HCAPTCHA_SECRET` set; no `NEXT_PUBLIC_DISABLE_HCAPTCHA`.
- [ ] Supabase Redirect URLs include live reset-password URL(s).
- [ ] Vercel env: `ADMIN_EMAILS` = your admin email.
- [ ] **Part A:** Claim a gym as owner (sign in → captcha → submit).
- [ ] **Part B:** Sign in as admin → `/admin/claims` → Approve the claim.
- [ ] (Optional) Sign in as gym owner again and confirm the gym appears in the dashboard.

---

## When you switch to gymnearme.cy

1. **hCaptcha:** Add hostnames `gymnearme.cy` and `www.gymnearme.cy`; keep the Vercel hostname until you fully switch.
2. **Supabase:** Add `https://gymnearme.cy/reset-password` and `https://www.gymnearme.cy/reset-password` to Redirect URLs.
3. **Vercel:** Point your custom domain to the same project; no need to change env (same keys work for the new domain).
4. Re-run **Part A** and **Part B** on `https://gymnearme.cy` (or `https://www.gymnearme.cy`) to confirm claim and admin flows.
