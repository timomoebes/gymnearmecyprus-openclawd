"""
Fix incorrect 24-hour-gym specialty assignments.

This script:
1. Identifies gyms incorrectly tagged as "24-hour-gym"
2. Removes the incorrect assignment unless verified (name contains "24" or opening hours show 24/7)
3. Generates SQL to fix the database
"""

import json
import pandas as pd
import re

# Paths
CSV_PATH = 'data/clean/limassol_gyms_clean.csv'
OUTPUT_SQL = 'scripts/fix_24hour_gym_assignments.sql'

# Specialty UUIDs
SPECIALTY_UUIDS = {
    "24-hour-gym": "175c7168-835e-4955-9d15-730b57f9b9ff",
    "mma": "7a0ab816-372c-410c-a373-9e7794cac9e6",
    "boxing": "f6559489-8266-42f2-aea9-89a3a76eeea0",
    "pilates": "b85cb2e6-fb93-4167-aa98-d5f4444061b1",
    "personal-trainer": "1b9ecd3b-fe53-4432-9dc0-978f90eaacb3",
    "yoga": "ea4205eb-b55b-4b0d-a762-d267ec55f123",
    "crossfit": "ca21235b-511e-40d0-8772-9fb070ab7cf5",
}

def is_verified_24hour(gym_name, opening_hours_str):
    """Check if gym is verified as 24-hour based on name or opening hours"""
    if pd.isna(gym_name):
        gym_name = ""
    else:
        gym_name = str(gym_name).lower()
    
    # Check name for "24" indicators
    name_indicators = ['24', '24 hour', '24hr', '24/7', 'twenty-four']
    if any(indicator in gym_name for indicator in name_indicators):
        return True
    
    # Check opening hours for 24/7
    if pd.notna(opening_hours_str):
        opening_hours_str = str(opening_hours_str).lower()
        if '24/7' in opening_hours_str or '24 hours' in opening_hours_str:
            return True
        # Try to parse JSON
        try:
            hours = json.loads(opening_hours_str) if isinstance(opening_hours_str, str) else opening_hours_str
            if isinstance(hours, dict):
                # Check if all days show 24/7 or similar
                for day, time_str in hours.items():
                    if time_str and isinstance(time_str, str):
                        if '24' in time_str.lower() or '24/7' in time_str.lower():
                            return True
        except:
            pass
    
    return False

def infer_correct_specialty(gym_name, current_specialty):
    """Try to infer correct specialty from gym name"""
    if pd.isna(gym_name):
        return None
    
    gym_name_lower = str(gym_name).lower()
    
    # MMA indicators
    if any(word in gym_name_lower for word in ['mma', 'judo', 'taekwondo', 'muay thai', 'martial arts', 'fighting', 'cage', 'combat']):
        return "mma"
    
    # Boxing indicators
    if any(word in gym_name_lower for word in ['boxing', 'box']):
        return "boxing"
    
    # Pilates indicators
    if any(word in gym_name_lower for word in ['pilates', 'contrology']):
        return "pilates"
    
    # CrossFit indicators
    if any(word in gym_name_lower for word in ['crossfit', 'cross fit']):
        return "crossfit"
    
    # Personal trainer indicators
    if any(word in gym_name_lower for word in ['personal training', 'personal trainer', 'pt studio']):
        return "personal-trainer"
    
    # Yoga indicators
    if any(word in gym_name_lower for word in ['yoga', 'vinyasa']):
        return "yoga"
    
    return None

