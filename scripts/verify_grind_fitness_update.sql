-- Verification script for Grind Fitness Limassol update
-- Run this to check if the specialties and amenities were correctly added

-- Step 1: Find the gym by name (check all possible slugs)
SELECT 
  id,
  name,
  slug,
  city_id
FROM gyms 
WHERE name ILIKE '%grind%fitness%'
ORDER BY name;

-- Step 2: Check specialties (using slug: grind-fitness-limassol)
SELECT 
  g.name as gym_name,
  g.slug as gym_slug,
  s.name as specialty_name,
  s.slug as specialty_slug,
  s.id as specialty_id
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
LEFT JOIN specialties s ON gs.specialty_id = s.id
WHERE g.slug = 'grind-fitness-limassol'
ORDER BY s.name;

-- Step 3: Check amenities (using slug: grind-fitness-limassol)
SELECT 
  g.name as gym_name,
  g.slug as gym_slug,
  a.name as amenity_name,
  a.id as amenity_id
FROM gyms g
LEFT JOIN gym_amenities ga ON g.id = ga.gym_id
LEFT JOIN amenities a ON ga.amenity_id = a.id
WHERE g.slug = 'grind-fitness-limassol'
ORDER BY a.name;

-- Step 4: Verify specialty UUIDs exist
SELECT 
  name,
  slug,
  id
FROM specialties
WHERE slug IN ('crossfit', 'personal-training')
ORDER BY name;

-- Step 5: Verify amenity UUIDs exist
SELECT 
  name,
  id
FROM amenities
WHERE id IN (
  '10959b05-8018-4780-a7d5-5053086d246a', -- Group Classes
  '3aca2174-3c20-40f6-a2fb-c0b86ee59240'  -- Parking
)
ORDER BY name;

