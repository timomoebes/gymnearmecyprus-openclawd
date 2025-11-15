-- Bulk Import: Nicosia Gyms
-- Generated: 2025-11-15T18:09:01.160481
-- Total gyms: 71

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
    '04e2a748-f3a2-464a-8f93-5ea3cfdac1be',
    'The Yogi Turtle',
    'the-yogi-turtle',
    NULL,
    'Archiepiskopou Kyprianou 29, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799357842',
    NULL,
    'https://www.yogiturtlestudio.com/',
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
    '2025-11-15T16:09:01.139474Z',
    '2025-11-15T16:09:01.139474Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('04e2a748-f3a2-464a-8f93-5ea3cfdac1be', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
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
    'bd8dec0c-c4e9-407e-90d5-fb02eafd8fae',
    'E-Motion Dance & Health Studio - Viantos',
    'e-motion-dance-health-studio-viantos',
    NULL,
    'Viantos 8, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35770007061',
    NULL,
    'https://www.emotioncy.com/',
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
    16,
    NULL,
    '2025-11-15T16:09:01.140475Z',
    '2025-11-15T16:09:01.140475Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('bd8dec0c-c4e9-407e-90d5-fb02eafd8fae', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'b63b9ed2-986d-4fea-9865-4312b3d027db',
    'Riforma Pilates Studio',
    'riforma-pilates-studio',
    NULL,
    'Tseriou 24C, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35794093703',
    NULL,
    'http://www.riformapilatesstudio.com/',
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
    19,
    NULL,
    '2025-11-15T16:09:01.140475Z',
    '2025-11-15T16:09:01.140475Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('b63b9ed2-986d-4fea-9865-4312b3d027db', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '8dfc8d91-64e0-479f-af4f-54af3c7051ec',
    'Renzo Gracie Nicosia - Brazilian Jiu Jitsu',
    'renzo-gracie-nicosia-brazilian-jiu-jitsu',
    NULL,
    'Sports Center, B18 150, Agios Dometios, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799540008',
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
    29,
    NULL,
    '2025-11-15T16:09:01.140475Z',
    '2025-11-15T16:09:01.140475Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8dfc8d91-64e0-479f-af4f-54af3c7051ec', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '6dd52a74-377c-48bc-ba00-21612eea3a88',
    'Filippos Taekwondo Itf Nicosia',
    'filippos-taekwondo-itf-nicosia',
    NULL,
    'Kyriakou Matsi 8, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799252242',
    NULL,
    'http://www.filippostaekwondo.com/',
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
    43,
    NULL,
    '2025-11-15T16:09:01.141473Z',
    '2025-11-15T16:09:01.141473Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('6dd52a74-377c-48bc-ba00-21612eea3a88', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '8d06e302-fc1b-42e2-93aa-f1a0322031ea',
    'Bhava',
    'bhava',
    NULL,
    'Ροίκου 9, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35797730979',
    NULL,
    'http://bhava.studio/',
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
    '2025-11-15T16:09:01.141473Z',
    '2025-11-15T16:09:01.141473Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('8d06e302-fc1b-42e2-93aa-f1a0322031ea', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
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
    'b1b5ca13-dc2b-4864-82c5-040584702d76',
    'In2Motion Fitness Studio',
    'in2motion-fitness-studio',
    NULL,
    'E902 149, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799775895',
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
    '2025-11-15T16:09:01.141473Z',
    '2025-11-15T16:09:01.141473Z'
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
    '16355af9-1c36-40b9-9e09-677e190be2bf',
    'Cocoon Wellness Centre',
    'cocoon-wellness-centre',
    NULL,
    'ap. 201, Athalassas Ave 130, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799325558',
    NULL,
    'http://www.cocoonwellnesscentre.com/',
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
    33,
    NULL,
    '2025-11-15T16:09:01.141473Z',
    '2025-11-15T16:09:01.141473Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('16355af9-1c36-40b9-9e09-677e190be2bf', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
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
    '949a76ae-2142-4694-8270-fdc105757a32',
    'For Me Clinical Physio Pilates Studio',
    'for-me-clinical-physio-pilates-studio',
    NULL,
    'Kyrenias 93, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35794009009',
    NULL,
    'https://www.formepilates.eu/',
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
    67,
    NULL,
    '2025-11-15T16:09:01.142474Z',
    '2025-11-15T16:09:01.142474Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('949a76ae-2142-4694-8270-fdc105757a32', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '0f522881-86c3-47e6-b034-0052e1f18196',
    'Uppercut Team Cyprus Boxing - Kickboxing School In Strovolos Nicosia',
    'uppercut-team-cyprus-boxing-kickboxing-school-in-strovolos-nicosia',
    NULL,
    'Costa Anaxagora 21B, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796444787',
    NULL,
    'https://shorturl.at/6w2Wv',
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
    31,
    NULL,
    '2025-11-15T16:09:01.142474Z',
    '2025-11-15T16:09:01.142474Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('0f522881-86c3-47e6-b034-0052e1f18196', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    '6c8c5701-82ef-4312-b3f3-918e6579e487',
    'Güralpfit',
    'güralpfit',
    NULL,
    'İbrahimpaşa Vakıflar Sk. No:15A/B, Vakıflar Sk, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
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
    4.8,
    12,
    NULL,
    '2025-11-15T16:09:01.142474Z',
    '2025-11-15T16:09:01.142474Z'
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
    'cc1a1059-f843-40db-91fd-1484438f7e11',
    'Hellenic Bank Masters Tennis Academy',
    'hellenic-bank-masters-tennis-academy',
    NULL,
    'Stadiou 44, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722105929',
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
    13,
    NULL,
    '2025-11-15T16:09:01.142474Z',
    '2025-11-15T16:09:01.142474Z'
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
    'e9a9691d-9ccf-45dc-b9ab-9fce35653d23',
    'Aurora Pilates Studio',
    'aurora-pilates-studio',
    NULL,
    'Odysseos 11, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722252517',
    NULL,
    'https://www.instagram.com/aurorapilatestudio',
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
    '2025-11-15T16:09:01.143472Z',
    '2025-11-15T16:09:01.143472Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('e9a9691d-9ccf-45dc-b9ab-9fce35653d23', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    '2353de9a-2132-4d14-a26d-f6535f524810',
    'Fit 2 The Point',
    'fit-2-the-point',
    NULL,
    'Perikleous, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35770087387',
    NULL,
    'http://fit2thepoint.com/',
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
    38,
    NULL,
    '2025-11-15T16:09:01.143472Z',
    '2025-11-15T16:09:01.143472Z'
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
    'e9126f24-747f-41d4-a492-9459d1178e45',
    'Ananda Yoga Studio',
    'ananda-yoga-studio',
    NULL,
    'Chalkokondyli 23Α, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799584148',
    NULL,
    'https://www.instagram.com/ananda_yoga11?igsh=ZTVmcnplazlpa293',
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
    '2025-11-15T16:09:01.143472Z',
    '2025-11-15T16:09:01.143472Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('e9126f24-747f-41d4-a492-9459d1178e45', 'ea4205eb-b55b-4b0d-a762-d267ec55f123')
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
    '91868040-b820-42a0-af56-7f0004a925c7',
    'Calisthenics Area',
    'calisthenics-area',
    NULL,
    '585F+XRH, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
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
    4.3,
    10,
    NULL,
    '2025-11-15T16:09:01.143472Z',
    '2025-11-15T16:09:01.143472Z'
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
    'a075596b-7352-4d0a-916e-6d1ff2d8ad11',
    'Intense Fitness & Physio Centre',
    'intense-fitness-physio-centre',
    NULL,
    'Ilia Papakiriakou 40, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722336690',
    NULL,
    'https://intensefitness.com.cy/',
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
    12,
    NULL,
    '2025-11-15T16:09:01.144483Z',
    '2025-11-15T16:09:01.144483Z'
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
    '49746fff-5db8-447e-966f-cf0f830994b2',
    'Ryltoday',
    'ryltoday',
    NULL,
    'Skopa 7, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799528500',
    NULL,
    'http://www.ryltoday.com/',
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
    '2025-11-15T16:09:01.144483Z',
    '2025-11-15T16:09:01.144483Z'
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
    'ff0ae792-d0de-4526-8a42-d8b52734517f',
    'Gymac Boutique Fitness & Personal Training',
    'gymac-boutique-fitness-personal-training',
    NULL,
    'Mustafa Arif Sk 30, Agios Dometios, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+905488649622',
    NULL,
    'https://www.instagram.com/gymaccy?igsh=MWVoNmI4Z3loM2hmNg==',
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
    25,
    NULL,
    '2025-11-15T16:09:01.145488Z',
    '2025-11-15T16:09:01.145488Z'
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
    '0f8f8698-383b-42b6-aab5-b593088afa96',
    'Elite Body Management',
    'elite-body-management',
    NULL,
    'Kallipoleos 36, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722254890',
    NULL,
    'https://elitebody.net/',
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
    '2025-11-15T16:09:01.145488Z',
    '2025-11-15T16:09:01.145488Z'
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
    'e3817866-8343-4e1c-8216-b9f7e323487b',
    'Global Vale Tudo - Combat Sports Academy',
    'global-vale-tudo-combat-sports-academy',
    NULL,
    'Athalassas Ave 60, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799237642',
    NULL,
    'https://www.globalvaletudo.org/',
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
    '2025-11-15T16:09:01.146482Z',
    '2025-11-15T16:09:01.146482Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('e3817866-8343-4e1c-8216-b9f7e323487b', '7a0ab816-372c-410c-a373-9e7794cac9e6')
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
    '084465fe-94ff-4878-85a5-2d6bc855e4e4',
    'Bobi Boxing Club',
    'bobi-boxing-club',
    NULL,
    'Kallipoleos 26, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796690872',
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
    27,
    NULL,
    '2025-11-15T16:09:01.146482Z',
    '2025-11-15T16:09:01.146482Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('084465fe-94ff-4878-85a5-2d6bc855e4e4', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    '41ad4f45-9815-4bf9-af06-465580989435',
    'Ambitus Fitness',
    'ambitus-fitness',
    NULL,
    'Karava 6c, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722253606',
    NULL,
    'http://ambitusfitness.com/',
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
    '2025-11-15T16:09:01.147473Z',
    '2025-11-15T16:09:01.147473Z'
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
    '56f5dde6-be17-473d-8043-25d44a18ac1c',
    'Karma Studio',
    'karma-studio',
    NULL,
    'Giannou Kranidioti 10, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35797606063',
    NULL,
    'http://klkarma.com/',
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
    29,
    NULL,
    '2025-11-15T16:09:01.147473Z',
    '2025-11-15T16:09:01.147473Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('56f5dde6-be17-473d-8043-25d44a18ac1c', 'b85cb2e6-fb93-4167-aa98-d5f4444061b1')
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
    'e97c4bbe-ebb7-4a87-879f-4bdfc260dce0',
    'Tcycle',
    'tcycle',
    NULL,
    'Chytron 30, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    NULL,
    NULL,
    'http://t-cycle.eu/',
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
    '2025-11-15T16:09:01.147473Z',
    '2025-11-15T16:09:01.147473Z'
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
    'f1bbfcac-64bd-4854-8e3b-9d506fb7157e',
    'Bianco Pool&Bar Lounge',
    'bianco-poolbar-lounge',
    NULL,
    'Egaleo 9, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799623255',
    NULL,
    'http://www.nicosiagym.com/',
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
    3.6,
    30,
    NULL,
    '2025-11-15T16:09:01.147473Z',
    '2025-11-15T16:09:01.147473Z'
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
    '144e19f9-3f08-4fcc-8b53-95996e530354',
    'Kamae Fitness',
    'kamae-fitness',
    NULL,
    'Dimokratias 76, Agios Dometios, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796197953',
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
    18,
    NULL,
    '2025-11-15T16:09:01.148472Z',
    '2025-11-15T16:09:01.148472Z'
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
    'a993e83f-ca97-42e4-a43b-a561a584d771',
    'University Of Nicosia - Ufit Fitness Centre',
    'university-of-nicosia-ufit-fitness-centre',
    NULL,
    '28th October 24, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722842400',
    NULL,
    'https://www.unic.ac.cy/ufit/',
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
    75,
    NULL,
    '2025-11-15T16:09:01.148472Z',
    '2025-11-15T16:09:01.148472Z'
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
    'fb578f8f-d1cd-48b9-870f-1dd061e24af3',
    'Energea Fitness Studio - Ems Training & Pilates Reformer',
    'energea-fitness-studio-ems-training-pilates-reformer',
    NULL,
    '72 AB, str., 1076, John Kennedy, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722666690',
    NULL,
    'https://www.emsfitnessstudio.cy/',
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
    '2025-11-15T16:09:01.148472Z',
    '2025-11-15T16:09:01.148472Z'
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
    'bd0152d7-515a-433e-b2b3-a5965c75f86e',
    'Hupex Fitness',
    'hupex-fitness',
    NULL,
    'Kyriakou Matsi 60, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799919512',
    NULL,
    'https://hupex.fitness/',
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
    '2025-11-15T16:09:01.148472Z',
    '2025-11-15T16:09:01.148472Z'
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
    'd626e27f-6eb7-4a72-9553-b0a4ecab6f07',
    'Supernatural Gym',
    'supernatural-gym',
    NULL,
    'B18 179-2369, Agios Dometios, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
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
    14,
    NULL,
    '2025-11-15T16:09:01.149475Z',
    '2025-11-15T16:09:01.149475Z'
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
    'b2466851-bf83-47ba-bc17-47e32b3f6a34',
    'Sana Hiltonia Health & Fitness Centre',
    'sana-hiltonia-health-fitness-centre',
    NULL,
    'Achaion 1, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722695165',
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
    4.4,
    15,
    NULL,
    '2025-11-15T16:09:01.149475Z',
    '2025-11-15T16:09:01.149475Z'
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
    '2e4a95c4-bc64-4cec-8c74-30fa08bd0f90',
    'Nicosia Gymnastic Center',
    'nicosia-gymnastic-center',
    NULL,
    'Egaleo, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722351644',
    NULL,
    'http://www.nicosiagym.com/',
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
    '2025-11-15T16:09:01.149475Z',
    '2025-11-15T16:09:01.149475Z'
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
    'ab1627b2-c3b6-4b4a-90b9-a5cb23ddd904',
    'Rise Fitness Club',
    'rise-fitness-club',
    NULL,
    'Zinonos Sozou 24, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722255102',
    NULL,
    'https://risefitnessclub.com.cy/',
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
    16,
    NULL,
    '2025-11-15T16:09:01.150472Z',
    '2025-11-15T16:09:01.150472Z'
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
    'b8d07228-2687-43e6-985d-34c409a27314',
    'En Somati - Lifestyle Gym Personal Training Mma Academy',
    'en-somati-lifestyle-gym-personal-training-mma-academy',
    NULL,
    'Fedras 8, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796855588',
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
    '2025-11-15T16:09:01.150472Z',
    '2025-11-15T16:09:01.150472Z'
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
    '51d654d1-1ae6-477b-b998-26b6c13e52b3',
    'Oxygen Gym',
    'oxygen-gym',
    NULL,
    'Skopa 7, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722768166',
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
    4.2,
    47,
    NULL,
    '2025-11-15T16:09:01.150472Z',
    '2025-11-15T16:09:01.150472Z'
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
    '671868cf-90e3-4f8f-ad0c-1ee2fd1bd36c',
    'Momentum Fitness & Wellness',
    'momentum-fitness-wellness',
    NULL,
    '25is Martiou 9A, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722270450',
    NULL,
    'http://momentum-gym.com/',
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
    60,
    NULL,
    '2025-11-15T16:09:01.150472Z',
    '2025-11-15T16:09:01.150472Z'
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
    '876b9fb1-152e-4b35-88ec-447aa06cb8f5',
    '100 Boxing & Fitness Gym',
    '100-boxing-fitness-gym',
    NULL,
    'Stasinou 2404, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799499722',
    NULL,
    'http://fb.me/100boxfitgym',
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
    53,
    NULL,
    '2025-11-15T16:09:01.151481Z',
    '2025-11-15T16:09:01.151481Z'
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
    'c671b305-8a86-46eb-ba38-e2f1463c95c5',
    'Science Fit',
    'science-fit',
    NULL,
    'Perikleous 39B, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799016177',
    NULL,
    'https://m.facebook.com/mp.sciencefit/',
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
    '2025-11-15T16:09:01.151481Z',
    '2025-11-15T16:09:01.151481Z'
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
    '724ea422-5187-4f73-8279-41fb440b8738',
    'New Body Gym',
    'new-body-gym',
    NULL,
    'Athinon 48-50, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722494967',
    NULL,
    'http://www.newbodygym.com.cy/',
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
    46,
    NULL,
    '2025-11-15T16:09:01.151481Z',
    '2025-11-15T16:09:01.151481Z'
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
    '53fab3e1-76bc-461f-bb73-dbcfda7b3397',
    'Maxx Fitness',
    'maxx-fitness',
    NULL,
    'B17 5a, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722448144',
    NULL,
    'https://www.maxxfitnesscy.com/',
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
    64,
    NULL,
    '2025-11-15T16:09:01.152493Z',
    '2025-11-15T16:09:01.152493Z'
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
    '12b265ef-b1da-48f2-877e-d52c935c9f39',
    'Fitness Factory',
    'fitness-factory',
    NULL,
    'Pindou 4A, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799882728',
    NULL,
    'https://www.fitnessfactory.cy/',
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
    31,
    NULL,
    '2025-11-15T16:09:01.152493Z',
    '2025-11-15T16:09:01.152493Z'
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
    'bc869386-6e2e-4599-a1f5-45d1e53315da',
    'Fuelhouse Boutique Fitness Club',
    'fuelhouse-boutique-fitness-club',
    NULL,
    'Michali Paridi, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722663000',
    NULL,
    'https://fuelhouse.cy/',
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
    78,
    NULL,
    '2025-11-15T16:09:01.152493Z',
    '2025-11-15T16:09:01.152493Z'
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
    '4784e32e-88fa-4b56-9a9e-78f52adf65bd',
    'Real Fit',
    'real-fit',
    NULL,
    'Kantaras 22-26, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722264842',
    NULL,
    'http://www.realfitnicosia.com/',
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
    42,
    NULL,
    '2025-11-15T16:09:01.153481Z',
    '2025-11-15T16:09:01.153481Z'
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
    'e55d0275-c773-4b74-8ec3-5c70c993e241',
    'Squad By XFit',
    'squad-by-xfit',
    NULL,
    '12 A Arsinois Street, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722261717',
    NULL,
    'https://www.squadfitnessgym.com/',
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
    51,
    NULL,
    '2025-11-15T16:09:01.153481Z',
    '2025-11-15T16:09:01.153481Z'
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
    'ce11e157-701e-4204-aaec-ed23912965c8',
    'Regenesis Gym',
    'regenesis-gym',
    NULL,
    'Athalassas Ave 38, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35770000380',
    NULL,
    'https://regenesisgymcy.com/',
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
    53,
    NULL,
    '2025-11-15T16:09:01.153481Z',
    '2025-11-15T16:09:01.153481Z'
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
    'de4a1795-1dc2-4a67-8a08-79a882192aae',
    'Fitensity Training Club',
    'fitensity-training-club',
    NULL,
    'Denousis, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35770088338',
    NULL,
    'https://m.facebook.com/Fitensitytc/',
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
    '2025-11-15T16:09:01.153481Z',
    '2025-11-15T16:09:01.153481Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('de4a1795-1dc2-4a67-8a08-79a882192aae', '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3')
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
    '87036bd3-4513-4358-9d3a-85ce4906cd54',
    'Komanetsi Fitness Center',
    'komanetsi-fitness-center',
    NULL,
    'October 28th 27, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722463360',
    NULL,
    'https://komanetsi.com/',
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
    177,
    NULL,
    '2025-11-15T16:09:01.154471Z',
    '2025-11-15T16:09:01.154471Z'
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
    'b4b1cf43-9f9e-4041-a0da-eecec94f91f7',
    'Destination Fitness',
    'destination-fitness',
    NULL,
    'Avenue, Larnacos 85, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722027210',
    NULL,
    'http://www.destinationfitnesscy.com/',
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
    232,
    NULL,
    '2025-11-15T16:09:01.154471Z',
    '2025-11-15T16:09:01.154471Z'
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
    'a1bdf97f-637b-4d1c-a217-683f22000c81',
    'Μολων Λαβε Gym',
    'μολων-λαβε-gym',
    NULL,
    'Kyriakou Matsi 54, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722443444',
    NULL,
    'https://molonlabegym.cy/',
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
    390,
    NULL,
    '2025-11-15T16:09:01.154471Z',
    '2025-11-15T16:09:01.154471Z'
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
    '97880c8f-5cb7-4d65-bb1a-29d6868179d6',
    'New Life Health Centre - Nicosia Gym',
    'new-life-health-centre-nicosia-gym',
    NULL,
    'Stadiou 47, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722591222',
    NULL,
    'http://www.newlife.com.cy/',
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
    165,
    NULL,
    '2025-11-15T16:09:01.154471Z',
    '2025-11-15T16:09:01.154471Z'
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
    '767ef2f4-a767-4a4e-a2e7-2f7362ec03b0',
    'Curves Aglantzias',
    'curves-aglantzias',
    NULL,
    'B17 147Β, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722448344',
    NULL,
    'http://facebook.com/Curves116097/',
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
    57,
    NULL,
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
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
    '10420d81-d0be-4b2e-821a-620370086f94',
    'Underground Force Gym',
    'underground-force-gym',
    NULL,
    'Antoni Samaraki 8, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35797606464',
    NULL,
    'https://www.instagram.com/underground_force/',
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
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
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
    'c50ab0d9-9667-4c7f-a47e-37cfd310330b',
    'Gabriel Fitness & Boxing Gym',
    'gabriel-fitness-boxing-gym',
    NULL,
    'Fokidos 1b, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796857186',
    NULL,
    'https://www.facebook.com/gym.freaks.training/',
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
    71,
    NULL,
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
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
    'cf156a22-ae1a-4ef5-8da1-68b33cfcf861',
    'Fortius Boxing Academy',
    'fortius-boxing-academy',
    NULL,
    'Afroditis 4, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796774232',
    NULL,
    'https://www.facebook.com/fortiusboxing/photos/?ref=page_internal',
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
    19,
    NULL,
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;

INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('cf156a22-ae1a-4ef5-8da1-68b33cfcf861', 'f6559489-8266-42f2-aea9-89a3a76eeea0')
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
    '1f4c9bb1-1c5b-41ad-9bf4-a24e2f45581f',
    'Class One Fitness',
    'class-one-fitness',
    NULL,
    '59P7+HR4, Şht. Mehmet Vural Ahmet, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+905391065629',
    NULL,
    'https://www.instagram.com/classone.fitness?igsh=cTBrdXpodWVsNzV6',
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
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
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
    '8db8a4f1-80dc-4aaf-8626-9ad9a737fed8',
    'Body Explosion Fitness Place',
    'body-explosion-fitness-place',
    NULL,
    'Prevezis 13, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35799556575',
    NULL,
    'https://www.facebook.com/bodyexplosion.fitnessplace',
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
    '2025-11-15T16:09:01.155473Z',
    '2025-11-15T16:09:01.155473Z'
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
    '54ec8369-7cba-4a03-b75b-15337724e57c',
    'Φόρμα Fitness Studio',
    'φόρμα-fitness-studio',
    NULL,
    'Deligiorgi 5, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796223331',
    NULL,
    'https://www.instagram.com/forma_fitness.studio?igsh=eXAwbzRwN2VsOTFk',
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
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    'b1c19898-bfd7-4aba-b35e-45585af54b59',
    'Mr Cyprus Gym',
    'mr-cyprus-gym',
    NULL,
    '59JG+4CW, Dimitras, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722433332',
    NULL,
    'https://www.facebook.com/pages/category/Gym-Physical-Fitness-Center/MrCyprus-Gym-1219300891485594/',
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
    19,
    NULL,
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    '31e713d7-e81d-428e-ae64-ee7e5320911b',
    'Infinity Fitness Hall',
    'infinity-fitness-hall',
    NULL,
    'Dimokratias 13, Agios Dometios, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722100561',
    NULL,
    'https://m.facebook.com/infinityfitnesshall/',
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
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    '1ea73bb7-2666-4ded-89d3-9a5bbd128368',
    'Eurogym',
    'eurogym',
    NULL,
    '56-60 Κυριάκου Μάτση Nicosia, Egkomi, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35770006080',
    NULL,
    'https://www.instagram.com/eurogym_official_page?igsh=MW95cDl4YjA0NnNq',
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
    3.9,
    57,
    NULL,
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    '129648bc-5e3a-4835-b2f2-8e952b76c6c7',
    'At4Fitness Gym',
    'at4fitness-gym',
    NULL,
    'Aglantzias 79, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35796488763',
    NULL,
    'https://m.facebook.com/At4FITNESS/',
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
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    'a1e3f125-b020-43b1-8621-5ed213ab6910',
    'Home Gym',
    'home-gym',
    NULL,
    'Costa Anaxagora 24, Strovolos, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    NULL,
    NULL,
    'https://m.facebook.com/askhomegym',
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
    '2025-11-15T16:09:01.156477Z',
    '2025-11-15T16:09:01.156477Z'
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
    '41980025-3cab-4bde-8f69-a07d1c11e4d8',
    'Old Town Fitness Studio',
    'old-town-fitness-studio',
    NULL,
    'Dimonaktos 13Β, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    NULL,
    NULL,
    'https://www.instagram.com/old_town_fitness_studio?igsh=aGYwMGsybHJvZmhu&utm_source=qr',
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
    '2025-11-15T16:09:01.157496Z',
    '2025-11-15T16:09:01.157496Z'
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
    'ff576cc7-22fd-4578-812b-a8e9392b1cc2',
    'Motus Boutique Gym',
    'motus-boutique-gym',
    NULL,
    'Simonidou 14a, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722782220',
    NULL,
    'https://motusboutiquegym.com.cy/',
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
    106,
    NULL,
    '2025-11-15T16:09:01.157496Z',
    '2025-11-15T16:09:01.157496Z'
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
    '7702ce06-f262-475d-ab69-748582c91e5c',
    'Be Different Gym & Fitness Club',
    'be-different-gym-fitness-club',
    NULL,
    'Platonos 10, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722264480',
    NULL,
    'https://m.facebook.com/profile.php?id=100090525754964&name=xhp_nt__fblite__profile__tab_bar',
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
    '2025-11-15T16:09:01.157496Z',
    '2025-11-15T16:09:01.157496Z'
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
    '282543e6-771b-4593-bae9-ef03d451505d',
    'Olympus Gym',
    'olympus-gym',
    NULL,
    'Tyrtaiou 8, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722761661',
    NULL,
    'http://www.olympusgym.com.cy/',
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
    24,
    NULL,
    '2025-11-15T16:09:01.157496Z',
    '2025-11-15T16:09:01.157496Z'
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
    '04ce1513-4c4c-40e2-8074-58e70f949b51',
    'Ibody Fitness And Dance Studio Ltd',
    'ibody-fitness-and-dance-studio-ltd',
    NULL,
    'Protagorou 8, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722270024',
    NULL,
    'http://www.facebook.com/ibodystudio',
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
    14,
    NULL,
    '2025-11-15T16:09:01.157496Z',
    '2025-11-15T16:09:01.157496Z'
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
    '535789e7-3381-4556-a100-e8bf66f34d1e',
    'ProFit Center Nicosia',
    'profit-center-nicosia',
    NULL,
    'Lemesou Avenue 13, Aglantzia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35794048198',
    NULL,
    'https://m.facebook.com/profile.php?id=100076418010905',
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
    3.7,
    57,
    NULL,
    '2025-11-15T16:09:01.158488Z',
    '2025-11-15T16:09:01.158488Z'
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
    'deedac0b-0ebb-489a-b780-dfc31e193fca',
    'Figure8Gym',
    'figure8gym',
    NULL,
    '59HG+6WC, Nemeseos, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    NULL,
    NULL,
    'https://m.facebook.com/figura8gym/',
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
    29,
    NULL,
    '2025-11-15T16:09:01.158488Z',
    '2025-11-15T16:09:01.158488Z'
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
    'f97b9052-2cee-4846-8dd0-9068de6da3a7',
    'Urban Boutique Gym',
    'urban-boutique-gym',
    NULL,
    'Prodromou 121, Nicosia, Cyprus',
    'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    35.1856,
    33.3823,
    '+35722274636',
    NULL,
    'https://www.instagram.com/urbanboutiquegym/',
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
    23,
    NULL,
    '2025-11-15T16:09:01.158488Z',
    '2025-11-15T16:09:01.158488Z'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;


COMMIT;
