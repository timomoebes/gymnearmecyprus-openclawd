-- Migration: Add years in business field to gyms table
-- Date: 2024-01-26

ALTER TABLE gyms
ADD COLUMN IF NOT EXISTS years_in_business INTEGER;

-- Add comment for documentation
COMMENT ON COLUMN gyms.years_in_business IS 'Number of years the gym has been in business';

