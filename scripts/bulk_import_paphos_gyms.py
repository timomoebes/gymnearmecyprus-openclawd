"""
Bulk Import Script for Paphos Gyms
Imports all cleaned Paphos gyms from CSV.
"""

import pandas as pd
import json
import uuid
from datetime import datetime
from pathlib import Path

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
CLEAN_DATA_PATH = PROJECT_ROOT / "data" / "clean" / "paphos_gyms_clean.csv"
SQL_OUTPUT_PATH = PROJECT_ROOT / "scripts" / "bulk_import_paphos_gyms.sql"

# Constants
PAPHOS_CITY_ID = "7978d742-eeea-4c7a-b37f-7dceacd4284b"

# Specialty UUIDs mapping (from database)
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

def _sql_escape(value):
    """Escape SQL string value"""
    if pd.isna(value) or value is None or value == "":
        return "NULL"
    value_str = str(value)
    # Escape single quotes
    value_str = value_str.replace("'", "''")
    return f"'{value_str}'"

def _sql_null(value):
    """Return NULL if value is empty, otherwise escaped string"""
    if pd.isna(value) or value is None or value == "":
        return "NULL"
    return _sql_escape(value)

def _sql_bool(value):
    """Convert to SQL boolean"""
    if pd.isna(value) or value is None:
        return "false"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, str):
        return "true" if value.lower() in ("true", "1", "yes") else "false"
    return "false"

def _sql_int(value):
    """Convert to SQL integer"""
    if pd.isna(value) or value is None:
        return "NULL"
    try:
        return str(int(float(value)))
    except (ValueError, TypeError):
        return "NULL"

def _sql_numeric(value):
    """Convert to SQL numeric"""
    if pd.isna(value) or value is None:
        return "NULL"
    try:
        return str(float(value))
    except (ValueError, TypeError):
        return "NULL"

def generate_sql_insert(gym_row):
    """Generate SQL INSERT statement for a gym"""
    gym_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat() + "Z"
    
    # Parse specialties JSON
    specialties_json = []
    if pd.notna(gym_row.get('specialties_json')):
        try:
            specialties_json = json.loads(gym_row['specialties_json'])
        except (json.JSONDecodeError, TypeError):
            # Try to parse as string representation
            if isinstance(gym_row['specialties_json'], str):
                specialties_json = [gym_row['specialties_json']]
    
    # Ensure phone has + prefix if it exists
    phone = gym_row.get('phone', '')
    if pd.notna(phone) and phone:
        phone_str = str(phone)
        # Remove .0 suffix if present (from float conversion)
        if phone_str.endswith('.0'):
            phone_str = phone_str[:-2]
        # Remove any non-digit characters except +
        phone_str = phone_str.strip()
        if phone_str and not phone_str.startswith('+'):
            phone = '+' + phone_str
        else:
            phone = phone_str
    else:
        phone = None
    
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
    '{PAPHOS_CITY_ID}',
    {_sql_numeric(gym_row.get('latitude'))},
    {_sql_numeric(gym_row.get('longitude'))},
    {_sql_null(phone)},
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
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    updated_at = EXCLUDED.updated_at;
"""
    
    # Add specialty relationships
    specialty_sql = ""
    for specialty_uuid in specialties_json:
        if specialty_uuid:
            specialty_sql += f"""
INSERT INTO gym_specialties (gym_id, specialty_id)
VALUES ('{gym_id}', '{specialty_uuid}')
ON CONFLICT DO NOTHING;
"""
    
    return gym_id, sql + specialty_sql

def main():
    print("=" * 80)
    print("BULK IMPORT: Paphos Gyms")
    print("=" * 80)
    print()
    
    # Load cleaned data
    print("[1/4] Loading cleaned gym data...")
    df = pd.read_csv(CLEAN_DATA_PATH)
    print(f"  Loaded {len(df)} total gyms from CSV")
    print()
    
    if len(df) == 0:
        print("[ERROR] No gyms to import!")
        return
    
    # Generate SQL for each gym
    print("[2/4] Generating SQL INSERT statements...")
    gyms_sql = []
    gym_ids = []
    
    for idx, row in df.iterrows():
        try:
            gym_id, sql = generate_sql_insert(row)
            gyms_sql.append(sql)
            gym_ids.append((gym_id, row['name'], row['slug']))
            # Show progress without Unicode issues
            if (idx + 1) % 10 == 0:
                print(f"  Processed {idx + 1}/{len(df)} gyms...")
        except Exception as e:
            print(f"  [ERROR] Failed to generate SQL for row {idx + 1}: {str(e)[:50]}")
            continue
    
    print()
    print(f"  Total SQL statements generated: {len(gyms_sql)}")
    print()
    
    # Save SQL to file
    print("[3/4] Saving SQL to file...")
    with open(SQL_OUTPUT_PATH, 'w', encoding='utf-8', errors='replace') as f:
        f.write("-- Bulk Import: Paphos Gyms\n")
        f.write(f"-- Generated: {datetime.now().isoformat()}\n")
        f.write(f"-- Total gyms: {len(gyms_sql)}\n\n")
        f.write("BEGIN;\n\n")
        for sql in gyms_sql:
            f.write(sql)
            f.write("\n")
        f.write("\nCOMMIT;\n")
    
    print(f"  [OK] SQL saved to: {SQL_OUTPUT_PATH}")
    print()
    
    # Display summary
    print("[4/4] Import Summary:")
    print()
    print(f"  Total gyms to import: {len(gyms_sql)}")
    print()
    print("  Sample gyms (first 5 slugs):")
    for idx, (gym_id, name, slug) in enumerate(gym_ids[:5], 1):
        # Use slug only to avoid Unicode issues
        print(f"    {idx}. {slug}")
    if len(gyms_sql) > 5:
        print(f"    ... and {len(gyms_sql) - 5} more")
    print()
    
    print("=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print(f"1. Review SQL file: {SQL_OUTPUT_PATH}")
    print("2. Execute via Supabase MCP or dashboard")
    print("3. Verify import in database")
    print("4. Generate SEO descriptions for new gyms")
    print()

if __name__ == "__main__":
    main()

