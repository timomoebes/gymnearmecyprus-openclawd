-- Check for duplicate Piero Judo Academy entries
-- This will help identify which gym entry to keep and which to remove/redirect

-- Find all gyms with "piero" or "judo" in the name or slug
SELECT 
  id,
  name,
  slug,
  city_id,
  created_at,
  updated_at
FROM gyms
WHERE name ILIKE '%piero%' 
   OR name ILIKE '%judo%'
   OR slug LIKE '%piero%'
   OR slug LIKE '%judo%'
ORDER BY created_at;

-- Check specifically for the two slugs
SELECT 
  id,
  name,
  slug,
  city_id,
  (SELECT name FROM cities WHERE id = gyms.city_id) as city_name
FROM gyms
WHERE slug IN ('piero-judo-academy', 'piero-judo-academy-limassol')
ORDER BY slug;

