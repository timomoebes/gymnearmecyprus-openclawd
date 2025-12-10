-- Update Limassol Fitness Opening Hours and Remove Personal Training Amenity
-- This migration:
-- 1. Updates opening hours for Limassol Fitness
-- 2. Removes "Personal Training" amenity from this gym
-- 
-- Opening Hours:
-- Monday: 07:00-19:00
-- Tuesday: 07:00-19:00
-- Wednesday: 07:00-19:00
-- Thursday: 07:00-19:00
-- Friday: 07:00-18:00
-- Saturday: Closed
-- Sunday: Closed

BEGIN;

DO $$
DECLARE
  v_gym_id UUID;
  v_personal_training_amenity_id UUID;
BEGIN
  -- Find the gym by name (case-insensitive, handles variations)
  SELECT id INTO v_gym_id
  FROM gyms
  WHERE name ILIKE '%limassol%fitness%'
     OR slug LIKE '%limassol%fitness%'
  LIMIT 1;

  IF v_gym_id IS NULL THEN
    RAISE NOTICE 'Gym "Limassol Fitness" not found. Please check the gym name or slug in the database.';
    RAISE NOTICE 'Available gyms with "limassol" and "fitness" in name:';
    FOR v_gym_id IN 
      SELECT id FROM gyms 
      WHERE name ILIKE '%limassol%' AND name ILIKE '%fitness%'
    LOOP
      RAISE NOTICE '  - % (slug: %)', 
        (SELECT name FROM gyms WHERE id = v_gym_id),
        (SELECT slug FROM gyms WHERE id = v_gym_id);
    END LOOP;
  ELSE
    -- Step 1: Update opening hours
    UPDATE gyms
    SET opening_hours = '{
      "monday": "07:00-19:00",
      "tuesday": "07:00-19:00",
      "wednesday": "07:00-19:00",
      "thursday": "07:00-19:00",
      "friday": "07:00-18:00",
      "saturday": "Closed",
      "sunday": "Closed"
    }'::jsonb,
    updated_at = NOW()
    WHERE id = v_gym_id;
    
    RAISE NOTICE 'Successfully updated opening hours for Limassol Fitness (ID: %)', v_gym_id;

    -- Step 2: Find Personal Training amenity ID
    SELECT id INTO v_personal_training_amenity_id
    FROM amenities
    WHERE LOWER(name) = 'personal training'
       OR LOWER(name) = 'personal trainers';

    IF v_personal_training_amenity_id IS NULL THEN
      RAISE NOTICE 'Amenity "Personal Training" not found in database. Skipping amenity removal.';
    ELSE
      -- Step 3: Remove Personal Training amenity from this gym
      DELETE FROM gym_amenities
      WHERE gym_id = v_gym_id
        AND amenity_id = v_personal_training_amenity_id;
      
      IF FOUND THEN
        RAISE NOTICE 'Successfully removed "Personal Training" amenity from Limassol Fitness';
      ELSE
        RAISE NOTICE 'Gym does not have "Personal Training" amenity assigned. Nothing to remove.';
      END IF;
    END IF;
  END IF;
END $$;

COMMIT;

-- Verification queries (run after commit to check results):
-- 
-- Check opening hours:
-- SELECT 
--   name,
--   slug,
--   opening_hours
-- FROM gyms
-- WHERE name ILIKE '%limassol%fitness%'
--    OR slug LIKE '%limassol%fitness%';
--
-- Check amenities (should not include Personal Training):
-- SELECT 
--   g.name as gym_name,
--   a.name as amenity_name
-- FROM gyms g
-- LEFT JOIN gym_amenities ga ON g.id = ga.gym_id
-- LEFT JOIN amenities a ON ga.amenity_id = a.id
-- WHERE g.name ILIKE '%limassol%fitness%'
-- ORDER BY a.name;

