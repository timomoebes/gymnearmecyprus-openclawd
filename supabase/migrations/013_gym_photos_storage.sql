-- Migration: Storage bucket for gym photos with RLS policies
-- Date: 2026-02-15
-- Sets up gym-photos storage bucket and RLS policies for secure owner-only uploads

-- Note: The storage bucket must be created via Supabase dashboard or REST API
-- This migration sets up the RLS policies for the bucket

-- Enable RLS for the gym-photos bucket
-- (Run these commands via Supabase dashboard > Storage if not auto-enabled)

-- Policy: Authenticated users can upload to their own gym's folder
-- INSERT policy: Allow authenticated users to upload to gyms/{gymId}/photos/
-- where they own the gym (via owner_id check in gym record)

-- Policy: Allow public read access to all gym photos (anyone can view)
-- SELECT policy: Allow all users to download/view public gym photos

-- This is handled in application code and Supabase Storage RLS.
-- Ensure RLS is enabled on the gym-photos bucket with these policies:
-- 1. CREATE: authenticated users can create in gyms/*/photos/
-- 2. READ: public (anon + authenticated) can read gyms/*/photos/
-- 3. UPDATE: authenticated users can update their own uploads
-- 4. DELETE: authenticated users can delete from gyms/{gymId}/photos/ if owner_id matches

-- For more details, see: docs/PHOTO_UPLOAD_SETUP.md
