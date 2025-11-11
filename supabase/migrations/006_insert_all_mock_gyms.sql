-- Migration: Insert all 20 mock gyms with relationships
-- Date: 2024-01-26
-- This migration inserts all mock gyms with their specialties and amenities
-- Note: Powerhouse Gym Limassol already exists (test migration), so it will be updated

BEGIN;

-- Helper function to get gym ID by slug
CREATE OR REPLACE FUNCTION get_gym_id_by_slug(gym_slug TEXT)
RETURNS UUID AS $$
  SELECT id FROM gyms WHERE slug = gym_slug;
$$ LANGUAGE SQL;

-- ============================================================================
-- GYM 1: Powerhouse Gym Limassol (Featured - has member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Powerhouse Gym Limassol',
  'powerhouse-gym-limassol',
  'Powerhouse Gym Limassol is a state-of-the-art fitness facility offering world-class equipment and expert trainers in the heart of Limassol. With over 3,000 square meters of training space, we provide everything you need for your fitness journey. Our comprehensive gym in Limassol features extensive bodybuilding equipment, CrossFit-style functional training areas, and dedicated spaces for strength training. Whether you''re searching for a gym near me in Limassol or looking for the best fitness center in the city, Powerhouse Gym offers 24/7 access, making it perfect for early morning workouts, late-night training, or flexible scheduling. Our certified personal trainers provide one-on-one guidance, and our facility includes modern cardio equipment, free weights, machines, and specialized training zones. Located on Makarios Avenue, we''re easily accessible and offer parking, showers, locker rooms, and a sauna for post-workout relaxation. Join our community of fitness enthusiasts in Limassol and experience why we''re considered one of the top gyms in the city.',
  '123 Makarios Avenue, Limassol 3040',
  'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  34.7071,
  33.0226,
  '+357-25-123456',
  'limassol@powerhousegym.com',
  'https://powerhousegym.com',
  '/images/gyms/powerhouse-limassol-1.jpg',
  '/images/gyms/powerhouse-limassol-1.jpg',
  '{"monday":"6:00 AM - 11:00 PM","tuesday":"6:00 AM - 11:00 PM","wednesday":"6:00 AM - 11:00 PM","thursday":"6:00 AM - 11:00 PM","friday":"6:00 AM - 11:00 PM","saturday":"8:00 AM - 10:00 PM","sunday":"8:00 AM - 10:00 PM"}'::jsonb,
  true,
  4.5,
  127,
  8,
  2500,
  'Demo Data',
  false,
  true,
  '2016-01-15'::timestamptz,
  '2024-01-20'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('powerhouse-gym-limassol'), id
FROM specialties WHERE slug IN ('bodybuilding', 'crossfit')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('powerhouse-gym-limassol'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', '24-hour-gym', 'sauna')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 2: Zen Yoga Studio Limassol (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Zen Yoga Studio Limassol',
  'zen-yoga-studio-limassol',
  'A peaceful sanctuary in the heart of Limassol, Zen Yoga Studio offers various yoga styles including Hatha, Vinyasa, Ashtanga, and Hot Yoga. Our experienced yoga instructors guide you through your practice in a serene environment designed for relaxation and mindfulness. Whether you''re looking for yoga near me in Limassol or seeking a dedicated yoga studio, we provide classes suitable for all levels from beginners to advanced practitioners. Our yoga studio features a dedicated hot yoga room for heated classes, comfortable mat spaces, and all necessary props including blocks, straps, and bolsters. We also offer pilates classes, combining the benefits of both disciplines for a comprehensive mind-body workout. Located on Amathus Avenue in Limassol, our studio provides a welcoming atmosphere where you can escape the hustle of daily life and focus on your practice. Our certified instructors are passionate about helping you improve flexibility, build strength, reduce stress, and enhance overall well-being through the practice of yoga.',
  '45 Amathus Avenue, Limassol 3040',
  'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  34.7100,
  33.0250,
  '+357-25-234567',
  NULL,
  'https://zenyogalimassol.com',
  '/images/gyms/zen-yoga-1.jpg',
  '/images/gyms/zen-yoga-1.jpg',
  '{"monday":"7:00 AM - 9:00 PM","tuesday":"7:00 AM - 9:00 PM","wednesday":"7:00 AM - 9:00 PM","thursday":"7:00 AM - 9:00 PM","friday":"7:00 AM - 9:00 PM","saturday":"8:00 AM - 7:00 PM","sunday":"9:00 AM - 6:00 PM"}'::jsonb,
  false,
  4.8,
  89,
  5,
  NULL,
  NULL,
  false,
  true,
  '2019-03-10'::timestamptz,
  '2024-01-18'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('zen-yoga-studio-limassol'), id
FROM specialties WHERE slug IN ('yoga', 'pilates')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('zen-yoga-studio-limassol'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 3: Elite Fitness Nicosia (Featured - has member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Elite Fitness Nicosia',
  'elite-fitness-nicosia',
  'Elite Fitness Nicosia is the capital''s premier strength training facility, offering world-class equipment and expert guidance for serious athletes and fitness enthusiasts. With competition-grade equipment and certified trainers, we cater to bodybuilders, powerlifters, and fitness enthusiasts of all levels. Whether you''re searching for the best gym in Nicosia or looking for a gym near me in the capital, Elite Fitness provides a comprehensive training environment with extensive free weights, powerlifting platforms, and specialized bodybuilding equipment. Our facility features 24-hour access, making it perfect for those with busy schedules or unconventional workout times. Our certified personal trainers in Nicosia offer one-on-one sessions, nutrition counseling, and customized workout programs tailored to your goals. Located on Ledra Street in central Nicosia, we provide a motivating atmosphere where strength athletes can train alongside like-minded individuals. Our facility includes sauna, steam room, locker rooms, and parking, ensuring a complete fitness experience. Join Elite Fitness Nicosia and discover why we''re considered one of the top bodybuilding and powerlifting gyms in Cyprus.',
  '78 Ledra Street, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1856,
  33.3823,
  '+357-22-345678',
  NULL,
  'https://elitefitnesscy.com',
  '/images/gyms/elite-nicosia-1.jpg',
  '/images/gyms/elite-nicosia-1.jpg',
  '{"monday":"5:00 AM - 12:00 AM","tuesday":"5:00 AM - 12:00 AM","wednesday":"5:00 AM - 12:00 AM","thursday":"5:00 AM - 12:00 AM","friday":"5:00 AM - 12:00 AM","saturday":"6:00 AM - 11:00 PM","sunday":"7:00 AM - 10:00 PM"}'::jsonb,
  true,
  4.6,
  203,
  12,
  3200,
  'Demo Data',
  false,
  true,
  '2012-05-20'::timestamptz,
  '2024-01-22'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('elite-fitness-nicosia'), id
FROM specialties WHERE slug IN ('bodybuilding', 'powerlifting', 'personal-trainer')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('elite-fitness-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'sauna', 'steam-room')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 4: BeachFit Paphos (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'BeachFit Paphos',
  'beachfit-paphos',
  'Train with a view at BeachFit Paphos, where our unique location offers both indoor and outdoor training spaces with beach access for running and outdoor workouts. Perfect for those who love training in nature, our fitness center in Paphos combines the best of indoor gym facilities with the natural beauty of the coast. Whether you''re looking for a gym near me in Paphos or seeking CrossFit, yoga, or pilates classes, BeachFit provides comprehensive fitness options in a stunning setting. Our facility features modern equipment for CrossFit-style functional training, dedicated yoga and pilates studios, and outdoor training areas that take advantage of the beautiful Paphos coastline. We offer group classes in CrossFit, yoga, and pilates, as well as personal training services for those seeking individualized attention. Located on Poseidonos Avenue near the beach, our facility includes parking, showers, changing rooms, and a cafe for post-workout refreshments. Join BeachFit Paphos and experience fitness training in one of the most beautiful locations in Cyprus, where you can combine your workout with beach runs, outdoor yoga sessions, and training with ocean views.',
  '12 Poseidonos Avenue, Paphos 8041',
  '7978d742-eeea-4c7a-b37f-7dceacd4284b',
  34.7756,
  32.4242,
  '+357-26-456789',
  NULL,
  NULL,
  '/images/gyms/beachfit-paphos-1.jpg',
  '/images/gyms/beachfit-paphos-1.jpg',
  '{"monday":"6:00 AM - 10:00 PM","tuesday":"6:00 AM - 10:00 PM","wednesday":"6:00 AM - 10:00 PM","thursday":"6:00 AM - 10:00 PM","friday":"6:00 AM - 10:00 PM","saturday":"7:00 AM - 9:00 PM","sunday":"8:00 AM - 8:00 PM"}'::jsonb,
  false,
  4.4,
  156,
  4,
  NULL,
  NULL,
  false,
  true,
  '2020-06-01'::timestamptz,
  '2024-01-15'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('beachfit-paphos'), id
FROM specialties WHERE slug IN ('crossfit', 'yoga', 'pilates')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('beachfit-paphos'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'cafe', 'outdoor', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 5: Combat Zone Larnaca (Featured - has member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Combat Zone Larnaca',
  'combat-zone-larnaca',
  'Combat Zone Larnaca is Cyprus''s premier martial arts training facility, offering comprehensive programs in MMA, boxing, and Brazilian Jiu-Jitsu. Learn from experienced fighters and certified coaches who provide expert instruction for both beginners and competitive athletes. Whether you''re training for competition, self-defense, or fitness, our martial arts gym in Larnaca has the programs and expertise you need. Our facility features a full-size boxing ring, extensive mat space for grappling, heavy bags for striking practice, speed bags, and a strength and conditioning area. We offer group classes in MMA, boxing, and Brazilian Jiu-Jitsu, as well as private training sessions for those seeking personalized instruction. Located on Finikoudes Promenade in Larnaca, our facility provides a professional training environment where you can develop your skills, improve fitness, and join a supportive martial arts community. Our experienced coaches include professional fighters and certified instructors who are passionate about helping you achieve your goals, whether that''s learning self-defense, improving athletic performance, or preparing for competition. Join Combat Zone Larnaca and discover the physical and mental benefits of martial arts training.',
  '34 Finikoudes Promenade, Larnaca 6021',
  'c2208ba4-aea9-4e22-b256-09177179763f',
  34.9167,
  33.6333,
  '+357-24-567890',
  NULL,
  'https://combatzonecy.com',
  '/images/gyms/combat-zone-1.jpg',
  '/images/gyms/combat-zone-1.jpg',
  '{"monday":"4:00 PM - 10:00 PM","tuesday":"4:00 PM - 10:00 PM","wednesday":"4:00 PM - 10:00 PM","thursday":"4:00 PM - 10:00 PM","friday":"4:00 PM - 10:00 PM","saturday":"10:00 AM - 6:00 PM","sunday":"Closed"}'::jsonb,
  true,
  4.7,
  94,
  6,
  350,
  'Demo Data',
  false,
  true,
  '2018-02-14'::timestamptz,
  '2024-01-19'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('combat-zone-larnaca'), id
FROM specialties WHERE slug IN ('mma', 'boxing')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('combat-zone-larnaca'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 6: Aqua Fitness Nicosia (Featured - has member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Aqua Fitness Nicosia',
  'aqua-fitness-nicosia',
  'Aqua Fitness Nicosia is a premier health club featuring state-of-the-art swimming facilities in the capital city. Our facility includes both indoor and outdoor pools, perfect for lap swimming, water aerobics, and aquatic fitness. Whether you''re looking for a gym with pool in Nicosia or seeking swimming facilities near me, Aqua Fitness provides comprehensive aquatic and land-based fitness programs. Located in the heart of Nicosia on Makarios Avenue, we offer swimming lessons, personal training, group fitness classes, and yoga sessions. Our pools in Nicosia are among the best-equipped in Cyprus, featuring temperature-controlled water, lane markers for lap swimming, and dedicated areas for water aerobics and rehabilitation. Our certified swimming instructors provide lessons for all levels, from beginners learning basic strokes to competitive swimmers refining their technique. In addition to our swimming facilities, we offer a fully equipped gym, sauna, steam room, and cafe. Join Aqua Fitness Nicosia and experience the benefits of combining swimming with traditional fitness training in one comprehensive facility.',
  '45 Makarios Avenue, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1750,
  33.3600,
  '+357-22-789012',
  'info@aquafitnessnicosia.com',
  'https://aquafitnessnicosia.com',
  '/images/gyms/aqua-fitness-1.jpg',
  '/images/gyms/aqua-fitness-1.jpg',
  '{"monday":"6:00 AM - 10:00 PM","tuesday":"6:00 AM - 10:00 PM","wednesday":"6:00 AM - 10:00 PM","thursday":"6:00 AM - 10:00 PM","friday":"6:00 AM - 10:00 PM","saturday":"7:00 AM - 9:00 PM","sunday":"8:00 AM - 8:00 PM"}'::jsonb,
  true,
  4.7,
  156,
  10,
  1800,
  'Demo Data',
  false,
  true,
  '2014-03-15'::timestamptz,
  '2024-01-25'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('aqua-fitness-nicosia'), id
FROM specialties WHERE slug IN ('swimming', 'personal-trainer', 'yoga')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('aqua-fitness-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'pool', 'sauna', 'steam-room', 'cafe', 'personal-training')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 7: Olympus Health Club Nicosia (Featured - has member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Olympus Health Club Nicosia',
  'olympus-health-club-nicosia',
  'Olympus Health Club Nicosia is one of the most prestigious health clubs in the capital, featuring an Olympic-size swimming pool perfect for serious swimmers and competitive training. Whether you''re searching for a health club with pool in Nicosia or looking for swimming facilities near me, Olympus Health Club provides world-class aquatic and fitness facilities. Our Olympic-size pool in Nicosia is among the best-equipped in Cyprus, featuring temperature-controlled water, lane markers, starting blocks, and timing systems for competitive training. Along with our comprehensive gym facilities, we offer swimming lessons for all levels, water aerobics classes, aqua fitness programs, and personal training services. Our facility includes both indoor and outdoor pools, allowing for year-round swimming regardless of weather. Located on Stasikratous Street in central Nicosia, we provide a luxurious fitness experience with sauna, steam room, jacuzzi, nutrition counseling, and a cafe. Our certified swimming coaches and personal trainers work together to create comprehensive fitness programs that combine aquatic and land-based training. Join Olympus Health Club Nicosia and experience premium fitness and swimming facilities in the heart of the capital.',
  '12 Stasikratous Street, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1700,
  33.3650,
  '+357-22-890123',
  'nicosia@olympushealthclub.com',
  'https://olympushealthclub.com',
  '/images/gyms/olympus-1.jpg',
  '/images/gyms/olympus-1.jpg',
  '{"monday":"5:30 AM - 11:00 PM","tuesday":"5:30 AM - 11:00 PM","wednesday":"5:30 AM - 11:00 PM","thursday":"5:30 AM - 11:00 PM","friday":"5:30 AM - 11:00 PM","saturday":"6:00 AM - 10:00 PM","sunday":"7:00 AM - 9:00 PM"}'::jsonb,
  true,
  4.8,
  234,
  15,
  2800,
  'Demo Data',
  false,
  true,
  '2009-06-01'::timestamptz,
  '2024-01-20'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('olympus-health-club-nicosia'), id
FROM specialties WHERE slug IN ('swimming', 'bodybuilding', 'personal-trainer')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('olympus-health-club-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'pool', 'sauna', 'steam-room', 'cafe', 'personal-training')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 8: Coastal Fitness Limassol (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Coastal Fitness Limassol',
  'coastal-fitness-limassol',
  'Coastal Fitness Limassol offers a unique fitness experience with both indoor and outdoor swimming pools, combining traditional gym equipment with aquatic fitness options. Whether you''re looking for a gym with pool in Limassol or seeking swimming facilities near me, Coastal Fitness provides comprehensive fitness and aquatic programs. Perfect for those who enjoy swimming as part of their fitness routine, we offer lap swimming, water aerobics, pool-based training programs, and swimming lessons. Our facility features temperature-controlled pools, lane markers for lap swimming, and dedicated areas for water aerobics and rehabilitation. Located on Amathus Avenue near the beach in Limassol, we provide a unique fitness experience that combines the benefits of swimming with traditional gym training. Our certified swimming instructors and personal trainers work together to create customized programs that incorporate both aquatic and land-based exercises. In addition to our pools, we offer a fully equipped gym with CrossFit-style functional training areas, yoga classes, and a cafe. Join Coastal Fitness Limassol and experience the perfect combination of swimming and fitness training in a beautiful coastal setting.',
  '88 Amathus Avenue, Limassol 3040',
  'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  34.7150,
  33.0300,
  '+357-25-901234',
  'info@coastalfitnesslimassol.com',
  'https://coastalfitnesslimassol.com',
  '/images/gyms/coastal-fitness-1.jpg',
  '/images/gyms/coastal-fitness-1.jpg',
  '{"monday":"6:00 AM - 10:00 PM","tuesday":"6:00 AM - 10:00 PM","wednesday":"6:00 AM - 10:00 PM","thursday":"6:00 AM - 10:00 PM","friday":"6:00 AM - 10:00 PM","saturday":"7:00 AM - 9:00 PM","sunday":"8:00 AM - 8:00 PM"}'::jsonb,
  false,
  4.6,
  142,
  7,
  NULL,
  NULL,
  false,
  true,
  '2017-04-10'::timestamptz,
  '2024-01-18'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('coastal-fitness-limassol'), id
FROM specialties WHERE slug IN ('swimming', 'crossfit', 'yoga')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('coastal-fitness-limassol'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'pool', 'cafe', 'personal-training', 'outdoor')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 9: Iron Forge CrossFit Nicosia (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Iron Forge CrossFit Nicosia',
  'iron-forge-crossfit-nicosia',
  'Iron Forge CrossFit Nicosia is a premier CrossFit box in the capital city, offering high-intensity functional training for athletes of all levels. Our facility features competition-grade equipment, experienced CrossFit-certified coaches, and a supportive community atmosphere. Whether you''re new to CrossFit or a seasoned athlete, our daily WODs (Workout of the Day) and specialized programs will help you achieve your fitness goals. Located in central Nicosia, we provide a welcoming environment for those seeking challenging workouts and measurable results. Our CrossFit classes focus on functional movements performed at high intensity, combining elements of weightlifting, gymnastics, and cardio.',
  '56 Arch. Makarios III Avenue, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1800,
  33.3700,
  '+357-22-456789',
  'nicosia@ironforgecrossfit.com',
  'https://ironforgecrossfit.com',
  '/images/gyms/iron-forge-1.jpg',
  '/images/gyms/iron-forge-1.jpg',
  '{"monday":"6:00 AM - 9:00 PM","tuesday":"6:00 AM - 9:00 PM","wednesday":"6:00 AM - 9:00 PM","thursday":"6:00 AM - 9:00 PM","friday":"6:00 AM - 9:00 PM","saturday":"8:00 AM - 2:00 PM","sunday":"9:00 AM - 1:00 PM"}'::jsonb,
  false,
  4.7,
  98,
  5,
  NULL,
  NULL,
  false,
  true,
  '2019-08-15'::timestamptz,
  '2024-01-20'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('iron-forge-crossfit-nicosia'), id
FROM specialties WHERE slug IN ('crossfit', 'powerlifting')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('iron-forge-crossfit-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'weights', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 10: Flex Pilates Studio Limassol (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Flex Pilates Studio Limassol',
  'flex-pilates-studio-limassol',
  'Flex Pilates Studio Limassol specializes in reformer pilates and mat pilates classes, offering a comprehensive approach to core strength, flexibility, and body alignment. Our certified pilates instructors provide personalized attention in small group classes and private sessions. Whether you''re looking for reformer pilates near me in Limassol or traditional mat pilates, our studio offers both equipment-based and mat-based classes. Our reformer pilates classes use specialized equipment to provide resistance and support, making pilates accessible for all fitness levels. Located in the heart of Limassol, we help clients improve posture, build core strength, and enhance overall body awareness through the pilates method.',
  '23 Spyrou Araouzou Street, Limassol 3040',
  'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  34.7080,
  33.0230,
  '+357-25-567890',
  'info@flexpilateslimassol.com',
  'https://flexpilateslimassol.com',
  '/images/gyms/flex-pilates-1.jpg',
  '/images/gyms/flex-pilates-1.jpg',
  '{"monday":"7:00 AM - 8:00 PM","tuesday":"7:00 AM - 8:00 PM","wednesday":"7:00 AM - 8:00 PM","thursday":"7:00 AM - 8:00 PM","friday":"7:00 AM - 8:00 PM","saturday":"9:00 AM - 5:00 PM","sunday":"10:00 AM - 4:00 PM"}'::jsonb,
  false,
  4.9,
  67,
  3,
  NULL,
  NULL,
  false,
  true,
  '2021-02-10'::timestamptz,
  '2024-01-19'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('flex-pilates-studio-limassol'), id
FROM specialties WHERE slug IN ('pilates', 'yoga')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('flex-pilates-studio-limassol'), id
FROM amenities WHERE slug IN ('parking', 'locker-room', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 11: Titan Boxing Club Paphos (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Titan Boxing Club Paphos',
  'titan-boxing-club-paphos',
  'Titan Boxing Club Paphos is a professional boxing and MMA training facility offering classes for beginners and competitive fighters. Our experienced coaches provide expert instruction in boxing technique, footwork, and conditioning. Whether you''re training for fitness, self-defense, or competition, our boxing gym in Paphos offers the equipment and expertise you need. Our facility features a full-size boxing ring, multiple heavy bags, speed bags, and a comprehensive strength and conditioning area. We offer group boxing classes, private training sessions, and specialized programs for youth and adults. Join our boxing community in Paphos and discover the physical and mental benefits of boxing training.',
  '78 Tombs of the Kings Road, Paphos 8041',
  '7978d742-eeea-4c7a-b37f-7dceacd4284b',
  34.7800,
  32.4300,
  '+357-26-678901',
  'info@titanboxingpaphos.com',
  'https://titanboxingpaphos.com',
  '/images/gyms/titan-boxing-1.jpg',
  '/images/gyms/titan-boxing-1.jpg',
  '{"monday":"5:00 PM - 9:00 PM","tuesday":"5:00 PM - 9:00 PM","wednesday":"5:00 PM - 9:00 PM","thursday":"5:00 PM - 9:00 PM","friday":"5:00 PM - 9:00 PM","saturday":"10:00 AM - 4:00 PM","sunday":"Closed"}'::jsonb,
  false,
  4.6,
  112,
  4,
  NULL,
  NULL,
  false,
  true,
  '2020-03-20'::timestamptz,
  '2024-01-17'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('titan-boxing-club-paphos'), id
FROM specialties WHERE slug IN ('boxing', 'mma')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('titan-boxing-club-paphos'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 12: Ocean Breeze Fitness Larnaca (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Ocean Breeze Fitness Larnaca',
  'ocean-breeze-fitness-larnaca',
  'Ocean Breeze Fitness Larnaca offers a modern fitness center with stunning beach views, combining comprehensive gym facilities with personalized training services. Our bodybuilding section features extensive free weights, machines, and functional training equipment. Our certified personal trainers in Larnaca provide one-on-one training sessions tailored to your fitness goals, whether you''re looking to build muscle, lose weight, or improve athletic performance. Located near the beach in Larnaca, our facility offers a motivating environment with natural light and ocean views. We provide nutrition counseling, workout programming, and ongoing support to help you achieve lasting results. Find personal trainers in Larnaca who understand your goals and can guide you every step of the way.',
  '12 Piale Pasha, Larnaca 6021',
  'c2208ba4-aea9-4e22-b256-09177179763f',
  34.9200,
  33.6400,
  '+357-24-789012',
  'larnaca@oceanbreezefitness.com',
  'https://oceanbreezefitness.com',
  '/images/gyms/ocean-breeze-1.jpg',
  '/images/gyms/ocean-breeze-1.jpg',
  '{"monday":"6:00 AM - 10:00 PM","tuesday":"6:00 AM - 10:00 PM","wednesday":"6:00 AM - 10:00 PM","thursday":"6:00 AM - 10:00 PM","friday":"6:00 AM - 10:00 PM","saturday":"7:00 AM - 9:00 PM","sunday":"8:00 AM - 8:00 PM"}'::jsonb,
  false,
  4.5,
  145,
  6,
  NULL,
  NULL,
  false,
  true,
  '2018-05-12'::timestamptz,
  '2024-01-21'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('ocean-breeze-fitness-larnaca'), id
FROM specialties WHERE slug IN ('bodybuilding', 'personal-trainer', 'yoga')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('ocean-breeze-fitness-larnaca'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'cafe', 'outdoor')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 13: Sunset Yoga Ayia Napa (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Sunset Yoga Ayia Napa',
  'sunset-yoga-ayia-napa',
  'Sunset Yoga Ayia Napa offers a unique yoga experience combining indoor studio classes with outdoor beach sessions. Our yoga studio in Ayia Napa provides various yoga styles including Hatha, Vinyasa, Ashtanga, and Hot Yoga. Whether you''re a local resident or visiting Ayia Napa, our yoga classes offer a perfect way to stay fit and find balance during your stay. Our experienced yoga instructors guide you through practices suitable for all levels, from beginners to advanced practitioners. We offer morning and evening classes, with special sunset yoga sessions on the beach during summer months. Our studio features a dedicated hot yoga room for heated classes, and we provide all necessary equipment including mats, blocks, and straps. Discover the benefits of yoga in Ayia Napa''s beautiful coastal setting.',
  '34 Nissi Avenue, Ayia Napa 5340',
  '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
  34.9900,
  34.0200,
  '+357-23-890123',
  'info@sunsetyogaayianapa.com',
  'https://sunsetyogaayianapa.com',
  '/images/gyms/sunset-yoga-1.jpg',
  '/images/gyms/sunset-yoga-1.jpg',
  '{"monday":"7:00 AM - 8:00 PM","tuesday":"7:00 AM - 8:00 PM","wednesday":"7:00 AM - 8:00 PM","thursday":"7:00 AM - 8:00 PM","friday":"7:00 AM - 8:00 PM","saturday":"8:00 AM - 6:00 PM","sunday":"9:00 AM - 5:00 PM"}'::jsonb,
  false,
  4.8,
  89,
  2,
  NULL,
  NULL,
  false,
  true,
  '2022-04-01'::timestamptz,
  '2024-01-16'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('sunset-yoga-ayia-napa'), id
FROM specialties WHERE slug IN ('yoga', 'pilates')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('sunset-yoga-ayia-napa'), id
FROM amenities WHERE slug IN ('parking', 'locker-room', 'classes', 'outdoor')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 14: Beach Body Fitness Protaras (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Beach Body Fitness Protaras',
  'beach-body-fitness-protaras',
  'Beach Body Fitness Protaras is a modern fitness center designed to help you achieve your beach body goals. Our comprehensive facility offers bodybuilding equipment, CrossFit-style functional training, and personalized training programs. Located in the heart of Protaras, we provide flexible training options including 24/7 access for members. Our certified personal trainers in Protaras offer one-on-one sessions and small group training, focusing on strength building, fat loss, and athletic performance. Whether you''re a local resident or visiting Protaras, our gym provides everything you need for an effective workout. We offer outdoor training sessions on the beach during favorable weather, combining the benefits of fresh air with structured exercise. Our facility features modern equipment, clean changing facilities, and a supportive community atmosphere.',
  '56 Protaras Avenue, Protaras 5296',
  '7b90b819-b3a9-43ce-ad48-22b016b9686b',
  35.0150,
  34.0600,
  '+357-23-901234',
  'info@beachbodyfitnessprotaras.com',
  'https://beachbodyfitnessprotaras.com',
  '/images/gyms/beach-body-1.jpg',
  '/images/gyms/beach-body-1.jpg',
  '{"monday":"6:00 AM - 11:00 PM","tuesday":"6:00 AM - 11:00 PM","wednesday":"6:00 AM - 11:00 PM","thursday":"6:00 AM - 11:00 PM","friday":"6:00 AM - 11:00 PM","saturday":"7:00 AM - 10:00 PM","sunday":"8:00 AM - 9:00 PM"}'::jsonb,
  false,
  4.4,
  76,
  3,
  NULL,
  NULL,
  false,
  true,
  '2021-06-15'::timestamptz,
  '2024-01-18'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('beach-body-fitness-protaras'), id
FROM specialties WHERE slug IN ('bodybuilding', 'personal-trainer', 'crossfit')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('beach-body-fitness-protaras'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', '24-hour-gym', 'outdoor')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 15: Warrior MMA Nicosia (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Warrior MMA Nicosia',
  'warrior-mma-nicosia',
  'Warrior MMA Nicosia is a premier mixed martial arts training facility offering comprehensive programs in MMA, boxing, and Brazilian Jiu-Jitsu. Our experienced coaches include professional fighters and certified instructors who provide expert training for both beginners and competitive athletes. Whether you''re interested in learning self-defense, improving fitness, or training for competition, our MMA gym in Nicosia offers structured programs to meet your goals. Our facility features a full-size MMA cage, extensive mat space for grappling, heavy bags for striking practice, and a strength and conditioning area. We offer group classes in various disciplines, private training sessions, and specialized competition preparation programs. Join our MMA community in Nicosia and develop your skills in a supportive, professional environment.',
  '34 Onasagorou Street, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1750,
  33.3750,
  '+357-22-012345',
  'info@warriormmanicosia.com',
  'https://warriormmanicosia.com',
  '/images/gyms/warrior-mma-1.jpg',
  '/images/gyms/warrior-mma-1.jpg',
  '{"monday":"4:00 PM - 10:00 PM","tuesday":"4:00 PM - 10:00 PM","wednesday":"4:00 PM - 10:00 PM","thursday":"4:00 PM - 10:00 PM","friday":"4:00 PM - 10:00 PM","saturday":"10:00 AM - 6:00 PM","sunday":"10:00 AM - 4:00 PM"}'::jsonb,
  false,
  4.7,
  134,
  7,
  NULL,
  NULL,
  false,
  true,
  '2017-09-10'::timestamptz,
  '2024-01-22'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('warrior-mma-nicosia'), id
FROM specialties WHERE slug IN ('mma', 'boxing')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('warrior-mma-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 16: Flex Fitness 24 Limassol (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Flex Fitness 24 Limassol',
  'flex-fitness-24-limassol',
  'Flex Fitness 24 Limassol is a 24-hour gym providing round-the-clock access to comprehensive fitness facilities. Our 24/7 gym in Limassol offers extensive bodybuilding equipment, cardio machines, and functional training areas, perfect for those with busy schedules or unconventional workout times. Whether you prefer early morning workouts, late-night training, or flexible scheduling, our 24 hour gym near me in Limassol accommodates your lifestyle. Our facility features modern strength training equipment, a wide selection of free weights, cardio machines with entertainment systems, and dedicated stretching areas. We offer personal training services with certified trainers who can help you maximize your results. Our 24/7 access makes it easy to maintain a consistent workout routine, and our clean, well-maintained facility ensures a comfortable training environment at any time of day.',
  '67 Agias Fylaxeos Street, Limassol 3040',
  'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  34.7050,
  33.0200,
  '+357-25-123789',
  'info@flexfitness24limassol.com',
  'https://flexfitness24limassol.com',
  '/images/gyms/flex-fitness-24-1.jpg',
  '/images/gyms/flex-fitness-24-1.jpg',
  '{"monday":"24/7","tuesday":"24/7","wednesday":"24/7","thursday":"24/7","friday":"24/7","saturday":"24/7","sunday":"24/7"}'::jsonb,
  false,
  4.6,
  201,
  4,
  NULL,
  NULL,
  false,
  true,
  '2020-01-20'::timestamptz,
  '2024-01-19'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('flex-fitness-24-limassol'), id
FROM specialties WHERE slug IN ('bodybuilding', 'personal-trainer')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('flex-fitness-24-limassol'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', '24-hour-gym', 'personal-training', 'cardio', 'weights')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 17: Power Lift Gym Paphos (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Power Lift Gym Paphos',
  'power-lift-gym-paphos',
  'Power Lift Gym Paphos is a specialized powerlifting and bodybuilding facility designed for serious strength athletes. Our gym in Paphos features competition-grade powerlifting equipment including multiple squat racks, deadlift platforms, and bench press stations. Whether you''re training for powerlifting competitions or focused on building maximum strength, our facility provides the equipment and environment you need. Our experienced coaches offer powerlifting technique instruction, programming guidance, and competition preparation. We cater to powerlifters of all levels, from beginners learning the basics to competitive athletes preparing for meets. Our facility maintains a serious training atmosphere while remaining welcoming to those new to powerlifting. Located in Paphos, we provide a dedicated space for strength athletes who value quality equipment and expert coaching.',
  '45 Makarios Avenue, Paphos 8041',
  '7978d742-eeea-4c7a-b37f-7dceacd4284b',
  34.7700,
  32.4200,
  '+357-26-234567',
  'info@powerliftgympaphos.com',
  'https://powerliftgympaphos.com',
  '/images/gyms/power-lift-1.jpg',
  '/images/gyms/power-lift-1.jpg',
  '{"monday":"6:00 AM - 10:00 PM","tuesday":"6:00 AM - 10:00 PM","wednesday":"6:00 AM - 10:00 PM","thursday":"6:00 AM - 10:00 PM","friday":"6:00 AM - 10:00 PM","saturday":"8:00 AM - 8:00 PM","sunday":"9:00 AM - 6:00 PM"}'::jsonb,
  false,
  4.8,
  87,
  5,
  NULL,
  NULL,
  false,
  true,
  '2019-03-25'::timestamptz,
  '2024-01-20'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('power-lift-gym-paphos'), id
FROM specialties WHERE slug IN ('powerlifting', 'bodybuilding')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('power-lift-gym-paphos'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'weights')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 18: Zenith Personal Training Larnaca (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Zenith Personal Training Larnaca',
  'zenith-personal-training-larnaca',
  'Zenith Personal Training Larnaca specializes in one-on-one personal training services, providing customized workout programs and expert guidance to help you achieve your fitness goals. Our certified personal trainers in Larnaca work with clients of all fitness levels, from beginners starting their fitness journey to athletes seeking performance enhancement. Whether your goal is weight loss, muscle building, athletic performance, or general fitness, our personal trainers create tailored programs based on your individual needs, preferences, and limitations. We offer private training sessions in our fully equipped studio, ensuring personalized attention and optimal results. Our personal training services in Larnaca include fitness assessments, body composition analysis, nutrition guidance, and ongoing support. Find personal trainers near me in Larnaca who are committed to your success and provide the motivation and expertise you need to reach your goals.',
  '23 Athinon Avenue, Larnaca 6021',
  'c2208ba4-aea9-4e22-b256-09177179763f',
  34.9150,
  33.6350,
  '+357-24-345678',
  'larnaca@zenithpersonaltraining.com',
  'https://zenithpersonaltraining.com',
  '/images/gyms/zenith-pt-1.jpg',
  '/images/gyms/zenith-pt-1.jpg',
  '{"monday":"6:00 AM - 9:00 PM","tuesday":"6:00 AM - 9:00 PM","wednesday":"6:00 AM - 9:00 PM","thursday":"6:00 AM - 9:00 PM","friday":"6:00 AM - 9:00 PM","saturday":"8:00 AM - 6:00 PM","sunday":"9:00 AM - 4:00 PM"}'::jsonb,
  false,
  4.9,
  156,
  8,
  NULL,
  NULL,
  false,
  true,
  '2016-07-10'::timestamptz,
  '2024-01-21'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('zenith-personal-training-larnaca'), id
FROM specialties WHERE slug IN ('personal-trainer')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('zenith-personal-training-larnaca'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'personal-training')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 19: Reformer Pilates Nicosia (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Reformer Pilates Nicosia',
  'reformer-pilates-nicosia',
  'Reformer Pilates Nicosia is a specialized pilates studio focusing exclusively on equipment-based pilates, particularly reformer pilates. Our studio in Nicosia features a full range of pilates equipment including reformers, cadillacs, chairs, and barrels, allowing for comprehensive pilates training. Whether you''re looking for reformer pilates near me in Nicosia or want to experience the benefits of equipment-based pilates, our certified instructors provide expert guidance in small group classes and private sessions. Reformer pilates uses specialized equipment to provide resistance and support, making it ideal for all fitness levels including those recovering from injuries. Our reformer pilates classes focus on core strength, flexibility, body alignment, and overall body awareness. Located in central Nicosia, we offer a welcoming environment for pilates practitioners of all levels, from beginners to advanced students.',
  '89 Stasikratous Street, Nicosia 1065',
  'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  35.1720,
  33.3680,
  '+357-22-456012',
  'info@reformerpilatesnicosia.com',
  'https://reformerpilatesnicosia.com',
  '/images/gyms/reformer-pilates-1.jpg',
  '/images/gyms/reformer-pilates-1.jpg',
  '{"monday":"7:00 AM - 8:00 PM","tuesday":"7:00 AM - 8:00 PM","wednesday":"7:00 AM - 8:00 PM","thursday":"7:00 AM - 8:00 PM","friday":"7:00 AM - 8:00 PM","saturday":"9:00 AM - 5:00 PM","sunday":"10:00 AM - 4:00 PM"}'::jsonb,
  false,
  4.8,
  124,
  4,
  NULL,
  NULL,
  false,
  true,
  '2020-05-18'::timestamptz,
  '2024-01-19'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('reformer-pilates-nicosia'), id
FROM specialties WHERE slug IN ('pilates')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('reformer-pilates-nicosia'), id
FROM amenities WHERE slug IN ('parking', 'locker-room', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 20: Beachside CrossFit Ayia Napa (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Beachside CrossFit Ayia Napa',
  'beachside-crossfit-ayia-napa',
  'Beachside CrossFit Ayia Napa offers high-intensity functional training in a unique beachside location. Our CrossFit box in Ayia Napa combines indoor training space with outdoor workout areas, taking advantage of the beautiful coastal setting. Whether you''re a local resident or visiting Ayia Napa, our CrossFit classes provide challenging workouts suitable for all fitness levels. Our CrossFit-certified coaches lead daily WODs (Workout of the Day) focusing on functional movements performed at high intensity. We offer foundations classes for beginners, regular CrossFit classes, and open gym time for experienced athletes. Our facility features competition-grade equipment, and we maintain a supportive community atmosphere where members motivate and challenge each other. Experience CrossFit training in Ayia Napa with ocean views and fresh sea air during outdoor sessions.',
  '12 Nissi Beach Road, Ayia Napa 5340',
  '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
  34.9850,
  34.0150,
  '+357-23-567123',
  'ayianapa@beachsidecrossfit.com',
  'https://beachsidecrossfit.com',
  '/images/gyms/beachside-crossfit-1.jpg',
  '/images/gyms/beachside-crossfit-1.jpg',
  '{"monday":"6:00 AM - 9:00 PM","tuesday":"6:00 AM - 9:00 PM","wednesday":"6:00 AM - 9:00 PM","thursday":"6:00 AM - 9:00 PM","friday":"6:00 AM - 9:00 PM","saturday":"8:00 AM - 2:00 PM","sunday":"9:00 AM - 1:00 PM"}'::jsonb,
  false,
  4.5,
  92,
  3,
  NULL,
  NULL,
  false,
  true,
  '2021-04-12'::timestamptz,
  '2024-01-17'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('beachside-crossfit-ayia-napa'), id
FROM specialties WHERE slug IN ('crossfit')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('beachside-crossfit-ayia-napa'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'outdoor', 'classes')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GYM 21: Tropical Fitness Protaras (Unclaimed - no member_count)
-- ============================================================================
INSERT INTO gyms (
  name, slug, description, address, city_id, latitude, longitude,
  phone, email, website, logo_url, cover_image_url,
  opening_hours, is_featured, rating, review_count, years_in_business,
  member_count, member_count_source, member_count_verified, member_count_public,
  created_at, updated_at
)
VALUES (
  'Tropical Fitness Protaras',
  'tropical-fitness-protaras',
  'Tropical Fitness Protaras offers a comprehensive fitness experience combining yoga, pilates, and personal training services in a beautiful resort setting. Our facility in Protaras caters to both local residents and visitors, providing flexible membership options and drop-in classes. Whether you''re looking for yoga classes, pilates sessions, or one-on-one personal training in Protaras, our experienced instructors provide expert guidance in a welcoming environment. Our yoga studio offers various styles including Vinyasa, Hatha, and restorative yoga, while our pilates classes include both mat and equipment-based options. Our personal trainers create customized programs based on your goals, whether you''re training for a specific event, improving general fitness, or maintaining your routine while on vacation. Located near the beach in Protaras, we offer a unique fitness experience in a tropical setting.',
  '34 Paralimni Avenue, Protaras 5296',
  '7b90b819-b3a9-43ce-ad48-22b016b9686b',
  35.0100,
  34.0550,
  '+357-23-678234',
  'info@tropicalfitnessprotaras.com',
  'https://tropicalfitnessprotaras.com',
  '/images/gyms/tropical-fitness-1.jpg',
  '/images/gyms/tropical-fitness-1.jpg',
  '{"monday":"7:00 AM - 9:00 PM","tuesday":"7:00 AM - 9:00 PM","wednesday":"7:00 AM - 9:00 PM","thursday":"7:00 AM - 9:00 PM","friday":"7:00 AM - 9:00 PM","saturday":"8:00 AM - 7:00 PM","sunday":"9:00 AM - 6:00 PM"}'::jsonb,
  false,
  4.7,
  103,
  2,
  NULL,
  NULL,
  false,
  true,
  '2022-03-08'::timestamptz,
  '2024-01-16'::timestamptz
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT get_gym_id_by_slug('tropical-fitness-protaras'), id
FROM specialties WHERE slug IN ('yoga', 'pilates', 'personal-trainer')
ON CONFLICT DO NOTHING;

INSERT INTO gym_amenities (gym_id, amenity_id)
SELECT get_gym_id_by_slug('tropical-fitness-protaras'), id
FROM amenities WHERE slug IN ('parking', 'showers', 'locker-room', 'personal-training', 'classes', 'outdoor')
ON CONFLICT DO NOTHING;

COMMIT;

-- Clean up helper function
DROP FUNCTION IF EXISTS get_gym_id_by_slug(TEXT);

