-- Bulk Import: Larnaca Gyms
-- Generated: 2025-11-15T20:09:44.411610
-- Total gyms: 43

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
    'a1715bf6-5720-4791-9091-e114f3bf82a1',
    'Foxteam Taekwondo Larnaca',
    'foxteam-taekwondo-larnaca',
    NULL,
    'Kleanthi Mesologgiti 4, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796005111',
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
    14,
    NULL,
    '2025-11-15T18:09:44.404614Z',
    '2025-11-15T18:09:44.404614Z'
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
    'f8bc03e1-5715-4e5e-be6e-ac4a03963e71',
    'Wellnest Pilates Studio',
    'wellnest-pilates-studio',
    NULL,
    'Orthodoxias 1, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796125943',
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
    17,
    NULL,
    '2025-11-15T18:09:44.404614Z',
    '2025-11-15T18:09:44.404614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f8bc03e1-5715-4e5e-be6e-ac4a03963e71', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'a3c75d72-1de3-4a10-92f6-0689491f3f8c',
    'Live Studio Mike',
    'live-studio-mike',
    NULL,
    'Anafis 5, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796502449',
    NULL,
    'http://www.livestudiomike.com/',
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
    47,
    NULL,
    '2025-11-15T18:09:44.404614Z',
    '2025-11-15T18:09:44.404614Z'
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
    'f6dd5667-7947-46b7-a23f-8f742c207591',
    'Eplarkou Pilates',
    'eplarkou-pilates',
    NULL,
    'Legacy-Chris Antoniou, Rafael Santi 28, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799377970',
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
    '2025-11-15T18:09:44.404614Z',
    '2025-11-15T18:09:44.404614Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f6dd5667-7947-46b7-a23f-8f742c207591', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '82faf077-a860-4aca-9539-2ce386f42c4d',
    'A Studio Pilates & Fitness',
    'a-studio-pilates-fitness',
    NULL,
    'Eleftherias 84 Larnaca, 7101, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796290414',
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
    39,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('82faf077-a860-4aca-9539-2ce386f42c4d', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '5b5cec53-e459-4589-9585-6f68281e840c',
    'Moksha Fitlab',
    'moksha-fitlab',
    NULL,
    'faneromenis avenue 189-191, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799075781',
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
    17,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('5b5cec53-e459-4589-9585-6f68281e840c', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'f00683e1-5b5c-4929-8886-601136c6817f',
    'Alignment Pilates Studio',
    'alignment-pilates-studio',
    NULL,
    'Artemidos, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799646996',
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
    66,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('f00683e1-5b5c-4929-8886-601136c6817f', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '8589241f-1599-45fb-a82a-197d8139c6ff',
    'Bareknuckle Crossfit',
    'bareknuckle-crossfit',
    NULL,
    'Faneromenis Ave 225, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796674327',
    NULL,
    'http://www.bareknucklecrossfit.com/',
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
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
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
    'c17a0d33-a50d-4870-9460-0a0dd3bcd241',
    'Gymland Ματσαγγίδης',
    'gymland-ματσαγγίδης',
    NULL,
    'Dimonikou 9, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724623520',
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
    11,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
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
    '0ce59950-5606-43f3-9276-48faad370b15',
    'Vital Strength Training',
    'vital-strength-training',
    NULL,
    'Artemidos 24, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799295679',
    NULL,
    'http://vitalstrength.fit/',
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
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('0ce59950-5606-43f3-9276-48faad370b15', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    'ab971ac3-71dd-445c-a71d-b7fc901fcfe8',
    'Olympia Movement',
    'olympia-movement',
    NULL,
    'Iacovou Patatsou, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799319223',
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
    17,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
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
    '88df34d0-129f-4e3e-8a67-e0a4b39b2d00',
    'Andreas Zachariou Holistic Sport Clinic',
    'andreas-zachariou-holistic-sport-clinic',
    NULL,
    'Eleftherias 84 Larnaca, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35770003400',
    NULL,
    'http://www.andreaszachariou.com/',
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
    95,
    NULL,
    '2025-11-15T18:09:44.405649Z',
    '2025-11-15T18:09:44.405649Z'
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
    '17234228-82dc-478b-a4c0-da4fc61ac3be',
    'Gymnastics Hall Larnaca',
    'gymnastics-hall-larnaca',
    NULL,
    'Iacovou Patatsou 29, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
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
    4.9,
    17,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    'ce7e0bdb-a83f-4601-9d31-7c4fa0cadcd2',
    'C Larnaca Red Box',
    'c-larnaca-red-box',
    NULL,
    'Dodekanisou 2, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799681659',
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
    28,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    'aaf4acbc-b78b-432d-bc7f-cf2cd43febed',
    'Outdoor Calisthenics Workout Spot',
    'outdoor-calisthenics-workout-spot',
    NULL,
    'Piale Pasa 15, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
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
    4.9,
    13,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    '7018ea49-9b9f-43df-94f4-4ee81fcad69b',
    'Cyprus Top Team CttMma Kickboxing MuaythaiBjj Fitness Gym',
    'cyprus-top-team-cttmma-kickboxing-muaythaibjj-fitness-gym',
    NULL,
    'Ivikou 52, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796548779',
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
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('7018ea49-9b9f-43df-94f4-4ee81fcad69b', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '262b6762-c4af-4a14-a094-9c506102cced',
    'Elit3 Fitness & Nutrition',
    'elit3-fitness-nutrition',
    NULL,
    'Stadiou 116, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724253231',
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
    27,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    '47f99e88-0d5f-4299-a299-e6fab898d6ac',
    'The Big Gym Of Functional Training And Yoga',
    'the-big-gym-of-functional-training-and-yoga',
    NULL,
    'Georgiou & Katoli 1, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    NULL,
    NULL,
    'http://3stepsbeyond.de/gym',
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
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    'afc32ced-1525-4e81-9fc1-a5ec9ba1b08f',
    'Diaplasis Premium Fitness',
    'diaplasis-premium-fitness',
    NULL,
    'WJJF+645 Agioi Anargyroi, Spyrou Kyprianou 86, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724663878',
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
    31,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    '2498dcae-9fcd-4737-b68b-8e2e01c5c972',
    'Samtsihara Fight System Global Academy',
    'samtsihara-fight-system-global-academy',
    NULL,
    'WJGM+8GX, Pavlou Valdaseridi, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
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
    437,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    'a70d3bdf-e06d-42bf-9124-dc57932d9a6b',
    'ProFit Center',
    'profit-center',
    NULL,
    'Αυστραλίας 2-6046, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796268420',
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
    44,
    NULL,
    '2025-11-15T18:09:44.406612Z',
    '2025-11-15T18:09:44.406612Z'
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
    '4bc15c02-8a6b-4413-89f6-644da67f7ceb',
    'Onyx Boutique Gym',
    'onyx-boutique-gym',
    NULL,
    'Agion Anargiron 40, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
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
    11,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    'fe73f4cc-2ae5-4d16-83bd-880c50a01f95',
    'The Big Gym Of Muay Thai And Fitness Larnaca',
    'the-big-gym-of-muay-thai-and-fitness-larnaca',
    NULL,
    'Faneromenis 51-53, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35795732382',
    NULL,
    'http://www.thebiggymcy.com/',
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
    38,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('fe73f4cc-2ae5-4d16-83bd-880c50a01f95', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '3d486fd7-b781-4880-97fa-21f3a02cbd6c',
    'Arise Active',
    'arise-active',
    NULL,
    'Acropoleos Avenue 23, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35770004545',
    NULL,
    'http://www.ariseactive.eu/',
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
    157,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    'a9755701-087e-4bae-b3bf-dbf55ddcc446',
    'Legacy - Chris Antoniou Training',
    'legacy-chris-antoniou-training',
    NULL,
    'Rafael Santi 28, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35777777756',
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
    84,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    '2bd37d14-b140-40a8-8305-58428e2ea063',
    '86Seven Fitness Boutique',
    '86seven-fitness-boutique',
    NULL,
    'Pandoras 37, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799250087',
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
    4.8,
    27,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    'd274e5c2-29dc-4c6e-9283-7f4dc404bda6',
    'Acceptus Gym',
    'acceptus-gym',
    NULL,
    'Odyssea Androutsou, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724660400',
    NULL,
    'http://www.acceptus.life/',
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
    37,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    '91417d54-bc7b-4407-8e10-d052928f27a7',
    'Ironsky Fitness  Group & Personal Training In Larnaca',
    'ironsky-fitness-group-personal-training-in-larnaca',
    NULL,
    'Old GSZ Stadium 13, Stadiou, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799850540',
    NULL,
    'http://www.ironsky-fitness.com/',
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
    76,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    '9e83336a-8ad4-4a24-afdd-e03893b9cf86',
    'Reflex Gym Larnaca',
    'reflex-gym-larnaca',
    NULL,
    '16-18, Inomenon Ethnon 6042-1st floor, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724632204',
    NULL,
    'http://www.reflexgym.com/',
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
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    'f938f984-dff7-478d-b2d2-69bbc6ba0115',
    'Getfitgym Elite',
    'getfitgym-elite',
    NULL,
    'Spyrou Kyprianou 80-90, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724250990',
    NULL,
    'https://www.facebook.com/p/Getfitgym-Elite-100061921435966/',
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
    10,
    NULL,
    '2025-11-15T18:09:44.407639Z',
    '2025-11-15T18:09:44.407639Z'
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
    'b0e5a417-3d6c-4e32-8c47-6424ff99de59',
    'Trojans Gym',
    'trojans-gym',
    NULL,
    'Iacovou Patatsou, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796524446',
    NULL,
    'https://www.facebook.com/pages/Trojans-Gym-Fight-Club/36071539016?sk=info',
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
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
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
    'be3157da-bc6a-49df-83c9-85b2dc59c99a',
    'Athletic Fitness Center',
    'athletic-fitness-center',
    NULL,
    'WJ9F+W8C, Mouson, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    NULL,
    NULL,
    'https://www.facebook.com/ArtemisFani',
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
    12,
    NULL,
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
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
    '509b5a8c-a7cd-40a7-bfe3-fb38944339d0',
    'Boxing Muscle Personal Boxing & Fitness Training Larnaca',
    'boxing-muscle-personal-boxing-fitness-training-larnaca',
    NULL,
    'Ymittou, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796076585',
    NULL,
    'https://instagram.com/boxingmuscleofficial',
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
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('509b5a8c-a7cd-40a7-bfe3-fb38944339d0', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    '35ebee02-4dca-4bbd-b98a-ad4294d7bb2d',
    'Expose Fitness By Andreas Cosma',
    'expose-fitness-by-andreas-cosma',
    NULL,
    'Pentadaktylou 57, katastima 2, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799780343',
    NULL,
    'https://www.facebook.com/ExposeFitnessGym',
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
    37,
    NULL,
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
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
    '6463054b-bb9a-445e-b0e1-2acf937bec37',
    'Fivestar Sportcenter',
    'fivestar-sportcenter',
    NULL,
    'Faneromenis 225, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35770008088',
    NULL,
    'https://www.facebook.com/fivestarsportcenter/',
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
    64,
    NULL,
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
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
    'aba6bed0-2390-4442-8b07-b4b8e8e03a64',
    'Temple Fitness',
    'temple-fitness',
    NULL,
    'Spyrou Kyprianou 86, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724661060',
    NULL,
    'https://www.facebook.com/templefitnesscyprus/',
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
    135,
    NULL,
    '2025-11-15T18:09:44.408659Z',
    '2025-11-15T18:09:44.408659Z'
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
    'ede9c5b5-54b2-43f0-9a61-fc07bb079cdc',
    'Delta Fitness Studio',
    'delta-fitness-studio',
    NULL,
    'Lapithou 20, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35796437905',
    NULL,
    'https://instagram.com/deltafitnessstudio?igshid=YmMyMTA2M2Y=',
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
    34,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    'c0a9bb6b-7bd3-4078-82ad-788820951733',
    'Rack Gym Ltd',
    'rack-gym-ltd',
    NULL,
    'Ivikou 52, Aradippou, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799877905',
    NULL,
    'https://www.instagram.com/rack_gym_/profilecard/?igsh=MWNsMzZ2cGw1YWJwaA==',
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
    70,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    '7799d612-0f39-4938-aa14-c4e92ea83521',
    'Totalfit',
    'totalfit',
    NULL,
    '1, Friedrich Nietzsche 6028, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724653937',
    NULL,
    'https://www.facebook.com/TotalFitLarnaca/',
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
    4.2,
    84,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    'a85de508-0b4e-4336-b0c4-ad8c994d2127',
    'Aquagym',
    'aquagym',
    NULL,
    'WJ92+G7X, Charalambou Patsidi, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724400500',
    NULL,
    'https://www.facebook.com/aquagymlarnaca/',
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
    61,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    '5acb0f7a-3a7c-4129-959a-b476eee94169',
    'Twp-Train With Passion',
    'twp-train-with-passion',
    NULL,
    'Carrefour Larnaca, Spyrou Kyprianou 23, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35799593570',
    NULL,
    'https://www.facebook.com/TWP-Fitness-hall-Train-with-Passion-2255614854651676',
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
    89,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    '35e1ca8e-2db2-450c-8629-bff314479e47',
    'ItS Time Fitness Center',
    'its-time-fitness-center',
    NULL,
    'Artemidos 3, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724256600',
    NULL,
    'https://www.facebook.com/ItsTimeGym',
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
    135,
    NULL,
    '2025-11-15T18:09:44.409616Z',
    '2025-11-15T18:09:44.409616Z'
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
    '93d01c0a-cc7f-4c94-86dc-9dfdb4f0387c',
    'Body Control Fitness Centre',
    'body-control-fitness-centre',
    NULL,
    '3 Nikou G, Nicou Dimitriou 6031, Larnaca, Cyprus',
    'c2208ba4-aea9-4e22-b256-09177179763f',
    34.9167,
    33.6333,
    '+35724252428',
    NULL,
    'https://www.facebook.com/BodyControlFitnessCentre/',
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
    43,
    NULL,
    '2025-11-15T18:09:44.410613Z',
    '2025-11-15T18:09:44.410613Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


COMMIT;
