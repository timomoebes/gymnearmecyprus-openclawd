# Database Migration Plan

## Status: Supabase MCP Server ✅ Working

**Project URL:** https://tqrwhsjqiiecoywmvdgq.supabase.co

## Current Database State

### Existing Tables
- ✅ `cities` (4 rows)
- ✅ `specialties` (8 rows)
- ✅ `amenities` (12 rows)
- ✅ `gyms` (0 rows - ready for data)
- ✅ `gym_specialties` (junction table)
- ✅ `gym_amenities` (junction table)
- ✅ `reviews` (0 rows)
- ✅ `gym_images` (0 rows)
- ✅ `user_profiles` (0 rows)
- ✅ `gym_owners` (0 rows)
- ✅ `featured_listings` (0 rows)
- ✅ `coupons` (0 rows)
- ✅ `faqs` (0 rows)

### Existing Cities (UUIDs)
- `c2208ba4-aea9-4e22-b256-09177179763f` - Larnaca
- `a8d0fd41-5901-4a94-93d3-ecc28166b137` - Limassol
- `fa1518c7-1daf-4e05-a27b-d6296176ef2e` - Nicosia
- `7978d742-eeea-4c7a-b37f-7dceacd4284b` - Paphos

### Missing Cities
- ❌ Ayia Napa
- ❌ Protaras

### Existing Specialties (UUIDs)
- `175c7168-835e-4955-9d15-730b57f9b9ff` - 24 Hour Gym
- `ca21235b-511e-40d0-8772-9fb070ab7cf5` - Crossfit
- `8c8f1bc9-d0f5-47bf-989e-395615ab68ce` - Hotel Gym
- `17aa95fa-0261-4671-a292-6d6df4d8b107` - Outdoor
- `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3` - Personal Trainer
- `b85cb2e6-fb93-4167-aa98-d5f4444061b1` - Pilates
- `c3ff0881-056b-41d0-859b-6a29c89badbd` - Women-Only
- `ea4205eb-b55b-4b0d-a762-d267ec55f123` - Yoga

### Missing Specialties (from our mock data)
- ❌ Bodybuilding
- ❌ MMA
- ❌ Boxing
- ❌ Swimming
- ❌ Powerlifting

### Existing Amenities (UUIDs)
- `5d3ced7f-823a-43dd-91cc-45da729b5496` - Cafe
- `030fd487-234b-450b-9080-c48419d88266` - Cardio Equipment
- `10959b05-8018-4780-a7d5-5053086d246a` - Group Classes
- `b6a4423a-775c-4c45-beca-f7c183c662e2` - Locker Room
- `3aca2174-3c20-40f6-a2fb-c0b86ee59240` - Parking
- `e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd` - Personal Training
- `555d9fca-3c13-43f3-8139-d56606007b43` - Sauna
- `abc944b3-8552-4824-829d-164993e15a80` - Showers
- `78b63197-a11d-4081-a2ba-28cffa215a40` - Steam Room
- `92c13875-919d-4bf3-b619-0c4005b1d95e` - Swimming Pool
- `8f9622bd-57de-44d0-8c34-7be3bd921cdc` - Weight Training
- `2684754f-40c0-480e-a8cb-fedcb0983d0b` - WiFi

## Required Migrations

### 1. Add Missing Cities
```sql
-- Migration: add_missing_cities
INSERT INTO cities (name, slug, description, latitude, longitude)
VALUES
  ('Ayia Napa', 'ayia-napa', 'Discover fitness centers in Ayia Napa. Stay fit while enjoying this popular resort destination with top-quality gym facilities.', 34.9881, 34.0125),
  ('Protaras', 'protaras', 'Find excellent gyms in Protaras. Combine your beach vacation with a great workout at modern fitness facilities.', 35.0125, 34.0583);
```

