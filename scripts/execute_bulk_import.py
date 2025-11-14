"""
Execute bulk import SQL file via Supabase Python client
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("[ERROR] Supabase Python client not installed.")
    print("Install with: pip install supabase")
    exit(1)

PROJECT_ROOT = Path(__file__).parent.parent
SQL_FILE = PROJECT_ROOT / "scripts" / "bulk_import_limassol_gyms.sql"

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

def get_supabase_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("[ERROR] Supabase credentials not found in environment variables")
        print("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
        exit(1)
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def main():
    print("=" * 80)
    print("EXECUTING BULK IMPORT: Limassol Gyms (45 gyms)")
    print("=" * 80)
    print()
    
    # Read SQL file
    print(f"[1/3] Reading SQL file: {SQL_FILE}")
    sql_content = SQL_FILE.read_text(encoding='utf-8')
    print(f"  [OK] Read {len(sql_content)} characters")
    print()
    
    # Connect to Supabase
    print("[2/3] Connecting to Supabase...")
    supabase: Client = get_supabase_client()
    print("  [OK] Connected")
    print()
    
    # Execute SQL
    print("[3/3] Executing SQL migration...")
    try:
        # Use RPC to execute raw SQL
        # Note: Supabase Python client doesn't have direct SQL execution
        # We'll need to use the REST API or execute via MCP
        print("  [INFO] Supabase Python client doesn't support direct SQL execution")
        print("  [INFO] Please execute the SQL file via Supabase MCP or dashboard")
        print()
        print(f"  SQL file: {SQL_FILE}")
        print(f"  File size: {len(sql_content)} characters")
        print()
        print("  Alternative: Use Supabase MCP apply_migration tool with the SQL file")
        print()
    except Exception as e:
        print(f"  [ERROR] Failed to execute SQL: {e}")
        exit(1)
    
    print("=" * 80)
    print("RECOMMENDATION:")
    print("=" * 80)
    print("Execute the SQL file via Supabase MCP apply_migration tool")
    print(f"File path: {SQL_FILE}")
    print()

if __name__ == "__main__":
    main()

