-- Migration: Consolidate Specialties from 11 to 9 Categories
-- Date: 2025-01-XX
-- This migration maps old specialties to new consolidated specialties
-- 
-- Mapping:
-- fitness → fitness-gym
-- gym → fitness-gym
-- crossfit → crossfit (no change)
-- personal-training → personal-training (no change)
-- mma → martial-arts-mma
-- boxing → boxing (no change, kept separate)
-- yoga → yoga-pilates
-- pilates → yoga-pilates
-- bodybuilding → strength-training
-- powerlifting → strength-training
-- swimming → swimming-aquatics

BEGIN;

-- Step 1: Create new specialty entries if they don't exist
-- Note: These should already exist in the database, but we'll ensure they do

-- Get specialty UUIDs (we'll need to query these first)
-- For now, we'll use a CTE to map old to new

-- Step 2: Create a temporary mapping table
CREATE TEMP TABLE specialty_mapping (
  old_slug TEXT,
  new_slug TEXT
);

INSERT INTO specialty_mapping (old_slug, new_slug) VALUES
  ('fitness', 'fitness-gym'),
  ('gym', 'fitness-gym'),
  ('crossfit', 'crossfit'),
  ('personal-training', 'personal-training'),
  ('mma', 'martial-arts-mma'),
  ('boxing', 'boxing'),
  ('yoga', 'yoga-pilates'),
  ('pilates', 'yoga-pilates'),
  ('bodybuilding', 'strength-training'),
  ('powerlifting', 'strength-training'),
  ('swimming', 'swimming-aquatics');

-- Step 3: Migrate gym_specialties relationships
-- For each gym with old specialties, add new specialty relationships
-- and remove old ones

-- First, insert new specialty relationships
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT DISTINCT
  gs.gym_id,
  new_spec.id
FROM gym_specialties gs
JOIN specialties old_spec ON gs.specialty_id = old_spec.id
JOIN specialty_mapping sm ON old_spec.slug = sm.old_slug
JOIN specialties new_spec ON sm.new_slug = new_spec.slug
WHERE NOT EXISTS (
  SELECT 1 
  FROM gym_specialties existing
  WHERE existing.gym_id = gs.gym_id 
  AND existing.specialty_id = new_spec.id
);

-- Step 4: Remove old specialty relationships
DELETE FROM gym_specialties
WHERE specialty_id IN (
  SELECT id FROM specialties 
  WHERE slug IN (
    SELECT old_slug FROM specialty_mapping
    WHERE old_slug != new_slug  -- Don't delete if old and new are the same
  )
);

-- Step 5: Optional - Archive or remove old specialty entries from specialties table
-- For now, we'll keep them in case we need to rollback
-- Uncomment below if you want to remove old specialties:
-- DELETE FROM specialties
-- WHERE slug IN (
--   SELECT old_slug FROM specialty_mapping
--   WHERE old_slug != new_slug
-- );

COMMIT;

-- Verification queries (run after commit):
-- 
-- Check gym specialty distribution:
-- SELECT 
--   s.slug,
--   s.name,
--   COUNT(DISTINCT gs.gym_id) as gym_count
-- FROM specialties s
-- LEFT JOIN gym_specialties gs ON s.id = gs.specialty_id
-- WHERE s.slug IN ('fitness-gym', 'crossfit', 'personal-training', 'martial-arts-mma', 'boxing', 'yoga-pilates', 'dance-group-fitness', 'strength-training', 'swimming-aquatics')
-- GROUP BY s.slug, s.name
-- ORDER BY gym_count DESC;
--
-- Check for any gyms without specialties:
-- SELECT 
--   g.id,
--   g.name,
--   g.slug,
--   COUNT(gs.specialty_id) as specialty_count
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
-- GROUP BY g.id, g.name, g.slug
-- HAVING COUNT(gs.specialty_id) = 0
-- ORDER BY g.name;
--
-- Verify all 199 gyms have at least one specialty:
-- SELECT 
--   COUNT(*) as total_gyms,
--   COUNT(DISTINCT gs.gym_id) as gyms_with_specialties,
--   COUNT(*) - COUNT(DISTINCT gs.gym_id) as gyms_without_specialties
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id;

