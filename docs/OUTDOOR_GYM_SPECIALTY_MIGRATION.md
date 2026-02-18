# Outdoor Gym Specialty and 24/7 Amenity Migration

**Date:** 2026-02-18  
**Status:** Ready to apply

## Overview

This migration adds a new "Outdoor gym" specialty and "24/7" amenity, then updates three outdoor gym facilities to use these new classifications.

## Changes Made

### 1. Frontend Code Updates ✅

- **File:** `lib/data/specialties.ts`
  - Added "Outdoor gym" specialty definition
  - Slug: `outdoor-gym`
  - Icon: `activity`
  - Description: "Outdoor fitness facilities and calisthenics parks offering free or public access to exercise equipment. Perfect for bodyweight training, calisthenics, and outdoor workouts."

### 2. Database Migration (Ready to Apply)

**File:** `scripts/add-outdoor-gym-specialty-and-24-7-amenity.sql`

This migration will:

1. **Create "Outdoor gym" specialty** in the database
   - Name: "Outdoor Gym"
   - Slug: `outdoor-gym`
   - Icon: `activity`

2. **Create "24/7" amenity** in the database
   - Name: "24/7"
   - Slug: `24-7`
   - Icon: `clock`

3. **Update three gym facilities:**
   - Calisthenics Area Nicosia (`calisthenics-area-nicosia`)
   - Municipality Gym Paphos (`municipality-gym-paphos`)
   - Outdoor Calisthenics Workout Spot Larnaca (`outdoor-calisthenics-workout-spot-larnaca`)

4. **For each of the three gyms:**
   - Remove "Fitness/Gym" specialty
   - Add "Outdoor gym" specialty
   - Add "24/7" amenity

## How to Apply the Migration

### Option 1: Via Supabase Dashboard (Recommended)

1. Log in to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `scripts/add-outdoor-gym-specialty-and-24-7-amenity.sql`
4. Copy the entire contents (from `BEGIN;` to `COMMIT;`)
5. Paste into the SQL Editor
6. Click **Run** to execute the migration

### Option 2: Via Supabase CLI

```bash
# If you have Supabase CLI set up locally
supabase db execute --file scripts/add-outdoor-gym-specialty-and-24-7-amenity.sql
```

## Verification

After running the migration, verify the changes using these queries in the Supabase SQL Editor:

### Check specialty was created:
```sql
SELECT id, name, slug FROM specialties WHERE slug = 'outdoor-gym';
```

### Check amenity was created:
```sql
SELECT id, name, slug FROM amenities WHERE slug = '24-7';
```

### Check gym specialties:
```sql
SELECT 
  g.name,
  g.slug,
  s.name as specialty_name,
  s.slug as specialty_slug
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
LEFT JOIN specialties s ON gs.specialty_id = s.id
WHERE g.slug IN (
  'calisthenics-area-nicosia',
  'municipality-gym-paphos',
  'outdoor-calisthenics-workout-spot-larnaca'
)
ORDER BY g.name, s.name;
```

### Check gym amenities:
```sql
SELECT 
  g.name,
  g.slug,
  a.name as amenity_name,
  a.slug as amenity_slug
FROM gyms g
LEFT JOIN gym_amenities ga ON g.id = ga.gym_id
LEFT JOIN amenities a ON ga.amenity_id = a.id
WHERE g.slug IN (
  'calisthenics-area-nicosia',
  'municipality-gym-paphos',
  'outdoor-calisthenics-workout-spot-larnaca'
)
ORDER BY g.name, a.name;
```

## Expected Results

After migration:

1. **Calisthenics Area Nicosia** should have:
   - Specialty: "Outdoor Gym" ✅
   - Amenity: "24/7" ✅
   - No longer has "Fitness/Gym" specialty ✅

2. **Municipality Gym Paphos** should have:
   - Specialty: "Outdoor Gym" ✅
   - Amenity: "24/7" ✅
   - No longer has "Fitness/Gym" specialty ✅

3. **Outdoor Calisthenics Workout Spot Larnaca** should have:
   - Specialty: "Outdoor Gym" ✅
   - Amenity: "24/7" ✅
   - No longer has "Fitness/Gym" specialty ✅

## Frontend Impact

- The "Outdoor gym" specialty will appear in specialty filters and specialty pages
- The "24/7" amenity will work with existing 24-hour gym filtering (the search utility already handles "24/7" format)
- The three updated gyms will appear in the "24 Hour Gyms Near Me" section on the homepage
- The three updated gyms will appear when filtering by "Outdoor gym" specialty

## Notes

- The migration uses `ON CONFLICT DO NOTHING` to prevent errors if run multiple times
- The migration uses `NOT EXISTS` checks to prevent duplicate assignments
- All changes are wrapped in a transaction (`BEGIN`/`COMMIT`) for atomicity
- The frontend code change is already complete and will work once the database migration is applied
