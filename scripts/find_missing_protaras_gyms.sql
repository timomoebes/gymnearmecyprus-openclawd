-- Find Missing Protaras Gyms
-- Expected: 11, Actual: 8, Missing: 3

-- Query to find which 3 gyms are missing
SELECT 'Protaras' as city, slug, name, 'MISSING' as status
FROM (VALUES
  ('body-shape-gym', 'Body Shape Gym'),
  ('bodyart-fitness-center', 'Bodyart Fitness Center'),
  ('bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj', 'Bad Dog Bjj  Brazilian Jiu-Jitsu Training Club  Nickbjj'),
  ('mythical-performance', 'Mythical Performance'),
  ('demari-wellness-and-spa', 'Demari Wellness And Spa'),
  ('datiki-diet', 'Datiki Diet'),
  ('limitlessxposed', 'Limitlessxposed'),
  ('return-rehabilitation-fitness-recovery-centre', 'Return Rehabilitation & Fitness Recovery Centre'),
  ('sacred-roots-yoga-massage', 'Sacred Roots Yoga & Massage'),
  ('world-gym-ayia-napa', 'World Gym Ayia Napa'),
  ('calisthenicsworkout4allcy', 'Calisthenicsworkout4Allcy')
) AS expected(slug, name)
WHERE slug NOT IN (
  SELECT slug FROM gyms 
  WHERE city_id = (SELECT id FROM cities WHERE name = 'Protaras')
)
ORDER BY slug;

-- Also check if any of these gyms exist but are assigned to a different city
SELECT 
  g.slug,
  g.name,
  c.name as current_city,
  'Protaras' as expected_city
FROM gyms g
JOIN cities c ON c.id = g.city_id
WHERE g.slug IN (
  'body-shape-gym',
  'bodyart-fitness-center',
  'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj',
  'mythical-performance',
  'demari-wellness-and-spa',
  'datiki-diet',
  'limitlessxposed',
  'return-rehabilitation-fitness-recovery-centre',
  'sacred-roots-yoga-massage',
  'world-gym-ayia-napa',
  'calisthenicsworkout4allcy'
)
AND c.name != 'Protaras'
ORDER BY g.slug;

