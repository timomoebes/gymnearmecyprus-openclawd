"""
Bulk Import Script for Limassol Gyms
Imports remaining 45 gyms from cleaned CSV, excluding the 5 already imported test gyms.
"""

import pandas as pd
import json
import uuid
from datetime import datetime
from pathlib import Path

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
CLEAN_DATA_PATH = PROJECT_ROOT / "data" / "clean" / "limassol_gyms_clean.csv"
SQL_OUTPUT_PATH = PROJECT_ROOT / "scripts" / "bulk_import_limassol_gyms.sql"

# Constants
LIMASSOL_CITY_ID = "a8d0fd41-5901-4a94-93d3-ecc28166b137"

# Already imported gyms (by slug) - exclude these
ALREADY_IMPORTED_SLUGS = {
    "ballet-school-pilates-studio-monika-perikleous",
    "vinyasa-yoga-studio-limassol",
    "piero-judo-academy",
    "limassol-fitness",
    "soul-vibe-space",
}

# Specialty UUIDs mapping
SPECIALTY_UUIDS = {
    "24-hour-gym": "175c7168-835e-4955-9d15-730b57f9b9ff",
    "bodybuilding": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  # Placeholder - will fetch from DB
    "boxing": "f8e7d6c5-b4a3-2910-8765-4321098765fe",
    "crossfit": "12345678-90ab-cdef-1234-567890abcdef",
    "mma": "7a0ab816-372c-410c-a373-9e7794cac9e6",
    "outdoor": "98765432-10fe-dcba-9876-543210fedcba",
    "personal-trainer": "1b9ecd3b-fe53-4432-9dc0-978f90eaacb3",
    "pilates": "b85cb2e6-fb93-4167-aa98-d5f4444061b1",
    "powerlifting": "fedcba09-8765-4321-fedc-ba0987654321",
    "swimming": "abcdef12-3456-7890-abcd-ef1234567890",
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
    '{LIMASSOL_CITY_ID}',
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
    print("BULK IMPORT: Limassol Gyms (45 remaining gyms)")
    print("=" * 80)
    print()
    
    # Load cleaned data
    print("[1/4] Loading cleaned gym data...")
    df = pd.read_csv(CLEAN_DATA_PATH)
    print(f"  Loaded {len(df)} total gyms from CSV")
    
    # Filter out already imported gyms
    df_filtered = df[~df['slug'].isin(ALREADY_IMPORTED_SLUGS)].copy()
    print(f"  Excluding {len(df) - len(df_filtered)} already imported gyms")
    print(f"  Remaining gyms to import: {len(df_filtered)}")
    print()
    
    if len(df_filtered) == 0:
        print("[ERROR] No gyms to import after filtering!")
        return
    
    # Generate SQL for each gym
    print("[2/4] Generating SQL INSERT statements...")
    gyms_sql = []
    gym_ids = []
    
    for idx, row in df_filtered.iterrows():
        try:
            gym_id, sql = generate_sql_insert(row)
            gyms_sql.append(sql)
            gym_ids.append((gym_id, row['name'], row['slug']))
            print(f"  [OK] Generated SQL for: {row['name']} (Slug: {row['slug']})")
        except Exception as e:
            print(f"  [ERROR] Failed to generate SQL for {row.get('name', 'Unknown')}: {e}")
            continue
    
    print()
    print(f"  Total SQL statements generated: {len(gyms_sql)}")
    print()
    
    # Save SQL to file
    print("[3/4] Saving SQL to file...")
    with open(SQL_OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("-- Bulk Import: Remaining Limassol Gyms\n")
        f.write(f"-- Generated: {datetime.now().isoformat()}\n")
        f.write(f"-- Total gyms: {len(gyms_sql)}\n")
        f.write(f"-- Excluded slugs: {', '.join(ALREADY_IMPORTED_SLUGS)}\n\n")
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
    print("  First 10 gyms:")
    for idx, (gym_id, name, slug) in enumerate(gym_ids[:10], 1):
        print(f"    {idx}. {name} ({slug})")
    if len(gyms_sql) > 10:
        print(f"    ... and {len(gyms_sql) - 10} more")
    print()
    
    print("=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print(f"1. Review SQL file: {SQL_OUTPUT_PATH}")
    print("2. Execute via Supabase MCP or dashboard")
    print("3. Verify import in database")
    print("4. Generate SEO descriptions for new gyms")
    print("5. Update frontend mock data if needed")
    print()

if __name__ == "__main__":
    main()

