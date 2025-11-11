#!/usr/bin/env python3
"""
Inspect Raw Gym Data from Apify Google Maps Scraper
Analyzes the raw CSV file to understand data structure and quality.
"""

import pandas as pd
import sys
from pathlib import Path

# Setup paths
PROJECT_ROOT = Path(__file__).parent.parent
RAW_DATA_PATH = PROJECT_ROOT / "data" / "raw" / "limassol_gyms_raw.csv"

def main():
    print("=" * 80)
    print("RAW DATA INSPECTION: Limassol Gyms")
    print("=" * 80)
    print()
    
    # Load CSV
    try:
        df = pd.read_csv(RAW_DATA_PATH)
        print(f"[OK] Successfully loaded CSV from: {RAW_DATA_PATH}")
    except FileNotFoundError:
        print(f"[ERROR] File not found at {RAW_DATA_PATH}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Error loading CSV: {e}")
        sys.exit(1)
    
    print()
    print("=" * 80)
    print("1. BASIC STATISTICS")
    print("=" * 80)
    print(f"Total Rows: {len(df)}")
    print(f"Total Columns: {len(df.columns)}")
    print()
    
    print("=" * 80)
    print("2. COLUMN NAMES")
    print("=" * 80)
    for i, col in enumerate(df.columns, 1):
        print(f"{i:2d}. {col}")
    print()
    
    print("=" * 80)
    print("3. SAMPLE ROWS (First 5)")
    print("=" * 80)
    print(df.head().to_string())
    print()
    
    print("=" * 80)
    print("4. MISSING VALUES PER COLUMN")
    print("=" * 80)
    missing = df.isnull().sum()
    missing_pct = (missing / len(df) * 100).round(2)
    missing_df = pd.DataFrame({
        'Missing Count': missing,
        'Missing %': missing_pct
    })
    missing_df = missing_df[missing_df['Missing Count'] > 0].sort_values('Missing Count', ascending=False)
    if len(missing_df) > 0:
        print(missing_df.to_string())
    else:
        print("No missing values found.")
    print()
    
    print("=" * 80)
    print("5. DATA TYPES")
    print("=" * 80)
    print(df.dtypes.to_string())
    print()
    
    print("=" * 80)
    print("6. KEY FIELD ANALYSIS")
    print("=" * 80)
    
    # Name analysis
    if 'name' in df.columns:
        unique_names = df['name'].nunique()
        print(f"Unique Names: {unique_names} / {len(df)}")
        print(f"Duplicate Names: {len(df) - unique_names}")
    
    # Rating analysis
    rating_cols = [col for col in df.columns if 'rating' in col.lower()]
    if rating_cols:
        for col in rating_cols:
            if df[col].dtype in ['float64', 'int64']:
                print(f"\n{col}:")
                print(f"  Min: {df[col].min()}")
                print(f"  Max: {df[col].max()}")
                print(f"  Mean: {df[col].mean():.2f}")
                print(f"  Non-null: {df[col].notna().sum()} / {len(df)}")
    
    # Reviews analysis
    review_cols = [col for col in df.columns if 'review' in col.lower()]
    if review_cols:
        for col in review_cols:
            if df[col].dtype in ['float64', 'int64']:
                print(f"\n{col}:")
                print(f"  Min: {df[col].min()}")
                print(f"  Max: {df[col].max()}")
                print(f"  Mean: {df[col].mean():.2f}")
                print(f"  Non-null: {df[col].notna().sum()} / {len(df)}")
    
    # Location analysis
    lat_cols = [col for col in df.columns if 'lat' in col.lower()]
    lng_cols = [col for col in df.columns if 'lng' in col.lower() or 'lon' in col.lower()]
    if lat_cols and lng_cols:
        lat_col = lat_cols[0]
        lng_col = lng_cols[0]
        print(f"\nLocation Data:")
        print(f"  {lat_col} non-null: {df[lat_col].notna().sum()} / {len(df)}")
        print(f"  {lng_col} non-null: {df[lng_col].notna().sum()} / {len(df)}")
        if df[lat_col].notna().any() and df[lng_col].notna().any():
            print(f"  Lat range: {df[lat_col].min():.4f} to {df[lat_col].max():.4f}")
            print(f"  Lng range: {df[lng_col].min():.4f} to {df[lng_col].max():.4f}")
    
    # Types/Categories analysis
    type_cols = [col for col in df.columns if 'type' in col.lower() or 'categor' in col.lower()]
    if type_cols:
        for col in type_cols:
            print(f"\n{col}:")
            unique_types = df[col].nunique()
            print(f"  Unique values: {unique_types}")
            if unique_types < 50:  # Show all if not too many
                print(f"  Sample values:")
                for val in df[col].dropna().unique()[:10]:
                    count = (df[col] == val).sum()
                    print(f"    - {val}: {count} occurrences")
    
    print()
    print("=" * 80)
    print("7. SUMMARY")
    print("=" * 80)
    print(f"[OK] Ready for cleaning script")
    print(f"[INFO] Total entries: {len(df)}")
    print(f"[INFO] Columns to process: {len(df.columns)}")
    print()

if __name__ == "__main__":
    main()

