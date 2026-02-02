# Supabase clients

- **client.ts** – Anon client for server-side data only (e.g. `lib/api/gyms`). No auth.
- **server.ts** – Server client (cookies). Use in Server Components and Server Actions for auth: `getCurrentUserId()`, or `createClient()` for authenticated DB access.
- **browser.ts** – Browser client (cookies). Use in Client Components for sign-in/sign-up only (e.g. login, signup forms).

Middleware refreshes the session; use `serverExternalPackages` in next.config so these packages are not bundled into vendor chunks.
