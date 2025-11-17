#!/usr/bin/env python3
"""
Update Supabase database with enriched gym data - Version 2
Updates descriptions, opening hours, contact info, and pricing.
"""

import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
ENRICHED_DATA_PATH = PROJECT_ROOT / "data" / "enrich" / "output" / "limassol_gyms_processed.json"
SQL_OUTPUT_PATH = PROJECT_ROOT / "scripts" / "update_enriched_gyms_v2.sql"

def escape_sql_string(s: str) -> str:
    """Escape single quotes for SQL."""
    if not s:
        return "NULL"
    return "'" + s.replace("'", "''") + "'"

def format_opening_hours_json(hours: dict) -> str:
    """Format opening hours as JSON string for SQL. ALWAYS includes all 7 days."""
    if not hours:
        # Return all days as "Closed" if no hours provided
        hours = {
            'Monday': 'Closed',
            'Tuesday': 'Closed',
            'Wednesday': 'Closed',
            'Thursday': 'Closed',
            'Friday': 'Closed',
            'Saturday': 'Closed',
            'Sunday': 'Closed',
        }
    
    # Ensure all 7 days are present
    required_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in required_days:
        if day not in hours or not hours[day]:
            hours[day] = 'Closed'
    
    json_str = json.dumps(hours, ensure_ascii=False)
    return f"'{json_str}'::jsonb"

def format_pricing_json(pricing: dict) -> str:
    """Format pricing as JSON string for SQL."""
    if not pricing or len(pricing) == 0:
        return "NULL"
    # Filter out generic "Pricing" entries with "not specified" etc
    filtered = {}
    for k, v in pricing.items():
        v_str = str(v).lower()
        # Skip if it's a generic "Pricing" key with no real info
        if k == "Pricing" and any(phrase in v_str for phrase in ["not specified", "not detailed", "not available", "contact for", "not listed", "not explicitly"]):
            continue
        # Skip if value contains these phrases
        if any(phrase in v_str for phrase in ["not specified", "not detailed", "not available", "contact for pricing"]):
            continue
        filtered[k] = v
    if not filtered:
        return "NULL"
    json_str = json.dumps(filtered, ensure_ascii=False)
    return f"'{json_str}'::jsonb"

def main():
    """Generate SQL updates."""
    print("=" * 80)
    print("GENERATING SQL UPDATES FOR ENRICHED GYMS V2")
    print("=" * 80)
    print()
    
    # Load enriched data
    with open(ENRICHED_DATA_PATH, 'r', encoding='utf-8') as f:
        enriched_gyms = json.load(f)
    
    print(f"Loaded {len(enriched_gyms)} enriched gyms")
    print()
    
    # Generate SQL
    sql_updates = []
    sql_updates.append("-- Update Limassol gyms with enriched data (V2 - with pricing)")
    sql_updates.append(f"-- Total gyms: {len(enriched_gyms)}")
    sql_updates.append("")
    sql_updates.append("BEGIN;")
    sql_updates.append("")
    
    for gym in enriched_gyms:
        name = gym['name']
        description = gym['description']
        opening_hours = gym.get('opening_hours', {})
        pricing = gym.get('pricing', {})
        raw_data = gym.get('raw_data', {})
        
        # Generate slug from name for matching
        slug = name.lower().replace(' ', '-').replace("'", "").replace(",", "").replace("&", "and")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        # Build UPDATE statement
        update_parts = []
        update_parts.append(f"  description = {escape_sql_string(description)}")
        
        if opening_hours:
            update_parts.append(f"  opening_hours = {format_opening_hours_json(opening_hours)}")
        
        if pricing:
            pricing_json = format_pricing_json(pricing)
            if pricing_json != "NULL":
                update_parts.append(f"  pricing = {pricing_json}")
        
        if raw_data.get('address') and raw_data['address'] != "Contact for details":
            update_parts.append(f"  address = {escape_sql_string(raw_data['address'])}")
        
        phone = raw_data.get('phone', '')
        if phone and phone != "Contact for details" and "#ERROR!" not in str(phone):
            # Clean phone number
            phone_clean = str(phone).strip()
            if not phone_clean.startswith('+'):
                if phone_clean.startswith('357'):
                    phone_clean = '+' + phone_clean
                elif len(re.sub(r'[^\d]', '', phone_clean)) == 8:
                    phone_clean = '+357' + re.sub(r'[^\d]', '', phone_clean)
            update_parts.append(f"  phone = {escape_sql_string(phone_clean)}")
        
        if raw_data.get('email') and raw_data['email'] != "Contact for details":
            email = raw_data['email'].lower().strip()
            update_parts.append(f"  email = {escape_sql_string(email)}")
        
        update_parts.append("  updated_at = NOW()")
        
        sql_updates.append(f"-- Update {name}")
        sql_updates.append(f"UPDATE gyms")
        sql_updates.append("SET")
        sql_updates.append(",\n".join(update_parts))
        sql_updates.append(f"WHERE slug = {escape_sql_string(slug)}")
        sql_updates.append("  OR name ILIKE " + escape_sql_string(f"%{name}%") + ";")
        sql_updates.append("")
    
    sql_updates.append("COMMIT;")
    sql_updates.append("")
    
    # Write to file
    with open(SQL_OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write("\n".join(sql_updates))
    
    print(f"[OK] Generated SQL file: {SQL_OUTPUT_PATH}")
    print(f"     Contains {len(enriched_gyms)} UPDATE statements")
    print()

if __name__ == "__main__":
    main()

