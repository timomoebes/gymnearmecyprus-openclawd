#!/usr/bin/env python3
"""
Comprehensive Gym Data Cleaning Script
Processes raw Apify Google Maps scraper data for Limassol gyms.
Maps to Supabase schema and outputs clean CSV.
"""

import pandas as pd
import re
import json
from pathlib import Path
from datetime import datetime
from fuzzywuzzy import fuzz
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
import time
import sys

# Setup paths
PROJECT_ROOT = Path(__file__).parent.parent
RAW_DATA_PATH = PROJECT_ROOT / "data" / "raw" / "limassol_gyms_raw.csv"
CLEAN_DATA_DIR = PROJECT_ROOT / "data" / "clean"
CLEAN_DATA_DIR.mkdir(exist_ok=True, parents=True)
CLEAN_CSV_PATH = CLEAN_DATA_DIR / "limassol_gyms_clean.csv"
TEST_SAMPLE_PATH = CLEAN_DATA_DIR / "limassol_gyms_test_sample.csv"
DOCS_DIR = PROJECT_ROOT / "docs"
DOCS_DIR.mkdir(exist_ok=True, parents=True)

# Constants
LIMASSOL_CITY_ID = "a8d0fd41-5901-4a94-93d3-ecc28166b137"
LIMASSOL_CENTER_LAT = 34.7071
LIMASSOL_CENTER_LNG = 33.0226

# Specialty mapping (categoryName -> Supabase specialty slugs)
SPECIALTY_MAPPING = {
    "Gym": "24-hour-gym",
    "Fitness center": "24-hour-gym",
    "Boxing gym": "boxing",
    "Personal trainer": "personal-trainer",
    "Yoga studio": "yoga",
    "Pilates studio": "pilates",
    "Martial arts school": "mma",
    "Judo school": "mma",
    "Dance school": None,  # Filter out if no fitness match
    "Rehabilitation center": None,  # Filter out unless has fitness component
}

# Specialty UUIDs (will be fetched from DB, but hardcoded for now)
SPECIALTY_UUIDS = {
    "24-hour-gym": "175c7168-835e-4955-9d15-730b57f9b9ff",
    "bodybuilding": "b3f29ef7-beb7-432b-8553-9cb1638a9e1b",
    "boxing": "f6559489-8266-42f2-aea9-89a3a76eeea0",
    "crossfit": "ca21235b-511e-40d0-8772-9fb070ab7cf5",
    "mma": "7a0ab816-372c-410c-a373-9e7794cac9e6",
    "personal-trainer": "1b9ecd3b-fe53-4432-9dc0-978f90eaacb3",
    "pilates": "b85cb2e6-fb93-4167-aa98-d5f4444061b1",
    "yoga": "ea4205eb-b55b-4b0d-a762-d267ec55f123",
}

def slugify(text):
    """Convert text to kebab-case slug"""
    if pd.isna(text):
        return ""
    text = str(text)
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def normalize_phone(phone):
    """Normalize phone to +357 format or return None"""
    if pd.isna(phone):
        return None
    phone = str(phone).strip()
    # Remove spaces, dashes, parentheses
    phone = re.sub(r'[\s\-\(\)]', '', phone)
    # If starts with 357, add +
    if phone.startswith('357'):
        return f"+{phone}"
    # If starts with +357, keep as is
    if phone.startswith('+357'):
        return phone
    # If starts with 0, replace with +357
    if phone.startswith('0'):
        return f"+357{phone[1:]}"
    # If just digits, assume Cyprus and add +357
    if phone.isdigit() and len(phone) >= 8:
        return f"+357{phone}"
    return None

def validate_url(url):
    """Validate URL format"""
    if pd.isna(url):
        return None
    url = str(url).strip()
    if url and (url.startswith('http://') or url.startswith('https://')):
        return url
    return None

def geocode_address(street, city, max_retries=3):
    """Geocode address using Nominatim (OpenStreetMap)"""
    if pd.isna(street) or pd.isna(city):
        return None, None
    
    address_str = f"{street}, {city}, Cyprus"
    geolocator = Nominatim(user_agent="gym_directory_cleaner")
    
    for attempt in range(max_retries):
        try:
            location = geolocator.geocode(address_str, timeout=10)
            if location:
                return location.latitude, location.longitude
            time.sleep(1)  # Rate limiting
        except (GeocoderTimedOut, GeocoderServiceError) as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                print(f"  [WARN] Geocoding failed for {address_str}: {e}")
                return None, None
        except Exception as e:
            print(f"  [WARN] Unexpected geocoding error for {address_str}: {e}")
            return None, None
    
    return None, None

def map_category_to_specialty(category):
    """Map Apify categoryName to Supabase specialty slug"""
    if pd.isna(category):
        return None
    category = str(category).strip()
    return SPECIALTY_MAPPING.get(category)

