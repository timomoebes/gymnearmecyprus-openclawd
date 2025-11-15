-- Fix truncated gym descriptions
-- Generated: 2025-11-15T19:30:34.475435
-- Total gyms: 2
-- Note: Uses slug to match gyms (slug is unique)

BEGIN;

UPDATE gyms
SET description = 'Uppercut Team Cyprus Boxing - Kickboxing School In Strovolos Nicosia is a highly rated 5.0-star boxing in Nicosia, Cyprus, offering boxing training. Located on Costa Anaxagora 21B, this boxing gym offers boxing classes suitable for all fitness levels. With a 5.0 rating and 31 reviews, it''s recognized as one of the best boxings in Nicosia. Join this premier Nicosia boxing for expert boxing training.', updated_at = NOW()
WHERE slug = 'uppercut-team-cyprus-boxing-kickboxing-school-in-strovolos-nicosia';

UPDATE gyms
SET description = 'Fitensity Training Club is a highly rated 5.0-star personal trainer in Nicosia, Cyprus, offering personalized training. Located on Denousis, this personal training offers one-on-one coaching suitable for all fitness levels. With a 5.0 rating and 11 reviews, it''s recognized as one of the best personal trainers in Nicosia. Whether you''re looking for one-on-one training in Nicosia, customized fitness programs, or personal training sessions, Fitensity Training Club provides expert instruction in a welcoming environment. Join this premier Nicosia personal trainer for expert personalized training.', updated_at = NOW()
WHERE slug = 'fitensity-training-club';

COMMIT;
