import { createClient } from '@supabase/supabase-js';

// Require env in all environments; no hardcoded keys (security: avoid leaking project ref or keys)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

