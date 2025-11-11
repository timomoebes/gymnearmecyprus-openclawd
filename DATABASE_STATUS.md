# Database Status & Migration Readiness

## ✅ Supabase MCP Server Status: **WORKING**

**Project URL:** https://tqrwhsjqiiecoywmvdgq.supabase.co

## Current Database State

### ✅ Tables Ready
All required tables exist and are ready for data:
- `cities` (4 existing, 2 missing)
- `specialties` (8 existing, 5 missing)
- `amenities` (12 existing - sufficient)
- `gyms` (0 rows - ready for 20 gyms)
- `gym_specialties` (junction table ready)
- `gym_amenities` (junction table ready)
- `reviews` (0 rows - ready for reviews)
- `gym_images` (ready)
- `user_profiles` (ready)
- `gym_owners` (ready)
- `featured_listings` (ready)
- `coupons` (ready)
- `faqs` (ready)

## Migration Files Created

### ✅ Schema Migrations (Ready to Apply)
1. `supabase/migrations/001_add_missing_cities.sql` - Adds Ayia Napa and Protaras
2. `supabase/migrations/002_add_missing_specialties.sql` - Adds Bodybuilding, MMA, Boxing, Swimming, Powerlifting
3. `supabase/migrations/003_add_member_count_fields.sql` - Adds member count system fields
4. `supabase/migrations/004_add_rating_fields.sql` - Adds rating and review_count fields
5. `supabase/migrations/005_add_years_in_business.sql` - Adds years_in_business field

## Next Steps

### Step 1: Apply Schema Migrations
Run the migration files in order using Supabase MCP:

```bash
# These will be applied via MCP apply_migration function
```

### Step 2: Create Data Migration Script
Create a script to:
- Map mock data cities to database UUIDs
- Map mock data specialties to database UUIDs
- Convert mock data format to database format
- Insert all 20 gyms
- Insert relationships (specialties, amenities)
- Insert reviews

### Step 3: Test Data Insertion
- Insert a test gym first
- Verify all relationships work
- Then insert all 20 gyms

### Step 4: Update Frontend
- Create Supabase client configuration
- Update data access layer to use Supabase
- Keep mock data as fallback during transition

## Data Mapping Notes

### City UUIDs (after migration)
- Larnaca: `c2208ba4-aea9-4e22-b256-09177179763f`
- Limassol: `a8d0fd41-5901-4a94-93d3-ecc28166b137`
- Nicosia: `fa1518c7-1daf-4e05-a27b-d6296176ef2e`
- Paphos: `7978d742-eeea-4c7a-b37f-7dceacd4284b`
- Ayia Napa: (will get UUID after migration)
- Protaras: (will get UUID after migration)

### Specialty Mapping
- CrossFit: `ca21235b-511e-40d0-8772-9fb070ab7cf5` (exists)
- Personal Training: `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3` (exists)
- Pilates: `b85cb2e6-fb93-4167-aa98-d5f4444061b1` (exists)
- Yoga: `ea4205eb-b55b-4b0d-a762-d267ec55f123` (exists)
- Bodybuilding: (will get UUID after migration)
- MMA: (will get UUID after migration)
- Boxing: (will get UUID after migration)
- Swimming: (will get UUID after migration)
- Powerlifting: (will get UUID after migration)

### Data Format Conversions
- Coordinates: `[lat, lng]` → `latitude`, `longitude`
- Featured: `featured: boolean` → `is_featured: boolean`
- Opening Hours: `openingHours: object` → `opening_hours: jsonb`
- Member Count: Leave NULL for all unclaimed gyms

## Ready to Proceed? ✅

All migration files are created and ready. The database schema is prepared. We can now:
1. Apply the migrations
2. Create the data insertion script
3. Begin migrating mock data to the database

