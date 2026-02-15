# Changelog

## Purpose & scope

This changelog captures **human-readable, repo-wide changes** that affect how the app behaves, how data is produced/consumed, how we deploy/run the project, or how contributors should work.

- **Include**: app behavior changes, API/data shape changes, SEO/content generation logic changes, scripts that affect outputs, infra/config changes that impact runtime/build, notable bug fixes and refactors.
- **Exclude**: purely cosmetic formatting, local-only editor settings, and trivial comment-only changes (unless they clarify a public contract).

## How to add an entry

- Add a new entry under **Unreleased**.
- Keep entries small and actionable; prefer “what/why/how to verify”.
- If a change touches multiple areas, list it once and link the relevant files.

## Unreleased

- **Date**: 2026-02-15  
  **Area**: `components`, `app`, `docs`  
  **Summary**: Footer label "Privacy"; claim form works with DISABLE_HCAPTCHA (no keys); HCAPTCHA_SETUP doc: going live, claim form, renumbered sections.  
  **Rationale**: Shorten footer link to "Privacy". Claim page previously required sitekey even when captcha was disabled; now DISABLE_HCAPTCHA allows claim form without any hCaptcha keys and shows a dev notice. Docs clarify going-live steps and that claim form respects DISABLE_HCAPTCHA.  
  **Files changed**:
  - `components/layout/Footer.tsx` (Privacy Policy → Privacy)
  - `app/claim/[slug]/ClaimForm.tsx` (canShowForm = DISABLE_HCAPTCHA || HCAPTCHA_SITEKEY; dev notice when disabled)
  - `docs/HCAPTCHA_SETUP.md` (turn off section, claim form note, new "Going live" section, sections 4–7 renumbered)
  **Manual test plan**: Footer shows "Privacy" linking to /privacy. With NEXT_PUBLIC_DISABLE_HCAPTCHA=true, claim page shows form and "Captcha disabled for development" notice; without keys and without DISABLE_HCAPTCHA, claim page shows config message. Skim HCAPTCHA_SETUP.md for going-live steps.

- **Date**: 2026-02-15  
  **Area**: `app`  
  **Summary**: Add Privacy Policy page at `/privacy` so footer link works on live site.  
  **Rationale**: Footer linked to `/privacy` but the page was only added locally and never committed; Vercel builds from the repo, so the live site returned 404. Committing the page fixes the 404.  
  **Files changed**:
  - `app/privacy/page.tsx` (new)
  - `docs/CHANGELOG.md` (this entry)
  **Manual test plan**: After push, open https://gymnearmecyprus-openclawd.vercel.app/privacy and confirm the Privacy Policy page loads; click “Privacy Policy” in the footer and confirm it navigates to the same page.

- **Date**: 2026-02-15  
  **Area**: `app`, `lib`, `components`, `scripts`  
  **Summary**: Fix Vercel build: form action types, photo-upload client/actions, Supabase server client await, script types, signup Suspense.  
  **Rationale**: Build failed on type errors and prerender. React form `action` must be `(FormData) => void | Promise<void>`; admin claim actions returned `ApproveClaimResult`. Added form-only wrappers. Photo upload actions return `{ success: true }` and throw on error—component assumed `error`/`featured_images`. Server `createClient()` is async and was not awaited. Scripts had implicit `any`/index errors. Signup uses `useSearchParams()` and required a Suspense boundary for static export.  
  **Files changed**:
  - `lib/actions/admin-claims.ts` (approveClaimFormAction, rejectClaimFormAction wrappers; existing approve/reject kept for programmatic use)
  - `app/admin/claims/page.tsx` (use form actions for Approve/Reject)
  - `app/gyms/[slug]/page.tsx` (generateGymMetaDescription(gym, city ?? null))
  - `components/owner/OwnerPhotoUpload.tsx` (save: await action, use allImages; delete: await action, no result.error)
  - `lib/api/photo-uploads-actions.ts` (await createClient(); import createClient from server)
  - `scripts/add-seo-frontmatter.ts` (guides as keyof typeof metaData)
  - `scripts/rank-gyms.ts` (results as Record<string, unknown>)
  - `app/signup/page.tsx` (Suspense around SignupForm)
  **Manual test plan**: Run `npm run build` locally; confirm it completes. Deploy to Vercel and confirm build succeeds. Smoke: open `/admin/claims` as admin, Approve/Reject a claim; owner dashboard photo upload and delete; `/signup` loads without prerender error.

