# Data Mapping Documentation: Apify → Supabase

**Date:** January 26, 2025  
**Source:** Apify Google Maps Scraper  
**Target:** Supabase `gyms` table  
**Location:** Limassol, Cyprus

---

## Column Mapping

| Apify Column | Supabase Column | Transformation | Notes |
|--------------|-----------------|----------------|-------|
| `title` | `name` | Title case, strip emojis/special chars | Required |
| - | `slug` | Generated from name (kebab-case) | Auto-generated, unique |
| - | `description` | NULL | To be added manually or via owner |
| `street` + `city` | `address` | Combined: "{street}, {city}, Cyprus" | Required |
| - | `city_id` | Hardcoded UUID | `a8d0fd41-5901-4a94-93d3-ecc28166b137` (Limassol) |
| - | `latitude` | Geocoded from address | Nominatim/OpenStreetMap |
| - | `longitude` | Geocoded from address | Nominatim/OpenStreetMap |
| `phone` | `phone` | Normalized to +357 format | Optional |
| - | `email` | NULL | Not in source data |
| `website` | `website` | Validated URL format | Optional |
| - | `logo_url` | NULL | Not in source data |
| - | `cover_image_url` | NULL | Not in source data |
| - | `membership_price_from` | NULL | Not in source data |
| - | `membership_price_to` | NULL | Not in source data |
| - | `currency` | NULL | Not in source data |
| - | `opening_hours` | NULL (JSONB) | Not in source data |
| - | `is_featured` | `false` | All new gyms unclaimed |
| - | `featured_until` | NULL | Not featured |
| - | `member_count` | NULL | Not in source (owner-verified only) |
| - | `member_count_source` | NULL | Not applicable |
| - | `member_count_verified` | `false` | Not verified |
| - | `member_count_public` | `true` | Default |
| - | `member_count_last_updated` | NULL | Not applicable |
| `totalScore` | `rating` | Float (0-5), NULL if missing | Optional |
| `reviewsCount` | `review_count` | Integer | Optional |
| - | `years_in_business` | NULL | Not in source data |
| - | `source` | "Google Maps Scrape" | Metadata field |
| `categoryName` | `specialties` (via junction) | Mapped to specialty UUIDs | See mapping below |

---

## Specialty Mapping

| Apify `categoryName` | Supabase Specialty Slug | Specialty UUID | Notes |
|----------------------|-------------------------|----------------|-------|
| "Gym" | `24-hour-gym` | `175c7168-835e-4955-9d15-730b57f9b9ff` | Default gym category |
| "Fitness center" | `24-hour-gym` | `175c7168-835e-4955-9d15-730b57f9b9ff` | General fitness |
| "Boxing gym" | `boxing` | `f6559489-8266-42f2-aea9-89a3a76eeea0` | Boxing specialty |
| "Personal trainer" | `personal-trainer` | `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3` | Personal training |
| "Yoga studio" | `yoga` | `ea4205eb-b55b-4b0d-a762-d267ec55f123` | Yoga specialty |
| "Pilates studio" | `pilates` | `b85cb2e6-fb93-4167-aa98-d5f4444061b1` | Pilates specialty |
| "Martial arts school" | `mma` | `7a0ab816-372c-410c-a373-9e7794cac9e6` | MMA specialty |
| "Judo school" | `mma` | `7a0ab816-372c-410c-a373-9e7794cac9e6` | Martial arts |
| "Dance school" | *FILTERED OUT* | - | Not a gym (unless has fitness component) |
| "Rehabilitation center" | *FILTERED OUT* | - | Not a gym (unless has fitness component) |

**Note:** Specialties are stored in `gym_specialties` junction table, not as JSON array in gyms table.

---

## Filtering Statistics

### Initial Data
- **Total Rows:** 129
- **Columns:** 11

### Filtering Applied
1. **Missing Data:** Removed 4 rows with missing street addresses
2. **Exact Duplicates:** Removed 0 exact duplicates (name + street)
3. **Non-Gym Categories:** Removed 19 rows (dance schools, rehabilitation centers, etc.)
4. **Low Rating:** Removed 1 row with rating < 3.0
5. **Low Reviews:** Removed 44 rows with < 10 reviews
6. **Wrong City:** Removed 11 rows not in Limassol

### Final Results
- **Final Rows:** 50
- **Removal Rate:** 61.2%
- **Quality:** All remaining gyms have ≥10 reviews, ≥3.0 rating (or null), and valid gym categories

---

## Data Quality Notes

### Missing Data Patterns
- **Website:** 37.21% missing (48/129)
- **Phone:** 16.28% missing (21/129)
- **Rating:** 3.10% missing (4/129)
- **Street:** 3.10% missing (4/129)

### Geocoding
- **Test Sample:** 3/5 successfully geocoded
- **Full Dataset:** Using fallback coordinates (Limassol center: 34.7071, 33.0226)
- **Note:** Proper geocoding should be done for production import

### Specialties
- All mapped categories have valid Supabase specialty UUIDs
- Unmappable categories are filtered out
- Each gym gets exactly one specialty from the mapping (can be expanded later)

---

## Example Transformations

### Example 1: Basic Gym
**Apify:**
```json
{
  "title": "Limassol Fitness",
  "totalScore": 5.0,
  "reviewsCount": 11,
  "street": "Eleftherias 109-3042",
  "city": "Limassol",
  "phone": "+357 95 144819",
  "website": "http://limassol-fitness.com/",
  "categoryName": "Personal trainer"
}
```

**Supabase:**
- `name`: "Limassol Fitness"
- `slug`: "limassol-fitness"
- `address`: "Eleftherias 109-3042, Limassol, Cyprus"
- `city_id`: `a8d0fd41-5901-4a94-93d3-ecc28166b137`
- `latitude`: 34.7154633 (geocoded)
- `longitude`: 33.1101986 (geocoded)
- `phone`: "+35795144819"
- `website`: "http://limassol-fitness.com/"
- `rating`: 5.0
- `review_count`: 11
- `specialty_uuid`: `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3` (Personal Trainer)
- `is_featured`: false
- `member_count`: NULL
- `source`: "Google Maps Scrape"

---

## Next Steps

1. ✅ Data cleaning complete
2. ⏳ Test import of 5 gyms
3. ⏳ Verify backend and frontend rendering
4. ⏳ Bulk import (after test approval)
5. ⏳ Proper geocoding for all addresses
6. ⏳ Add descriptions (manual or AI-generated)

---

**Last Updated:** January 26, 2025

