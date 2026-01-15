-- Migration: Remove member count fields from gyms table
-- Date: 2026-01-15
-- Reason: Member count feature removed - not using member count columns in database

ALTER TABLE gyms
DROP COLUMN IF EXISTS member_count,
DROP COLUMN IF EXISTS member_count_source,
DROP COLUMN IF EXISTS member_count_verified,
DROP COLUMN IF EXISTS member_count_public,
DROP COLUMN IF EXISTS member_count_last_updated;
