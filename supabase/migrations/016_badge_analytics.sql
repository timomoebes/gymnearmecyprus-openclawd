-- Badge click analytics for owner dashboard and admin. Inserts only via server route (supabaseAdmin); no anon insert.

CREATE TABLE IF NOT EXISTS badge_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  click_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  source_device TEXT,
  referrer TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE badge_analytics IS 'Badge click events; written only by server redirect API; owner/admin read via RLS.';

CREATE INDEX IF NOT EXISTS idx_badge_analytics_gym_click
  ON badge_analytics (gym_id, click_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_badge_analytics_gym_medium_click
  ON badge_analytics (gym_id, utm_medium, click_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_badge_analytics_owner_click
  ON badge_analytics (owner_id, click_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_badge_analytics_medium_click
  ON badge_analytics (utm_medium, click_timestamp DESC);

ALTER TABLE badge_analytics ENABLE ROW LEVEL SECURITY;

-- No policy that allows anon or client INSERT (server uses service role to insert).
-- Owner can read only their own gyms' rows.
CREATE POLICY "Owners can read own badge analytics"
  ON badge_analytics
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

-- No public select.
-- Admin read is done via service role in server actions, or add a separate policy with admin check if using auth.uid() for admin.
