#!/usr/bin/env python3
"""
Test Import Script: Import exactly 5 gyms to Supabase
Validates data quality, schema mapping, and frontend rendering.
"""

import pandas as pd
import json
import uuid
from pathlib import Path
from datetime import datetime
import sys

# Try to import Supabase client
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("[WARN] Supabase Python client not installed. Will use SQL via MCP.")

PROJECT_ROOT = Path(__file__).parent.parent
TEST_SAMPLE_PATH = PROJECT_ROOT / "data" / "clean" / "limassol_gyms_test_sample.csv"

# Constants
LIMASSOL_CITY_ID = "a8d0fd41-5901-4a94-93d3-ecc28166b137"

# Specialty UUIDs
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

def generate_sql_insert(gym_row):
    """Generate SQL INSERT statement for a gym"""
    gym_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat() + "Z"
    
    # Parse specialties JSON
    specialties_json = json.loads(gym_row['specialties_json']) if pd.notna(gym_row['specialties_json']) else []
    
    # Build SQL
    sql = f"""
INSERT INTO gyms (
    id, name, slug, description, address, city_id, latitude, longitude,
    phone, email, website, logo_url, cover_image_url,
    membership_price_from, membership_price_to, currency,
    opening_hours, is_featured, featured_until,
    member_count, member_count_source, member_count_verified, member_count_public, member_count_last_updated,
    rating, review_count, years_in_business,
    created_at, updated_at
) VALUES (
    '{gym_id}',
    {_sql_escape(gym_row['name'])},
    {_sql_escape(gym_row['slug'])},
    {_sql_null(gym_row.get('description'))},
    {_sql_escape(gym_row['address'])},
    '{LIMASSOL_CITY_ID}',
    {gym_row['latitude']},
    {gym_row['longitude']},
    {_sql_null(gym_row.get('phone'))},
    {_sql_null(gym_row.get('email'))},
    {_sql_null(gym_row.get('website'))},
    {_sql_null(gym_row.get('logo_url'))},
    {_sql_null(gym_row.get('cover_image_url'))},
    {_sql_null(gym_row.get('membership_price_from'))},
    {_sql_null(gym_row.get('membership_price_to'))},
    {_sql_null(gym_row.get('currency'))},
    {_sql_null(gym_row.get('opening_hours'))},
    {_sql_bool(gym_row.get('is_featured', False))},
    {_sql_null(gym_row.get('featured_until'))},
    {_sql_null(gym_row.get('member_count'))},
    {_sql_null(gym_row.get('member_count_source'))},
    {_sql_bool(gym_row.get('member_count_verified', False))},
    {_sql_bool(gym_row.get('member_count_public', True))},
    {_sql_null(gym_row.get('member_count_last_updated'))},
    {_sql_numeric(gym_row.get('rating'))},
    {_sql_int(gym_row.get('review_count'))},
    {_sql_null(gym_row.get('years_in_business'))},
    '{now}',
    '{now}'
);
"""
    
    # Add specialty relationships
    specialty_sql = ""
    for specialty_uuid in specialties_json:
        if specialty_uuid in SPECIALTY_UUIDS.values():
            specialty_sql += f"""
INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('{gym_id}', '{specialty_uuid}')
ON CONFLICT DO NOTHING;
"""
    
    return gym_id, sql + specialty_sql

def _sql_escape(value):
    """Escape SQL string value"""
    if pd.isna(value):
        return "NULL"
    escaped = str(value).replace("'", "''")
    return f"'{escaped}'"

def _sql_null(value):
    """Return NULL if value is null/na, else escaped string"""
    if pd.isna(value) or value is None:
        return "NULL"
    return _sql_escape(value)

def _sql_bool(value):
    """Convert to SQL boolean"""
    if pd.isna(value):
        return "false"
    return str(bool(value)).lower()

def _sql_int(value):
    """Convert to SQL integer"""
    if pd.isna(value):
        return "NULL"
    try:
        return str(int(float(value)))
    except (ValueError, TypeError):
        return "NULL"

def _sql_numeric(value):
    """Convert to SQL numeric/float"""
    if pd.isna(value):
        return "NULL"
    try:
        return str(float(value))
    except (ValueError, TypeError):
        return "NULL"

def main():
    print("=" * 80)
    print("TEST GYM IMPORT: Limassol Gyms (5 gyms)")
    print("=" * 80)
    print()
    
    # Load test sample
    print("[1/4] Loading test sample...")
    df = pd.read_csv(TEST_SAMPLE_PATH)
    print(f"  Loaded {len(df)} gyms from test sample")
    print()
    
    # Generate SQL for each gym
    print("[2/4] Generating SQL INSERT statements...")
    gyms_sql = []
    gym_ids = []
    
    for idx, row in df.iterrows():
        gym_id, sql = generate_sql_insert(row)
        gyms_sql.append(sql)
        gym_ids.append(gym_id)
        print(f"  [OK] Generated SQL for: {row['name']} (ID: {gym_id[:8]}...)")
    
    print()
    print(f"  Total SQL statements: {len(gyms_sql)}")
    print()
    
    # Save SQL to file for review
    sql_file = PROJECT_ROOT / "scripts" / "test_import.sql"
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("-- Test Import: 5 Limassol Gyms\n")
        f.write("-- Generated: " + datetime.now().isoformat() + "\n\n")
        f.write("BEGIN;\n\n")
        for sql in gyms_sql:
            f.write(sql)
            f.write("\n")
        f.write("\nCOMMIT;\n")
    
    print(f"  [OK] SQL saved to: {sql_file}")
    print()
    
    # Display summary
    print("[3/4] Import Summary:")
    print()
    for idx, (gym_id, row) in enumerate(zip(gym_ids, df.itertuples()), 1):
        print(f"  {idx}. {row.name}")
        print(f"     Slug: {row.slug}")
        print(f"     Specialty: {row.specialty_slug}")
        print(f"     Rating: {row.rating if pd.notna(row.rating) else 'N/A'}")
        print(f"     Reviews: {row.review_count}")
        print(f"     Address: {row.address[:50]}...")
        print()
    
    print("[4/4] Ready for Import")
    print()
    print("=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print("1. Review SQL file: scripts/test_import.sql")
    print("2. Execute via Supabase MCP or dashboard")
    print("3. Verify import in database")
    print("4. Test frontend rendering")
    print()
    print("[NOTE] SQL file contains all INSERT statements ready for execution")
    print()

if __name__ == "__main__":
    main()