- **Date**: 2026-02-08  
  **Area**: `components`, `lib`, `app`  
  **Summary**: Add full i18n (EN/EL) for landing page and fix desktop language dropdown so it opens on click.  
  **Rationale**: Users can switch language on mobile (working) but the desktop nav language button did nothing because both a native click listener and React onClick fired, double-toggling the dropdown. Single handler (React only) with explicit open/close callbacks fixes desktop; mobile unchanged.  
  **Files changed**:
  - `components/layout/Navigation.tsx` (desktop: remove native listener, add openLangDropdown/closeLangDropdown, single onClick; mobile language selector unchanged)
  - `lib/i18n/translations.ts`, `components/providers/LocaleProvider.tsx` (locale state, t(), EN/EL strings)
  - `components/icons/FlagIcons.tsx` (FlagGB, FlagGR, LanguageFlag)
  - `components/home/HomeHero.tsx`, `SearchBar.tsx`, `CityCardGrid.tsx`, `SpecialtyCardGrid.tsx`, `Home24HourSection.tsx`, `HomeBenefitsSection.tsx`, `HomeGuideSection.tsx`, `HomeTrustSection.tsx`, `FAQSection.tsx` (client components using useLocale/t)
  - `lib/data/faq.ts` (FAQ data for server schema; moved out of client component)
  - `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts` (LocaleProvider, viewport, font vars, safelist)
  **Manual test plan**: Desktop: click language button (flag + chevron) in nav → dropdown opens; select Greek/English → language and dropdown close. Mobile: open menu → change language via flags → text updates. No 404s for `_next/static` chunks (run dev, check Network).

- **Date**: 2026-02-04  
  **Area**: `docs`  
  **Summary**: Remove German from README (HCAPTCHA_SETUP line: "Site anlegen, Keys in" → "set up site, add keys to").  
  **Rationale**: Keep all user-facing and doc text in English.  
  **Files changed**: `README.md`  
  **Manual test plan**: Skim README docs section; confirm HCAPTCHA_SETUP line is in English.

- **Date**: 2026-02-04  
  **Area**: `app`, `lib`, `docs`  
  **Summary**: Fix “captcha verification process failed” on login/signup; disable captcha on localhost and pass token to Supabase when enabled.  
  **Rationale**: The error came from Supabase Auth (project had “Enable CAPTCHA protection” on) while the app did not send a captcha token. On localhost we now never show or verify captcha (runtime hostname check) and never call the verify action; when captcha is enabled we pass the hCaptcha token to `signInWithPassword`/`signUp` so production works. Server action skips verification when `NODE_ENV=development`. Docs explain turning off Supabase CAPTCHA for local dev.  
  **Files changed**:
  - `app/login/LoginForm.tsx` (localhost check, needCaptcha, pass captchaToken to Supabase, “Captcha disabled for development” message)
  - `app/signup/SignupForm.tsx` (same + dev message)
  - `app/claim/[slug]/ClaimPageAuth.tsx` (localhost/needCaptcha, pass captchaToken to signIn/signUp)
  - `lib/actions/verify-captcha.ts` (isCaptchaDisabledOnServer: NODE_ENV=development first, then env flags)
  - `next.config.js` (env: NEXT_PUBLIC_DISABLE_HCAPTCHA)
  - `docs/HCAPTCHA_SETUP.md` (Supabase: disable CAPTCHA for local dev, checklist)
  **Manual test plan**:
  - On localhost with `NEXT_PUBLIC_DISABLE_HCAPTCHA=true`: restart dev server, hard-refresh `/login` and `/signup`; confirm “Captcha disabled for development” and no widget; sign in (or sign up) and confirm no “captcha verification process failed” (if it appears, turn off “Enable CAPTCHA protection” in Supabase Dashboard → Authentication → Protection).
  - With Supabase CAPTCHA on (production): ensure hCaptcha widget is shown, complete it, sign in/sign up; confirm auth succeeds with token passed to Supabase.

