-- Update Piero Judo Academy Limassol Opening Hours
-- This migration updates opening hours for Piero Judo Academy Limassol
-- 
-- Opening Hours:
-- Monday: 14:30-21:00
-- Tuesday: 15:15-20:00
-- Wednesday: 14:30-21:00
-- Thursday: 15:15-20:00
-- Friday: 14:30-21:00
-- Saturday: Closed
-- Sunday: Closed

BEGIN;

-- Update opening hours for Piero Judo Academy
DO $$
DECLARE
  v_gym_id UUID;
  v_updated BOOLEAN := FALSE;
BEGIN
  -- Try to find by slug first
  SELECT id INTO v_gym_id
  FROM gyms
  WHERE slug = 'piero-judo-academy-limassol';

  -- If not found, try name search
  IF v_gym_id IS NULL THEN
    SELECT id INTO v_gym_id
    FROM gyms
    WHERE name ILIKE '%piero%judo%academy%'
    LIMIT 1;
  END IF;

  IF v_gym_id IS NULL THEN
    RAISE NOTICE 'Gym "Piero Judo Academy" not found. Please check the gym name or slug in the database.';
    RAISE NOTICE 'Available gyms with "judo" or "piero" in name:';
    FOR v_gym_id IN 
      SELECT id FROM gyms WHERE name ILIKE '%judo%' OR name ILIKE '%piero%'
    LOOP
      RAISE NOTICE '  - %', (SELECT name FROM gyms WHERE id = v_gym_id);
    END LOOP;
  ELSE
    -- Update opening hours
    UPDATE gyms
    SET opening_hours = '{
      "monday": "14:30-21:00",
      "tuesday": "15:15-20:00",
      "wednesday": "14:30-21:00",
      "thursday": "15:15-20:00",
      "friday": "14:30-21:00",
      "saturday": "Closed",
      "sunday": "Closed"
    }'::jsonb,
    updated_at = NOW()
    WHERE id = v_gym_id;
    
    v_updated := TRUE;
    RAISE NOTICE 'Successfully updated opening hours for Piero Judo Academy (ID: %)', v_gym_id;
  END IF;
END $$;

COMMIT;

-- Verification query (run after commit to check results):
-- SELECT 
--   name,
--   slug,
--   opening_hours
-- FROM gyms
-- WHERE slug = 'piero-judo-academy-limassol'
--    OR name ILIKE '%piero%judo%academy%';