### 2. Add Missing Specialties
```sql
-- Migration: add_missing_specialties
INSERT INTO specialties (name, slug, description, icon)
VALUES
  ('Bodybuilding', 'bodybuilding', 'Strength training and muscle development facilities. Discover bodybuilding gyms with professional equipment and expert trainers.', 'barbell'),
  ('MMA', 'mma', 'Mixed Martial Arts training facilities offering Brazilian Jiu-Jitsu, Muay Thai, wrestling, and boxing. Train like a fighter.', 'shield'),
  ('Boxing', 'boxing', 'Boxing gyms with professional trainers, heavy bags, and sparring rings. Perfect for fitness and competitive training.', 'boxing-glove'),
  ('Swimming', 'swimming', 'Gyms and facilities with swimming pools. Perfect for aquatic fitness, lap swimming, and water aerobics.', 'waves'),
  ('Powerlifting', 'powerlifting', 'Specialized facilities for powerlifting training. Squat racks, deadlift platforms, and competition-grade equipment.', 'weight');
```

### 3. Add Member Count Fields (per MEMBER_COUNT_SPECIFICATION.md)
```sql
-- Migration: add_member_count_fields
ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS member_count INTEGER,
ADD COLUMN IF NOT EXISTS member_count_source TEXT CHECK (member_count_source IN ('Owner Provided', 'Estimated', 'Demo Data')),
ADD COLUMN IF NOT EXISTS member_count_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS member_count_public BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS member_count_last_updated TIMESTAMPTZ;
```

### 4. Add Rating Fields (if not exists)
```sql
-- Migration: add_rating_fields
-- Check if columns exist first, then add if needed
ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
```

### 5. Add Years in Business Field
```sql
-- Migration: add_years_in_business
ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS years_in_business INTEGER;
```

## Data Migration Strategy

### Phase 1: Schema Updates
1. ✅ Run migration to add missing cities
2. ✅ Run migration to add missing specialties
3. ✅ Run migration to add member_count fields
4. ✅ Run migration to add rating/review_count fields
5. ✅ Run migration to add years_in_business field

### Phase 2: Data Mapping
1. Map mock data cities to database UUIDs
2. Map mock data specialties to database UUIDs (create missing ones first)
3. Map mock data amenities to database UUIDs
4. Convert coordinates array `[lat, lng]` to separate `latitude` and `longitude` fields
5. Convert `featured` boolean to `is_featured` boolean
6. Convert `openingHours` object to JSONB `opening_hours`

### Phase 3: Data Insertion
1. Insert all 20 gyms from mock data
2. Insert gym_specialties relationships
3. Insert gym_amenities relationships
4. Insert reviews (mark demo reviews appropriately)
5. Insert gym_images (if we have image URLs)

### Phase 4: Verification
1. Verify all gyms inserted correctly
2. Verify relationships (specialties, amenities) are correct
3. Verify reviews are linked correctly
4. Test queries for city/specialty filtering

## Important Notes

### Member Count Handling
- **All new gyms from mock data:** Leave `member_count` NULL (unclaimed listings)
- **Only set member_count** when:
  - Owner provides it AND
  - It's verified AND
  - Owner opts to make it public
- **Never** scrape or estimate member counts

### Review Source Mapping
- Mock data `source: 'google'` → Database `source: 'google'`
- Mock data `source: 'local'` with `reviewerName: 'Demo Review'` → Database `source: 'internal'` with `is_verified: false`

### Coordinate Conversion
- Mock: `coordinates: [34.7071, 33.0226]` (lat, lng)
- Database: `latitude: 34.7071, longitude: 33.0226`

### Opening Hours Conversion
- Mock: `openingHours: { monday: '6:00 AM - 11:00 PM', ... }`
- Database: `opening_hours: '{"monday": "6:00 AM - 11:00 PM", ...}'::jsonb`

## Next Steps

1. **Create migration files** for schema updates
2. **Create data mapping script** to convert mock data to database format
3. **Test migrations** on a development branch (if available)
4. **Run migrations** in order
5. **Insert data** using the mapping script
6. **Verify** all data is correct
7. **Update frontend** to use Supabase client instead of mock data

## Security & Performance Advisors

### Security Warnings (Non-Critical)
- Function search_path mutable (can be fixed later)
- Extension in public schema (can be fixed later)

### Performance Recommendations
- Add indexes on foreign keys (can be done after data insertion)
- Optimize RLS policies (can be done after data insertion)
- Unused indexes (will be used once we start querying)