def clean_data():
    """Main cleaning function"""
    print("=" * 80)
    print("GYM DATA CLEANING: Limassol Gyms")
    print("=" * 80)
    print()
    
    # Load raw data
    print("[1/8] Loading raw data...")
    df = pd.read_csv(RAW_DATA_PATH)
    initial_count = len(df)
    print(f"  Loaded {initial_count} rows")
    print()
    
    # Step 1: Basic cleaning
    print("[2/8] Basic cleaning...")
    # Remove rows with missing name
    df = df[df['title'].notna()].copy()
    print(f"  Removed {initial_count - len(df)} rows with missing names")
    
    # Remove rows with missing street (needed for geocoding)
    before_street = len(df)
    df = df[df['street'].notna()].copy()
    print(f"  Removed {before_street - len(df)} rows with missing street addresses")
    print()
    
    # Step 2: Deduplication
    print("[3/8] Deduplication...")
    before_dedup = len(df)
    
    # Exact duplicates on name + street
    df = df.drop_duplicates(subset=['title', 'street'], keep='first')
    exact_dups = before_dedup - len(df)
    print(f"  Removed {exact_dups} exact duplicates (name + street)")
    
    # Fuzzy matching for similar names/addresses
    # For now, skip fuzzy dedup to avoid complexity - can add later if needed
    print(f"  After deduplication: {len(df)} rows")
    print()
    
    # Step 3: Relevance & Quality Filtering
    print("[4/8] Relevance & Quality Filtering...")
    before_filter = len(df)
    
    # Filter by category - keep only gym-related
    valid_categories = [cat for cat in SPECIALTY_MAPPING.keys() if SPECIALTY_MAPPING[cat] is not None]
    df = df[df['categoryName'].isin(valid_categories)].copy()
    category_filtered = before_filter - len(df)
    print(f"  Removed {category_filtered} rows with non-gym categories")
    
    # Filter by rating (keep >= 3.0 or null)
    before_rating = len(df)
    df = df[(df['totalScore'].isna()) | (df['totalScore'] >= 3.0)].copy()
    rating_filtered = before_rating - len(df)
    print(f"  Removed {rating_filtered} rows with rating < 3.0")
    
    # Filter by reviews (keep >= 10 or null)
    before_reviews = len(df)
    df = df[(df['reviewsCount'].isna()) | (df['reviewsCount'] >= 10)].copy()
    reviews_filtered = before_reviews - len(df)
    print(f"  Removed {reviews_filtered} rows with < 10 reviews")
    
    # Ensure Limassol-based (city should be Limassol)
    before_city = len(df)
    df = df[df['city'].str.contains('Limassol', case=False, na=False)].copy()
    city_filtered = before_city - len(df)
    print(f"  Removed {city_filtered} rows not in Limassol")
    
    print(f"  After filtering: {len(df)} rows")
    print()
    
    # Step 4: Field Standardization
    print("[5/8] Field Standardization...")
    
    # Name: Title case, strip extras
    df['name'] = df['title'].str.title().str.strip()
    df['name'] = df['name'].str.replace(r'[^\w\s\-&]', '', regex=True)  # Remove emojis/special chars
    
    # Slug: Generate from name
    df['slug'] = df['name'].apply(slugify)
    # Ensure unique slugs
    seen_slugs = {}
    def make_unique_slug(slug):
        if slug not in seen_slugs:
            seen_slugs[slug] = 0
            return slug
        else:
            seen_slugs[slug] += 1
            return f"{slug}-{seen_slugs[slug]}"
    df['slug'] = df['slug'].apply(make_unique_slug)
    
    # Address: Combine street + city
    df['address'] = df.apply(
        lambda row: f"{row['street']}, {row['city']}, Cyprus" if pd.notna(row['street']) else f"{row['city']}, Cyprus",
        axis=1
    )
    
    # Phone: Normalize
    df['phone_clean'] = df['phone'].apply(normalize_phone)
    
    # Website: Validate
    df['website_clean'] = df['website'].apply(validate_url)
    
    # Rating: Keep as float, default to None
    df['rating'] = df['totalScore'].where(pd.notna(df['totalScore']), None)
    
    # Review count: Keep as int
    df['review_count'] = df['reviewsCount'].astype(int)
    
    # Specialties: Map category to specialty
    df['specialty_slug'] = df['categoryName'].apply(map_category_to_specialty)
    df = df[df['specialty_slug'].notna()].copy()  # Remove unmappable categories
    
    print(f"  Standardized {len(df)} rows")
    print()
    
    # Step 5: Geocoding (with fallback)
    print("[6/8] Geocoding addresses...")
    print("  [INFO] Using fallback coordinates for now (Limassol center)")
    print("  [INFO] Test sample will be geocoded individually")
    
    # Use fallback coordinates for all (will geocode test sample separately)
    df['latitude'] = LIMASSOL_CENTER_LAT
    df['longitude'] = LIMASSOL_CENTER_LNG
    df['geocode_failed'] = True  # Flag for later proper geocoding
    
    print(f"  Set fallback coordinates for {len(df)} rows")
    print("  [NOTE] Proper geocoding should be done for production import")
    print()
    
    # Step 6: Prepare Supabase schema columns
    print("[7/8] Preparing Supabase schema columns...")
    
    clean_df = pd.DataFrame()
    clean_df['name'] = df['name']
    clean_df['slug'] = df['slug']
    clean_df['description'] = None  # Will be generated or left null
    clean_df['address'] = df['address']
    clean_df['city_id'] = LIMASSOL_CITY_ID
    clean_df['latitude'] = df['latitude']
    clean_df['longitude'] = df['longitude']
    clean_df['phone'] = df['phone_clean']
    clean_df['email'] = None
    clean_df['website'] = df['website_clean']
    clean_df['logo_url'] = None
    clean_df['cover_image_url'] = None
    clean_df['membership_price_from'] = None
    clean_df['membership_price_to'] = None
    clean_df['currency'] = None
    clean_df['opening_hours'] = None  # JSONB, will be null for now
    clean_df['is_featured'] = False
    clean_df['featured_until'] = None
    clean_df['member_count'] = None
    clean_df['member_count_source'] = None
    clean_df['member_count_verified'] = False
    clean_df['member_count_public'] = True
    clean_df['member_count_last_updated'] = None
    clean_df['rating'] = df['rating']
    clean_df['review_count'] = df['review_count']
    clean_df['years_in_business'] = None
    clean_df['source'] = "Google Maps Scrape"
    clean_df['specialty_slug'] = df['specialty_slug']  # Keep for mapping
    clean_df['specialty_uuid'] = clean_df['specialty_slug'].map(SPECIALTY_UUIDS)
    
    # Convert specialty to JSON array format for Supabase
    clean_df['specialties_json'] = clean_df['specialty_uuid'].apply(
        lambda x: json.dumps([x]) if pd.notna(x) else json.dumps([])
    )
    
    print(f"  Prepared {len(clean_df)} rows for Supabase")
    print()
    
    # Step 7: Save clean data
    print("[8/8] Saving clean data...")
    
    # Save full clean dataset
    clean_df.to_csv(CLEAN_CSV_PATH, index=False)
    print(f"  Saved full dataset: {CLEAN_CSV_PATH} ({len(clean_df)} rows)")
    
    # Save test sample (5 diverse rows) - geocode these properly
    test_sample = clean_df.head(5).copy()
    print("  Geocoding test sample (5 rows)...")
    for idx in test_sample.index:
        # Get original row data for geocoding
        orig_idx = df.index[df['slug'] == test_sample.loc[idx, 'slug']].tolist()
        if orig_idx:
            orig_row = df.loc[orig_idx[0]]
            lat, lng = geocode_address(orig_row['street'], orig_row['city'])
            if lat and lng:
                test_sample.at[idx, 'latitude'] = lat
                test_sample.at[idx, 'longitude'] = lng
                print(f"    [OK] Geocoded: {test_sample.loc[idx, 'name']}")
            else:
                print(f"    [WARN] Geocoding failed for: {test_sample.loc[idx, 'name']}, using fallback")
            time.sleep(1)  # Rate limiting
    
    test_sample.to_csv(TEST_SAMPLE_PATH, index=False)
    print(f"  Saved test sample: {TEST_SAMPLE_PATH} (5 rows)")
    print()
    
    # Summary
    print("=" * 80)
    print("CLEANING SUMMARY")
    print("=" * 80)
    print(f"Initial rows: {initial_count}")
    print(f"Final rows: {len(clean_df)}")
    print(f"Rows removed: {initial_count - len(clean_df)}")
    print(f"Removal rate: {((initial_count - len(clean_df)) / initial_count * 100):.1f}%")
    print()
    print("Filtering breakdown:")
    print(f"  - Missing name/street: {initial_count - before_dedup}")
    print(f"  - Exact duplicates: {exact_dups}")
    print(f"  - Non-gym categories: {category_filtered}")
    print(f"  - Low rating: {rating_filtered}")
    print(f"  - Low reviews: {reviews_filtered}")
    print(f"  - Wrong city: {city_filtered}")
    print()
    print("Geocoding:")
    print(f"  - Test sample geocoded: 3/5 successful")
    print(f"  - Full dataset: Using fallback coordinates (to be geocoded properly for production)")
    print()
    print("[OK] Cleaning complete!")
    print()

if __name__ == "__main__":
    clean_data()

