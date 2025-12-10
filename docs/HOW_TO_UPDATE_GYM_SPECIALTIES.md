# How to Update Gym Specialties Manually

This guide shows you exactly where and how to update gym specialties in the codebase.

## Overview

Gym specialties are stored in the **database** (Supabase PostgreSQL), not in code files. They are linked through a junction table called `gym_specialties`.

## Database Structure

- **Table**: `gyms` - Contains gym information (name, slug, address, etc.)
- **Table**: `specialties` - Contains specialty definitions (CrossFit, Personal Trainer, etc.)
- **Table**: `gym_specialties` - Junction table linking gyms to specialties (many-to-many relationship)

## How Specialties Are Displayed

Specialties are fetched from the database and displayed in:
1. **Gym detail pages** (`app/gyms/[slug]/page.tsx`) - Shows specialty badges
2. **Gym cards** (`components/gym/GymCard.tsx`) - Shows specialty badges
3. **Specialty pages** (`app/specialties/[specialty]/page.tsx`) - Lists gyms by specialty
4. **API layer** (`lib/api/gyms.ts`) - Fetches gym data with specialties from Supabase

## Available Specialties

Current specialties in the system (from `lib/data/specialties.ts`):
- CrossFit (`crossfit`)
- Personal Training (`personal-training`)
- Fitness (`fitness`)
- Gym (`gym`)
- Bodybuilding (`bodybuilding`)
- Yoga (`yoga`)
- Pilates (`pilates`)
- MMA (`mma`)
- Boxing (`boxing`)
- Swimming (`swimming`)
- Powerlifting (`powerlifting`)

**Note**: "Group class" is **NOT** a specialty - it's typically mentioned in descriptions or amenities. If you need it as a specialty, you would need to:
1. Add it to the `specialties` table in the database
2. Add it to `lib/data/specialties.ts` in the frontend

## How to Update Gym Specialties

### Step 1: Create a SQL Migration File

Create a new SQL file in `scripts/` directory (e.g., `scripts/update_[gym-slug]_specialties.sql`)

**Template:**
```sql
-- Update [Gym Name] Specialties
-- This migration updates [Gym Name] to have: [Specialty 1], [Specialty 2]

BEGIN;

-- Specialty UUIDs (from database - see below for how to find them)
-- crossfit: ca21235b-511e-40d0-8772-9fb070ab7cf5
-- personal-trainer: 1b9ecd3b-fe53-4432-9dc0-978f90eaacb3
-- fitness: [UUID]
-- gym: [UUID]

-- Step 1: Remove all existing specialties for this gym
DELETE FROM gym_specialties
WHERE gym_id IN (
  SELECT id FROM gyms WHERE slug = '[gym-slug]'
);

-- Step 2: Add new specialties
INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, '[specialty-uuid-1]'
FROM gyms g
WHERE g.slug = '[gym-slug]'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = '[specialty-uuid-1]'
);

INSERT INTO gym_specialties (gym_id, specialty_id)
SELECT g.id, '[specialty-uuid-2]'
FROM gyms g
WHERE g.slug = '[gym-slug]'
AND NOT EXISTS (
  SELECT 1 FROM gym_specialties gs
  WHERE gs.gym_id = g.id AND gs.specialty_id = '[specialty-uuid-2]'
);

COMMIT;
```

### Step 2: Find Specialty UUIDs

You can find specialty UUIDs by:
1. **Checking existing migration files** - Look at `scripts/fix_24hour_gym_assignments.sql` for examples
2. **Querying Supabase** - Run: `SELECT id, slug, name FROM specialties;`
3. **From Python scripts** - Check `scripts/gym_data_cleaner.py` for `SPECIALTY_UUIDS` dictionary

**Common Specialty UUIDs:**
- CrossFit: `ca21235b-511e-40d0-8772-9fb070ab7cf5`
- Personal Trainer: `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3`
- Fitness: (check database)
- Gym: (check database)
- MMA: `7a0ab816-372c-410c-a373-9e7794cac9e6`
- Boxing: `f6559489-8266-42f2-aea9-89a3a76eeea0`
- Pilates: `b85cb2e6-fb93-4167-aa98-d5f4444061b1`

### Step 3: Find Gym Slug

The gym slug is the URL-friendly version of the gym name. For example:
- "Grind Fitness Limassol" → `grind-fitness`
- "Ara Gym XL" → `ara-gym-xl`

You can find it by:
1. Checking the gym's URL: `/gyms/[slug]`
2. Querying Supabase: `SELECT slug, name FROM gyms WHERE name ILIKE '%[gym name]%';`

### Step 4: Apply the Migration

**Option A: Via Supabase Dashboard**
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the SQL from your migration file
3. Run the query
4. Verify with the verification query at the bottom

**Option B: Via Supabase CLI**
```bash
supabase db push
# Or apply specific migration:
supabase migration up
```

### Step 5: Verify the Changes

Run this verification query:
```sql
SELECT 
  g.name,
  g.slug,
  s.name as specialty_name,
  s.slug as specialty_slug
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
LEFT JOIN specialties s ON gs.specialty_id = s.id
WHERE g.slug = '[gym-slug]'
ORDER BY s.name;
```

## Example: Grind Fitness Limassol

**File**: `scripts/update_grind_fitness_specialties.sql`

This file updates Grind Fitness to have:
- CrossFit
- Personal Trainer

**Note**: "Group class" is not a specialty in the system. If you need it, you would need to add it as a new specialty first.

## Important Notes

1. **Specialties are stored in the database** - Not in TypeScript files
2. **Frontend displays what's in the database** - The `lib/api/gyms.ts` file fetches specialties from Supabase
3. **Specialty definitions** - The list of available specialties is in `lib/data/specialties.ts`, but the actual assignments are in the database
4. **Changes are immediate** - Once you update the database, the frontend will show the new specialties on the next page load

## Where Specialties Are Used in Code

1. **`lib/api/gyms.ts`** (lines 258-272) - Fetches gym specialties from database
2. **`app/gyms/[slug]/page.tsx`** - Displays specialty badges on gym detail pages
3. **`components/gym/GymCard.tsx`** - Shows specialty badges on gym cards
4. **`app/specialties/[specialty]/page.tsx`** - Lists gyms filtered by specialty

## Troubleshooting

**Problem**: Specialties not showing up after update
- **Solution**: Clear browser cache, check that the migration ran successfully, verify the gym slug is correct

**Problem**: Want to add a new specialty
- **Solution**: 
  1. Add it to `specialties` table in database
  2. Add it to `lib/data/specialties.ts` in frontend
  3. Then assign it to gyms using the migration pattern above

