"""
Apply bulk import SQL to Supabase
Reads the SQL file and executes it via Supabase MCP
"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SQL_FILE = PROJECT_ROOT / "scripts" / "bulk_import_limassol_gyms.sql"

def main():
    print("=" * 80)
    print("APPLYING BULK IMPORT: Limassol Gyms (45 gyms)")
    print("=" * 80)
    print()
    
    # Read SQL file
    print(f"[1/2] Reading SQL file: {SQL_FILE}")
    sql_content = SQL_FILE.read_text(encoding='utf-8')
    print(f"  [OK] Read {len(sql_content)} characters")
    print()
    
    print("[2/2] SQL file ready for execution")
    print()
    print("=" * 80)
    print("NEXT STEP:")
    print("=" * 80)
    print("Execute the SQL file via Supabase MCP apply_migration tool")
    print(f"File: {SQL_FILE}")
    print(f"Size: {len(sql_content)} characters")
    print()
    print("Note: The SQL file contains a full transaction with BEGIN/COMMIT")
    print("      All 45 gyms will be inserted in one atomic operation")
    print()

if __name__ == "__main__":
    main()

