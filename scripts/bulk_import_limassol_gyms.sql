-- Bulk Import: Remaining Limassol Gyms
-- Generated: 2025-11-12T20:05:32.952077
-- Total gyms: 45
-- Excluded slugs: limassol-fitness, vinyasa-yoga-studio-limassol, soul-vibe-space, piero-judo-academy, ballet-school-pilates-studio-monika-perikleous

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
    '14b5d2f7-21dd-429a-a70d-2637580bc5c0',
    'Endless Flow',
    'endless-flow',
    NULL,
    'Amfissis 6, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
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
    5.0,
    10,
    NULL,
    '2025-11-12T18:05:32.944098Z',
    '2025-11-12T18:05:32.944098Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('14b5d2f7-21dd-429a-a70d-2637580bc5c0', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '553dce90-66b2-4015-b00c-31df15bfe9b1',
    'Nicos Solomonides Indoor Arena Ael',
    'nicos-solomonides-indoor-arena-ael',
    NULL,
    'Μόρφου 9A, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    NULL,
    NULL,
    'http://actioninsports.com/',
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
    19,
    NULL,
    '2025-11-12T18:05:32.944098Z',
    '2025-11-12T18:05:32.944098Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('553dce90-66b2-4015-b00c-31df15bfe9b1', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'abc2af98-a955-4b26-a23d-2d71c5bc7592',
    'No75Space',
    'no75space',
    NULL,
    'Thesalonikis 75-3025, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799000055',
    NULL,
    'http://no75space.com/',
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
    27,
    NULL,
    '2025-11-12T18:05:32.944098Z',
    '2025-11-12T18:05:32.944098Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('abc2af98-a955-4b26-a23d-2d71c5bc7592', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '4febf585-14d9-4cae-8689-54440536d221',
    'Checkmat Limassol',
    'checkmat-limassol',
    NULL,
    'Pafou 74, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35797442244',
    NULL,
    'https://checkmat.cy/',
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
    22,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('4febf585-14d9-4cae-8689-54440536d221', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    'edeeb1aa-ad6b-457c-a840-89bfc8249b10',
    'Mma School The Cage',
    'mma-school-the-cage',
    NULL,
    'Jean Sibelius και, Γεωργίου Παυλίδη 12, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799817412',
    NULL,
    'http://www.mmathecage.com/',
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
    23,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('edeeb1aa-ad6b-457c-a840-89bfc8249b10', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'ee0123e8-49df-4c2b-8f9b-ab46d9fcf21e',
    'Catman Olympic Boxing Academy C7M',
    'catman-olympic-boxing-academy-c7m',
    NULL,
    'Riga Fereou 2, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799408750',
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
    11,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('ee0123e8-49df-4c2b-8f9b-ab46d9fcf21e', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '30624470-1e15-4a86-9c3d-04e1ace4f6a3',
    'Gymania Personal Trainer',
    'gymania-personal-trainer',
    NULL,
    'Ierou Lochou, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799786469',
    NULL,
    'http://www.gymaniafitnessclub.com/',
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
    103,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('30624470-1e15-4a86-9c3d-04e1ace4f6a3', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    '1f9fcb9b-48b9-487b-9d8d-0d31a100da1d',
    'Target Boxing Club',
    'target-boxing-club',
    NULL,
    'Eleftherias 129, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799662217',
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
    21,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('1f9fcb9b-48b9-487b-9d8d-0d31a100da1d', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    'c0f6db87-bd17-4e22-8503-25a49b0624b9',
    'Kpk Performance & Rehabilitation Center',
    'kpk-performance-rehabilitation-center',
    NULL,
    'Spyrou Kyprianou Ave 124, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799465681',
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
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('c0f6db87-bd17-4e22-8503-25a49b0624b9', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '0ba7b97e-f557-4f34-9793-b37f7195fe75',
    'Lumpinee Gym - Muay Thai - Muay Boran - Personal Training - Fighting Club - Limassol - Cyprus',
    'lumpinee-gym-muay-thai-muay-boran-personal-training-fighting-club-limassol-cyprus',
    NULL,
    'Akarnanias, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799696035',
    NULL,
    'https://lumpineegymlimassol.wixsite.com/lumpineegym',
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
    22,
    NULL,
    '2025-11-12T18:05:32.945078Z',
    '2025-11-12T18:05:32.945078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('0ba7b97e-f557-4f34-9793-b37f7195fe75', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '8556221d-e40f-4291-9c84-85fd6990bd87',
    'Peak Condition Cyprus',
    'peak-condition-cyprus',
    NULL,
    'Vasileos Konstantinou 152-1st Floor, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35797741389',
    NULL,
    'https://www.peakconditioncy.com/',
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
    43,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8556221d-e40f-4291-9c84-85fd6990bd87', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    'aa9ecf72-204b-4e56-a44f-10bf94546e49',
    'Body Advance Personal Training Studio',
    'body-advance-personal-training-studio',
    NULL,
    'Akapnitis Court, 2nd Floor, Arch. Makarios III Avenue 161, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799239777',
    NULL,
    'http://www.bodyadvance.net/',
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
    22,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('aa9ecf72-204b-4e56-a44f-10bf94546e49', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '2afce707-d5f5-4e6a-bc0e-69d74a57ca8c',
    'Studio Iv 360 Pilates & Beyond',
    'studio-iv-360-pilates-beyond',
    NULL,
    'Nikodimou Milona 7, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799674707',
    NULL,
    'https://instagram.com/studio_iv_pilates?igshid=YmMyMTA2M2Y=',
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
    4.0,
    14,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('2afce707-d5f5-4e6a-bc0e-69d74a57ca8c', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'da9cd76e-633e-4f42-9864-1c5537f2419e',
    'Contrology Studio',
    'contrology-studio',
    NULL,
    'Arch. Makarios III Avenue 59, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799282127',
    NULL,
    'https://linktr.ee/Contrologystudio',
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
    12,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('da9cd76e-633e-4f42-9864-1c5537f2419e', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '35df2ba5-6a08-4a15-b5de-10914a651c11',
    'Un1T',
    'un1t',
    NULL,
    'Georgiou ''A 45, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35796727088',
    NULL,
    'https://un1t.com/un1t-limassol/',
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
    32,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('35df2ba5-6a08-4a15-b5de-10914a651c11', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '974fde39-ac69-4e4d-ae57-1d5741e63c78',
    'Kinetic Fitness Studio',
    'kinetic-fitness-studio',
    NULL,
    'Aygerinou, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
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
    5.0,
    54,
    NULL,
    '2025-11-12T18:05:32.946076Z',
    '2025-11-12T18:05:32.946076Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('974fde39-ac69-4e4d-ae57-1d5741e63c78', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '76b10876-ba56-4bfc-bb4f-02b9a2f26a05',
    'Fitness Lab',
    'fitness-lab',
    NULL,
    'M2XC+WP6, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799335631',
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
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('76b10876-ba56-4bfc-bb4f-02b9a2f26a05', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '8b4a729b-e7af-4902-a090-bca0ec34d564',
    'Dainas Planet Fitness',
    'dainas-planet-fitness',
    NULL,
    'Ekalis 16, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35796841700',
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
    14,
    NULL,
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8b4a729b-e7af-4902-a090-bca0ec34d564', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '987609c1-0f6b-429f-a7f2-7a0a76bfdc51',
    'Kinetic Pilates Studio',
    'kinetic-pilates-studio',
    NULL,
    'Archiepiskopou Makariou C'' Avenue 71, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799594937',
    NULL,
    'https://instagram.com/kineticpilates_studio?igshid=NTc4MTIwNjQ2YQ==',
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
    44,
    NULL,
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('987609c1-0f6b-429f-a7f2-7a0a76bfdc51', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'fa367703-9522-43b5-a65e-33c04e0371e6',
    'SavS Gym',
    'savs-gym',
    NULL,
    '214 Kanika Ideal Building, Μακαρίου ΙΙΙ, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799460468',
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
    15,
    NULL,
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('fa367703-9522-43b5-a65e-33c04e0371e6', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '233f6806-4391-4fcd-9cc9-5e680d3881f1',
    'Combat & Fitness',
    'combat-fitness',
    NULL,
    'Vasileos Pavlou 44, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35797585658',
    NULL,
    'https://www.combatandfitness.com/',
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
    15,
    NULL,
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('233f6806-4391-4fcd-9cc9-5e680d3881f1', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'a34ec215-d257-4bc3-97dc-75ab91479009',
    'Limassol Sporting Center',
    'limassol-sporting-center',
    NULL,
    'I BRIDGE, GEORGIOU NEOFYDOU 24,MESA GEITONIA, HOUSE BLOCK D, FLAT G2, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    NULL,
    NULL,
    'https://www.limassolsportingcenter.com/',
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
    3.2,
    276,
    NULL,
    '2025-11-12T18:05:32.947077Z',
    '2025-11-12T18:05:32.947077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('a34ec215-d257-4bc3-97dc-75ab91479009', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'ee2b54d4-8643-47f9-b841-4e15c7d4a38a',
    'Bodyfitness Gym Center',
    'bodyfitness-gym-center',
    NULL,
    'Jean Sibelius, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799817412',
    NULL,
    'https://bodyfitnessgymcentre.com/',
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
    45,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('ee2b54d4-8643-47f9-b841-4e15c7d4a38a', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '68b740e3-e41b-46f4-86fe-b9bd55f13bc4',
    'Asf&Performance Limassol Cyprus Gym Taekwondo ',
    'asfperformance-limassol-cyprus-gym-taekwondo',
    NULL,
    'Vasileos Konstantinou 21-SHOP 5, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799851085',
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
    23,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('68b740e3-e41b-46f4-86fe-b9bd55f13bc4', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'd86f1e1e-1049-4acc-a8bb-7d0b4e8fd8b3',
    'Crossfit Limassol',
    'crossfit-limassol',
    NULL,
    'Shakespeare 9, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725340271',
    NULL,
    'http://www.crossfitlimassol.com/',
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
    87,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('d86f1e1e-1049-4acc-a8bb-7d0b4e8fd8b3', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '9d6ad166-f14a-4368-b554-c1be4942bca5',
    'Iron Fitness',
    'iron-fitness',
    NULL,
    'Agias Fylaxeos, & 1, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35796509265',
    NULL,
    'http://ironfitnesslimassol.com/',
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
    234,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('9d6ad166-f14a-4368-b554-c1be4942bca5', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    '7ff899aa-1049-49c8-9c9b-c83b0b515fc7',
    'Ara Gym Xl',
    'ara-gym-xl',
    NULL,
    'Mishiaouli kai kavazglou kai anti filita 1 LIMASSOL, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725006942',
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
    166,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('7ff899aa-1049-49c8-9c9b-c83b0b515fc7', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '8a1f20bd-14d7-4638-bb19-50ac20672d26',
    'Team Rogue Forge',
    'team-rogue-forge',
    NULL,
    'Spyrou Kyprianou Ave 116, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725101116',
    NULL,
    'https://www.teamrogueforge.com.cy/',
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
    19,
    NULL,
    '2025-11-12T18:05:32.948078Z',
    '2025-11-12T18:05:32.948078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8a1f20bd-14d7-4638-bb19-50ac20672d26', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '614d148a-ee1b-4b54-b3e7-d00e1374781b',
    'Reload Fitness Studio',
    'reload-fitness-studio',
    NULL,
    'Eleftherias 119, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725583382',
    NULL,
    'https://reload-fitness.com/',
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
    71,
    NULL,
    '2025-11-12T18:05:32.949078Z',
    '2025-11-12T18:05:32.949078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('614d148a-ee1b-4b54-b3e7-d00e1374781b', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '3639691d-02df-400d-9e5a-60700a4f4020',
    'Muscle Factory 24 Hours',
    'muscle-factory-24-hours',
    NULL,
    'Georgiou Griva Digeni 16, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725108234',
    NULL,
    'https://www.musclefactory24hrs.com/',
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
    203,
    NULL,
    '2025-11-12T18:05:32.949078Z',
    '2025-11-12T18:05:32.949078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('3639691d-02df-400d-9e5a-60700a4f4020', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '7100847d-4663-4523-9087-5e41c4f99b04',
    'Grind Fitness',
    'grind-fitness',
    NULL,
    'Steliou Kiriakidi, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799810035',
    NULL,
    'https://grindfitnesscy.com/',
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
    73,
    NULL,
    '2025-11-12T18:05:32.949078Z',
    '2025-11-12T18:05:32.949078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('7100847d-4663-4523-9087-5e41c4f99b04', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '242239c1-b299-463c-8081-4e9180d17c35',
    'Vip-Gym',
    'vip-gym',
    NULL,
    'Steliou Kiriakidi, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35777776525',
    NULL,
    'http://www.vipgym.com.cy/',
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
    93,
    NULL,
    '2025-11-12T18:05:32.949078Z',
    '2025-11-12T18:05:32.949078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('242239c1-b299-463c-8081-4e9180d17c35', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '672c643d-1345-48d8-bb4b-6a4d08eb7995',
    'Anaplasis Gym Fitness Center Limassol',
    'anaplasis-gym-fitness-center-limassol',
    NULL,
    'Kanika Business Center, Enaerios, 28 October Ave 319A, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725585242',
    NULL,
    'https://www.anaplasisgym.com.cy/',
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
    751,
    NULL,
    '2025-11-12T18:05:32.949078Z',
    '2025-11-12T18:05:32.949078Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('672c643d-1345-48d8-bb4b-6a4d08eb7995', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'ba760ac1-86d8-4c25-950f-9248084d8e69',
    'Gymania Fitness Club',
    'gymania-fitness-club',
    NULL,
    'Agias Filaxeos, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725253202',
    NULL,
    'http://www.gymaniafitnessclub.com/',
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
    363,
    NULL,
    '2025-11-12T18:05:32.950100Z',
    '2025-11-12T18:05:32.950100Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('ba760ac1-86d8-4c25-950f-9248084d8e69', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '1d89e871-d43e-4565-9f7c-e4674aa84112',
    'Champ Boxing Academy',
    'champ-boxing-academy',
    NULL,
    'TK 3082, Rizokarpasou 27, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799332615',
    NULL,
    'http://www.champboxingacademy.com/',
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
    '2025-11-12T18:05:32.950100Z',
    '2025-11-12T18:05:32.950100Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('1d89e871-d43e-4565-9f7c-e4674aa84112', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    '26de65c7-78de-4e31-afc4-fd431078620f',
    'Her Gym Limassol',
    'her-gym-limassol',
    NULL,
    'Omonoias 19, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725255266',
    NULL,
    'https://hergym.cy/',
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
    109,
    NULL,
    '2025-11-12T18:05:32.950100Z',
    '2025-11-12T18:05:32.950100Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('26de65c7-78de-4e31-afc4-fd431078620f', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'c05a935d-e997-44bd-80ed-3b74c11b34f7',
    'Dreamchasers Fitness Studio',
    'dreamchasers-fitness-studio',
    NULL,
    'Kekropos 8, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35797664716',
    NULL,
    'https://dreamchasers.cy/',
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
    56,
    NULL,
    '2025-11-12T18:05:32.950100Z',
    '2025-11-12T18:05:32.950100Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('c05a935d-e997-44bd-80ed-3b74c11b34f7', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'f14a5902-dd82-4acc-989e-21ade93ee710',
    '5 Rounds Mma Limassol',
    '5-rounds-mma-limassol',
    NULL,
    'BASEMENT, Misiaouli & Kavazoglou 27, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799848288',
    NULL,
    'https://www.facebook.com/5-Rounds-MMA-Limassol-110644453668694/',
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
    37,
    NULL,
    '2025-11-12T18:05:32.950100Z',
    '2025-11-12T18:05:32.950100Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f14a5902-dd82-4acc-989e-21ade93ee710', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '28b34302-f8cd-457f-8bd2-90e6bb9aaa71',
    'Slim And Smart Fitness Studio',
    'slim-and-smart-fitness-studio',
    NULL,
    'Agiou Andreou 350, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35796701181',
    NULL,
    'https://www.instagram.com/slim_and_smart_cyprus/',
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
    13,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('28b34302-f8cd-457f-8bd2-90e6bb9aaa71', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '4fca35b5-7f82-426c-9193-a8add7136a56',
    'R-Evolution Of Gym',
    'r-evolution-of-gym',
    NULL,
    'Franklin Roosevelt 216, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35799884899',
    NULL,
    'https://m.facebook.com/Revolutionofgym/',
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
    12,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('4fca35b5-7f82-426c-9193-a8add7136a56', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '43af1896-8137-4c02-a601-1b34fbda6c2d',
    'Progress Gym',
    'progress-gym',
    NULL,
    'Katholiki, 1,Voriou Ipeirou Street, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    NULL,
    NULL,
    'https://www.instagram.com/progressgymcy?igsh=MWFodW9pbWJnOWI5Nw==',
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
    30,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('43af1896-8137-4c02-a601-1b34fbda6c2d', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'af1fed48-1ca3-4a2f-8251-d31241929a45',
    'Bodysense Health&Fitness Centre',
    'bodysense-healthfitness-centre',
    NULL,
    'Αγγαιου 3-4154, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725574646',
    NULL,
    'https://www.facebook.com/BodysenseLimassol/',
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
    37,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('af1fed48-1ca3-4a2f-8251-d31241929a45', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '083306fa-58c3-4195-96b4-ff51789b3369',
    'The Fitzone By Kondylis',
    'the-fitzone-by-kondylis',
    NULL,
    'Spyrou Kyprianou Ave 145, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725750476',
    NULL,
    'https://linktr.ee/thefitzonebykondylis',
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
    42,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('083306fa-58c3-4195-96b4-ff51789b3369', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    '89e1e5b8-e331-4e46-823d-42478fc9904f',
    'Kalopedi Gym',
    'kalopedi-gym',
    NULL,
    'Pikioni, Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35725332900',
    NULL,
    'https://www.instagram.com/kalopedifitnessclub/',
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
    33,
    NULL,
    '2025-11-12T18:05:32.951083Z',
    '2025-11-12T18:05:32.951083Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('89e1e5b8-e331-4e46-823d-42478fc9904f', '175c7168-835e-4955-9d15-730b57f9b9ff')
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
    'cf7a453b-01b5-4d59-88a5-f99a889e9cd8',
    'Raw Calisthenics Academy',
    'raw-calisthenics-academy',
    NULL,
    'M.L.K., Limassol, Cyprus',
    'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    34.7071,
    33.0226,
    '+35797452944',
    NULL,
    'https://instagram.com/raw_calisthenicsacademy?igshid=YmMyMTA2M2Y=',
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
    92,
    NULL,
    '2025-11-12T18:05:32.952077Z',
    '2025-11-12T18:05:32.952077Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('cf7a453b-01b5-4d59-88a5-f99a889e9cd8', '175c7168-835e-4955-9d15-730b57f9b9ff')
ON CONFLICT DO NOTHING;


COMMIT;
