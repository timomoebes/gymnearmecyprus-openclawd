-- Remove duplicate Piero Judo Academy entry
-- This script removes the old entry with slug 'piero-judo-academy'
-- and keeps the correct one with slug 'piero-judo-academy-limassol'
--
-- IMPORTANT: Run scripts/check_duplicate_piero_judo.sql first to verify which entry to keep!

BEGIN;

-- Step 1: Check which entry has the correct data (run this first to verify)
-- SELECT 
--   id,
--   name,
--   slug,
--   city_id,
--   (SELECT name FROM cities WHERE id = gyms.city_id) as city_name,
--   opening_hours,
--   created_at,
--   updated_at
-- FROM gyms
-- WHERE slug IN ('piero-judo-academy', 'piero-judo-academy-limassol')
-- ORDER BY slug;

-- Step 2: Delete the old entry (piero-judo-academy)
-- This will also cascade delete related records (gym_specialties, gym_amenities, etc.)
DELETE FROM gyms
WHERE slug = 'piero-judo-academy';

-- Step 3: Verify deletion (run after commit)
-- SELECT 
--   id,
--   name,
--   slug
-- FROM gyms
-- WHERE slug LIKE '%piero%' OR slug LIKE '%judo%';

COMMIT;

-- Alternative: If you want to merge data from old to new before deleting:
-- 1. Copy any missing data from old entry to new entry
-- 2. Then delete the old entry
-- 
-- Example (if old entry has data that new one doesn't):
-- UPDATE gyms
-- SET 
--   description = COALESCE(
--     (SELECT description FROM gyms WHERE slug = 'piero-judo-academy'),
--     description
--   ),
--   phone = COALESCE(
--     (SELECT phone FROM gyms WHERE slug = 'piero-judo-academy'),
--     phone
--   ),
--   email = COALESCE(
--     (SELECT email FROM gyms WHERE slug = 'piero-judo-academy'),
--     email
--   )
-- WHERE slug = 'piero-judo-academy-limassol';

