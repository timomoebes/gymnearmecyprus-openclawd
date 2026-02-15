# Codebase Cleanup Plan
**Date:** 2026-01-15  
**Purpose:** Remove obsolete files from scripts and migrations directories

## Summary

- **Total scripts:** 153 files
- **All 199 gyms already imported** (per DEVELOPMENT_STATUS.md)
- **Data processing complete** - bulk imports and cleaning done

## Files to Remove

### 1. Migrations Directory

#### Duplicate Migration Files (Remove 2 of 3)
- ✅ **KEEP:** `006_insert_all_mock_gyms.sql` (most complete, 1106 lines)
- ❌ **REMOVE:** `006_insert_mock_gyms.sql` (82 lines, incomplete)
- ❌ **REMOVE:** `006_insert_mock_gyms_complete.sql` (140 lines, less complete)

**Reason:** All three attempt to insert mock gyms. Only need the most complete version for migration history.

#### Member Count Migration
- ✅ **KEEP:** `003_add_member_count_fields.sql` (historical - adds columns)
- ✅ **KEEP:** `008_remove_member_count_fields.sql` (removes columns)

**Reason:** Keep both for complete migration history, even though member_count is removed.

### 2. Scripts Directory - Bulk Import Scripts (6 files)
**Status:** All data already imported manually via Supabase Dashboard

- ❌ `bulk_import_limassol_gyms.py`
- ❌ `bulk_import_nicosia_gyms.py`
- ❌ `bulk_import_larnaca_gyms.py`
- ❌ `bulk_import_paphos_gyms.py`
- ❌ `bulk_import_ayia_napa_gyms.py`
- ❌ `bulk_import_protaras_gyms.py`

**Also remove related SQL files:**
- ❌ `bulk_import_limassol_gyms.sql`
- ❌ `bulk_import_nicosia_gyms.sql`
- ❌ `bulk_import_larnaca_gyms.sql`
- ❌ `bulk_import_paphos_gyms.sql`
- ❌ `bulk_import_ayia_napa_gyms.sql`
- ❌ `bulk_import_protaras_gyms.sql`

### 3. Scripts Directory - Data Cleaning Scripts (6 files)
**Status:** Data already cleaned and imported

- ❌ `gym_data_cleaner.py` (base)
- ❌ `gym_data_cleaner_nicosia.py`
- ❌ `gym_data_cleaner_larnaca.py`
- ❌ `gym_data_cleaner_paphos.py`
- ❌ `gym_data_cleaner_ayia_napa.py`
- ❌ `gym_data_cleaner_protaras.py`

### 4. Scripts Directory - One-Off Update Scripts (56 files)
**Status:** All updates already executed on database

These are TypeScript scripts used to update individual gyms (reviews, names, specialties, etc.). All have been executed.

- ❌ All `update-*.ts` files (56 files)

### 5. Scripts Directory - Verification Scripts (7 files)
**Status:** One-time verification, already completed

- ❌ `verify-overall-magic-complete.ts`
- ❌ `verify-overall-magic-fitness.ts`
- ❌ `verify-world-gym-update.ts`
- ❌ `verify-gym-map-coordinates.ts`
- ❌ `verify-return-rehabilitation.ts`
- ❌ `verify-return-rehabilitation-reviews.ts`
- ❌ `verify-world-gym-breadcrumb.ts`

### 6. Scripts Directory - Migration/Generation Scripts
**Status:** Already used, migrations created

- ❌ `migrate-mock-data-to-db.ts` (mock data already migrated)
- ❌ `generate-migration-sql.js` (migrations already generated)
- ❌ `generate-complete-migration.py` (migrations already generated)
- ❌ `generate-complete-migration.mjs` (migrations already generated)
- ❌ `generate-full-migration.mjs` (migrations already generated)
- ❌ `run-migration.ts` (one-time use)

### 7. Scripts Directory - Test Scripts
**Status:** Test imports completed

- ❌ `test_gym_import.py`
- ❌ `test_import.sql`
- ❌ `test-supabase-connection.ts`

### 8. Scripts Directory - Other Obsolete Scripts
**Status:** One-time use, already executed

- ❌ `apply_bulk_import.py`
- ❌ `execute_bulk_import.py`
- ❌ `view-update-en-somati.ts` (one-time view/update)
- ❌ `check_bad_dog_bjj.js` (one-time check)
- ❌ `check_gym_schema.js` (one-time check)
- ❌ `update_bad_dog_bjj.js` (one-time update)
- ❌ `update_bad_dog_bjj_complete.js` (one-time update)
- ❌ `update_bad_dog_bjj_correct.js` (one-time update)
- ❌ `update_bad_dog_bjj_name.sql` (one-time update)
- ❌ `update_bodyart_fitness_center_paralimni.sql` (one-time update)
- ❌ `update_with_details.js` (one-time update)
- ❌ `update_*.sql` files (SQL update scripts, one-time use)

## Files to KEEP

### Essential Scripts
- ✅ `code_quality_audit.py` - Active tool for code quality checks
- ✅ `validate-meta-descriptions.ts` - Utility for validating meta descriptions
- ✅ `inspect_raw_data.py` - May be useful for future data imports
- ✅ `process_enriched_gyms.py` - May be useful for future data processing

### Core Migrations (Keep All)
- ✅ `001_add_missing_cities.sql`
- ✅ `002_add_missing_specialties.sql`
- ✅ `003_add_member_count_fields.sql` (historical)
- ✅ `004_add_rating_fields.sql`
- ✅ `005_add_years_in_business.sql`
- ✅ `006_insert_all_mock_gyms.sql` (keep most complete version)
- ✅ `007_migrate_specialties_to_consolidated.sql`
- ✅ `008_remove_member_count_fields.sql`

## Impact Summary

**Files Removed:** 113 files ✅
- Migrations: 2 files (duplicate 006 migrations)
- Scripts: 111 files
  - Bulk import scripts: 12 files (6 Python + 6 SQL)
  - Data cleaning scripts: 6 files
  - One-off update scripts: 56 TypeScript files
  - Verification scripts: 7 TypeScript files
  - Migration/generation scripts: 6 files
  - Test scripts: 3 files
  - Other obsolete scripts: 21 files (JS, SQL, Python)

**Files Remaining:** 40 files
- Essential utilities: 4 files
- Core migrations: 8 files
- Other utility scripts: ~28 files

**Reduction:** 74% reduction (153 → 40 files)
**Space Saved:** Significant reduction in codebase size and maintenance burden

## Execution Results ✅

**Completed:** 2026-01-15

1. ✅ Removed duplicate migration files (2 files)
2. ✅ Removed bulk import scripts (12 files: 6 Python + 6 SQL)
3. ✅ Removed data cleaning scripts (6 files)
4. ✅ Removed one-off update scripts (56 TypeScript files)
5. ✅ Removed verification scripts (7 TypeScript files)
6. ✅ Removed migration generation scripts (6 files)
7. ✅ Removed test scripts (3 files)
8. ✅ Removed other obsolete scripts (21 files: JS, SQL, Python)
9. ✅ Created cleanup documentation

**Total Files Removed:** 113 files
**Final Script Count:** 40 files (down from 153)
