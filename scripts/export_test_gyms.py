#!/usr/bin/env python3
"""
Export Test Gym Data for Enrichment
Exports the 5 test gyms from Supabase for web scraping enrichment.
"""

import json
import os
from pathlib import Path
import sys

# Try to import Supabase client
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("[WARN] Supabase Python client not installed. Will use SQL export via MCP.")

PROJECT_ROOT = Path(__file__).parent.parent
EXPORT_DIR = PROJECT_ROOT / "data" / "enrich"
EXPORT_DIR.mkdir(exist_ok=True, parents=True)
EXPORT_FILE = EXPORT_DIR / "test_gyms_to_enrich.json"

def export_via_sql():
    """Export gyms using SQL query (for MCP or manual execution)"""
    print("=" * 80)
    print("EXPORT TEST GYMS FOR ENRICHMENT")
    print("=" * 80)
    print()
    print("SQL Query to execute:")
    print()
    print("""
SELECT 
    g.id, 
    g.name, 
    g.website, 
    g.description, 
    g.opening_hours,
    g.amenities,
    c.id as city_id,
    c.name as city_name
FROM gyms g
LEFT JOIN cities c ON g.city_id = c.id
WHERE g.source = 'Google Maps Scrape' 
  AND c.name = 'Limassol'
LIMIT 5;
""")
    print()
    print("Please execute this query and save results to:", EXPORT_FILE)
    print()

def main():
    print("=" * 80)
    print("EXPORT TEST GYMS FOR ENRICHMENT")
    print("=" * 80)
    print()
    
    if not SUPABASE_AVAILABLE:
        export_via_sql()
        return
    
    # Get Supabase credentials from environment
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_ANON_KEY')
    
    if not supabase_url or not supabase_key:
        print("[ERROR] Supabase credentials not found in environment variables")
        print("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY")
        export_via_sql()
        return
    
    try:
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Query gyms
        print("[1/3] Querying Supabase for test gyms...")
        response = supabase.table('gyms').select(
            'id, name, website, description, opening_hours, amenities, city_id, cities!inner(name)'
        ).eq('source', 'Google Maps Scrape').eq('cities.name', 'Limassol').limit(5).execute()
        
        gyms = response.data if hasattr(response, 'data') else []
        
        if not gyms:
            print("[ERROR] No gyms found matching criteria")
            export_via_sql()
            return
        
        print(f"  Found {len(gyms)} gyms")
        print()
        
        # Filter and format
        print("[2/3] Processing gym data...")
        enriched_gyms = []
        skipped = []
        
        for gym in gyms:
            website = gym.get('website')
            if not website or website.strip() == '':
                skipped.append(gym.get('name', 'Unknown'))
                print(f"  [SKIP] {gym.get('name')}: No website URL")
                continue
            
            enriched_gyms.append({
                'id': gym.get('id'),
                'name': gym.get('name'),
                'website': website,
                'current_description': gym.get('description'),
                'current_opening_hours': gym.get('opening_hours'),
                'current_amenities': gym.get('amenities'),
                'city_id': gym.get('city_id'),
            })
            print(f"  [OK] {gym.get('name')}: {website}")
        
        print()
        print(f"[3/3] Exporting to {EXPORT_FILE}...")
        
        # Save to JSON
        with open(EXPORT_FILE, 'w', encoding='utf-8') as f:
            json.dump(enriched_gyms, f, indent=2, ensure_ascii=False)
        
        print(f"  Exported {len(enriched_gyms)} gyms")
        print()
        
        # Summary
        print("=" * 80)
        print("EXPORT SUMMARY")
        print("=" * 80)
        print(f"Total gyms found: {len(gyms)}")
        print(f"Gyms with websites: {len(enriched_gyms)}")
        print(f"Skipped (no website): {len(skipped)}")
        print()
        
        if enriched_gyms:
            print("Gyms to enrich:")
            print()
            for gym in enriched_gyms:
                print(f"  - {gym['name']}")
                print(f"    URL: {gym['website']}")
                print()
        
        if skipped:
            print("Skipped gyms:")
            for name in skipped:
                print(f"  - {name} (no website)")
            print()
        
        print(f"[OK] Export complete: {EXPORT_FILE}")
        print()
        
    except Exception as e:
        print(f"[ERROR] Failed to export: {e}")
        export_via_sql()
        sys.exit(1)

if __name__ == "__main__":
    main()

