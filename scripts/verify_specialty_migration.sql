-- Verification Script: Check Specialty Migration
-- This script verifies that all 210 gyms have valid specialty assignments after migration
-- Run this after applying migration 007_migrate_specialties_to_consolidated.sql

-- Expected new specialty slugs:
-- fitness-gym, crossfit, personal-training, martial-arts-mma, boxing, yoga-pilates, dance-group-fitness, strength-training, swimming-aquatics

-- 1. Check gym specialty distribution
SELECT 
  s.slug,
  s.name,
  COUNT(DISTINCT gs.gym_id) as gym_count
FROM specialties s
LEFT JOIN gym_specialties gs ON s.id = gs.specialty_id
WHERE s.slug IN ('fitness-gym', 'crossfit', 'personal-training', 'martial-arts-mma', 'boxing', 'yoga-pilates', 'dance-group-fitness', 'strength-training', 'swimming-aquatics')
GROUP BY s.slug, s.name
ORDER BY gym_count DESC;

-- 2. Check for any gyms without specialties
SELECT 
  g.id,
  g.name,
  g.slug,
  COUNT(gs.specialty_id) as specialty_count
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
GROUP BY g.id, g.name, g.slug
HAVING COUNT(gs.specialty_id) = 0
ORDER BY g.name;

-- 3. Verify all 210 gyms have at least one specialty
SELECT 
  COUNT(*) as total_gyms,
  COUNT(DISTINCT gs.gym_id) as gyms_with_specialties,
  COUNT(*) - COUNT(DISTINCT gs.gym_id) as gyms_without_specialties
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id;

-- 4. Check for any old specialty assignments (should be 0 after migration)
SELECT 
  s.slug,
  s.name,
  COUNT(DISTINCT gs.gym_id) as gym_count
FROM specialties s
JOIN gym_specialties gs ON s.id = gs.specialty_id
WHERE s.slug IN ('fitness', 'gym', 'mma', 'boxing', 'yoga', 'pilates', 'bodybuilding', 'powerlifting', 'swimming')
  AND s.slug NOT IN ('fitness-gym', 'crossfit', 'personal-training', 'martial-arts-mma', 'boxing', 'yoga-pilates', 'dance-group-fitness', 'strength-training', 'swimming-aquatics')
GROUP BY s.slug, s.name
ORDER BY gym_count DESC;

-- 5. Sample gyms with their new specialties (first 10)
SELECT 
  g.name as gym_name,
  g.slug as gym_slug,
  STRING_AGG(s.name, ', ' ORDER BY s.name) as specialties
FROM gyms g
JOIN gym_specialties gs ON g.id = gs.gym_id
JOIN specialties s ON gs.specialty_id = s.id
GROUP BY g.id, g.name, g.slug
ORDER BY g.name
LIMIT 10;

-- 6. Count gyms per city with specialties
SELECT 
  c.name as city_name,
  COUNT(DISTINCT g.id) as total_gyms,
  COUNT(DISTINCT gs.gym_id) as gyms_with_specialties
FROM cities c
LEFT JOIN gyms g ON c.id = g.city_id
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
GROUP BY c.id, c.name
ORDER BY c.name;

-- Expected Results:
-- Query 1: Should show 9 specialties with gym counts > 0
-- Query 2: Should return 0 rows (all gyms should have at least one specialty)
-- Query 3: gyms_without_specialties should be 0, gyms_with_specialties should be 210
-- Query 4: Should return 0 rows (no old specialty assignments)
-- Query 5: Should show sample gyms with new specialty names
-- Query 6: Should show all cities with gym counts matching expected totals

