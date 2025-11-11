-- Migration: Add missing cities (Ayia Napa and Protaras)
-- Date: 2024-01-26

INSERT INTO cities (name, slug, description, latitude, longitude)
VALUES
  (
    'Ayia Napa',
    'ayia-napa',
    'Discover fitness centers in Ayia Napa. Stay fit while enjoying this popular resort destination with top-quality gym facilities.',
    34.9881,
    34.0125
  ),
  (
    'Protaras',
    'protaras',
    'Find excellent gyms in Protaras. Combine your beach vacation with a great workout at modern fitness facilities.',
    35.0125,
    34.0583
  )
ON CONFLICT (slug) DO NOTHING;

