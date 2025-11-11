#!/usr/bin/env python3
"""
Update Supabase with Enriched Gym Data
Updates the 5 test gyms with scraped descriptions, opening hours, and amenities.
"""

import json
import os
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).parent.parent
ENRICHED_FILE = PROJECT_ROOT / "data" / "enrich" / "enriched_test_gyms.json"

# Amenity name to UUID mapping (from database)
AMENITY_MAPPING = {
    'cafe': '5d3ced7f-823a-43dd-91cc-45da729b5496',
    'cardio equipment': '030fd487-234b-450b-9080-c48419d88266',
    'group classes': '10959b05-8018-4780-a7d5-5053086d246a',
    'locker room': 'b6a4423a-775c-4c45-beca-f7c183c662e2',
    'locker rooms': 'b6a4423a-775c-4c45-beca-f7c183c662e2',
    'parking': '3aca2174-3c20-40f6-a2fb-c0b86ee59240',
    'free parking': '3aca2174-3c20-40f6-a2fb-c0b86ee59240',
    'personal training': 'e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd',
    'personal trainers': 'e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd',
    'sauna': '555d9fca-3c13-43f3-8139-d56606007b43',
    'showers': 'abc944b3-8552-4824-829d-164993e15a80',
    'steam room': '78b63197-a11d-4081-a2ba-28cffa215a40',
    'swimming pool': '92c13875-919d-4bf3-b619-0c4005b1d95e',
    'pool': '92c13875-919d-4bf3-b619-0c4005b1d95e',
    'weight training': '8f9622bd-57de-44d0-8c34-7be3bd921cdc',
    'wifi': '2684754f-40c0-480e-a8cb-fedcb0983d0b',
    'wi-fi': '2684754f-40c0-480e-a8cb-fedcb0983d0b',
}

def map_amenity_to_uuid(amenity_name: str) -> str:
    """Map amenity name to database UUID"""
    amenity_lower = amenity_name.lower().strip()
    return AMENITY_MAPPING.get(amenity_lower)

def generate_update_sql(enriched_gyms):
    """Generate SQL UPDATE statements for enriched gyms"""
    updates = []
    
    for gym in enriched_gyms:
        # Process all gyms that have any extracted data
        has_data = bool(gym.get('opening_hours') or gym.get('amenities') or gym.get('description'))
        if not has_data:
            continue  # Skip if no data extracted
        
        gym_id = gym['id']
        gym_name = gym['name']
        updates_sql = []
        amenity_inserts = []
        
        # Skip description updates - we already have SEO-optimized descriptions
        # Only update if we found a significantly better one (not in this case)
        
        # Update opening_hours if found (JSONB)
        if gym.get('opening_hours'):
            hours_json = json.dumps(gym['opening_hours'])
            updates_sql.append(f"opening_hours = '{hours_json}'::jsonb")
        
        # Map amenities to UUIDs and generate INSERT statements
        if gym.get('amenities'):
            for amenity_name in gym['amenities']:
                amenity_uuid = map_amenity_to_uuid(amenity_name)
                if amenity_uuid:
                    amenity_inserts.append({
                        'gym_id': gym_id,
                        'amenity_id': amenity_uuid,
                        'amenity_name': amenity_name
                    })
                # Note: Unmapped amenities (like "ac", "yoga studio") are skipped
                # as they don't match our standard amenities list
        
        if updates_sql or amenity_inserts:
            sql_parts = []
            
            # Gym UPDATE
            if updates_sql:
                sql_parts.append(f"""
UPDATE gyms
SET {', '.join(updates_sql)}, updated_at = NOW()
WHERE id = '{gym_id}';
""")
            
            # Amenity INSERTs
            if amenity_inserts:
                for amenity in amenity_inserts:
                    sql_parts.append(f"""
INSERT INTO gym_amenities (gym_id, amenity_id)
VALUES ('{amenity['gym_id']}', '{amenity['amenity_id']}')
ON CONFLICT DO NOTHING;
""")
            
            updates.append({
                'gym_id': gym_id,
                'gym_name': gym_name,
                'sql': '\n'.join(sql_parts),
                'opening_hours': gym.get('opening_hours'),
                'amenities': [a['amenity_name'] for a in amenity_inserts] if amenity_inserts else None
            })
    
    return updates

def main():
    print("=" * 80)
    print("UPDATE ENRICHED GYMS IN SUPABASE")
    print("=" * 80)
    print()
    
    # Load enriched data
    print("[1/3] Loading enriched data...")
    if not ENRICHED_FILE.exists():
        print(f"[ERROR] Enriched data file not found: {ENRICHED_FILE}")
        return
    
    with open(ENRICHED_FILE, 'r', encoding='utf-8') as f:
        enriched_gyms = json.load(f)
    
    print(f"  Loaded {len(enriched_gyms)} gyms")
    print()
    
    # Generate SQL updates
    print("[2/3] Generating SQL UPDATE statements...")
    
    # Debug: Check what we have
    for gym in enriched_gyms:
        print(f"  {gym['name']}: status={gym['enrichment_status']}, amenities={gym.get('amenities')}, hours={gym.get('opening_hours')}")
    
    updates = generate_update_sql(enriched_gyms)
    
    if not updates:
        print("  No updates to apply (no data to update)")
        return
    
    print(f"  Generated {len(updates)} UPDATE statements")
    print()
    
    # Save SQL file
    sql_file = PROJECT_ROOT / "scripts" / "update_enriched_gyms.sql"
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("-- Update Enriched Gym Data\n")
        f.write("-- Generated from web scraping enrichment\n\n")
        f.write("BEGIN;\n\n")
        for update in updates:
            f.write(update['sql'])
            f.write("\n")
        f.write("\nCOMMIT;\n")
    
    print(f"  SQL saved to: {sql_file}")
    print()
    
    # Summary
    print("[3/3] Update Summary:")
    print()
    for update in updates:
        print(f"  - {update['gym_name']}")
        if update['description']:
            print(f"    Description: {len(update['description'])} chars")
        if update['opening_hours']:
            print(f"    Opening hours: {len(update['opening_hours'])} days")
        if update['amenities']:
            print(f"    Amenities: {len(update['amenities'])} items (note: use gym_amenities table)")
        print()
    
    print("=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print("1. Review SQL file: scripts/update_enriched_gyms.sql")
    print("2. Execute via Supabase MCP or dashboard")
    print("3. For amenities: Insert into gym_amenities junction table")
    print("4. Verify updates in database")
    print()

if __name__ == "__main__":
    main()