- **Date**: 2026-02-04  
  **Area**: `app`, `lib`, `components`, `docs`  
  **Summary**: Claim flow, admin claims page, auth-aware nav, and docs for managing/approving gym claims.  
  **Rationale**: Let users claim gyms (sign in → submit request); let admins approve or reject from `/admin/claims`; show Dashboard/Sign out in nav when logged in; document admin workflow and Supabase approval options without committing personal data.  
  **Files changed**:
  - `app/auth/callback/route.ts` (support Supabase `next` param, safe redirect)
  - `app/claim/[slug]/ClaimForm.tsx` (session-aware “Go to dashboard” / sign-in fallback)
  - `app/login/LoginForm.tsx` (full-page redirect after login so admin/claims receives cookie)
  - `app/login/page.tsx` (dashboard redirect copy when `redirectTo=/dashboard`)
  - `app/admin/claims/page.tsx` (pending claims list, Approve/Reject)
  - `app/robots.ts` (disallow `/admin`)
  - `components/layout/Navigation.tsx` (auth state: Dashboard + Sign out when logged in)
  - `lib/supabase/middleware.ts` (protect `/admin` by `ADMIN_EMAILS`, trim/filter admin list)
  - `lib/supabase/server.ts` (`getCurrentUser`, `isAdminEmail`)
  - `lib/actions/admin-claims.ts` (get pending claims, approve, reject)
  - `docs/ADMIN_CLAIMS.md`, `docs/APPROVE_CLAIM_SUPABASE.md`
  - `scripts/approve_claim_by_slug_and_email.sql` (placeholders only)
  - `.gitignore` (env files, `.cursor/`), `README.md` (claim flow, doc links)
  **Manual test plan**:
  - Sign in; confirm nav shows Dashboard and Sign out. Open `/admin/claims` as non-admin → redirect to `/`. Set `ADMIN_EMAILS` in `.env.local`, restart dev server, sign in as admin → open `/admin/claims`, see pending claims, Approve and Reject one each; confirm list updates and approved user sees gym in Dashboard.
  - Submit a claim (same browser), confirm “Go to dashboard” or “Sign in to go to dashboard” as appropriate; after login with `redirectTo=/admin/claims`, confirm full redirect to admin page.

- **Date**: 2026-01-28  
  **Area**: `scripts`, `data`, `supabase`  
  **Summary**: Geocoded gyms and refreshed ratings/review counts from Google for all gyms, plus manual data corrections.  
  **Rationale**: Ensure accurate map coordinates and up-to-date ratings/reviews for better user trust and SEO while fixing known data issues.  
  **Files changed**:
  - `scripts/test-google-geocode-gym.ts`
  - `scripts/batch-geocode-gyms-from-komanetsi.ts`
  - `scripts/apply-geocode-proposals.ts`
  - `scripts/test-update-rating-review-single.ts`
  - `scripts/update-kings-bjj-paphos-coordinates.ts`
  - `scripts/update-kings-bjj-rating-review.ts`
  - `scripts/test-next-3-gyms-rating-review.ts`
  - `scripts/update-next-3-gyms-rating-review.ts`
  - `scripts/batch-update-ratings-reviews.ts`
  - `scripts/batch-update-all-remaining-ratings-reviews.ts`
  - `scripts/batch-update-ratings-reviews-from-kalopedi.ts`
  - `scripts/apply-rating-review-updates.ts`
  - `scripts/delete-ananda-yoga-studio.ts`
  - `scripts/fix-eplarkou-pilates-reviews.ts`
  - `lib/data/gyms.ts` (metadata date adjustments for mock data only)
  **Manual test plan**:
  - Run selected scripts in dry-run/test mode (where applicable) for a small set of gyms and inspect printed proposals.
  - Apply updates, then query Supabase directly (or via ad-hoc scripts) to confirm lat/lng, rating, and review_count values match expectations (e.g., Kings BJJ at `34.7775625, 32.4400625`, updated review counts).
  - Load affected gym and city pages in the frontend to verify maps point to correct locations and ratings/review counts match database state.

