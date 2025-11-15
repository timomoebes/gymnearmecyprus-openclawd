-- Bulk Import: Paphos Gyms
-- Generated: 2025-11-15T21:14:09.284608
-- Total gyms: 34

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
    'b11d6f68-116e-4467-ad74-b1c24543b1da',
    'The Hood Fitness House',
    'the-hood-fitness-house',
    NULL,
    'Amathountos, Konia, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799050192',
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
    16,
    NULL,
    '2025-11-15T19:14:09.279607Z',
    '2025-11-15T19:14:09.279607Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'ab6ee237-c6e4-4d7d-9640-ff121ceb9d60',
    'Kings Brazilian Jiu Jitsu',
    'kings-brazilian-jiu-jitsu',
    NULL,
    'Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799923388',
    NULL,
    'http://www.kingsbjj.com/',
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
    64,
    NULL,
    '2025-11-15T19:14:09.279607Z',
    '2025-11-15T19:14:09.279607Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('ab6ee237-c6e4-4d7d-9640-ff121ceb9d60', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '58a6338c-3d9f-48a3-b8b3-66b6775150e6',
    'Pilates Reformer Studio',
    'pilates-reformer-studio',
    NULL,
    'Laouri Ioanni 30, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799180656',
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
    13,
    NULL,
    '2025-11-15T19:14:09.280613Z',
    '2025-11-15T19:14:09.280613Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('58a6338c-3d9f-48a3-b8b3-66b6775150e6', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '9cd1705d-1d94-464b-9bdc-c303b510a5c9',
    'Zr Jiu Jitsu',
    'zr-jiu-jitsu',
    NULL,
    'Ioanni Agroti 11, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799028069',
    NULL,
    'https://m.facebook.com/pages/category/Community/Ze-Radiola-Team-Cyprus-580163358824687/',
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
    4.9,
    17,
    NULL,
    '2025-11-15T19:14:09.280613Z',
    '2025-11-15T19:14:09.280613Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('9cd1705d-1d94-464b-9bdc-c303b510a5c9', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '8c3b32ed-5e08-4c71-9d17-12c6f8e58fba',
    'Soulutionpilates&More',
    'soulutionpilatesmore',
    NULL,
    '25 Martiou 38, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35796724446',
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
    4.5,
    22,
    NULL,
    '2025-11-15T19:14:09.280613Z',
    '2025-11-15T19:14:09.280613Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8c3b32ed-5e08-4c71-9d17-12c6f8e58fba', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'a385a0e4-3936-4543-9491-00a649b58ef8',
    'Team Akopian',
    'team-akopian',
    NULL,
    'Nikou Kazantzaki, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35796872909',
    NULL,
    'https://m.facebook.com/artouros.akopian/',
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
    20,
    NULL,
    '2025-11-15T19:14:09.280613Z',
    '2025-11-15T19:14:09.280613Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('a385a0e4-3936-4543-9491-00a649b58ef8', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '99005d49-97e7-4427-a46e-8cf9cbba5147',
    'Furious Fighters',
    'furious-fighters',
    NULL,
    'Ionias 31, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35797904854',
    NULL,
    'https://www.instagram.com/furious_fighters_',
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
    32,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('99005d49-97e7-4427-a46e-8cf9cbba5147', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    'e210fd91-d802-41f1-a973-32956d0d636c',
    'Aa Power Mode',
    'aa-power-mode',
    NULL,
    'Democracy Ave 102, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799932975',
    NULL,
    'http://aapowermode.com/',
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
    4.9,
    10,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '99e54796-c990-4f6a-83f6-42abd096e084',
    'Akba Health Care Center',
    'akba-health-care-center',
    NULL,
    'Makariou III Ave 24, Emba, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726270620',
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
    4.9,
    15,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '6568ebcb-4dd4-4bc1-964a-f446426c35b4',
    'Personal Trainer - Paphos Kissonerga & Peyia',
    'personal-trainer-paphos-kissonerga-peyia',
    NULL,
    'Marcantoniou Bragadinou, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799856432',
    NULL,
    'https://www.paphos-training.com/',
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
    10,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'f81d2275-06c7-47e5-ba76-12820bdfa21d',
    'Dinamico Personal Training Center',
    'dinamico-personal-training-center',
    NULL,
    'theodorou zinonos 10, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799743850',
    NULL,
    'http://www.dinamicotraining.com/',
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
    4.8,
    13,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f81d2275-06c7-47e5-ba76-12820bdfa21d', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    'bdfae3f5-54b2-41b4-9516-2f169e34fe70',
    'Mg Fitness Club',
    'mg-fitness-club',
    NULL,
    'QCQ5+3P2, Unnamed Road, Chlorakas, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799544186',
    NULL,
    'https://mgfitness.club/',
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
    4.6,
    52,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '311c1f86-baed-4021-b4e1-e9b5805bf25d',
    'JohnnyS Personal Training',
    'johnnys-personal-training',
    NULL,
    'Agiou Panaretou, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799531393',
    NULL,
    'https://johnnyspersonaltraining.com/',
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
    24,
    NULL,
    '2025-11-15T19:14:09.281623Z',
    '2025-11-15T19:14:09.281623Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'ba188c2f-1f68-43ac-aaf7-100e4d850093',
    'Aesthetics Fitness Club',
    'aesthetics-fitness-club',
    NULL,
    '3, Makariou III Ave, Chlorakas, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35770001928',
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
    4.6,
    114,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '6e043354-87fd-4841-9cf7-279ac6995c89',
    'Paphos Professional Boxing Gym',
    'paphos-professional-boxing-gym',
    NULL,
    'Marcantoniou Bragadinou, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799715937',
    NULL,
    'https://fit2fightcyprus.com/',
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
    36,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('6e043354-87fd-4841-9cf7-279ac6995c89', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    '0c3d37ce-a767-4a3f-bdf7-3e067c7df4cc',
    'Poseidonio Health Spa And Fitness Center',
    'poseidonio-health-spa-and-fitness-center',
    NULL,
    'Democracy Ave 132, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799573445',
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
    4.3,
    28,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'ad9c902a-4f24-4d69-a57b-17be9137c2d1',
    'Municipality Gym',
    'municipality-gym',
    NULL,
    'Q9RW+5FH, Unnamed Road, Chlorakas, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    NULL,
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
    4.6,
    16,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '1dd498c4-c2be-46eb-9cc2-bf01a05ea4e4',
    'Aidinidis Fight Club',
    'aidinidis-fight-club',
    NULL,
    'Athinas 60, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799894896',
    NULL,
    'https://www.facebook.com/AidinidisFightClub/',
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
    16,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('1dd498c4-c2be-46eb-9cc2-bf01a05ea4e4', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    'c7ef81d7-6f19-4f49-ad7e-d715283d085b',
    'JohnnyS Gym',
    'johnnys-gym',
    NULL,
    'B7 90, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799946129',
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
    4.9,
    62,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '52ce7a2f-4ebb-4f8f-ad64-84fa20218341',
    'Fiit Paphos Training Room',
    'fiit-paphos-training-room',
    NULL,
    'Neapolis University, Danaes Ave 2, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799804713',
    NULL,
    'https://fiitpaphos.taplink.ws/',
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
    4.8,
    75,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '0732ae25-21a0-4eeb-8e93-8b120aca13a8',
    'Nayara Fonseca Aerial',
    'nayara-fonseca-aerial',
    NULL,
    'Andrea Ioannou, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35797450567',
    NULL,
    'https://www.instagram.com/nayarafonseca.aerial',
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
    16,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '0b924236-928d-43ca-8609-1acc92ae9388',
    'Vo2 Fitness Center - Personal Training Studio',
    'vo2-fitness-center-personal-training-studio',
    NULL,
    'B7 13-1st floor, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799482485',
    NULL,
    'https://vo2fitnesscenter.com/',
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
    4.9,
    68,
    NULL,
    '2025-11-15T19:14:09.282609Z',
    '2025-11-15T19:14:09.282609Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('0b924236-928d-43ca-8609-1acc92ae9388', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    '1142ac5f-587a-4736-9b7b-3539dfaa5d6b',
    'Star Fitness Gym Paphos Cyprus',
    'star-fitness-gym-paphos-cyprus',
    NULL,
    'Alexandroupoleos Ave 37, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726937000',
    NULL,
    'https://starfitnesscy.com/',
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
    4.8,
    133,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'f238e247-e4d5-48a4-9a67-7b16cea06168',
    'Vigour Studio Gym',
    'vigour-studio-gym',
    NULL,
    'Anexartisias, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726220470',
    NULL,
    'http://vigourstudio-gym.com/',
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
    32,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'fb74b34a-fe77-4232-bc61-e3b3661c6fc4',
    'Aesthetics Fitness Club Gold',
    'aesthetics-fitness-club-gold',
    NULL,
    'Georgiou Ch. Ioannidi, shop 1, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35770001582',
    NULL,
    'https://www.facebook.com/aestheticsgold/',
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
    4.4,
    240,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '3e704a7a-c5c9-4f7c-a9ad-fb4a75889f1a',
    'Bodyart Fitnessgym',
    'bodyart-fitnessgym',
    NULL,
    'Marcantoniou Bragadinou, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726221333',
    NULL,
    'https://instagram.com/bodyart_fitnessgym?igshid=YmMyMTA2M2Y=',
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
    4.5,
    34,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '1220cf06-44da-4d6f-a7ab-8a5fdec6b524',
    'Energy Fitness Gym',
    'energy-fitness-gym',
    NULL,
    'Democracy Ave, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    NULL,
    NULL,
    'https://www.facebook.com/energyfitnessgympaphos/',
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
    3.8,
    21,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '3e15cb59-26fa-4b1b-8c3f-bd5b4713c43c',
    'Hardcoretraining Gym Paphos',
    'hardcoretraining-gym-paphos',
    NULL,
    'Nikolaou Nikolaidi 19, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799542113',
    NULL,
    'https://www.facebook.com/Hardcoretraininggym/',
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
    23,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '149f0b8f-2c5b-4ea0-8f1c-5dbe183095d9',
    'Paphos Thai Boxing & Mma Fight Club Old Style Muay Thai',
    'paphos-thai-boxing-mma-fight-club-old-style-muay-thai',
    NULL,
    'Vasileos Constantinou XIII 26, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799461343',
    NULL,
    'https://www.instagram.com/paphos_muaythai_mma?igsh=MWswajFoejc0M3p2eg==',
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
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '6bea9ee0-3afc-4c73-ba37-b2915e435fae',
    'G Fitness',
    'g-fitness',
    NULL,
    'Charilaou Trikoupi 3, 8020, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35797799298',
    NULL,
    'https://www.facebook.com/Gp.fitnes',
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
    29,
    NULL,
    '2025-11-15T19:14:09.283614Z',
    '2025-11-15T19:14:09.283614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    'd7c71418-3f56-4988-8f59-cbc5fc9a4eb8',
    'West 34 Elite Fitness Club',
    'west-34-elite-fitness-club',
    NULL,
    'Thermopylon Rd, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799466327',
    NULL,
    'https://instagram.com/west34_elitefitnessclub?utm_medium=copy_link',
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
    4.9,
    28,
    NULL,
    '2025-11-15T19:14:09.284608Z',
    '2025-11-15T19:14:09.284608Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '62bbac4f-02f1-4498-9b53-bf73a1d03534',
    'Forma Personal Training Studio Gym',
    'forma-personal-training-studio-gym',
    NULL,
    'Georgiou Michael 13, Kato Paphos, Paphos, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35799845532',
    NULL,
    'https://www.facebook.com/forma.gym.paphos/',
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
    4.8,
    84,
    NULL,
    '2025-11-15T19:14:09.284608Z',
    '2025-11-15T19:14:09.284608Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '8730d7aa-7d75-4116-b306-9e6419523efb',
    'Gymnastika Fitness Center',
    'gymnastika-fitness-center',
    NULL,
    'Makariou III Ave 3, Yeroskipou, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726813388',
    NULL,
    'https://www.facebook.com/GymnastikaFitnessCenter/',
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
    4.5,
    47,
    NULL,
    '2025-11-15T19:14:09.284608Z',
    '2025-11-15T19:14:09.284608Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '52a7901e-a610-4820-a01a-c6c02969ac3d',
    'Hyper Fitness Club',
    'hyper-fitness-club',
    NULL,
    'B7 134, Mesogi, Cyprus',
    '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    34.7756,
    32.4244,
    '+35726652006',
    NULL,
    'https://www.facebook.com/hyperfitnessclubcy/',
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
    4.5,
    45,
    NULL,
    '2025-11-15T19:14:09.284608Z',
    '2025-11-15T19:14:09.284608Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


COMMIT;
