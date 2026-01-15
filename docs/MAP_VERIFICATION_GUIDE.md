# Step-by-Step Guide: Checking Map Embeddings for All Gym Listings

This guide will help you systematically verify that all gym listings have correct map positions.

## Overview

The map embedding uses coordinates (latitude/longitude) from the database to display the gym's location on an OpenStreetMap. This guide covers both **manual checking** and **automated verification**.

---

## Method 1: Automated Verification Script (Recommended)

### Step 1: Install tsx (if not already installed)

First, make sure you have `tsx` installed to run TypeScript files:

```bash
npm install -D tsx
```

### Step 2: Run the Verification Script

We've created a script that checks all gyms automatically:

```bash
npm run verify-maps
# or
npx tsx scripts/verify-gym-map-coordinates.ts
```

### Step 3: Review the Output

The script will generate a report showing:
- ✅ Gyms with valid coordinates
- ⚠️ Gyms with missing coordinates (0,0 or null)
- ❌ Gyms with invalid coordinates (out of range)
- 📍 Gyms with coordinates that might be incorrect (need manual verification)

### Step 4: Export Problematic Gyms

The script will create a CSV file (`gym-map-issues.csv`) listing all gyms that need attention.

---

## Method 2: Manual Checking (For Specific Gyms)

### Step 1: Access a Gym Listing Page

1. Navigate to your local development server: `http://localhost:3000`
2. Go to any gym listing page, for example:
   - `http://localhost:3000/gyms/bodyart-fitness-center-paralimni`
   - `http://localhost:3000/gyms/calisthenicsworkout4allcy-paralimni`
   - `http://localhost:3000/gyms/limitlessxposed-paralimni`

### Step 2: Check the Map Section

1. Scroll down to the **"Location"** section in the sidebar
2. You should see a **"Show Map"** button
3. Click **"Show Map"** to reveal the embedded map

### Step 3: Verify Map Position

**What to Check:**

1. **Map Loads Successfully**
   - ✅ Map should display without errors
   - ❌ If you see "Map location unavailable", coordinates are missing/invalid

2. **Marker Position is Correct**
   - ✅ Blue marker pin should be on the correct street/address
   - ❌ If marker is in the ocean (0,0) or wrong location, coordinates are incorrect

3. **Address Matches Location**
   - ✅ The marker should be at or very close to the gym's address
   - ❌ If marker is far from the address, coordinates need to be updated

4. **Zoom Level is Appropriate**
   - ✅ Map should be zoomed to street level (zoom 15)
   - ✅ You should be able to see the surrounding area clearly

### Step 4: Cross-Reference with OpenStreetMap

1. Click the **"Open in OpenStreetMap →"** link below the map
2. This opens OpenStreetMap in a new tab with the exact coordinates
3. Verify the location matches the gym's address
4. If incorrect, note the gym's slug and coordinates for updating

### Step 5: Document Issues

Create a list of gyms with issues:
- Gym name
- Gym slug
- Current coordinates (if visible)
- Correct address
- Issue description (e.g., "Marker in wrong location", "No coordinates")

---

## Method 3: Database-Level Verification

### Step 1: Access Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor** → **gyms** table

### Step 2: Check Coordinate Columns

For each gym, verify:
- `latitude` column has a valid number (between -90 and 90)
- `longitude` column has a valid number (between -180 and 180)
- Both columns are NOT null
- Both columns are NOT 0 (which is in the ocean off Africa)

### Step 3: Filter Problematic Gyms

Run this SQL query in Supabase SQL Editor:

```sql
-- Find gyms with missing or invalid coordinates
SELECT 
  id,
  name,
  slug,
  address,
  latitude,
  longitude,
  CASE 
    WHEN latitude IS NULL OR longitude IS NULL THEN 'Missing coordinates'
    WHEN latitude = 0 AND longitude = 0 THEN 'Default coordinates (0,0)'
    WHEN latitude < -90 OR latitude > 90 THEN 'Invalid latitude'
    WHEN longitude < -180 OR longitude > 180 THEN 'Invalid longitude'
    ELSE 'Valid coordinates'
  END AS status
FROM gyms
WHERE 
  latitude IS NULL 
  OR longitude IS NULL 
  OR (latitude = 0 AND longitude = 0)
  OR latitude < -90 
  OR latitude > 90 
  OR longitude < -180 
  OR longitude > 180
ORDER BY name;
```

### Step 4: Export for Review

Export the results to CSV for further analysis.

---

## Method 4: Batch Checking via Browser

### Step 1: Get List of All Gyms

1. Visit: `http://localhost:3000/cities` (or any city page)
2. Note all gym slugs from the listings

### Step 2: Create a Checklist

Create a spreadsheet with columns:
- Gym Name
- Slug
- URL
- Coordinates Valid? (Yes/No/Needs Review)
- Map Position Correct? (Yes/No)
- Notes

### Step 3: Check Each Gym

For each gym:
1. Visit: `http://localhost:3000/gyms/[slug]`
2. Click "Show Map"
3. Verify position
4. Mark in checklist

### Step 4: Prioritize Issues

Focus on:
1. Gyms with no coordinates (map unavailable)
2. Gyms with wrong positions (marker far from address)
3. Gyms in the same city (check if they're all correct)

---

## Common Issues and Solutions

### Issue 1: "Map location unavailable"

**Cause:** Coordinates are missing (null) or invalid (0,0)

**Solution:**
1. Check database: `latitude` and `longitude` columns
2. Geocode the address using a geocoding service
3. Update the database with correct coordinates

### Issue 2: Marker in Wrong Location

**Cause:** Incorrect coordinates in database

**Solution:**
1. Verify the gym's actual address
2. Use Google Maps or OpenStreetMap to find correct coordinates
3. Update database with correct `latitude` and `longitude`

### Issue 3: Marker in Ocean (0,0)

**Cause:** Coordinates defaulted to 0,0 when data was missing

**Solution:**
1. This is the same as Issue 1 - coordinates need to be geocoded
2. Update database with real coordinates

### Issue 4: Coordinates Swapped (Lat/Lng Reversed)

**Cause:** Latitude and longitude are in wrong order

**Solution:**
1. Check if coordinates seem reversed (e.g., Cyprus should be ~35°N, 33°E)
2. Swap the values in database if needed

---

## Quick Reference: Cyprus Coordinate Ranges

For gyms in Cyprus, coordinates should be approximately:
- **Latitude:** 34.5° to 35.5° (North)
- **Longitude:** 32.0° to 34.5° (East)

If coordinates are outside these ranges, they're likely incorrect.

---

## Updating Coordinates

### Option 1: Manual Update via Supabase

1. Go to Supabase Dashboard → Table Editor → gyms
2. Find the gym
3. Update `latitude` and `longitude` columns
4. Save

### Option 2: Geocode Address Programmatically

Use a geocoding service (Nominatim, Google Geocoding API) to get coordinates from address.

### Option 3: Use Verification Script

The verification script can help identify which gyms need updates.

---

## Testing Checklist

After fixing coordinates, verify:

- [ ] Map displays when "Show Map" is clicked
- [ ] Marker pin is visible on the map
- [ ] Marker is at the correct address location
- [ ] Map zoom level is appropriate (street level)
- [ ] "Open in OpenStreetMap" link works correctly
- [ ] Coordinates match the gym's actual location

---

## Next Steps

1. Run the automated verification script
2. Review the generated report
3. Fix coordinates for problematic gyms
4. Re-run verification to confirm fixes
5. Test a sample of fixed gyms manually

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify database connection
3. Check that coordinates are numeric (not strings)
4. Ensure coordinates are in correct format: `[latitude, longitude]`
