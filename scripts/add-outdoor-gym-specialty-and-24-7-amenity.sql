-- Migration: Add "Outdoor gym" specialty and "24/7" amenity
-- Date: 2026-02-18
-- This migration:
-- 1. Creates "Outdoor gym" specialty
-- 2. Creates "24/7" amenity
-- 3. Updates three outdoor gym facilities:
--    - Calisthenics Area Nicosia
--    - Municipality Gym Paphos
--    - Outdoor Calisthenics Workout Spot Larnaca
-- 4. Removes "fitness-gym" specialty from these facilities
-- 5. Adds "outdoor-gym" specialty to these facilities
-- 6. Adds "24/7" amenity to these facilities

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

-- Step 2: Create "24/7" amenity
INSERT INTO amenities (name, slug, icon)
VALUES
  (
    '24/7',
    '24-7',
    'clock'
  )
ON CONFLICT (slug) DO NOTHING;

-- Step 3: Get UUIDs for later use
-- We'll use subqueries to get the IDs dynamically

-- Step 4: Remove "fitness-gym" specialty from the three outdoor gyms
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

-- Step 5: Add "outdoor-gym" specialty to the three outdoor gyms
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

-- Step 6: Add "24/7" amenity to the three outdoor gyms
INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT g.id, a.id
FROM gyms g
CROSS JOIN amenities a
WHERE g.slug IN (
  'calisthenics-area-nicosia',
  'municipality-gym-paphos',
  'outdoor-calisthenics-workout-spot-larnaca'
)
AND a.slug = '24-7'
AND NOT EXISTS (
  SELECT 1 FROM gym_amenities ga
  WHERE ga.gym_id = g.id AND ga.amenity_id = a.id
);

COMMIT;

-- Verification queries (run after commit to check results):
-- 
-- Check specialty was created:
-- SELECT id, name, slug FROM specialties WHERE slug = 'outdoor-gym';
--
-- Check amenity was created:
-- SELECT id, name, slug FROM amenities WHERE slug = '24-7';
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
