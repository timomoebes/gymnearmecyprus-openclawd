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

