#!/usr/bin/env python3
"""
Update Supabase database with enriched gym data from processed JSON.
Updates descriptions, opening hours, contact info, and other enriched fields.
"""

import json
import os
from pathlib import Path
from supabase import create_client, Client
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).parent.parent
ENRICHED_DATA_PATH = PROJECT_ROOT / "data" / "enrich" / "output" / "limassol_gyms_processed.json"

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[ERROR] Supabase credentials not found in environment variables.")
    print("Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def normalize_name(name: str) -> str:
    """Normalize gym name for matching."""
    return name.lower().strip().replace("'", "").replace("&", "and").replace(",", "")

def find_gym_in_db(gym_name: str) -> dict:
    """Find gym in database by name (fuzzy matching)."""
    # Try exact match first
    response = supabase.table('gyms').select('id, slug, name').ilike('name', f'%{gym_name}%').execute()
    
    if response.data:
        # Try to find best match
        normalized_search = normalize_name(gym_name)
        for gym in response.data:
            normalized_db = normalize_name(gym['name'])
            if normalized_search in normalized_db or normalized_db in normalized_search:
                return gym
    
    return None

def update_gym_in_db(gym_id: str, enriched_data: dict) -> bool:
    """Update gym in database with enriched data."""
    update_data = {}
    
    # Update description
    if enriched_data.get('description'):
        update_data['description'] = enriched_data['description']
    
    # Update opening hours (convert to JSON string)
    if enriched_data.get('opening_hours'):
        update_data['opening_hours'] = json.dumps(enriched_data['opening_hours'])
    
    # Update contact info from raw_data
    raw_data = enriched_data.get('raw_data', {})
    
    if raw_data.get('phone') and raw_data['phone'] != 'Contact for details' and '#ERROR!' not in str(raw_data['phone']):
        # Clean phone number
        phone = str(raw_data['phone']).strip()
        if not phone.startswith('+'):
            # Try to add Cyprus country code if it's a local number
            if phone.startswith('357'):
                phone = '+' + phone
            elif len(phone) == 8:  # Local Cyprus number
                phone = '+357' + phone
        update_data['phone'] = phone
    
    if raw_data.get('email') and raw_data['email'] != 'Contact for details':
        update_data['email'] = raw_data['email'].lower().strip()
    
    if raw_data.get('address') and raw_data['address'] != 'Contact for details':
        update_data['address'] = raw_data['address']
    
    # Update website if available (from raw_data, but we don't have it in enriched data)
    # We'll skip this for now
    
    if not update_data:
        return False
    
    # Add updated_at timestamp
    update_data['updated_at'] = 'now()'
    
    try:
        response = supabase.table('gyms').update(update_data).eq('id', gym_id).execute()
        return True
    except Exception as e:
        print(f"  [ERROR] Failed to update: {e}")
        return False

def main():
    """Main update function."""
    print("=" * 80)
    print("UPDATING DATABASE WITH ENRICHED GYM DATA")
    print("=" * 80)
    print()
    
    # Load enriched data
    if not ENRICHED_DATA_PATH.exists():
        print(f"[ERROR] Enriched data file not found: {ENRICHED_DATA_PATH}")
        exit(1)
    
    with open(ENRICHED_DATA_PATH, 'r', encoding='utf-8') as f:
        enriched_gyms = json.load(f)
    
    print(f"Loaded {len(enriched_gyms)} enriched gyms")
    print()
    
    # Process each gym
    updated_count = 0
    not_found_count = 0
    error_count = 0
    
    for gym in enriched_gyms:
        gym_name = gym['name']
        print(f"Processing: {gym_name}...")
        
        # Find gym in database
        db_gym = find_gym_in_db(gym_name)
        
        if not db_gym:
            print(f"  [NOT FOUND] Could not find gym in database")
            not_found_count += 1
            continue
        
        print(f"  Found: {db_gym['name']} (slug: {db_gym['slug']})")
        
        # Update gym
        if update_gym_in_db(db_gym['id'], gym):
            print(f"  [OK] Updated successfully")
            updated_count += 1
        else:
            print(f"  [ERROR] Failed to update")
            error_count += 1
        
        print()
    
    # Summary
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total enriched gyms: {len(enriched_gyms)}")
    print(f"Successfully updated: {updated_count}")
    print(f"Not found in database: {not_found_count}")
    print(f"Errors: {error_count}")
    print()

if __name__ == "__main__":
    main()

