#!/usr/bin/env python3
"""Check JSON structure for additional fields like lat/lng"""

import json
from pathlib import Path

json_path = Path(__file__).parent.parent / "data" / "raw" / "limassol_gyms_raw.json"

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if data:
    print("JSON Keys in first item:", list(data[0].keys()))
    print("\nSample item (first 1000 chars):")
    print(json.dumps(data[0], indent=2, ensure_ascii=False)[:1000])
    
    # Check for lat/lng
    has_lat = any('lat' in str(k).lower() for k in data[0].keys())
    has_lng = any('lng' in str(k).lower() or 'lon' in str(k).lower() for k in data[0].keys())
    print(f"\nHas latitude field: {has_lat}")
    print(f"Has longitude field: {has_lng}")

