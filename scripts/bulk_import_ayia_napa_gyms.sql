-- Bulk Import: Ayia Napa Gyms
-- Generated: 2025-11-15T22:21:33.712887
-- Total gyms: 5

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
    '1929d425-f218-47f5-afa6-b84bf223fb6b',
    'Sunwing Fitness Center',
    'sunwing-fitness-center',
    NULL,
    'XXPG+VX7, Ayia Napa, Cyprus',
    '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    34.9881,
    34.0125,
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
    1,
    NULL,
    '2025-11-15T20:21:33.711886Z',
    '2025-11-15T20:21:33.711886Z'
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
    '360a4f5c-f4ec-4684-9220-2542626cde5f',
    'Overall Magic Fitness Center',
    'overall-magic-fitness-center',
    NULL,
    'Katalymaton 10, Ayia Napa, Cyprus',
    '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    34.9881,
    34.0125,
    '+35796420570',
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
    4.1,
    42,
    NULL,
    '2025-11-15T20:21:33.711886Z',
    '2025-11-15T20:21:33.711886Z'
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
    '577e1176-e466-41a6-a3ee-6f2989c69a9f',
    'Datiki Diet',
    'datiki-diet',
    NULL,
    'Dimokratias 5, Ayia Napa, Cyprus',
    '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    34.9881,
    34.0125,
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
    '2025-11-15T20:21:33.711886Z',
    '2025-11-15T20:21:33.711886Z'
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
    '84af2801-a086-47c6-a941-30f370e58f21',
    'Return Rehabilitation & Fitness Recovery Centre',
    'return-rehabilitation-fitness-recovery-centre',
    NULL,
    'Martiou 25 Ayia Napa, Ayia Napa, Cyprus',
    '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    34.9881,
    34.0125,
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
    '2025-11-15T20:21:33.711886Z',
    '2025-11-15T20:21:33.711886Z'
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
    '2f0046d0-407c-42c5-9eb7-f48c8fc30d1b',
    'World Gym Ayia Napa',
    'world-gym-ayia-napa',
    NULL,
    'monte napa, Νίκου Καζαντζάκη 6, Ayia Napa, Cyprus',
    '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    34.9881,
    34.0125,
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
    '2025-11-15T20:21:33.711886Z',
    '2025-11-15T20:21:33.711886Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


COMMIT;
