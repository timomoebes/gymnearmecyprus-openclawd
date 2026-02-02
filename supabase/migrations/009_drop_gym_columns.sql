-- Migration: Remove unused columns from gyms table
-- Date: 2026-02-02
-- Drops: years_in_business, currency, membership_price_from, membership_price_to

ALTER TABLE gyms
DROP COLUMN IF EXISTS years_in_business,
DROP COLUMN IF EXISTS currency,
DROP COLUMN IF EXISTS membership_price_from,
DROP COLUMN IF EXISTS membership_price_to;
