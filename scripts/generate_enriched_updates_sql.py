#!/usr/bin/env python3
"""
Generate SQL UPDATE statements for all enriched gyms to update the database.
"""

import json
import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
ENRICHED_DATA_PATH = PROJECT_ROOT / "data" / "enrich" / "output" / "limassol_gyms_processed.json"
SQL_OUTPUT_PATH = PROJECT_ROOT / "scripts" / "update_enriched_gyms.sql"

def escape_sql_string(s: str) -> str:
    """Escape single quotes for SQL."""
    if not s:
        return "NULL"
    return "'" + s.replace("'", "''") + "'"

def format_opening_hours_json(hours: dict) -> str:
    """Format opening hours as JSON string for SQL."""
    if not hours:
        return "NULL"
    json_str = json.dumps(hours, ensure_ascii=False)
    return f"'{json_str}'::jsonb"

def clean_phone(phone: str) -> str:
    """Clean and format phone number."""
    if not phone or phone == "Contact for details" or "#ERROR!" in str(phone):
        return "NULL"
    
    phone = str(phone).strip()
    # Remove commas and extra spaces
    phone = re.sub(r'[,\s]+', ' ', phone)
    
    # If it starts with 357, add +
    if phone.startswith('357'):
        phone = '+' + phone
    # If it's an 8-digit local number, add Cyprus code
    elif len(re.sub(r'[^\d]', '', phone)) == 8:
        phone = '+357' + re.sub(r'[^\d]', '', phone)
    
    return escape_sql_string(phone)

def main():
    """Generate SQL updates."""
    print("=" * 80)
    print("GENERATING SQL UPDATES FOR ENRICHED GYMS")
    print("=" * 80)
    print()
    
    # Load enriched data
    with open(ENRICHED_DATA_PATH, 'r', encoding='utf-8') as f:
        enriched_gyms = json.load(f)
    
    print(f"Loaded {len(enriched_gyms)} enriched gyms")
    print()
    
    # Generate SQL
    sql_updates = []
    sql_updates.append("-- Update Limassol gyms with enriched data")
    sql_updates.append(f"-- Generated: {Path(__file__).stat().st_mtime}")
    sql_updates.append(f"-- Total gyms: {len(enriched_gyms)}")
    sql_updates.append("")
    sql_updates.append("BEGIN;")
    sql_updates.append("")
    
    for gym in enriched_gyms:
        name = gym['name']
        raw_data = gym.get('raw_data', {})
        opening_hours = gym.get('opening_hours', {})
        description = gym['description']
        
        # Generate slug from name for matching
        slug = name.lower().replace(' ', '-').replace("'", "").replace(",", "").replace("&", "and")
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        # Build UPDATE statement
        update_parts = []
        update_parts.append(f"  description = {escape_sql_string(description)}")
        
        if opening_hours:
            update_parts.append(f"  opening_hours = {format_opening_hours_json(opening_hours)}")
        
        if raw_data.get('address') and raw_data['address'] != "Contact for details":
            update_parts.append(f"  address = {escape_sql_string(raw_data['address'])}")
        
        phone = clean_phone(raw_data.get('phone', ''))
        if phone != "NULL":
            update_parts.append(f"  phone = {phone}")
        
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