- **Date**: 2026-01-28  
  **Area**: `config`, `scripts`, `deps`  
  **Summary**: Cleaned up Next.js image config, added a data-freshness check script, and updated CSS tooling dependencies to remove “data older than 2 months” warnings.  
  **Rationale**: Reduce noise in the dev environment, confirm data recency, and keep build tooling aligned with current browser baseline data.  
  **Files changed**:
  - `next.config.js`
  - `scripts/check-data-freshness.ts`
  - `package.json`
  - `package-lock.json`
  **Manual test plan**:
  - Restart dev server (`npm run dev -- -p 3000`) and confirm the `images.domains` deprecation warning is gone and images still render correctly.
  - Run `npm run lint` / `npm run build` and check that the `baseline-browser-mapping` / “over two months old” warning no longer appears.
  - Execute `ts-node scripts/check-data-freshness.ts` (or the documented equivalent) and verify it reports all gyms’ `updated_at` timestamps as recent.

- **Date**: 2026-01-28  
  **Area**: `app`, `lib`, `docs`  
  **Summary**: Replaced the hard-coded homepage average rating with a weighted, data-driven calculation and documented the trust signals.  
  **Rationale**: Make homepage trust signals accurately reflect real gym data while clarifying implementation details for future contributors.  
  **Files changed**:
  - `app/page.tsx`
  - `components/shared/GymListPageClient.tsx`
  - `lib/data/gyms.ts` (used by the homepage when falling back to mock data)
  - `TECHNICAL_REFERENCE.md` (homepage trust signals & average rating section)
  **Manual test plan**:
  - Start the dev server and open the homepage; confirm the “Average Rating” trust signal now shows a plausible value derived from real ratings/review counts (e.g., around 4.7+) and updates if underlying data changes.
  - Temporarily simulate a no-reviews state (e.g., by using mock data only) and verify the fallback value (4.5) is displayed.
  - Spot-check several gyms in Supabase against the homepage value to ensure the weighted average logic aligns with expectations.

### Entry template

> Copy/paste this block and fill it in.

- **Date**: YYYY-MM-DD
- **Area**: (e.g. `app`, `components`, `lib`, `scripts`, `data`, `supabase`, `config`, `docs`)
- **Summary**: One sentence describing the outcome.
- **Rationale**: Why this was changed; user impact or engineering reason.
- **Files changed**:
  - `path/to/file`
  - `path/to/file`
- **Manual test plan**:
  - Step(s) you ran (commands + what you checked)
  - Expected result(s)

### Scripts & data changes (vs app code)

Use the same template, plus:

- **Inputs/outputs**: What input files or sources were used; what outputs were generated/updated.
- **Repro command**: Exact command(s) to re-run the script.
- **Data notes**: Any assumptions (city scope, dedupe rules, ranking logic), and whether results are deterministic.

Examples of “scripts/data” changes to document:
- Updating enrichment/cleanup logic in `scripts/`
- Modifying seed/mock data in `data/`
- Changing schema expectations used by scripts

### Config-only changes

Config changes can have large impact; document them even if no code changed.

Add the template entry and include:
- **Impact**: What behavior changes (build, runtime, linting, routing, SEO headers, env expectations).
- **Rollback**: The simplest way to revert/disable if issues appear (optional but helpful).

Examples:
- `next.config.js`, `tsconfig.json`, Tailwind/PostCSS config, Supabase config/migrations, CI workflow changes

## Released

When cutting a release (or a milestone), move the relevant “Unreleased” entries into a dated section:

## YYYY-MM-DD

- (entries here)

