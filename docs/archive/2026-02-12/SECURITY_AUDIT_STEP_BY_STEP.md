# Security audit: step-by-step guide

This guide walks through **every** item from the security audit. What is already done is listed first; what you need to do yourself is numbered and described in detail.

---

## What was already done (automated)

- **Hardcoded Supabase keys removed** (fixed earlier)
- **npm audit fix** run → `glob` and other packages updated
- **Auth callback hardened** → redirect only to real relative paths (no `//`, no `\`)
- **Migration created** → `supabase/migrations/010_security_advisor_fixes.sql`  
Contains: RLS for `reviews` (only authenticated users can insert) + `search_path` for the two functions.

---

## Step 1: Apply the migration (Supabase)

The migration must run against your Supabase database.

### Option A – Supabase CLI (if you use it)

In the project folder in the terminal:

```bash
npx supabase db push
```

If you are not logged in:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

Find `YOUR_PROJECT_REF` in the Supabase URL:  
`https://supabase.com/dashboard/project/YOUR_PROJECT_REF`

### Option B – Supabase Dashboard (SQL Editor)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Left sidebar: **SQL Editor**.
3. **New query**.
4. Open the file
  `supabase/migrations/010_security_advisor_fixes.sql`  
   in your editor, copy the **entire contents** and paste into the SQL Editor.
5. **Run** (or Ctrl+Enter).

If a statement fails (e.g. “policy does not exist” or “function does not exist”), that can happen depending on the project. You can comment out the failing line and run the rest again. The important parts are:

- Drop the old policy `"Anyone can insert reviews"` and create the new policy for `authenticated`.
- `ALTER FUNCTION public.update_updated_at_column() SET search_path = public;`
- The DO block for `get_gym_average_rating` (sets `search_path` for that function).

---

## Step 2: Enable leaked password protection (Supabase Dashboard)

Supabase can check passwords against the HaveIBeenPwned database. You should enable this.

1. [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Left sidebar: **Authentication**.
3. Top: **Policies** or **Settings** (depending on UI).
4. Look for **Password** / **Leaked password protection** / **HaveIBeenPwned**.
5. Enable **Enable leaked password protection** and save.

If you cannot find the option: under **Authentication** → **Providers** → **Email** look for password options, or see the docs:  
[Password strength and leaked password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

---

## Step 3: Re-run the Security Advisor

After applying the migration and any dashboard changes:

1. In Supabase Dashboard: **Database** → **Security Advisor** (or **Advisors**).
2. Run the advisor again (e.g. **Run** / **Refresh**).
3. Check:
  - “RLS Policy Always True” for `reviews` should be gone.
  - “Function Search Path Mutable” for the two functions should be gone.
  - “Leaked Password Protection Disabled” should be gone once you completed Step 2.

**Remaining warnings (optional):** The advisor may still show:
- **Extension in Public** – `pg_trgm` in `public` schema. [Remediation](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public). Safe to leave as-is.
- **Leaked Password Protection Disabled** – Enable in Dashboard under Authentication if desired; may require Pro. [Remediation](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

---

## Step 4 (optional): Move extension pg_trgm out of public

The advisor reports that extension `pg_trgm` is in the `public` schema. Optionally you can move it to another schema (e.g. `extensions`). This is more involved and not required for security.

- Docs: [Extension in public](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public)  
- In short: create a new schema, install the extension there and adjust any existing usage. Only do this if you are comfortable with Postgres schemas; otherwise skip.

---

## Step 5 (optional): Upgrade Next.js to 16

`npm audit` still reports a high-severity issue in Next.js. The proper fix is to upgrade to Next.js 16:

```bash
npm install next@latest
```

This may introduce breaking changes (e.g. config, APIs). If you want to stay on the current version, you can schedule the upgrade for later. The other items (RLS, functions, leaked password, auth callback) are already addressed.

---

## Checklist

After you have applied migrations 010 and 011 (see Steps 1–2 above) and re-run the Security Advisor, the only remaining advisor warnings are the two below. Both are optional to fix.

| Step                                                                 | Done? |
| -------------------------------------------------------------------- | ----- |
| (Optional) Enable leaked password protection in Supabase Dashboard  | ☐     |
| (Optional) Move pg_trgm to another schema                           | ☐     |
| (Optional) Next.js 16 upgrade                                        | ☐     |

If you get stuck on a step (e.g. different error message or different dashboard layout), note the exact message or menu path so the step can be adapted.