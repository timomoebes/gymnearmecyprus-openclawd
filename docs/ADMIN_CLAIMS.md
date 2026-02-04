# Admin: Managing gym claim requests

As an admin you can **approve** or **reject** gym claim requests so that approved users become the listed owner of a gym and see it in their dashboard.

## Quick start

1. **Set admin access**  
   In `.env.local` add your admin email(s), then restart the dev server:
   ```bash
   ADMIN_EMAILS=your@email.com
   ```
   Never commit `.env.local` (it is in `.gitignore`).

2. **Sign in**  
   Use an account with an email listed in `ADMIN_EMAILS`.

3. **Open the admin page**  
   Go to **[/admin/claims](http://localhost:3000/admin/claims)** (or your deployed URL + `/admin/claims`).  
   You’ll see a table of **pending** claims (gym name, claimant email, date).

4. **Approve or reject**
   - **Approve** – Sets the gym’s owner to that user. The claim disappears from the list and the user sees the gym in their Dashboard.
   - **Reject** – Marks the claim as rejected. The request disappears from the list; the gym is not assigned to anyone.

Only **pending** claims are shown. Approved and rejected claims are no longer listed on this page.

## Full reference

For Supabase-only approval (SQL, Table Editor) and more detail, see:

- **[docs/APPROVE_CLAIM_SUPABASE.md](APPROVE_CLAIM_SUPABASE.md)** – In-app admin steps, Supabase Table Editor, and SQL scripts to approve (or reject) claims manually.

## Security

- `/admin/*` is protected by middleware: only authenticated users whose email is in `ADMIN_EMAILS` can access it.
- Server actions that approve or reject claims also check `ADMIN_EMAILS`.
- Keep `ADMIN_EMAILS` only in `.env.local` (or your deployment env) and do not commit it.
