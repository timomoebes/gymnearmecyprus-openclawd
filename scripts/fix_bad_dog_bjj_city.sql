-- Fix Bad Dog Bjj city assignment
-- This gym is located in Ayia Napa but may have been imported under Protaras

-- Step 1: Check current status
SELECT 
  g.slug,
  g.name,
  c.name as current_city,
  g.city_id as current_city_id,
  g.address
FROM gyms g
JOIN cities c ON c.id = g.city_id
WHERE g.slug = 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj';

-- Step 2: Preview what will change (run this first to see what will happen)
SELECT 
  g.slug,
  g.name,
  c_current.name as current_city,
  (SELECT name FROM cities WHERE name = 'Ayia Napa') as new_city,
  g.address
FROM gyms g
JOIN cities c_current ON c_current.id = g.city_id
WHERE g.slug = 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj'
  AND g.city_id = (SELECT id FROM cities WHERE name = 'Protaras');

-- Step 3: Update to Ayia Napa (only if currently assigned to Protaras)
-- This will:
-- - Change city_id from Protaras to Ayia Napa
-- - The gym will no longer appear in Protaras queries
-- - The gym will now appear in Ayia Napa queries
-- - The gym record itself is NOT deleted, just moved
UPDATE gyms
SET 
  city_id = (SELECT id FROM cities WHERE name = 'Ayia Napa'),
  updated_at = NOW()
WHERE slug = 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj'
  AND city_id = (SELECT id FROM cities WHERE name = 'Protaras');

-- Step 4: Verify the change
SELECT 
  g.slug,
  g.name,
  c.name as city,
  g.address,
  g.updated_at
FROM gyms g
JOIN cities c ON c.id = g.city_id
WHERE g.slug = 'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj';

-- Step 5: Verify counts (optional - to confirm Protaras lost 1 and Ayia Napa gained 1)
SELECT 
  c.name as city,
  COUNT(g.id) as gym_count
FROM cities c
LEFT JOIN gyms g ON g.city_id = c.id
WHERE c.name IN ('Protaras', 'Ayia Napa')
GROUP BY c.id, c.name
ORDER BY c.name;
