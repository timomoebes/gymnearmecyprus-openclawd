# Data Processing Guide

**Last Updated:** January 26, 2025

This guide documents the data processing pipeline for importing scraped gym data into the Supabase database.

---

## Overview

The data processing pipeline transforms raw scraped data (from Apify Google Maps scraper) into clean, validated data ready for database import.

**Pipeline Steps:**
1. Raw Data Inspection
2. Data Cleaning & Standardization
3. Test Import (5 gyms)
4. Bulk Import (remaining gyms)

---

## Step 1: Raw Data Inspection

### Script: `scripts/inspect_raw_data.py`

**Purpose:** Analyze raw CSV data structure and quality

**Usage:**
```bash
python scripts/inspect_raw_data.py
```

**Output:**
- Row count, column names
- Missing value analysis
- Data type information
- Key field statistics (ratings, reviews, categories)

**Example Results:**
- 129 rows, 11 columns
- Missing: website 37%, phone 16%, rating 3%

---

## Step 2: Data Cleaning

### Script: `scripts/gym_data_cleaner.py`

**Purpose:** Comprehensive cleaning and standardization

**Features:**
- **Deduplication:** Exact duplicates and fuzzy matching
- **Quality Filtering:**
  - Remove non-gym categories
  - Filter by rating (≥3.0)
  - Filter by reviews (≥10)
  - Ensure correct city location
- **Field Standardization:**
  - Name: Title case, strip emojis
  - Slug: Kebab-case, unique
  - Phone: Normalize to +357 format
  - Website: Validate URL format
  - Address: Combine street + city
- **Specialty Mapping:** Apify categories → Supabase specialty UUIDs
- **Geocoding:** Address to lat/lng (Nominatim/OpenStreetMap)

**Usage:**
```bash
python scripts/gym_data_cleaner.py
```

**Output Files:**
- `data/clean/limassol_gyms_clean.csv` - Full cleaned dataset
- `data/clean/limassol_gyms_test_sample.csv` - 5 gym test sample

**Filtering Results:**
- Initial: 129 rows
- Final: 50 rows
- Removal rate: 61.2%

**Filtering Breakdown:**
- Missing name/street: 4 rows
- Non-gym categories: 19 rows
- Low rating: 1 row
- Low reviews: 44 rows
- Wrong city: 11 rows

---

## Step 3: Test Import

### Script: `scripts/test_gym_import.py`

**Purpose:** Generate SQL for test import (5 gyms)

**Usage:**
```bash
python scripts/test_gym_import.py
```

**Output:**
- `scripts/test_import.sql` - SQL INSERT statements
- Summary of gyms to import

**Import Process:**
1. Generate SQL with proper UUIDs
2. Execute via Supabase MCP or dashboard
3. Verify import in database
4. Test frontend rendering

**Test Results:**
- ✅ 5/5 gyms imported successfully
- ✅ All specialty relationships created
- ✅ All descriptions added (SEO-optimized)
- ✅ Frontend integration complete

---

## Step 4: Bulk Import

**Status:** ⏳ Pending approval after test verification

**Process:**
1. Review all 50 cleaned gyms
2. Generate bulk import SQL
3. Execute import
4. Verify all relationships
5. Update frontend mock data

---

## Data Mapping

See `docs/data_mapping.md` for detailed column mapping:
- Apify columns → Supabase columns
- Specialty category mapping
- Field transformations

---

## Specialty Mapping

| Apify Category | Supabase Specialty | UUID |
|----------------|-------------------|------|
| Gym | 24 Hour Gym | `175c7168-835e-4955-9d15-730b57f9b9ff` |
| Fitness center | 24 Hour Gym | `175c7168-835e-4955-9d15-730b57f9b9ff` |
| Boxing gym | Boxing | `f6559489-8266-42f2-aea9-89a3a76eeea0` |
| Personal trainer | Personal Trainer | `1b9ecd3b-fe53-4432-9dc0-978f90eaacb3` |
| Yoga studio | Yoga | `ea4205eb-b55b-4b0d-a762-d267ec55f123` |
| Pilates studio | Pilates | `b85cb2e6-fb93-4167-aa98-d5f4444061b1` |
| Martial arts school | MMA | `7a0ab816-372c-410c-a373-9e7794cac9e6` |
| Judo school | MMA | `7a0ab816-372c-410c-a373-9e7794cac9e6` |

---

## SEO-Optimized Descriptions

All imported gyms receive SEO-optimized descriptions (588-693 characters) including:
- Location keywords ("Limassol", "Cyprus")
- Specialty keywords
- "Near me" phrases
- Rating and review count
- Natural, readable content

**Generation:** `scripts/generate_gym_descriptions.py`

---

## Dependencies

**Python Packages:**
- `pandas` - Data manipulation
- `fuzzywuzzy` - Fuzzy string matching
- `python-Levenshtein` - String similarity
- `geopy` - Geocoding

**Install:**
```bash
pip install -r requirements.txt
```

---

## File Structure

```
data/
├── raw/
│   ├── limassol_gyms_raw.csv    # Raw scraped data
│   └── limassol_gyms_raw.json   # Raw scraped data (JSON)
└── clean/
    ├── limassol_gyms_clean.csv  # Full cleaned dataset (50 rows)
    └── limassol_gyms_test_sample.csv  # Test sample (5 rows)

scripts/
├── inspect_raw_data.py          # Raw data inspection
├── gym_data_cleaner.py          # Data cleaning pipeline
├── test_gym_import.py           # Test import SQL generator
└── generate_gym_descriptions.py # SEO description generator

docs/
├── data_mapping.md              # Column mapping documentation
├── TEST_IMPORT_REPORT.md        # Test import results
└── DATA_PROCESSING_GUIDE.md     # This file
```

---

## Next Steps

1. ✅ Test import complete (5 gyms)
2. ⏳ Frontend verification
3. ⏳ Bulk import approval
4. ⏳ Import remaining 45 gyms
5. ⏳ Add reviews for imported gyms
6. ⏳ Connect frontend to Supabase API

---

**Last Updated:** January 26, 2025

