-- Migration: Add missing specialties
-- Date: 2024-01-26

INSERT INTO specialties (name, slug, description, icon)
VALUES
  (
    'Bodybuilding',
    'bodybuilding',
    'Strength training and muscle development facilities. Discover bodybuilding gyms with professional equipment and expert trainers.',
    'barbell'
  ),
  (
    'MMA',
    'mma',
    'Mixed Martial Arts training facilities offering Brazilian Jiu-Jitsu, Muay Thai, wrestling, and boxing. Train like a fighter.',
    'shield'
  ),
  (
    'Boxing',
    'boxing',
    'Boxing gyms with professional trainers, heavy bags, and sparring rings. Perfect for fitness and competitive training.',
    'boxing-glove'
  ),
  (
    'Swimming',
    'swimming',
    'Gyms and facilities with swimming pools. Perfect for aquatic fitness, lap swimming, and water aerobics.',
    'waves'
  ),
  (
    'Powerlifting',
    'powerlifting',
    'Specialized facilities for powerlifting training. Squat racks, deadlift platforms, and competition-grade equipment.',
    'weight'
  )
ON CONFLICT (slug) DO NOTHING;

