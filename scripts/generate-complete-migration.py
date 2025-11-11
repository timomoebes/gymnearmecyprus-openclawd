#!/usr/bin/env python3
"""
Generate Complete SQL Migration for All 20 Gyms
Reads gym data structure and generates complete SQL migration file.
"""

import json
import re

# City UUIDs
CITY_UUIDS = {
    'larnaca': 'c2208ba4-aea9-4e22-b256-09177179763f',
    'limassol': 'a8d0fd41-5901-4a94-93d3-ecc28166b137',
    'nicosia': 'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
    'paphos': '7978d742-eeea-4c7a-b37f-7dceacd4284b',
    'ayia-napa': '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
    'protaras': '7b90b819-b3a9-43ce-ad48-22b016b9686b',
}

# Specialty name to slug mapping
SPECIALTY_TO_SLUG = {
    'CrossFit': 'crossfit',
    'Bodybuilding': 'bodybuilding',
    'Yoga': 'yoga',
    'Pilates': 'pilates',
    'MMA': 'mma',
    'Boxing': 'boxing',
    'Swimming': 'swimming',
    'Powerlifting': 'powerlifting',
    'Personal Training': 'personal-trainer',
    'Brazilian Jiu-Jitsu': 'mma',
}

# Amenity name to slug mapping (only map to existing amenities in DB)
AMENITY_TO_SLUG = {
    'Parking': 'parking',
    'Showers': 'showers',
    'Locker Rooms': 'locker-room',
    'Changing Rooms': 'locker-room',
    'Personal Training': 'personal-training',
    '24/7 Access': '24-hour-gym',
    'Sauna': 'sauna',
    'Steam Room': 'steam-room',
    'Swimming Pool': 'pool',
    'Pool': 'pool',
    'Indoor Pool': 'pool',
    'Outdoor Pool': 'pool',
    'Olympic Pool': 'pool',
    'Cafe': 'cafe',
    'Cardio Equipment': 'cardio',
    'Free Weights': 'weights',
    'Weight Training': 'weights',
    'Group Classes': 'classes',
    'Mats Provided': 'classes',
    'Hot Yoga Room': 'classes',
    # Skip amenities not in DB: Beach Access, Outdoor Training Area, etc.
}

def escape_sql(text):
    """Escape SQL string"""
    if text is None:
        return 'NULL'
    return "'" + str(text).replace("'", "''") + "'"

def opening_hours_to_jsonb(opening_hours):
    """Convert opening hours dict to JSONB string"""
    return escape_sql(json.dumps(opening_hours)) + "::jsonb"

# Gym data (from lib/data/gyms.ts)
gyms_data = [
    {
        'name': 'Powerhouse Gym Limassol',
        'slug': 'powerhouse-gym-limassol',
        'cityId': 'limassol',
        'address': '123 Makarios Avenue, Limassol 3040',
        'coordinates': [34.7071, 33.0226],
        'phone': '+357-25-123456',
        'email': 'limassol@powerhousegym.com',
        'website': 'https://powerhousegym.com',
        'specialties': ['Bodybuilding', 'CrossFit'],
        'amenities': ['Parking', 'Showers', 'Locker Rooms', 'Personal Training', '24/7 Access', 'Sauna'],
        'rating': 4.5,
        'reviewCount': 127,
        'featured': True,
        'description': 'Powerhouse Gym Limassol is a state-of-the-art fitness facility offering world-class equipment and expert trainers in the heart of Limassol. With over 3,000 square meters of training space, we provide everything you need for your fitness journey. Our comprehensive gym in Limassol features extensive bodybuilding equipment, CrossFit-style functional training areas, and dedicated spaces for strength training. Whether you\'re searching for a gym near me in Limassol or looking for the best fitness center in the city, Powerhouse Gym offers 24/7 access, making it perfect for early morning workouts, late-night training, or flexible scheduling. Our certified personal trainers provide one-on-one guidance, and our facility includes modern cardio equipment, free weights, machines, and specialized training zones. Located on Makarios Avenue, we\'re easily accessible and offer parking, showers, locker rooms, and a sauna for post-workout relaxation. Join our community of fitness enthusiasts in Limassol and experience why we\'re considered one of the top gyms in the city.',
        'images': ['/images/gyms/powerhouse-limassol-1.jpg'],
        'openingHours': {
            'monday': '6:00 AM - 11:00 PM',
            'tuesday': '6:00 AM - 11:00 PM',
            'wednesday': '6:00 AM - 11:00 PM',
            'thursday': '6:00 AM - 11:00 PM',
            'friday': '6:00 AM - 11:00 PM',
            'saturday': '8:00 AM - 10:00 PM',
            'sunday': '8:00 AM - 10:00 PM',
        },
        'memberCount': 2500,
        'yearsInBusiness': 8,
        'createdAt': '2016-01-15',
        'updatedAt': '2024-01-20',
    },
    # ... (would include all 20 gyms)
]

# This is a template - the actual implementation would parse the TypeScript file
# or we manually create the complete SQL file

print("SQL Migration Generator Template")
print("Note: Complete implementation would parse lib/data/gyms.ts")

