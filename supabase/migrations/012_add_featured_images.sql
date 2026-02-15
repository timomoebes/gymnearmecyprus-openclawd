-- Migration: Add featured_images array to gyms table (Photo Upload Feature)
-- Date: 2026-02-15
-- Adds featured_images JSONB array for owner-uploaded photos with Supabase Storage URLs

ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS featured_images JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN gyms.featured_images IS 'Array of featured image URLs uploaded by gym owner via Supabase Storage. Max 5 images.';

-- Create an index on the featured_images column for better query performance
CREATE INDEX IF NOT EXISTS idx_gyms_featured_images 
  ON gyms USING gin (featured_images);
