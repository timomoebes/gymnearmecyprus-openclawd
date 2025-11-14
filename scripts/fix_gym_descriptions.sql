-- Fix gym descriptions to remove incorrect "24 hour gym" references
-- Regenerate descriptions based on actual specialties

BEGIN;

-- Update descriptions for gyms with no specialty (general gyms)
UPDATE gyms
SET description = REPLACE(description, '24 hour gym', 'gym')
WHERE id NOT IN (
  SELECT DISTINCT gs.gym_id
  FROM gym_specialties gs
  JOIN specialties s ON gs.specialty_id = s.id
  WHERE s.slug = '24-hour-gym'
);

UPDATE gyms
SET description = REPLACE(description, '24-hour access', 'flexible access')
WHERE id NOT IN (
  SELECT DISTINCT gs.gym_id
  FROM gym_specialties gs
  JOIN specialties s ON gs.specialty_id = s.id
  WHERE s.slug = '24-hour-gym'
);

UPDATE gyms
SET description = REPLACE(description, '24/7 gym', 'fitness center')
WHERE id NOT IN (
  SELECT DISTINCT gs.gym_id
  FROM gym_specialties gs
  JOIN specialties s ON gs.specialty_id = s.id
  WHERE s.slug = '24-hour-gym'
);

-- Update Contrology Studio (Pilates)
UPDATE gyms
SET description = 'Contrology Studio is a highly rated 4.8-star Pilates studio in Limassol, Cyprus, offering professional Pilates instruction. Located on Arch. Makarios III Avenue 59, this Pilates studio offers specialized Pilates classes suitable for all fitness levels. With a 4.8 rating and 12 reviews, it''s recognized as one of the best Pilates studios in Limassol. Whether you''re looking for Pilates classes near me in Limassol, reformer Pilates, or mat Pilates instruction, Contrology Studio provides expert guidance in a welcoming environment. Find your perfect Pilates practice at this premier Limassol Pilates studio.',
updated_at = NOW()
WHERE slug = 'contrology-studio';

-- Update Crossfit Limassol
UPDATE gyms
SET description = 'Crossfit Limassol is a highly rated 4.8-star CrossFit gym in Limassol, Cyprus, offering high-intensity functional training. Located on Shakespeare 9, this CrossFit box offers daily WODs (Workout of the Day) and expert coaching suitable for all fitness levels. With a 4.8 rating and 87 reviews, it''s recognized as one of the best CrossFit gyms in Limassol. Whether you''re looking for CrossFit training near me in Limassol, functional fitness, or high-intensity workouts, Crossfit Limassol provides expert instruction in a supportive community environment. Join one of Limassol''s premier CrossFit boxes and achieve your fitness goals.',
updated_at = NOW()
WHERE slug = 'crossfit-limassol';

-- Update general gyms (no specialty) - remove 24 hour references
UPDATE gyms
SET description = REPLACE(REPLACE(REPLACE(description, '24 hour gym', 'gym'), '24-hour access', 'flexible access'), '24/7 gym', 'fitness center'),
updated_at = NOW()
WHERE slug IN (
  'reload-fitness-studio',
  'anaplasis-gym-fitness-center-limassol',
  'bodysense-healthfitness-centre',
  'her-gym-limassol'
);

COMMIT;

