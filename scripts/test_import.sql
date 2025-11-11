-- Test Import: 5 Limassol Gyms
-- Generated: 2025-11-11T21:52:17.627895

BEGIN;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'c1cedf1e-46b3-45d8-8e2a-14ccb3e9724b',
    'Ballet School & Pilates Studio Monika Perikleous',
    'ballet-school-pilates-studio-monika-perikleous',
    NULL,
    'Kosti Palama 57, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.6890308,
    33.0507125,
    '35799785748',
    NULL,
    'https://www.monicadancepilatesstudio.com/',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    NULL,
    NULL,
    NULL,
    false,
    true,
    NULL,
    5.0,
    18,
    NULL,
    '2025-11-11T19:52:17.625889Z',
    '2025-11-11T19:52:17.625889Z'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('c1cedf1e-46b3-45d8-8e2a-14ccb3e9724b', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
ON CONFLICT DO NOTHING;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '8c1521e6-7412-4b73-ac90-3547fe972156',
    'Vinyasa Yoga Studio Limassol',
    'vinyasa-yoga-studio-limassol',
    NULL,
    'Athina Court, Ypsilantou 6, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '35725106848',
    NULL,
    'http://www.vinyasayogacyprus.com/',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    NULL,
    NULL,
    NULL,
    false,
    true,
    NULL,
    5.0,
    17,
    NULL,
    '2025-11-11T19:52:17.625889Z',
    '2025-11-11T19:52:17.625889Z'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8c1521e6-7412-4b73-ac90-3547fe972156', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
ON CONFLICT DO NOTHING;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'f13c086f-b981-408a-883a-f961cace6e52',
    'Piero Judo Academy',
    'piero-judo-academy',
    NULL,
    'Eustathiou Paraskeva 18, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '35799580158',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    NULL,
    NULL,
    NULL,
    false,
    true,
    NULL,
    5.0,
    122,
    NULL,
    '2025-11-11T19:52:17.626908Z',
    '2025-11-11T19:52:17.626908Z'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f13c086f-b981-408a-883a-f961cace6e52', '7a0ab816-372c-410c-a373-9e7794cac9e6')
ON CONFLICT DO NOTHING;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'e685a26c-b80b-4358-8eef-4ef399eada84',
    'Limassol Fitness',
    'limassol-fitness',
    NULL,
    'Eleftherias 109-3042, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7154633,
    33.1101986,
    '35795144819',
    NULL,
    'http://limassol-fitness.com/',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    NULL,
    NULL,
    NULL,
    false,
    true,
    NULL,
    5.0,
    11,
    NULL,
    '2025-11-11T19:52:17.626908Z',
    '2025-11-11T19:52:17.626908Z'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('e685a26c-b80b-4358-8eef-4ef399eada84', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
ON CONFLICT DO NOTHING;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'f2b85511-93a3-45dd-b2e1-e8cee676e732',
    'Soul Vibe Space',
    'soul-vibe-space',
    NULL,
    'Agias Zonis 50, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.6805802,
    33.0432715,
    '35795642888',
    NULL,
    'https://soulvibespace.simplybook.it/',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    false,
    NULL,
    NULL,
    NULL,
    false,
    true,
    NULL,
    4.7,
    12,
    NULL,
    '2025-11-11T19:52:17.626908Z',
    '2025-11-11T19:52:17.626908Z'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f2b85511-93a3-45dd-b2e1-e8cee676e732', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
ON CONFLICT DO NOTHING;


COMMIT;
