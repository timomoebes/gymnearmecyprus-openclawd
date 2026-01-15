import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Admin client with service role key for database write operations
// WARNING: Only use this in server-side scripts, never expose in client-side code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqrwhsjqiiecoywmvdgq.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found in environment variables');
  console.warn('   Database write operations will fail due to RLS policies');
  console.warn('   Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