def main():
    print("=" * 80)
    print("FIXING INCORRECT 24-HOUR-GYM ASSIGNMENTS")
    print("=" * 80)
    print()
    
    # Load CSV
    print("[1/4] Loading CSV data...")
    df = pd.read_csv(CSV_PATH)
    print(f"  Loaded {len(df)} gyms")
    print()
    
    # Get gyms with 24-hour-gym specialty
    print("[2/4] Analyzing 24-hour-gym assignments...")
    gyms_with_24hour = df[df['specialty_slug'] == '24-hour-gym'].copy()
    print(f"  Found {len(gyms_with_24hour)} gyms tagged as 24-hour-gym")
    print()
    
    # Categorize gyms
    verified_24hour = []
    incorrect_24hour = []
    needs_reassignment = []
    
    for idx, row in gyms_with_24hour.iterrows():
        gym_name = row['name']
        opening_hours = row.get('opening_hours', None)
        
        if is_verified_24hour(gym_name, opening_hours):
            verified_24hour.append(row)
            print(f"  [VERIFIED] {gym_name} - Keep as 24-hour-gym")
        else:
            incorrect_24hour.append(row)
            inferred = infer_correct_specialty(gym_name, '24-hour-gym')
            if inferred:
                needs_reassignment.append((row, inferred))
                print(f"  [REASSIGN] {gym_name} -> {inferred}")
            else:
                print(f"  [REMOVE] {gym_name} - Remove 24-hour-gym (no replacement)")
    
    print()
    print(f"  Summary:")
    print(f"    - Verified 24-hour gyms: {len(verified_24hour)}")
    print(f"    - Incorrect assignments: {len(incorrect_24hour)}")
    print(f"    - Need reassignment: {len(needs_reassignment)}")
    print()
    
    # Generate SQL
    print("[3/4] Generating SQL fix script...")
    sql_statements = []
    sql_statements.append("-- Fix incorrect 24-hour-gym specialty assignments")
    sql_statements.append("-- Generated by fix_24hour_gym_assignments.py")
    sql_statements.append("")
    sql_statements.append("BEGIN;")
    sql_statements.append("")
    
    # Get 24-hour-gym specialty UUID
    specialty_24hour_uuid = SPECIALTY_UUIDS['24-hour-gym']
    
    # Remove incorrect assignments (gyms that need to be removed or reassigned)
    for row in incorrect_24hour:
        # We'll need to get the gym ID from the database, so we'll use slug
        slug = row['slug']
        sql_statements.append(f"-- Remove incorrect 24-hour-gym assignment: {row['name']}")
        sql_statements.append(f"DELETE FROM gym_specialties")
        sql_statements.append(f"WHERE gym_id = (SELECT id FROM gyms WHERE slug = '{slug}')")
        sql_statements.append(f"  AND specialty_id = '{specialty_24hour_uuid}';")
        sql_statements.append("")
    
    # Add correct specialty assignments
    for row, new_specialty in needs_reassignment:
        new_specialty_uuid = SPECIALTY_UUIDS.get(new_specialty)
        if new_specialty_uuid:
            slug = row['slug']
            sql_statements.append(f"-- Assign correct specialty: {row['name']} -> {new_specialty}")
            sql_statements.append(f"INSERT INTO gym_specialties (gym_id, specialty_id)")
            sql_statements.append(f"SELECT g.id, '{new_specialty_uuid}'")
            sql_statements.append(f"FROM gyms g")
            sql_statements.append(f"WHERE g.slug = '{slug}'")
            sql_statements.append(f"  AND NOT EXISTS (")
            sql_statements.append(f"    SELECT 1 FROM gym_specialties gs")
            sql_statements.append(f"    WHERE gs.gym_id = g.id AND gs.specialty_id = '{new_specialty_uuid}'")
            sql_statements.append(f"  );")
            sql_statements.append("")
    
    sql_statements.append("COMMIT;")
    sql_statements.append("")
    
    # Write SQL file
    with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"  Generated SQL file: {OUTPUT_SQL}")
    print()
    
    # Summary
    print("[4/4] Summary")
    print("=" * 80)
    print(f"Total gyms analyzed: {len(gyms_with_24hour)}")
    print(f"Verified 24-hour gyms (kept): {len(verified_24hour)}")
    print(f"Incorrect assignments (removed): {len(incorrect_24hour)}")
    print(f"  - Reassigned to correct specialty: {len(needs_reassignment)}")
    print(f"  - Removed without replacement: {len(incorrect_24hour) - len(needs_reassignment)}")
    print()
    print("Next steps:")
    print("1. Review the generated SQL file: scripts/fix_24hour_gym_assignments.sql")
    print("2. Execute the SQL in Supabase to fix the database")
    print("3. Verify the changes in the frontend")
    print()

if __name__ == "__main__":
    main()

