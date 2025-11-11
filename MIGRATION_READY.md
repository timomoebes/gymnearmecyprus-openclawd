# ✅ Data Migration Ready

## Status Summary

### ✅ Database Infrastructure: **COMPLETE**
- All 5 schema migrations applied successfully
- All 6 cities present in database
- All 13 specialties present in database (5 new ones added)
- All required fields added to gyms table (member_count, rating, etc.)

### ✅ Frontend Configuration: **UPDATED**
- Specialty visibility filter added (`HIDDEN_FOR_MVP`)
- "Hotel Gym" and "Women-Only" hidden on frontend for MVP
- All 9 active specialties visible on homepage and specialty pages
- Database retains all 13 specialties for future expansion

### ✅ Migration Scripts: **CREATED**
- `scripts/migrate-mock-data-to-db.ts` - Data conversion utilities
- `scripts/run-migration.ts` - Migration runner (template)
- `supabase/migrations/006_insert_mock_gyms.sql` - SQL template

## Next Steps: Data Migration

### Option 1: Manual SQL Migration (Recommended for Testing)

1. **Generate Complete SQL** for all 20 gyms
2. **Review the SQL** carefully
3. **Apply via Supabase MCP** or Supabase Dashboard
4. **Verify** all gyms inserted correctly

### Option 2: Programmatic Migration (For Production)

1. **Create Node.js script** that:
   - Reads mock data from `lib/data/gyms.ts`
   - Converts to database format
   - Uses Supabase MCP `apply_migration` or direct SQL execution
   - Inserts gyms one by one with error handling

### Current Mock Data Status

- **Total Gyms:** 20
- **Featured Gyms:** 5 (have member_count)
- **Unclaimed Gyms:** 15 (no member_count)
- **Total Reviews:** 48 (36 demo reviews for new gyms)

### Data Mapping

#### Cities (All Present)
- ✅ Limassol: `a8d0fd41-5901-4a94-93d3-ecc28166b137`
- ✅ Nicosia: `fa1518c7-1daf-4e05-a27b-d6296176ef2e`
- ✅ Paphos: `7978d742-eeea-4c7a-b37f-7dceacd4284b`
- ✅ Larnaca: `c2208ba4-aea9-4e22-b256-09177179763f`
- ✅ Ayia Napa: `209d0e59-baa3-4a6d-88fa-1e908747bdb3`
- ✅ Protaras: `7b90b819-b3a9-43ce-ad48-22b016b9686b`

#### Specialties (All Present)
- ✅ CrossFit: `ca21235b-511e-40d0-8772-9fb070ab7cf5`
- ✅ Bodybuilding: `b3f29ef7-beb7-432b-8553-9cb1638a9e1b`
- ✅ Yoga: `ea4205eb-b55b-4b0d-a762-d267ec55f123`
- ✅ Pilates: `b85cb2e6-fb93-4167-aa98-d5f4444061b1`
- ✅ MMA: `7a0ab816-372c-410c-a373-9e7794cac9e6`
- ✅ Boxing: `f6559489-8266-42f2-aea9-89a3a76eeea0`
- ✅ Swimming: `6d24f583-a572-4566-a1d1-bb822e9e0091`
- ✅ Powerlifting: `8117e3e2-07b3-46fd-b579-4e04020858a1`
- ✅ Personal Training: `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3`
- ⚠️ Hotel Gym: `8c8f1bc9-d0f5-47bf-989e-395615ab68ce` (hidden on frontend)
- ⚠️ Women-Only: `c3ff0881-056b-41d0-859b-6a29c89badbd` (hidden on frontend)

## Migration Checklist

### Before Migration
- [x] All schema migrations applied
- [x] All cities present
- [x] All specialties present
- [x] Frontend specialty filtering configured
- [ ] Generate complete SQL for all 20 gyms
- [ ] Review SQL for accuracy

### During Migration
- [ ] Insert all 20 gyms
- [ ] Insert gym_specialties relationships
- [ ] Insert gym_amenities relationships
- [ ] Insert reviews (48 total)
- [ ] Verify no duplicate slugs

### After Migration
- [ ] Verify all gyms visible on frontend
- [ ] Test specialty filtering
- [ ] Test city filtering
- [ ] Verify featured gyms display correctly
- [ ] Verify unclaimed gyms have no member_count
- [ ] Test gym detail pages
- [ ] Verify reviews display correctly

## Important Notes

### Member Count Handling
- **Featured gyms (5):** Will have `member_count` set with `member_count_source: 'Demo Data'`
- **Unclaimed gyms (15):** Will have `member_count: NULL`
- **All:** `member_count_verified: false` (demo data)

### Review Source Mapping
- Mock `source: 'google'` → DB `source: 'google'`
- Mock `source: 'local'` with `reviewerName: 'Demo Review'` → DB `source: 'internal'` with `is_verified: false`

### Data Format Conversions
- Coordinates: `[lat, lng]` → `latitude`, `longitude` (separate fields)
- Featured: `featured: boolean` → `is_featured: boolean`
- Opening Hours: `openingHours: object` → `opening_hours: jsonb`
- Member Count: Only set for featured gyms, NULL for unclaimed

## Ready to Proceed

All infrastructure is ready. The next step is to:
1. Generate the complete SQL migration file for all 20 gyms
2. Review and test with 1 gym first
3. Apply full migration
4. Verify everything works

**Status: READY FOR DATA MIGRATION** 🚀

