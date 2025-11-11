-- Migration: Add member count fields to gyms table
-- Date: 2024-01-26
-- Per MEMBER_COUNT_SPECIFICATION.md

ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS member_count INTEGER,
ADD COLUMN IF NOT EXISTS member_count_source TEXT CHECK (member_count_source IN ('Owner Provided', 'Estimated', 'Demo Data')),
ADD COLUMN IF NOT EXISTS member_count_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS member_count_public BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS member_count_last_updated TIMESTAMPTZ;

-- Add comment for documentation
COMMENT ON COLUMN gyms.member_count IS 'Actual member count number. Only set when verified or owner-provided.';
COMMENT ON COLUMN gyms.member_count_source IS 'Source of the member count data: Owner Provided, Estimated, or Demo Data';
COMMENT ON COLUMN gyms.member_count_verified IS 'Whether the member count has been verified by admin';
COMMENT ON COLUMN gyms.member_count_public IS 'Owner privacy preference for displaying member count';
COMMENT ON COLUMN gyms.member_count_last_updated IS 'Timestamp of last member count update';

