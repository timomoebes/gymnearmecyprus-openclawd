-- Update Enriched Gym Data
-- Generated from web scraping enrichment

BEGIN;


INSERT INTO gym_amenities (gym_id, amenity_id)
VALUES ('c1cedf1e-46b3-45d8-8e2a-14ccb3e9724b', '10959b05-8018-4780-a7d5-5053086d246a')
ON CONFLICT DO NOTHING;


INSERT INTO gym_amenities (gym_id, amenity_id)
VALUES ('e685a26c-b80b-4358-8eef-4ef399eada84', 'e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd')
ON CONFLICT DO NOTHING;


INSERT INTO gym_amenities (gym_id, amenity_id)
VALUES ('e685a26c-b80b-4358-8eef-4ef399eada84', '030fd487-234b-450b-9080-c48419d88266')
ON CONFLICT DO NOTHING;


UPDATE gyms
SET opening_hours = '{"mon": "6.30pm-8.30pm", "wed": "6.30pm-8.00pm", "thu": "6.00pm-8.00pm", "fri": "6.30pm-8.00pm", "sat": "8.30am-10.00am", "sun": "closed", "tue": "6.00pm-8.00pm"}'::jsonb, updated_at = NOW()
WHERE id = '8c1521e6-7412-4b73-ac90-3547fe972156';


INSERT INTO gym_amenities (gym_id, amenity_id)
VALUES ('8c1521e6-7412-4b73-ac90-3547fe972156', '10959b05-8018-4780-a7d5-5053086d246a')
ON CONFLICT DO NOTHING;


COMMIT;
