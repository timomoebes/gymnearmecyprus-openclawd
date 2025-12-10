# Troubleshooting Grind Fitness Update

## Issue
After running the SQL script, specialties and amenities are not showing on the frontend.

## Possible Causes & Solutions

### 1. Wrong Gym Slug
The script now finds the gym by name (more reliable), but if you have multiple "Grind Fitness" gyms, it will update the first one found.

**Solution:** Run the verification script first:
```sql
-- Find the exact gym
SELECT id, name, slug FROM gyms WHERE name ILIKE '%grind%fitness%';
```

### 2. UUIDs Don't Match
The script now looks up UUIDs dynamically, but verify they exist:

**Solution:** Run this to check:
```sql
-- Check specialty slugs exist
SELECT slug, name FROM specialties WHERE slug IN ('crossfit', 'personal-training');

-- Check amenity names exist
SELECT name FROM amenities WHERE LOWER(name) IN ('group classes', 'parking');
```

### 3. Next.js Caching
Even with `revalidate = 0`, Next.js might cache the page.

**Solutions:**
1. **Restart the dev server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Hard refresh the browser:**
   - Chrome/Edge: Ctrl+Shift+R or Ctrl+F5
   - Firefox: Ctrl+Shift+R
   - Safari: Cmd+Shift+R

4. **Rebuild the app:**
   ```bash
   npm run build
   npm run dev
   ```

### 4. Data Not Actually Inserted
The SQL script might have failed silently.

**Solution:** Run the verification script:
```sql
-- Check if specialties were added
SELECT 
  g.name,
  s.name as specialty_name
FROM gyms g
JOIN gym_specialties gs ON g.id = gs.gym_id
JOIN specialties s ON gs.specialty_id = s.id
WHERE g.name ILIKE '%grind%fitness%';

-- Check if amenities were added
SELECT 
  g.name,
  a.name as amenity_name
FROM gyms g
JOIN gym_amenities ga ON g.id = ga.gym_id
JOIN amenities a ON ga.amenity_id = a.id
WHERE g.name ILIKE '%grind%fitness%';
```

### 5. Frontend Using Mock Data
If Supabase connection fails, the frontend falls back to mock data.

**Solution:** Check browser console for errors. Verify Supabase connection is working.

## Recommended Steps

1. **Run the updated SQL script** (`scripts/update_grind_fitness_specialties.sql`)
2. **Verify data was inserted** using `scripts/verify_grind_fitness_update.sql`
3. **Clear Next.js cache:** `rm -rf .next`
4. **Restart dev server:** `npm run dev`
5. **Hard refresh browser:** Ctrl+Shift+R
6. **Check the gym page again**

If still not working, check:
- Browser console for errors
- Network tab to see if API calls are being made
- Supabase dashboard to confirm data is in the database

