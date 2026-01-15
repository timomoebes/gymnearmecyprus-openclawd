# Quick Start: Verify All Gym Map Coordinates

## Fastest Method (Automated)

1. **Install tsx** (if needed):
   ```bash
   npm install -D tsx
   ```

2. **Run the verification script**:
   ```bash
   npm run verify-maps
   ```

3. **Check the generated reports**:
   - `gym-map-issues.csv` - Spreadsheet with all issues
   - `gym-map-verification-report.md` - Detailed markdown report

4. **Review the console output** for a quick summary

## Manual Method (For Specific Gyms)

1. Visit: `http://localhost:3000/gyms/[gym-slug]`
2. Click **"Show Map"** button
3. Verify the marker is at the correct address
4. If incorrect, note the gym slug and coordinates

## Common Issues

- **"Map location unavailable"** → Coordinates are missing (0,0 or null)
- **Marker in wrong location** → Coordinates need to be updated in database
- **Marker in ocean** → Coordinates are default (0,0), need geocoding

## Fixing Issues

1. Get correct coordinates from Google Maps or OpenStreetMap
2. Update in Supabase: `gyms` table → `latitude` and `longitude` columns
3. Re-run verification script to confirm fix

---

For detailed instructions, see: `docs/MAP_VERIFICATION_GUIDE.md`
