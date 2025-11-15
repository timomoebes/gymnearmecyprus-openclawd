#!/usr/bin/env python3
"""
Check which gyms from cleaned CSV files are missing from the database.
Counts gyms from CSV files and generates SQL queries to check the database.
"""

import pandas as pd
from pathlib import Path
import sys

# Setup paths
PROJECT_ROOT = Path(__file__).parent.parent

# City files to check
CITY_FILES = [
    ("Limassol", "limassol_gyms_clean.csv"),
    ("Nicosia", "nicosia_gyms_clean.csv"),
    ("Larnaca", "larnaca_gyms_clean.csv"),
    ("Paphos", "paphos_gyms_clean.csv"),
    ("Ayia Napa", "ayia_napa_gyms_clean.csv"),
    ("Protaras", "protaras_gyms_clean.csv"),
]

def get_csv_gyms(city_name, csv_file):
    """Get all gyms from a cleaned CSV file"""
    csv_path = PROJECT_ROOT / "data" / "clean" / csv_file
    if not csv_path.exists():
        print(f"  [WARN] CSV file not found: {csv_path}")
        return []
    
    try:
        df = pd.read_csv(csv_path)
        gyms = []
        for _, row in df.iterrows():
            gyms.append({
                'slug': row['slug'],
                'name': row['name']
            })
        return gyms
    except Exception as e:
        print(f"  [ERROR] Failed to read CSV: {e}")
        return []

def main():
    print("=" * 80)
    print("CHECKING EXPECTED GYMS FROM CSV FILES")
    print("=" * 80)
    print()
    
    total_csv_gyms = 0
    all_gyms_by_city = {}
    
    for city_name, csv_file in CITY_FILES:
        print(f"Reading {city_name}...")
        
        # Get gyms from CSV
        csv_gyms = get_csv_gyms(city_name, csv_file)
        csv_count = len(csv_gyms)
        total_csv_gyms += csv_count
        all_gyms_by_city[city_name] = csv_gyms
        
        print(f"  Expected: {csv_count} gyms")
        print()
    
    # Summary
    print("=" * 80)
    print("EXPECTED TOTALS FROM CSV FILES")
    print("=" * 80)
    print(f"Total expected gyms: {total_csv_gyms}")
    print()
    
    for city_name, gyms in all_gyms_by_city.items():
        print(f"{city_name}: {len(gyms)} gyms")
    print()
    
    # Generate SQL query file
    sql_output_path = PROJECT_ROOT / "scripts" / "check_missing_gyms.sql"
    
    with open(sql_output_path, 'w', encoding='utf-8') as f:
        f.write("-- Check Missing Gyms in Database\n")
        f.write(f"-- Expected total: {total_csv_gyms} gyms\n")
        f.write(f"-- Generated: {pd.Timestamp.now().isoformat()}\n\n")
        
        f.write("-- ============================================================================\n")
        f.write("-- QUERY 1: Count gyms by city\n")
        f.write("-- ============================================================================\n")
        f.write("SELECT\n")
        f.write("  c.name as city_name,\n")
        f.write("  COUNT(g.id) as gym_count\n")
        f.write("FROM cities c\n")
        f.write("LEFT JOIN gyms g ON g.city_id = c.id\n")
        f.write("GROUP BY c.id, c.name\n")
        f.write("ORDER BY c.name;\n\n")
        
        f.write("-- ============================================================================\n")
        f.write("-- QUERY 2: Find missing gyms by city\n")
        f.write("-- ============================================================================\n\n")
        
        # Generate SQL for each city
        for city_name, gyms in all_gyms_by_city.items():
            if gyms:
                f.write(f"-- Check {city_name} ({len(gyms)} expected)\n")
                f.write(f"SELECT '{city_name}' as city, slug, name, 'MISSING' as status\n")
                f.write(f"FROM (VALUES\n")
                for i, gym in enumerate(gyms):
                    comma = "," if i < len(gyms) - 1 else ""
                    name_escaped = str(gym['name']).replace("'", "''")
                    slug_escaped = str(gym['slug']).replace("'", "''")
                    f.write(f"  ('{slug_escaped}', '{name_escaped}'){comma}\n")
                f.write(f") AS expected(slug, name)\n")
                f.write(f"WHERE slug NOT IN (\n")
                f.write(f"  SELECT slug FROM gyms \n")
                f.write(f"  WHERE city_id = (SELECT id FROM cities WHERE name = '{city_name}')\n")
                f.write(f");\n\n")
        
        f.write("-- ============================================================================\n")
        f.write("-- QUERY 3: Comprehensive check - All expected vs actual\n")
        f.write("-- ============================================================================\n")
        f.write("WITH expected_gyms AS (\n")
        f.write("  SELECT * FROM (VALUES\n")
        
        all_expected = []
        for city_name, gyms in all_gyms_by_city.items():
            for gym in gyms:
                all_expected.append((city_name, gym['slug'], gym['name']))
        
        for i, (city, slug, name) in enumerate(all_expected):
            comma = "," if i < len(all_expected) - 1 else ""
            name_escaped = str(name).replace("'", "''")
            slug_escaped = str(slug).replace("'", "''")
            f.write(f"    ('{city}', '{slug_escaped}', '{name_escaped}'){comma}\n")
        
        f.write("  ) AS t(city_name, slug, name)\n")
        f.write(")\n")
        f.write("SELECT\n")
        f.write("  e.city_name,\n")
        f.write("  e.slug,\n")
        f.write("  e.name as expected_name,\n")
        f.write("  CASE WHEN g.id IS NULL THEN 'MISSING' ELSE 'EXISTS' END as status\n")
        f.write("FROM expected_gyms e\n")
        f.write("LEFT JOIN gyms g ON g.slug = e.slug\n")
        f.write("LEFT JOIN cities c ON c.id = g.city_id AND c.name = e.city_name\n")
        f.write("WHERE g.id IS NULL  -- Only show missing\n")
        f.write("ORDER BY e.city_name, e.slug;\n")
    
    print(f"[OK] SQL query file generated: {sql_output_path}")
    print()
    print("=" * 80)
    print("NEXT STEPS:")
    print("=" * 80)
    print(f"1. Open Supabase SQL Editor")
    print(f"2. Run the queries from: {sql_output_path}")
    print(f"3. Query 1 will show gym counts by city")
    print(f"4. Query 2 will show missing gyms by city")
    print(f"5. Query 3 will show all missing gyms in one list")
    print()

if __name__ == "__main__":
    main()
