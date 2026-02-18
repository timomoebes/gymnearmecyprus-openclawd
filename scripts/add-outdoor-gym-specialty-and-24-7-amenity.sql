-- Migration: Add "Outdoor gym" specialty
-- Date: 2026-02-18
-- This migration:
-- 1. Creates "Outdoor gym" specialty
-- 3. Updates three outdoor gym facilities:
--    - Calisthenics Area Nicosia
--    - Municipality Gym Paphos
--    - Outdoor Calisthenics Workout Spot Larnaca
-- 4. Removes "fitness-gym" specialty from these facilities
-- 5. Adds "outdoor-gym" specialty to these facilities
-- 6. (Deprecated) Previously added a separate "24/7" amenity; this is now handled by the existing "24/7 Access" amenity and is no longer part of this migration.

BEGIN;

-- Step 1: Create "Outdoor gym" specialty
INSERT INTO specialties (name, slug, description, icon)
VALUES
  (
    'Outdoor Gym',
    'outdoor-gym',
    'Outdoor fitness facilities and calisthenics parks offering free or public access to exercise equipment. Perfect for bodyweight training, calisthenics, and outdoor workouts.',
    'activity'
  )
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Get UUIDs for later use
-- We'll use subqueries to get the IDs dynamically

-- Step 3: Remove "fitness-gym" specialty from the three outdoor gyms
DELETE FROM gym_specialties
WHERE gym_id IN (
  SELECT id FROM gyms 
  WHERE slug IN (
    'calisthenics-area-nicosia',
    'municipality-gym-paphos',
    'outdoor-calisthenics-workout-spot-larnaca'
  )
)
AND specialty_id = (
  SELECT id FROM specialties WHERE slug = 'fitness-gym'
);

-- Step 4: Add "outdoor-gym" specialty to the three outdoor gyms
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, s.id
FROM gyms g
CROSS JOIN specialties s
WHERE g.slug IN (
  'calisthenics-area-nicosia',
  'municipality-gym-paphos',
  'outdoor-calisthenics-workout-spot-larnaca'
)
AND s.slug = 'outdoor-gym'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = s.id
);

COMMIT;

-- Verification queries (run after commit to check results):
-- 
-- Check specialty was created:
-- SELECT id, name, slug FROM specialties WHERE slug = 'outdoor-gym';
--
-- Check gym specialties:
-- SELECT 
--   g.name,
--   g.slug,
--   s.name as specialty_name,
--   s.slug as specialty_slug
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
-- LEFT JOIN specialties s ON gs.specialty_id = s.id
-- WHERE g.slug IN (
--   'calisthenics-area-nicosia',
--   'municipality-gym-paphos',
--   'outdoor-calisthenics-workout-spot-larnaca'
-- )
-- ORDER BY g.name, s.name;
--
-- Check gym amenities:
-- SELECT 
--   g.name,
--   g.slug,
--   a.name as amenity_name,
--   a.slug as amenity_slug
-- FROM gyms g
-- LEFT JOIN gym_amenities ga ON g.id = ga.gym_id
-- LEFT JOIN amenities a ON ga.amenity_id = a.id
-- WHERE g.slug IN (
--   'calisthenics-area-nicosia',
--   'municipality-gym-paphos',
--   'outdoor-calisthenics-workout-spot-larnaca'
-- )
-- ORDER BY g.name, a.name;
