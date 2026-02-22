-- Migration: Vibe tags for gyms (editorial subjective tags)
-- Date: 2026-02-20
-- Adds vibe_tags table and gym_vibe_tags junction for "community vibe", "beginner-friendly", etc.

-- Vibe tags taxonomy (editorial; assign via admin or SQL)
CREATE TABLE IF NOT EXISTS vibe_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

COMMENT ON TABLE vibe_tags IS 'Editorial vibe tags for gyms (e.g. community vibe, beginner-friendly). Single source of truth for display and filtering.';

-- Junction: which gyms have which vibe tags
CREATE TABLE IF NOT EXISTS gym_vibe_tags (
  gym_id UUID NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
  vibe_tag_id UUID NOT NULL REFERENCES vibe_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (gym_id, vibe_tag_id)
);

CREATE INDEX IF NOT EXISTS idx_gym_vibe_tags_gym_id ON gym_vibe_tags(gym_id);
CREATE INDEX IF NOT EXISTS idx_gym_vibe_tags_vibe_tag_id ON gym_vibe_tags(vibe_tag_id);

COMMENT ON TABLE gym_vibe_tags IS 'Many-to-many: gyms can have multiple vibe tags (editorial assignment).';

-- Seed default vibe tags (no gym assignments yet; assign via admin or later migration)
INSERT INTO vibe_tags (slug, name, sort_order) VALUES
  ('community-vibe', 'Community vibe', 1),
  ('serious-lifters', 'Serious lifters', 2),
  ('beginner-friendly', 'Beginner-friendly', 3),
  ('boutique', 'Boutique', 4),
  ('no-frills', 'No-frills', 5),
  ('24-7-grind', '24/7 grind', 6),
  ('family-friendly', 'Family-friendly', 7),
  ('women-friendly', 'Women-friendly', 8)
ON CONFLICT (slug) DO NOTHING;

-- RLS: public read for vibe_tags and gym_vibe_tags (no auth required to read)
ALTER TABLE vibe_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_vibe_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vibe tags are readable by everyone"
  ON vibe_tags FOR SELECT TO public USING (true);

CREATE POLICY "Gym vibe tags are readable by everyone"
  ON gym_vibe_tags FOR SELECT TO public USING (true);

-- Optional: allow gym owners to update their gym's vibe tags later (can add UPDATE policy when needed)

-- Seed a few gyms with vibe tags so the feature is visible (optional; remove or expand as needed)
INSERT INTO gym_vibe_tags (gym_id, vibe_tag_id)
SELECT g.id, vt.id FROM gyms g, vibe_tags vt
WHERE g.slug = 'raw-calisthenics-academy' AND vt.slug IN ('community-vibe', '24-7-grind')
ON CONFLICT DO NOTHING;

INSERT INTO gym_vibe_tags (gym_id, vibe_tag_id)
SELECT g.id, vt.id FROM gyms g, vibe_tags vt
WHERE g.slug = 'soul-vibe-space' AND vt.slug IN ('community-vibe', 'beginner-friendly', 'boutique')
ON CONFLICT DO NOTHING;

INSERT INTO gym_vibe_tags (gym_id, vibe_tag_id)
SELECT g.id, vt.id FROM gyms g, vibe_tags vt
WHERE g.slug = 'piero-judo-academy' AND vt.slug IN ('serious-lifters', 'community-vibe')
ON CONFLICT DO NOTHING;
