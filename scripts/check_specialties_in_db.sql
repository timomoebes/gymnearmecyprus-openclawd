-- Quick check: What specialties exist in the database?
-- Run this first to see what specialties are available

SELECT 
  id,
  name,
  slug,
  description
FROM specialties
ORDER BY name;

-- Check specifically for Personal Training variations:
SELECT 
  id,
  name,
  slug
FROM specialties
WHERE slug LIKE '%personal%' 
   OR slug LIKE '%trainer%'
   OR LOWER(name) LIKE '%personal%'
   OR LOWER(name) LIKE '%trainer%'
ORDER BY name;

