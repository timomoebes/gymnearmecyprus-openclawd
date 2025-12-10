/**
 * Maps old specialty names to new consolidated specialty names
 * This ensures backward compatibility and correct display after specialty migration
 */

const OLD_TO_NEW_SPECIALTY_MAP: Record<string, string> = {
  // Old names → New names
  'MMA': 'Martial Arts & MMA',
  'Martial Arts': 'Martial Arts & MMA',
  'Boxing': 'Boxing', // Boxing stays as Boxing (no change)
  'Fitness': 'Fitness/Gym',
  'Gym': 'Fitness/Gym',
  'Yoga': 'Yoga & Pilates',
  'Pilates': 'Yoga & Pilates',
  'Bodybuilding': 'Strength Training',
  'Powerlifting': 'Strength Training',
  'Swimming': 'Swimming & Aquatics',
  // Keep new names as-is
  'Martial Arts & MMA': 'Martial Arts & MMA',
  'Fitness/Gym': 'Fitness/Gym',
  'Yoga & Pilates': 'Yoga & Pilates',
  'Strength Training': 'Strength Training',
  'Swimming & Aquatics': 'Swimming & Aquatics',
  'CrossFit': 'CrossFit',
  'Crossfit': 'CrossFit', // Handle lowercase 'f' from database
  'Personal Training': 'Personal Training',
  'Dance & Group Fitness': 'Dance & Group Fitness',
};

/**
 * Maps an old specialty name to the new consolidated name
 * @param oldName - The old specialty name from database
 * @returns The new consolidated specialty name
 */
export function mapSpecialtyName(oldName: string): string {
  // First try exact match
  if (OLD_TO_NEW_SPECIALTY_MAP[oldName]) {
    return OLD_TO_NEW_SPECIALTY_MAP[oldName];
  }
  
  // Try case-insensitive match
  const lowerOldName = oldName.toLowerCase();
  for (const [key, value] of Object.entries(OLD_TO_NEW_SPECIALTY_MAP)) {
    if (key.toLowerCase() === lowerOldName) {
      return value;
    }
  }
  
  // Return original if no mapping found
  return oldName;
}

/**
 * Maps an array of specialty names to new consolidated names
 * Removes duplicates that map to the same new specialty
 * @param specialties - Array of old specialty names
 * @returns Array of new consolidated specialty names (unique)
 */
export function mapSpecialtyNames(specialties: string[]): string[] {
  const mapped = specialties.map(mapSpecialtyName);
  // Remove duplicates
  return Array.from(new Set(mapped));
}

