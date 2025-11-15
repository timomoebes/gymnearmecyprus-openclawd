-- Update SEO descriptions for Ayia Napa gyms
-- Generated: 2025-11-15T22:21:41.002586
-- Total gyms: 5
-- Note: Uses slug to match gyms (slug is unique)

BEGIN;

UPDATE gyms
SET description = 'Sunwing Fitness Center is a highly rated 5.0-star gym in Ayia Napa, Cyprus, fitness training. this fitness center offers workout equipment suitable for all fitness levels. With a 5.0 rating and 1 reviews, it''s recognized as one of the best gyms in Ayia Napa. Whether you''re looking for workout facility in Ayia Napa, fitness programs, or gym facilities, Sunwing Fitness Center provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.', updated_at = NOW()
WHERE slug = 'sunwing-fitness-center';

UPDATE gyms
SET description = 'Overall Magic Fitness Center is a 4.1-star gym in Ayia Napa, Cyprus, fitness training. Located on Katalymaton 10, this fitness center offers workout equipment suitable for all fitness levels. With a 4.1 rating and 42 reviews, it provides quality gym services in Ayia Napa. Whether you''re looking for workout facility in Ayia Napa, fitness programs, or gym facilities, Overall Magic Fitness Center provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.', updated_at = NOW()
WHERE slug = 'overall-magic-fitness-center';

UPDATE gyms
SET description = 'Datiki Diet is a highly rated 5.0-star gym in Ayia Napa, Cyprus, fitness training. Located on Dimokratias 5, this fitness center offers workout equipment suitable for all fitness levels. With a 5.0 rating and 11 reviews, it''s recognized as one of the best gyms in Ayia Napa. Whether you''re looking for workout facility in Ayia Napa, fitness programs, or gym facilities, Datiki Diet provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.', updated_at = NOW()
WHERE slug = 'datiki-diet';

UPDATE gyms
SET description = 'Return Rehabilitation & Fitness Recovery Centre is a top-rated 4.5-star gym in Ayia Napa, Cyprus, fitness training. Located on Martiou 25 Ayia Napa, this fitness center offers workout equipment suitable for all fitness levels. With a 4.5 rating and 58 reviews, it''s a popular choice for fitness enthusiasts in Ayia Napa. Whether you''re looking for workout facility in Ayia Napa, fitness programs, or gym facilities, Return Rehabilitation & Fitness Recovery Centre provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.', updated_at = NOW()
WHERE slug = 'return-rehabilitation-fitness-recovery-centre';

UPDATE gyms
SET description = 'World Gym Ayia Napa is a highly rated 4.9-star gym in Ayia Napa, Cyprus, fitness training. Located monte napa, this fitness center offers workout equipment suitable for all fitness levels. With a 4.9 rating and 1269 reviews, it''s recognized as one of the best gyms in Ayia Napa. Whether you''re looking for workout facility in Ayia Napa, fitness programs, or gym facilities, World Gym Ayia Napa provides expert instruction in a welcoming environment. Join this premier Ayia Napa gym for expert fitness training.', updated_at = NOW()
WHERE slug = 'world-gym-ayia-napa';

COMMIT;
