-- Update Ryltoday Nicosia
-- This migration:
-- 1. Updates opening hours
-- 2. Adds Personal Training specialty
-- 3. Adds email info@ryltoday.com
-- 
-- Opening Hours:
-- Monday: 07:00–20:00
-- Tuesday: 07:00–20:00
-- Wednesday: 07:00–20:00
-- Thursday: 07:00–20:00
-- Friday: 07:00–18:00
-- Saturday: Closed
-- Sunday: Closed

BEGIN;

DO $$
DECLARE
  v_gym_id UUID;
  v_personal_training_id UUID;
BEGIN
  -- Find the gym by name (case-insensitive, handles variations)
  SELECT id INTO v_gym_id
  FROM gyms
  WHERE name ILIKE '%ryltoday%'
     OR slug LIKE '%ryltoday%'
  LIMIT 1;

  IF v_gym_id IS NULL THEN
    RAISE NOTICE 'Gym "Ryltoday Nicosia" not found. Please check the gym name or slug in the database.';
    RAISE NOTICE 'Available gyms with "ryltoday" in name:';
    FOR v_gym_id IN 
      SELECT id FROM gyms 
      WHERE name ILIKE '%ryltoday%'
    LOOP
      RAISE NOTICE '  - % (slug: %)', 
        (SELECT name FROM gyms WHERE id = v_gym_id),
        (SELECT slug FROM gyms WHERE id = v_gym_id);
    END LOOP;
  ELSE
    -- Step 1: Update opening hours
    UPDATE gyms
    SET opening_hours = '{
      "Monday": "07:00–20:00",
      "Tuesday": "07:00–20:00",
      "Wednesday": "07:00–20:00",
      "Thursday": "07:00–20:00",
      "Friday": "07:00–18:00",
      "Saturday": "Closed",
      "Sunday": "Closed"
    }'::jsonb,
    updated_at = NOW()
    WHERE id = v_gym_id;
    
    RAISE NOTICE 'Successfully updated opening hours for Ryltoday Nicosia (ID: %)', v_gym_id;

    -- Step 2: Find Personal Training specialty ID
    SELECT id INTO v_personal_training_id
    FROM specialties
    WHERE slug = 'personal-training' 
       OR LOWER(name) = 'personal training'
       OR LOWER(name) = 'personal trainer'
       OR slug = 'personal-trainer';

    IF v_personal_training_id IS NULL THEN
      RAISE NOTICE 'Specialty "Personal Training" not found in database. Skipping specialty addition.';
    ELSE
      -- Step 3: Add Personal Training specialty (keep existing specialties)
      INSERT INTO gym_specialties (gym_id, specialty_id)
      VALUES (v_gym_id, v_personal_training_id)
      ON CONFLICT DO NOTHING;
      
      IF FOUND THEN
        RAISE NOTICE 'Successfully added "Personal Training" specialty to Ryltoday Nicosia';
      ELSE
        RAISE NOTICE 'Gym already has "Personal Training" specialty assigned.';
      END IF;
    END IF;

    -- Step 4: Update email
    UPDATE gyms
    SET email = 'info@ryltoday.com',
        updated_at = NOW()
    WHERE id = v_gym_id;
    
    RAISE NOTICE 'Successfully updated email for Ryltoday Nicosia';
  END IF;
END $$;

COMMIT;

-- Verification queries (run after commit to check results):
-- 
-- Check opening hours and email:
-- SELECT 
--   name,
--   slug,
--   opening_hours,
--   email
-- FROM gyms
-- WHERE name ILIKE '%ryltoday%'
--    OR slug LIKE '%ryltoday%';
--
-- Check specialties:
-- SELECT 
--   g.name as gym_name,
--   s.name as specialty_name
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
-- LEFT JOIN specialties s ON gs.specialty_id = s.id
-- WHERE g.name ILIKE '%ryltoday%'
-- ORDER BY s.name;

