# Bulk Import Instructions: 45 Limassol Gyms

## Status
- **SQL File Generated**: ✅ `scripts/bulk_import_limassol_gyms.sql`
- **File Size**: 60,914 characters (2,305 lines)
- **Gyms to Import**: 45 gyms
- **Already Imported**: 5 test gyms (excluded from bulk import)

## Current Database State
- **Total Gyms in Limassol**: 7 (5 test + 2 others)
- **Expected After Import**: 50 total gyms (5 test + 45 bulk)

## Execution Options

### Option 1: Supabase Dashboard (Recommended)
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `scripts/bulk_import_limassol_gyms.sql`
5. Paste into the SQL editor
6. Click **Run** or press `Ctrl+Enter`
7. Verify the import was successful

### Option 2: Supabase CLI
```bash
# If you have Supabase CLI installed
supabase db execute --file scripts/bulk_import_limassol_gyms.sql
```

### Option 3: psql (PostgreSQL client)
```bash
# If you have direct database access
psql -h <your-supabase-host> -U postgres -d postgres -f scripts/bulk_import_limassol_gyms.sql
```

## Verification After Import

Run these queries to verify the import:

```sql
-- Check total gym count
SELECT COUNT(*) as total_gyms 
FROM gyms 
WHERE city_id = 'a8d0fd41-5901-4a94-93d3-ecc28166b137';
-- Expected: 50

-- Check specialty relationships
SELECT 
    s.name as specialty,
    COUNT(gs.gym_id) as gym_count
FROM specialties s
LEFT JOIN gym_specialties gs ON s.id = gs.specialty_id
LEFT JOIN gyms g ON gs.gym_id = g.id
WHERE g.city_id = 'a8d0fd41-5901-4a94-93d3-ecc28166b137'
GROUP BY s.name
ORDER BY gym_count DESC;

-- Check for any import errors (gyms without specialties)
SELECT 
    g.name,
    g.slug,
    COUNT(gs.specialty_id) as specialty_count
FROM gyms g
LEFT JOIN gym_specialties gs ON g.id = gs.gym_id
WHERE g.city_id = 'a8d0fd41-5901-4a94-93d3-ecc28166b137'
GROUP BY g.id, g.name, g.slug
HAVING COUNT(gs.specialty_id) = 0;
-- Should return 0 rows
```

## What the Migration Does

1. **Inserts 45 new gyms** into the `gyms` table
2. **Creates specialty relationships** in `gym_specialties` table
3. **Uses ON CONFLICT** to handle any duplicate slugs gracefully
4. **Wraps everything in a transaction** (BEGIN/COMMIT) for atomicity

## Notes

- All gyms are marked as `is_featured = false` (unclaimed)
- All gyms have `member_count_verified = false` (no member counts)
- Phone numbers are formatted with `+` prefix
- Ratings and review counts are preserved from scraped data
- Descriptions are NULL (will be generated later via SEO script)

## Next Steps After Import

1. ✅ Verify import in database
2. Generate SEO-optimized descriptions for all 45 new gyms
3. Update frontend mock data (if still using mock data)
4. Test frontend rendering of all gyms
5. Verify specialty filters work correctly
6. Check city page displays all gyms

## Troubleshooting

If the import fails:
- Check for duplicate slug errors (should be handled by ON CONFLICT)
- Verify all specialty UUIDs exist in the database
- Check that city_id matches Limassol UUID
- Review error messages in Supabase dashboard

