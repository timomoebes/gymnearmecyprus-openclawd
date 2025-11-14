-- Fix incorrect 24-hour-gym specialty assignments
-- This removes incorrect "24-hour-gym" tags and reassigns gyms to correct specialties
-- Only "Muscle Factory 24 Hours" is verified as a 24-hour gym (name contains "24")

BEGIN;

-- Specialty UUIDs
-- 24-hour-gym: 175c7168-835e-4955-9d15-730b57f9b9ff
-- mma: 7a0ab816-372c-410c-a373-9e7794cac9e6
-- boxing: f6559489-8266-42f2-aea9-89a3a76eeea0
-- pilates: b85cb2e6-fb93-4167-aa98-d5f4444061b1
-- personal-trainer: 1b9ecd3b-fe53-4432-9dc0-978f90eaacb3
-- crossfit: ca21235b-511e-40d0-8772-9fb070ab7cf5

-- Remove incorrect 24-hour-gym assignments (keeping only "Muscle Factory 24 Hours")
-- We'll remove all, then add back only the verified one

-- Remove 24-hour-gym from all gyms first
DELETE FROM gym_specialties
WHERE specialty_id = '175c7168-835e-4955-9d15-730b57f9b9ff';

-- Re-add 24-hour-gym ONLY to verified gym: "Muscle Factory 24 Hours"
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT id, '175c7168-835e-4955-9d15-730b57f9b9ff'
FROM gyms
WHERE slug = 'muscle-factory-24-hours';

-- Reassign MMA gyms
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, '7a0ab816-372c-410c-a373-9e7794cac9e6'
FROM gyms g
WHERE g.slug IN (
  '5-rounds-mma-limassol',
  'mma-school-the-cage',
  'asfperformance-limassol-cyprus-gym-taekwondo',
  'combat-fitness'
)
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = '7a0ab816-372c-410c-a373-9e7794cac9e6'
);

-- Reassign Boxing gym
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, 'f6559489-8266-42f2-aea9-89a3a76eeea0'
FROM gyms g
WHERE g.slug = 'catman-olympic-boxing-academy-c7m'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = 'f6559489-8266-42f2-aea9-89a3a76eeea0'
);

-- Reassign CrossFit gym
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, 'ca21235b-511e-40d0-8772-9fb070ab7cf5'
FROM gyms g
WHERE g.slug = 'crossfit-limassol'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = 'ca21235b-511e-40d0-8772-9fb070ab7cf5'
);

-- Reassign Pilates gym
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, 'b85cb2e6-fb93-4167-aa98-d5f4444061b1'
FROM gyms g
WHERE g.slug = 'contrology-studio'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = 'b85cb2e6-fb93-4167-aa98-d5f4444061b1'
);

-- Reassign Personal Trainer gym
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3'
FROM gyms g
WHERE g.slug = 'body-advance-personal-training-studio'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3'
);

-- Note: All other gyms (general gyms like "Ara Gym Xl", "Grind Fitness", etc.)
-- will have NO specialty assigned, which is correct. They are general gyms
-- and should not be tagged as 24-hour unless verified.

COMMIT;

-- Verification query (run after commit to check results):
-- SELECT 
--   g.name,
--   s.name as specialty_name
-- FROM gyms g
-- LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
-- LEFT JOIN specialties s ON gs.specialty_id = s.id
-- WHERE g.slug IN (
--   'muscle-factory-24-hours',
--   '5-rounds-mma-limassol',
--   'mma-school-the-cage',
--   'catman-olympic-boxing-academy-c7m',
--   'crossfit-limassol',
--   'contrology-studio',
--   'body-advance-personal-training-studio',
--   'ara-gym-xl',
--   'grind-fitness'
-- )
-- ORDER BY g.name;

