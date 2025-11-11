-- Update Enriched Gym Data
-- Generated from web scraping enrichment

BEGIN;


UPDATE gyms
SET description = 'Welcome to the amazing space of Soul Vibe Space - a place where everyone is inspired, finds inner harmony and reveals its potential to the sounds of heart and soul. Here are born ideas that can change the world and projects that can lead to success and harmony.', updated_at = NOW()
WHERE id = 'f2b85511-93a3-45dd-b2e1-e8cee676e732';


COMMIT;
