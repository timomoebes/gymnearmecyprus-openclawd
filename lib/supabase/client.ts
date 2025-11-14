import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqrwhsjqiiecoywmvdgq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcndoc2pxaWllY295d212ZGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDMwNDgsImV4cCI6MjA3NzY3OTA0OH0.S5umw11gGIluoGyEH6uH1jzvJGRT9Nt2wk2cimaHFTM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

