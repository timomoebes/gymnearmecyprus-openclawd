-- Migration: Gym ownership and claim requests (PROJECT.md §7.1.1)
-- Date: 2026-01-29
-- Adds owner_id to gyms (auth user who owns the listing) and gym_claim_requests for admin-approved claims.

-- Allow gyms to reference the owning user (auth.users.id)
ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

COMMENT ON COLUMN gyms.owner_id IS 'Auth user id of the gym owner (set when claim is approved)';

-- Claim requests: owner submits, admin approves then sets gyms.owner_id
CREATE TABLE IF NOT EXISTS gym_claim_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  UNIQUE(gym_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_gym_claim_requests_gym_id ON gym_claim_requests(gym_id);
CREATE INDEX IF NOT EXISTS idx_gym_claim_requests_user_id ON gym_claim_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_gym_claim_requests_status ON gym_claim_requests(status);

COMMENT ON TABLE gym_claim_requests IS 'Owner claim requests; admin approves then sets gyms.owner_id';

-- RLS: authenticated users can insert their own claim request
ALTER TABLE gym_claim_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own claim request"
  ON gym_claim_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own claim requests"
  ON gym_claim_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
