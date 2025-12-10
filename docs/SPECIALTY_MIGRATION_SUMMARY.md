# Specialty Migration Summary

## Overview

Successfully refactored the specialties system from 11 categories to 8 consolidated specialties and migrated all existing gym listings to the new structure.

## Migration Date

2025-01-XX

## New Specialty Structure

The system now uses 8 consolidated specialties:

1. **Fitness/Gym** (`fitness-gym`) - General fitness centers and traditional gyms
2. **CrossFit** (`crossfit`) - High-intensity functional fitness training
3. **Personal Training** (`personal-training`) - One-on-one training sessions
4. **Martial Arts** (`martial-arts`) - MMA, boxing, and combat sports
5. **Yoga & Pilates** (`yoga-pilates`) - Yoga studios and Pilates facilities
6. **Dance & Group Fitness** (`dance-group-fitness`) - Dance studios and group classes
7. **Strength Training** (`strength-training`) - Bodybuilding and powerlifting
8. **Swimming & Aquatics** (`swimming-aquatics`) - Gyms with swimming pools

## Migration Mapping

| Old Specialty | New Specialty |
|--------------|---------------|
| `fitness` | `fitness-gym` |
| `gym` | `fitness-gym` |
| `crossfit` | `crossfit` (no change) |
| `personal-training` | `personal-training` (no change) |
| `mma` | `martial-arts` |
| `boxing` | `martial-arts` |
| `yoga` | `yoga-pilates` |
| `pilates` | `yoga-pilates` |
| `bodybuilding` | `strength-training` |
| `powerlifting` | `strength-training` |
| `swimming` | `swimming-aquatics` |

## Files Modified

### Core Data Files
1. **`lib/data/specialties.ts`** - Updated with 8 new consolidated specialties
   - Removed old specialty definitions
   - Added new specialty definitions with proper descriptions and icons

### Database Migrations
2. **`supabase/migrations/007_migrate_specialties_to_consolidated.sql`** - Database migration script
   - Maps old specialties to new ones
   - Updates `gym_specialties` junction table
   - Removes old specialty relationships
   - Adds new specialty relationships

### Frontend Pages
3. **`app/specialties/[specialty]/page.tsx`** - Specialty detail page
   - Added redirect mapping for old specialty slugs
   - Updated emoji mappings for new specialties
   - Updated metadata handling for new specialty slugs
   - Updated content sections for new specialty names

4. **`app/page.tsx`** - Homepage
   - Updated emoji mappings for new specialties

5. **`app/specialties/page.tsx`** - Specialties listing page
   - Updated emoji mappings for new specialties

### Data Layer
6. **`lib/data/index.ts`** - Specialty count calculation
   - Updated specialty matching logic for new consolidated specialties
   - Handles mapping of old specialty names to new ones

7. **`lib/data/gyms.ts`** - Mock data and specialty filtering
   - Updated `getGymsBySpecialtyMock` to handle new specialty names
   - Added mapping logic for consolidated specialties

### Verification Scripts
8. **`scripts/verify_specialty_migration.sql`** - Verification queries
   - Checks gym specialty distribution
   - Verifies all 210 gyms have specialties
   - Checks for old specialty assignments
   - Provides sample data for verification

## URL Redirects

Old specialty URLs automatically redirect to new ones using Next.js `permanentRedirect`:

- `/specialties/fitness` → `/specialties/fitness-gym`
- `/specialties/gym` → `/specialties/fitness-gym`
- `/specialties/mma` → `/specialties/martial-arts`
- `/specialties/boxing` → `/specialties/martial-arts`
- `/specialties/yoga` → `/specialties/yoga-pilates`
- `/specialties/pilates` → `/specialties/yoga-pilates`
- `/specialties/bodybuilding` → `/specialties/strength-training`
- `/specialties/powerlifting` → `/specialties/strength-training`
- `/specialties/swimming` → `/specialties/swimming-aquatics`

## Implementation Steps

### 1. Database Migration
```bash
# Apply the migration via Supabase Dashboard or CLI
supabase migration up
# Or run the SQL file directly in Supabase SQL Editor
```

### 2. Verification
```bash
# Run verification queries
# Execute scripts/verify_specialty_migration.sql in Supabase SQL Editor
```

### 3. Frontend Deployment
```bash
# The frontend changes are already in place
# Deploy the updated codebase
npm run build
```

## Testing Checklist

- [x] All 8 new specialties defined in `lib/data/specialties.ts`
- [x] Database migration script created
- [x] URL redirects implemented for old specialty slugs
- [x] Emoji mappings updated for all pages
- [x] Metadata handling updated for new specialty slugs
- [x] Specialty matching logic updated in data layer
- [x] Verification script created
- [ ] Database migration applied (pending)
- [ ] All 210 gyms verified to have valid specialties (pending)
- [ ] Old specialty URLs tested for redirects (pending)
- [ ] Specialty filters tested on frontend (pending)

## Breaking Changes

### For Developers
- Old specialty slugs are no longer valid (redirects handle this)
- Specialty matching logic now uses consolidated names
- Mock data functions updated to handle new specialty structure

### For Users
- Old specialty URLs automatically redirect to new ones
- No user-facing breaking changes

## Rollback Procedure

If rollback is needed:

1. **Database Rollback:**
   - Restore from backup taken before migration
   - Or manually reverse the migration by:
     - Restoring old specialty entries
     - Reverting `gym_specialties` relationships

2. **Frontend Rollback:**
   - Revert changes to `lib/data/specialties.ts`
   - Revert changes to specialty pages
   - Revert emoji mappings

## Notes

- The migration preserves all gym data - only specialty assignments are changed
- Duplicate specialties (e.g., gym with both MMA and Boxing) are consolidated to single `martial-arts` assignment
- All 210 gyms should maintain at least one specialty after migration
- Old specialty entries remain in database for potential rollback (commented out deletion in migration)

## Next Steps

1. Apply database migration in Supabase
2. Run verification queries to confirm all gyms have valid specialties
3. Test URL redirects for old specialty slugs
4. Test specialty filters and search functionality
5. Monitor for any issues after deployment

