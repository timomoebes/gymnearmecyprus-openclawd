-- Example SQL for storing opening hours in the database
-- Short-term solution: Using formatted strings in JSON

-- ============================================
-- EXAMPLE 1: Combat & Fitness (Simple Format)
-- ============================================
UPDATE gyms
SET opening_hours = '{
  "monday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "tuesday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "wednesday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "thursday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "friday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "saturday": "Morning: 8:30-9:30"
}'::jsonb,
updated_at = NOW()
WHERE slug = 'combat-fitness'; -- Replace with actual slug

-- ============================================
-- EXAMPLE 2: Dreamchasers (Complex Format)
-- ============================================
UPDATE gyms
SET opening_hours = '{
  "monday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "tuesday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "wednesday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "thursday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "friday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "saturday": "Private Training: 07:00-13:00"
}'::jsonb,
updated_at = NOW()
WHERE slug = 'dreamchasers-fitness-studio'; -- Replace with actual slug

-- ============================================
-- NOTES:
-- ============================================
-- 1. Use \n for line breaks in JSON strings
-- 2. Use • for bullet points (Unicode bullet character)
-- 3. Use : at end of section headers (e.g., "Morning Sessions:")
-- 4. Frontend will automatically detect and format complex schedules
-- 5. Simple schedules work as before (single line)
-- 6. Complex schedules are formatted with sections and bullets

