-- Approve a pending gym claim by gym slug and claimant email.
-- Run in Supabase Dashboard → SQL Editor.
-- Replace the slug and email below with the gym and user you want to approve.

DO $$
DECLARE
  v_gym_slug TEXT := 'your-gym-slug';
  v_user_email TEXT := 'claimant@example.com';
  v_gym_id UUID;
  v_user_id UUID;
BEGIN
  SELECT id INTO v_gym_id FROM gyms WHERE slug = v_gym_slug LIMIT 1;
  SELECT id INTO v_user_id FROM auth.users WHERE email = v_user_email LIMIT 1;

  IF v_gym_id IS NULL THEN
    RAISE EXCEPTION 'Gym not found for slug: %', v_gym_slug;
  END IF;
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found for email: %', v_user_email;
  END IF;

  UPDATE gyms SET owner_id = v_user_id WHERE id = v_gym_id;
  UPDATE gym_claim_requests
  SET status = 'approved', reviewed_at = now()
  WHERE gym_id = v_gym_id AND user_id = v_user_id AND status = 'pending';

  RAISE NOTICE 'Approved claim: gym % is now owned by %', v_gym_slug, v_user_email;
END $$;
