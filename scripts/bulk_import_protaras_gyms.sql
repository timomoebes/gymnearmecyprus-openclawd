-- Bulk Import: Protaras Gyms
-- Generated: 2025-11-15T22:31:36.996498
-- Total gyms: 11

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
    '02f0537e-8a84-4c6e-beb8-c3af95c4a5bd',
    'Body Shape Gym',
    'body-shape-gym',
    NULL,
    '1st April 39, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35723820111',
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
    34,
    NULL,
    '2025-11-15T20:31:36.994507Z',
    '2025-11-15T20:31:36.994507Z'
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
    '4e6b4486-f023-4a60-925d-2a0175a92dd1',
    'Bodyart Fitness Center',
    'bodyart-fitness-center',
    NULL,
    'Ανδρέα Παναγίδη, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35799324595',
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
    151,
    NULL,
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
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
    '9839d454-c9d3-46b5-8f7f-fc15a08dff70',
    'Bad Dog Bjj  Brazilian Jiu-Jitsu Training Club  Nickbjj',
    'bad-dog-bjj-brazilian-jiu-jitsu-training-club-nickbjj',
    NULL,
    'Dimokratias 27, Ayia Napa, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35796597568',
    NULL,
    'http://www.baddogbjj.com/',
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
    102,
    NULL,
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('9839d454-c9d3-46b5-8f7f-fc15a08dff70', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    'ba61b945-b9e6-4a17-bbd0-22e7fb19d45b',
    'Mythical Performance',
    'mythical-performance',
    NULL,
    'Georgiou Drosini, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35799760439',
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
    4.7,
    44,
    NULL,
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
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
    '0a8059cb-83a9-4987-aabb-94dfb3f66765',
    'Demari Wellness And Spa',
    'demari-wellness-and-spa',
    NULL,
    'Protara 259, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35723731111',
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
    26,
    NULL,
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
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
    '48b24ff6-18a2-449d-b9a3-429de1009e84',
    'Datiki Diet',
    'datiki-diet',
    NULL,
    'Dimokratias 5, Ayia Napa, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35723725757',
    NULL,
    'http://www.datikidiaita.com/',
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
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
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
    '013aca3d-3167-4f7e-8278-09f3521b2a6c',
    'Limitlessxposed',
    'limitlessxposed',
    NULL,
    'Akropoleos 161, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    NULL,
    NULL,
    'http://www.limitlessxposed.com/',
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
    '2025-11-15T20:31:36.995503Z',
    '2025-11-15T20:31:36.995503Z'
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
    '90ec5918-3ce0-4b4a-bea7-81af5f2a0e27',
    'Return Rehabilitation & Fitness Recovery Centre',
    'return-rehabilitation-fitness-recovery-centre',
    NULL,
    'Martiou 25 Ayia Napa, Ayia Napa, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35799873980',
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
    58,
    NULL,
    '2025-11-15T20:31:36.996498Z',
    '2025-11-15T20:31:36.996498Z'
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
    'c66b46b1-1b13-4084-8517-04697e907453',
    'Sacred Roots Yoga & Massage',
    'sacred-roots-yoga-massage',
    NULL,
    'Elena Houses, 24, Vrysoudion 66, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35796025001',
    NULL,
    'http://www.sacredrootscy.com/',
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
    72,
    NULL,
    '2025-11-15T20:31:36.996498Z',
    '2025-11-15T20:31:36.996498Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('c66b46b1-1b13-4084-8517-04697e907453', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
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
    'f3a8ae3b-0697-4d7e-b9e4-5650dc8861fb',
    'World Gym Ayia Napa',
    'world-gym-ayia-napa',
    NULL,
    'monte napa, Νίκου Καζαντζάκη 6, Ayia Napa, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35796672947',
    NULL,
    'https://www.facebook.com/MonteNapaGym',
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
    1269,
    NULL,
    '2025-11-15T20:31:36.996498Z',
    '2025-11-15T20:31:36.996498Z'
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
    'e1880cbc-74d4-4c0d-a996-3530720df055',
    'Calisthenicsworkout4Allcy',
    'calisthenicsworkout4allcy',
    NULL,
    'Protara 109, Paralimni, Cyprus',
    '7b90b819-b3a9-43ce-ad48-22b016b9686b',
    35.0125,
    34.0583,
    '+35799932738',
    NULL,
    'https://instagram.com/calisthenicsworkout4allcy?igshid=vdciehtp87u5',
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
    38,
    NULL,
    '2025-11-15T20:31:36.996498Z',
    '2025-11-15T20:31:36.996498Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


COMMIT;
