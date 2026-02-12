# Security Audit Report

**Date:** 2026-02-04  
**Scope:** new-gym codebase (GymNearMe Cyprus)  
**Method:** Security-audit subagent workflow (RLS, API, auth, env, input validation, Supabase advisors, npm audit)

---

## Summary

- **Critical:** 1 issue (fixed: hardcoded Supabase keys removed).
- **High:** 2 from Supabase advisors (function search_path, RLS policy), 2 from npm (glob, next).
- **Medium:** 2 from Supabase (extension in public, leaked-password protection off), auth callback redirect hardening possible.
- **Low:** JSON-LD `dangerouslySetInnerHTML` (currently safe); recommendations below.

---

## Critical Issues (fixed)

### 1. Hardcoded Supabase URL and anon key in client — **FIXED**

- **Description:** `lib/supabase/client.ts` used fallback values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, exposing project URL and a real JWT in source.
- **Location:** `lib/supabase/client.ts`, previously `lib/supabase/admin-client.ts` (URL fallback).
- **Remediation:** Fallbacks removed; both client and admin-client now use env-only (empty string if unset). Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local` and in production.

---

## High Priority

### 1. RLS policy “Anyone can insert reviews” (Supabase advisor)

- **Description:** Table `public.reviews` has an RLS policy that allows unrestricted INSERT (`WITH CHECK (true)`), effectively bypassing row-level security for inserts.
- **Remediation:** [Supabase: Permissive RLS policy](https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy). Restrict INSERT (e.g. to authenticated users, or with validated input) and avoid `WITH CHECK (true)` for write operations.

### 2. Function search_path mutable (Supabase advisor)

- **Description:** Functions `public.update_updated_at_column` and `public.get_gym_average_rating` have a role-mutable `search_path`, which can be a security concern.
- **Remediation:** [Supabase: Function search path](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable). Set explicit `search_path` on these functions (e.g. `SET search_path = public`).

### 3. npm: glob and next vulnerabilities

- **Description:** `npm audit` reported high severity: glob (command injection via CLI), next (DoS with Server Components, Image Optimizer, request deserialization).
- **Remediation:** Run `npm audit fix` and upgrade Next.js to a patched version; re-run `npm audit` and address any remaining advisories.

---

## Medium Priority

### 1. Extension in public schema (Supabase advisor)

- **Description:** Extension `pg_trgm` is installed in `public` schema. Recommended to move to another schema.
- **Remediation:** [Supabase: Extension in public](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public).

### 2. Leaked password protection disabled (Supabase advisor)

- **Description:** Supabase Auth leaked-password protection (HaveIBeenPwned) is disabled.
- **Remediation:** [Password strength and leaked password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). Enable in Supabase Dashboard (Authentication → Settings).

### 3. Auth callback redirect path

- **Description:** `/auth/callback` uses `redirectTo`/`next` and only ensures path starts with `/`. Protocol-relative or double-slash paths could be validated more strictly.
- **Location:** `app/auth/callback/route.ts`.
- **Remediation:** Validate that `redirectTo` is a single leading `/` and no `//` (e.g. reject `//evil.com`-style paths) and allow only relative paths.

---

## Low Priority / Recommendations

### 1. dangerouslySetInnerHTML for JSON-LD

- **Description:** Several pages use `dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}` for JSON-LD. Content is app-generated (no raw user input); risk is low as long as schema objects never include unsanitized user content.
- **Recommendation:** Keep JSON-LD to structured, app-controlled data only; do not inject user-provided strings into these schema objects.

### 2. Admin client usage

- **Verified:** `supabaseAdmin` is used only in server-side code: `lib/actions/admin-claims.ts` (server actions) and scripts under `scripts/`. Admin page `app/admin/claims/page.tsx` only calls server actions; service role key never sent to client. No change required.

### 3. Environment and secrets

- **Verified:** `.env*.local` and `.env` are in `.gitignore`. `ADMIN_EMAILS` and Supabase keys documented as env-only. No secrets found in committed code after removing hardcoded fallbacks.

### 4. Authentication and authorization

- **Verified:** Admin routes protected in middleware (`lib/supabase/middleware.ts`) via `ADMIN_EMAILS`; server actions in `admin-claims.ts` re-check `getCurrentUser()` and `isAdminEmail()`. Auth callback uses same-origin redirect (path only).

### 5. RLS coverage

- **Verified:** `gym_claim_requests` has RLS and scoped policies (insert/select by `auth.uid()`). Other tables (e.g. `gyms`, `reviews`) should be reviewed so all tables with sensitive or user-writable data have RLS enabled and least-permissive policies.

---

## Checklist (from audit subagent)

| Area                | Status | Notes |
|---------------------|--------|--------|
| No API keys in client code | OK | After removing hardcoded anon key |
| Service role server-side only | OK | admin-client only in server/scripts |
| .env.local in .gitignore | OK | Present |
| Admin routes protected | OK | Middleware + action checks |
| Auth callback redirect | OK | Same-origin path; can harden |
| RLS on sensitive tables | Review | reviews INSERT policy; other tables |
| Input validation (forms/API) | Review | Add validation where user input is stored |
| npm audit | Action | Run `npm audit fix` and upgrade next/glob |

---

## Tools used

- Supabase security advisors (MCP `get_advisors` type `security`)
- Grep for secrets, admin usage, `dangerouslySetInnerHTML`
- Review of RLS in `supabase/migrations`
- `npm audit`
- Manual review of middleware, auth callback, admin-claims actions

---

## Remaining Security Advisor warnings (optional)

After applying the migration and re-running the Security Advisor, two warnings may still appear. Both are optional to fix and do not block deployment:

| Advisor ID | Title | What to do |
|------------|--------|------------|
| **extension_in_public** | Extension in Public | Extension `pg_trgm` is in the `public` schema. [Remediation](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public): move to another schema (e.g. `extensions`) if you want to clear the warning; safe to leave as-is. |
| **auth_leaked_password_protection** | Leaked Password Protection Disabled | Supabase Auth can check passwords against HaveIBeenPwned. [Remediation](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection): enable in Dashboard under **Authentication** → **Policies** / **Settings**. Requires Supabase Pro in some plans; optional for cost-sensitive projects. |

---

## Next steps

**Done in code/repo:**

- `npm audit fix` run (glob etc. updated).
- Auth callback: redirect strictly validated (relative path only, no `//`, no `\`).
- Migration `supabase/migrations/010_security_advisor_fixes.sql` (RLS reviews + function `search_path`); also `011_reviews_rls_no_always_true.sql` for advisor-friendly policy.

**You do in Supabase Dashboard / locally:**

1. Apply migrations (Supabase CLI `db push` or SQL Editor) → see **docs/SECURITY_AUDIT_STEP_BY_STEP.md**.
2. Optionally enable leaked password protection in Supabase (Authentication); see “Remaining Security Advisor warnings” above.
3. Re-run the Security Advisor and review results.

Full step-by-step guide: **docs/SECURITY_AUDIT_STEP_BY_STEP.md**.
