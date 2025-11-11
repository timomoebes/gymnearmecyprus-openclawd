-- Migration: Add rating and review count fields to gyms table
-- Date: 2024-01-26

ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) CHECK (rating >= 0 AND rating <= 5),
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN gyms.rating IS 'Average rating (0-5) calculated from reviews';
COMMENT ON COLUMN gyms.review_count IS 'Total number of reviews for this gym';

