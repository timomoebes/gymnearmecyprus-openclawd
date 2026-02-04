# How to verify and approve a gym claim

For a short admin overview (in-app approve/reject, no SQL), see **[docs/ADMIN_CLAIMS.md](ADMIN_CLAIMS.md)**.

When a user submits a "Claim this gym" request, a row is created in **`gym_claim_requests`** with `status = 'pending'`. To make that user the **owner** of the gym in the directory (so they see it in their dashboard and can manage it), you approve the claim and set the gym’s `owner_id`.

## Option 1: In-app admin (recommended)

1. **Set admin emails** in `.env.local`:
   ```bash
   ADMIN_EMAILS=your@email.com,other@email.com
   ```
   Only these emails can open the admin page. **Restart the dev server** after changing `.env.local` so the variable is loaded.

2. **Open the admin page** (while signed in as one of those users):
   ```
   http://localhost:3000/admin/claims
   ```
   You’ll see a list of pending claims with gym name, claimant email, and date.

3. **Click "Approve"** on a row to make that user the owner of the gym. They will then see the gym in their Dashboard.

If you’re not in `ADMIN_EMAILS`, visiting `/admin/claims` redirects you to the home page.

---

## Option 2: Supabase Dashboard (manual)

### 1. See who has requested to claim a gym

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **Table Editor**.
3. Open the **`gym_claim_requests`** table.

You’ll see columns such as:

- **id** – claim request id  
- **gym_id** – which gym (UUID from `gyms.id`)  
- **user_id** – who claimed (UUID from `auth.users.id`)  
- **status** – `pending` | `approved` | `rejected`  
- **created_at** / **reviewed_at**

Filter or sort by `status = pending` to see unapproved claims.

To see the claimant’s **email**, use **Authentication → Users** and match the **user_id** from `gym_claim_requests` to the user’s **UID**.

### 2. Approve a claim (make the user the gym owner)

After you’ve verified the person (e.g. by email or other process), do both of the following.

### Option A: SQL in Supabase (recommended)

1. Go to **SQL Editor** in the Supabase Dashboard.
2. Run the following, replacing the placeholders with the **exact** values for the claim you want to approve:

```sql
-- Replace these with the actual gym_id and user_id from gym_claim_requests
DO $$
DECLARE
  v_gym_id UUID := 'YOUR_GYM_ID_HERE';
  v_user_id UUID := 'YOUR_USER_ID_HERE';
BEGIN
  UPDATE gyms SET owner_id = v_user_id WHERE id = v_gym_id;
  UPDATE gym_claim_requests
  SET status = 'approved', reviewed_at = now()
  WHERE gym_id = v_gym_id AND user_id = v_user_id;
END $$;
```

You can get `gym_id` and `user_id` from the **`gym_claim_requests`** row (and optionally from **Authentication → Users** for the user’s email).

### Option B: Approve by gym slug and user email (SQL)

If you prefer to identify the gym by **slug** and the user by **email**, use this in the SQL Editor (replace the slug and email):

```sql
-- Approve pending claim for gym slug and user email
DO $$
DECLARE
  v_gym_id UUID;
  v_user_id UUID;
BEGIN
  SELECT id INTO v_gym_id FROM gyms WHERE slug = 'your-gym-slug' LIMIT 1;
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'claimant@example.com' LIMIT 1;

  IF v_gym_id IS NULL THEN
    RAISE EXCEPTION 'Gym not found for slug';
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found for email';
  END IF;

  UPDATE gyms SET owner_id = v_user_id WHERE id = v_gym_id;
  UPDATE gym_claim_requests
  SET status = 'approved', reviewed_at = now()
  WHERE gym_id = v_gym_id AND user_id = v_user_id AND status = 'pending';
END $$;
```

Change `your-gym-slug` and `claimant@example.com` to the gym slug and claimant email you want to approve.

A ready-to-edit copy of this script lives in the repo: **`scripts/approve_claim_by_slug_and_email.sql`**. Open it, set `v_gym_slug` and `v_user_email`, then run it in Supabase → SQL Editor.

### 3. Confirm it worked

- **Table Editor → gyms**: Find the gym and check that **owner_id** is set to the user’s UUID.
- **Table Editor → gym_claim_requests**: The row should have **status** = `approved` and **reviewed_at** set.
- In the app: that user, when logged in, should see the gym under **Dashboard** (“My gyms” / listing).

### Summary (Supabase-only)

| Step | Where | What |
|------|--------|------|
| See pending claims | Table Editor → `gym_claim_requests` | Filter by `status = 'pending'` |
| Match user | Authentication → Users | Match `user_id` to UID to see email |
| Approve | SQL Editor | Set `gyms.owner_id` and `gym_claim_requests.status = 'approved'` |
| Verify | Table Editor → `gyms` | Confirm `owner_id` is set; user sees gym in Dashboard |
