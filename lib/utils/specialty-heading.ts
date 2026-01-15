/**
 * Utility functions for formatting specialty-based headings
 * Used for displaying "Other [Specialty] in [City]" sections on gym pages
 */

/**
 * Determines the primary specialty to use for the heading
 * Handles cases where gyms have multiple specialties
 * 
 * Priority order:
 * 1. "Fitness/Gym" or both "Fitness" and "Gym"
 * 2. "Yoga & Pilates" or both "Yoga" and "Pilates"
 * 3. First specialty in the list
 * 
 * @param specialties - Array of specialty names (may be old or new format)
 * @returns The primary specialty name to use (in new consolidated format)
 */
export function getPrimarySpecialty(specialties: string[]): string {
  if (!specialties || specialties.length === 0) {
    return 'Fitness/Gym'; // Default fallback
  }

  const specialtySet = new Set(specialties.map(s => s.toLowerCase().trim()));

  // Check for Fitness/Gym (highest priority)
  // Handle both new format ("Fitness/Gym") and old formats ("Fitness", "Gym")
  if (
    specialtySet.has('fitness/gym') ||
    specialtySet.has('fitness-gym') ||
    (specialtySet.has('fitness') && specialtySet.has('gym')) ||
    specialtySet.has('fitness') ||
    specialtySet.has('gym')
  ) {
    return 'Fitness/Gym';
  }

  // Check for Yoga & Pilates
  // Handle both new format ("Yoga & Pilates") and old formats ("Yoga", "Pilates")
  if (
    specialtySet.has('yoga & pilates') ||
    specialtySet.has('yoga-pilates') ||
    (specialtySet.has('yoga') && specialtySet.has('pilates')) ||
    specialtySet.has('yoga') ||
    specialtySet.has('pilates')
  ) {
    return 'Yoga & Pilates';
  }

  // Check for Martial Arts & MMA
  if (
    specialtySet.has('martial arts & mma') ||
    specialtySet.has('martial-arts-mma') ||
    specialtySet.has('martial arts') ||
    specialtySet.has('mma')
  ) {
    return 'Martial Arts & MMA';
  }

  // Check for Strength Training
  if (
    specialtySet.has('strength training') ||
    specialtySet.has('strength-training') ||
    specialtySet.has('bodybuilding') ||
    specialtySet.has('powerlifting')
  ) {
    return 'Strength Training';
  }

  // Check for Swimming & Aquatics
  if (
    specialtySet.has('swimming & aquatics') ||
    specialtySet.has('swimming-aquatics') ||
    specialtySet.has('swimming')
  ) {
    return 'Swimming & Aquatics';
  }

  // Check for Dance & Group Fitness
  if (
    specialtySet.has('dance & group fitness') ||
    specialtySet.has('dance-group-fitness') ||
    specialtySet.has('dance') ||
    specialtySet.has('group fitness')
  ) {
    return 'Dance & Group Fitness';
  }

  // For other specialties, return the first one (capitalize properly)
  const firstSpecialty = specialties[0];
  
  // Map common variations to proper names
  const nameMap: Record<string, string> = {
    'crossfit': 'CrossFit',
    'personal training': 'Personal Training',
    'personal-training': 'Personal Training',
    'boxing': 'Boxing',
  };

  const lowerFirst = firstSpecialty.toLowerCase();
  if (nameMap[lowerFirst]) {
    return nameMap[lowerFirst];
  }

  // Return as-is, but ensure proper capitalization
  return firstSpecialty;
}

/**
 * Formats the heading text for the related gyms section
 * Examples:
 * - "Other Fitness/Gyms in Nicosia"
 * - "Other Yoga & Pilates Studios in Nicosia"
 * - "Other CrossFit Gyms in Limassol"
 * - "Other Boxing Gyms in Limassol"
 * 
 * @param specialty - The specialty name
 * @param cityName - The city name
 * @returns Formatted heading text
 */
export function formatSpecialtyHeading(specialty: string, cityName: string): string {
  const specialtyLower = specialty.toLowerCase();

  // Special cases that need specific wording
  if (
    specialtyLower === 'yoga & pilates' ||
    specialtyLower === 'yoga' ||
    specialtyLower === 'pilates'
  ) {
    return `Other Yoga & Pilates Studios in ${cityName}`;
  }

  // For Fitness/Gym, use "Fitness/Gyms" (plural)
  if (
    specialtyLower === 'fitness/gym' ||
    specialtyLower === 'fitness' ||
    specialtyLower === 'gym'
  ) {
    return `Other Fitness/Gyms in ${cityName}`;
  }

  // For boxing, add "Gyms" for clarity
  if (specialtyLower === 'boxing') {
    return `Other Boxing Gyms in ${cityName}`;
  }

  // For CrossFit, add "Gyms" for clarity
  if (specialtyLower === 'crossfit') {
    return `Other CrossFit Gyms in ${cityName}`;
  }

  // For martial arts, add "Gyms" for clarity
  if (
    specialtyLower === 'martial arts & mma' ||
    specialtyLower === 'martial-arts-mma' ||
    specialtyLower === 'mma' ||
    specialtyLower === 'martial arts'
  ) {
    return `Other Martial Arts & MMA Gyms in ${cityName}`;
  }

  // For all other specialties, use "Other [Specialty] in [City]"
  return `Other ${specialty} in ${cityName}`;
}

/**
 * Gets the specialty slug from a specialty name
 * Used for querying gyms by specialty
 * 
 * @param specialtyName - The specialty name (e.g., "Fitness/Gym", "Yoga & Pilates")
 * @returns The specialty slug (e.g., "fitness-gym", "yoga-pilates")
 */
export function getSpecialtySlug(specialtyName: string): string {
  const slugMap: Record<string, string> = {
    // New consolidated formats
    'Fitness/Gym': 'fitness-gym',
    'Yoga & Pilates': 'yoga-pilates',
    'Martial Arts & MMA': 'martial-arts-mma',
    'Personal Training': 'personal-training',
    'Strength Training': 'strength-training',
    'Swimming & Aquatics': 'swimming-aquatics',
    'Dance & Group Fitness': 'dance-group-fitness',
    'CrossFit': 'crossfit',
    'Boxing': 'boxing',
    // Old formats (for backward compatibility)
    'Fitness': 'fitness-gym',
    'Gym': 'fitness-gym',
    'Yoga': 'yoga-pilates',
    'Pilates': 'yoga-pilates',
    'MMA': 'martial-arts-mma',
    'Martial Arts': 'martial-arts-mma',
    'Bodybuilding': 'strength-training',
    'Powerlifting': 'strength-training',
    'Swimming': 'swimming-aquatics',
  };

  // Try exact match first (case-sensitive)
  if (slugMap[specialtyName]) {
    return slugMap[specialtyName];
  }

  // Try case-insensitive match
  const lowerName = specialtyName.toLowerCase();
  for (const [key, value] of Object.entries(slugMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  // Convert to slug format: lowercase, replace spaces and special chars with hyphens
  return specialtyName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
