-- Update Grind Fitness Limassol Specialties and Amenities
-- This migration updates Grind Fitness to have:
-- Specialties: CrossFit, Personal Trainer
-- Amenities: Group Classes, Parking
-- 
-- Gym slug: grind-fitness-limassol
-- This script finds the gym by slug first, then falls back to name search
-- Uses dynamic UUID lookups for reliability

BEGIN;

-- Step 1: Get specialty UUIDs dynamically (more reliable than hardcoding)
DO $$
DECLARE
  v_gym_id UUID;
  v_crossfit_id UUID;
  v_personal_trainer_id UUID;
  v_group_classes_id UUID;
  v_parking_id UUID;
BEGIN
  -- Find the gym by slug first (more precise), then fall back to name search
  SELECT id INTO v_gym_id
  FROM gyms
  WHERE slug = 'grind-fitness-limassol';

  -- If not found by slug, try name search
  IF v_gym_id IS NULL THEN
    SELECT id INTO v_gym_id
    FROM gyms
    WHERE name ILIKE '%grind%fitness%'
    LIMIT 1;
  END IF;

  IF v_gym_id IS NULL THEN
    RAISE EXCEPTION 'Gym "Grind Fitness" not found. Please check the gym name or slug in the database.';
  END IF;

  -- Get specialty UUIDs by slug (try slug first, then name as fallback)
  SELECT id INTO v_crossfit_id
  FROM specialties
  WHERE slug = 'crossfit' OR LOWER(name) = 'crossfit';

  -- Try slug first, then name variations for Personal Training
  SELECT id INTO v_personal_trainer_id
  FROM specialties
  WHERE slug = 'personal-training' 
     OR LOWER(name) = 'personal training'
     OR LOWER(name) = 'personal trainer'
     OR slug = 'personal-trainer';

  -- Get amenity UUIDs by name (case-insensitive)
  SELECT id INTO v_group_classes_id
  FROM amenities
  WHERE LOWER(name) = 'group classes';

  SELECT id INTO v_parking_id
  FROM amenities
  WHERE LOWER(name) = 'parking';

  -- Verify all UUIDs exist and provide helpful error messages
  IF v_crossfit_id IS NULL THEN
    RAISE EXCEPTION 'Specialty "CrossFit" not found in database. Available specialties: %', 
      (SELECT string_agg(name || ' (' || slug || ')', ', ') FROM specialties);
  END IF;

  IF v_personal_trainer_id IS NULL THEN
    RAISE EXCEPTION 'Specialty "Personal Training" not found in database. Available specialties: %', 
      (SELECT string_agg(name || ' (' || slug || ')', ', ') FROM specialties);
  END IF;

  IF v_group_classes_id IS NULL THEN
    RAISE EXCEPTION 'Amenity "Group Classes" not found in database.';
  END IF;

  IF v_parking_id IS NULL THEN
    RAISE EXCEPTION 'Amenity "Parking" not found in database.';
  END IF;

  -- Step 2: Remove all existing specialties for Grind Fitness
  DELETE FROM gym_specialties
  WHERE gym_id = v_gym_id;

  -- Step 3: Add CrossFit specialty
  INSERT INTO gym_specialties (gym_id, specialty_id)
  VALUES (v_gym_id, v_crossfit_id)
  ON CONFLICT DO NOTHING;

  -- Step 4: Add Personal Trainer specialty
  INSERT INTO gym_specialties (gym_id, specialty_id)
  VALUES (v_gym_id, v_personal_trainer_id)
  ON CONFLICT DO NOTHING;

  -- Step 5: Add Group Classes amenity (keep existing amenities)
  INSERT INTO gym_amenities (gym_id, amenity_id)
  VALUES (v_gym_id, v_group_classes_id)
  ON CONFLICT DO NOTHING;

  -- Step 6: Add Parking amenity (keep existing amenities)
  INSERT INTO gym_amenities (gym_id, amenity_id)
  VALUES (v_gym_id, v_parking_id)
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Successfully updated Grind Fitness (ID: %) with specialties and amenities.', v_gym_id;
END $$;

COMMIT;

-- Verification queries (run after commit to check results):
-- 
-- Check specialties:
-- SELECT 
--   g.name,
--   g.slug,
--   s.name as specialty_name,
--   s.slug as specialty_slug
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
-- LEFT JOIN specialties s ON gs.specialty_id = s.id
-- WHERE g.name ILIKE '%grind%fitness%'
-- ORDER BY s.name;
--
-- Check amenities:
-- SELECT 
--   g.name,
--   g.slug,
--   a.name as amenity_name
-- FROM gyms g
-- LEFT JOIN gym_amenities ga ON g.id = ga.gym_id
-- LEFT JOIN amenities a ON ga.amenity_id = a.id
-- WHERE g.name ILIKE '%grind%fitness%'
-- ORDER BY a.name;

