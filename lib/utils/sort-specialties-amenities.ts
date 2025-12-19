/**
 * Utility functions to sort specialties and amenities in a specific order
 */

// Specialty order (as specified by user)
const SPECIALTY_ORDER: string[] = [
  'Fitness/Gym',
  'Yoga & Pilates',
  'Boxing',
  'Martial Arts & MMA',
  'Personal Training',
  'CrossFit',
  'Dance & Group Fitness',
  'Strength Training',
  'Swimming & Aquatics',
];

// Amenity order (as specified by user)
const AMENITY_ORDER: string[] = [
  'Cafe',
  'Group Classes',
  'Showers',
  'Cardio Equipment',
  'Free Water',
  'Hair Dryers',
  'Locker Room',
  'Sauna',
  'Toilets',
  'WiFi',
  'Parking',
  'Steam Room',
  'Swimming Pool',
  'Kids Friendly',
  'Air Condition',
];

/**
 * Sort specialties array according to the predefined order
 * Items not in the order list will be appended at the end
 */
export function sortSpecialties(specialties: string[]): string[] {
  const ordered: { specialty: string; index: number }[] = [];
  const unordered: string[] = [];
  
  // Create a map for quick lookup
  const orderMap = new Map(SPECIALTY_ORDER.map((item, index) => [item, index]));
  
  for (const specialty of specialties) {
    const index = orderMap.get(specialty);
    if (index !== undefined) {
      ordered.push({ specialty, index });
    } else {
      unordered.push(specialty);
    }
  }
  
  // Sort ordered items by their index
  ordered.sort((a, b) => a.index - b.index);
  
  // Return ordered items first, then unordered items
  return [...ordered.map(item => item.specialty), ...unordered];
}

/**
 * Sort amenities array according to the predefined order
 * Items not in the order list will be appended at the end
 */
export function sortAmenities(amenities: string[]): string[] {
  const ordered: { amenity: string; index: number }[] = [];
  const unordered: string[] = [];
  
  // Create a map for quick lookup
  const orderMap = new Map(AMENITY_ORDER.map((item, index) => [item, index]));
  
  for (const amenity of amenities) {
    const index = orderMap.get(amenity);
    if (index !== undefined) {
      ordered.push({ amenity, index });
    } else {
      unordered.push(amenity);
    }
  }
  
  // Sort ordered items by their index
  ordered.sort((a, b) => a.index - b.index);
  
  // Return ordered items first, then unordered items
  return [...ordered.map(item => item.amenity), ...unordered];
}

