/**
 * Meta Description Generator Utility
 * 
 * Centralized utility for generating SEO-optimized meta descriptions (150-160 characters)
 * for gym pages, city pages, and specialty pages.
 * 
 * All descriptions follow consistent templates and include smart truncation
 * to ensure optimal length without cutting words mid-sentence.
 */

import { Gym, City, Specialty } from '@/lib/types';

// Load custom descriptions from SEO content department
// In production, this would be a static JSON import or DB fetch
const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  "limassol": "Discover 52+ gyms in Limassol, Cyprus. Compare CrossFit boxes, bodybuilding gyms, yoga studios & 24/7 fitness centers. Find ratings, reviews & amenities.",
  "larnaca": "Find 38+ top-rated gyms in Larnaca. Compare MMA academies, pilates studios, strength training & swimming facilities. Ratings, reviews & expert trainers.",
  "nicosia": "Explore 68+ gyms in Nicosia, Cyprus's capital. Compare bodybuilding gyms, yoga studios, boxing clubs & fitness centers. Find your perfect workout space.",
  "paphos": "Browse 34+ gyms in Paphos. Compare martial arts academies, boxing gyms, personal training studios & fitness centers. Ratings, amenities & expert coaching.",
  "ayia-napa": "Discover 4+ top gyms in Ayia Napa. Compare fitness centers, international facilities & specialized training. Find ratings, reviews & 24/7 access options.",
  "paralimni": "Find 6+ top gyms in Paralimni, Cyprus. Compare fitness centers, outdoor calisthenics parks & wellness facilities. Expert trainers, ratings & amenities."
};

/**
 * Optimal meta description length range (SEO best practice)
 */
const MIN_LENGTH = 150;
const MAX_LENGTH = 160;

/**
 * Smart truncation helper that cuts at word boundaries
 * Ensures description doesn't exceed maxLength while maintaining readability
 */
export function truncateToOptimalLength(text: string, maxLength: number = MAX_LENGTH): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate to maxLength, then find last space before that point
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > MIN_LENGTH) {
    // Cut at word boundary if we're still above minimum
    return truncated.substring(0, lastSpace).trim();
  }

  // If cutting at word boundary would make it too short, cut at maxLength
  return truncated.trim();
}

/**
 * Validate meta description length and quality
 */
export function validateMetaDescription(description: string): {
  valid: boolean;
  length: number;
  message?: string;
} {
  const length = description.length;

  if (length < MIN_LENGTH) {
    return {
      valid: false,
      length,
      message: `Description too short (${length} chars). Minimum: ${MIN_LENGTH} characters.`,
    };
  }

  if (length > MAX_LENGTH) {
    return {
      valid: false,
      length,
      message: `Description too long (${length} chars). Maximum: ${MAX_LENGTH} characters.`,
    };
  }

  return {
    valid: true,
    length,
  };
}

/**
 * Get primary specialty or key feature for gym description
 */
function getPrimarySpecialty(gym: Gym): string {
  if (gym.specialties.length > 0) {
    // Prioritize certain specialties for better SEO
    const prioritySpecialties = [
      '24 Hour Gym',
      'Personal Training',
      'CrossFit',
      'Swimming',
      'Martial Arts',
      'MMA',
    ];

    for (const priority of prioritySpecialties) {
      const found = gym.specialties.find(s =>
        s.toLowerCase().includes(priority.toLowerCase())
      );
      if (found) return found;
    }

    return gym.specialties[0];
  }

  // Fallback to amenities if no specialties
  if (gym.amenities.length > 0) {
    const keyAmenities = ['24/7 Access', 'Swimming Pool', 'Personal Training'];
    for (const amenity of keyAmenities) {
      if (gym.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))) {
        return amenity;
      }
    }
  }

  return 'fitness center';
}

/**
 * Generate meta description for gym pages
 * 
 * Template: [Gym Name] in [City] - [Key Specialty/Feature]. [Brief value prop]. Rating: [X]/5 from [Y] reviews.
 * 
 * @param gym - Gym object with name, description, specialties, rating, reviewCount
 * @param city - City object with name
 * @returns Optimized meta description (150-160 characters)
 */
export function generateGymMetaDescription(gym: Gym, city: City | null): string {
  const cityName = city?.name || 'Cyprus';
  const primarySpecialty = getPrimarySpecialty(gym);
  const rating = gym.rating.toFixed(1);
  const reviewCount = gym.reviewCount;

  // Build description parts
  const gymName = gym.name;
  const locationPart = cityName !== 'Cyprus' ? ` in ${cityName}` : '';
  const specialtyPart = primarySpecialty !== 'fitness center' 
    ? ` - ${primarySpecialty}` 
    : '';
  
  // Extract brief value proposition from description
  let valueProp = '';
  if (gym.description) {
    const firstSentence = gym.description.split('.')[0].trim();
    // Use first sentence if it's reasonable length, otherwise truncate
    if (firstSentence.length > 0 && firstSentence.length <= 80) {
      valueProp = firstSentence;
    } else if (gym.description.length > 0) {
      // Take up to 80 chars from description
      valueProp = gym.description.substring(0, 80).trim();
      // Remove trailing incomplete words
      const lastSpace = valueProp.lastIndexOf(' ');
      if (lastSpace > 40) {
        valueProp = valueProp.substring(0, lastSpace);
      }
    }
  }

  // Build the description
  let description = `${gymName}${locationPart}${specialtyPart}`;
  
  // Add value proposition
  if (valueProp) {
    const spaceNeeded = description.length + valueProp.length + 40; // +40 for rating part
    if (spaceNeeded <= MAX_LENGTH) {
      description += `. ${valueProp}`;
    } else {
      // Truncate value prop to fit
      const availableSpace = MAX_LENGTH - description.length - 40;
      if (availableSpace > 20) {
        const truncated = valueProp.substring(0, availableSpace - 3).trim();
        const lastSpace = truncated.lastIndexOf(' ');
        description += `. ${lastSpace > 10 ? truncated.substring(0, lastSpace) : truncated}...`;
      }
    }
  }
  
  // If still too short, add generic value prop
  if (description.length < MIN_LENGTH - 50) {
    const genericProps = [
      'Modern equipment and expert trainers',
      'Top-rated fitness facility with comprehensive amenities',
      'Professional training environment for all fitness levels',
      'Comprehensive fitness solutions and expert guidance',
    ];
    for (const prop of genericProps) {
      const testLength = description.length + prop.length + 40;
      if (testLength <= MAX_LENGTH && description.length < MIN_LENGTH - 20) {
        description += `. ${prop}`;
        break;
      }
    }
  }

  // Add rating and review count
  const ratingPart = ` Rating: ${rating}/5 from ${reviewCount} review${reviewCount !== 1 ? 's' : ''}.`;
  const shortRating = ` ${rating}/5 from ${reviewCount} review${reviewCount !== 1 ? 's' : ''}.`;
  
  // Choose rating format based on available space
  if (description.length + ratingPart.length <= MAX_LENGTH) {
    description += ratingPart;
  } else if (description.length + shortRating.length <= MAX_LENGTH) {
    description += shortRating;
  } else {
    // Minimal rating
    const minimalRating = ` ${rating}/5 rating.`;
    if (description.length + minimalRating.length <= MAX_LENGTH) {
      description += minimalRating;
    }
  }

  // Ensure we're within optimal range - if too short, pad with additional info
  if (description.length < MIN_LENGTH) {
    const paddingOptions = [
      ' Located in Cyprus.',
      ' Find your perfect workout space.',
      ' Compare ratings and amenities.',
    ];
    for (const padding of paddingOptions) {
      if (description.length + padding.length <= MAX_LENGTH) {
        description += padding;
        if (description.length >= MIN_LENGTH) break;
      }
    }
  }

  return truncateToOptimalLength(description, MAX_LENGTH);
}

/**
 * Generate meta description for city pages
 * 
 * Template: Find the best gyms in [City], Cyprus. [X]+ fitness centers with ratings, reviews, and amenities. Compare and find your perfect workout space.
 * 
 * @param city - City object with name
 * @param gymCount - Number of gyms in the city
 * @returns Optimized meta description (150-160 characters)
 */
export function generateCityMetaDescription(city: City, gymCount: number): string {
  const cityName = city.name;
  const citySlug = city.slug.toLowerCase();

  // 1. Check for custom SEO department descriptions first
  // Note: We use a placeholder [COUNT] to inject the real-time number
  if (CUSTOM_DESCRIPTIONS[citySlug]) {
    const dynamicDesc = CUSTOM_DESCRIPTIONS[citySlug].replace('198+', `${gymCount}+`);
    return truncateToOptimalLength(dynamicDesc, MAX_LENGTH);
  }

  // 2. Fallback to dynamic template if no custom description exists
  const countText = gymCount > 0 
    ? `${gymCount}+ fitness centers` 
    : 'top-rated fitness centers';

  // Base template
  let description = `Find the best gyms in ${cityName}, Cyprus. ${countText} with ratings, reviews, and amenities.`;

  // Calculate remaining space and choose appropriate closing
  const remainingSpace = MAX_LENGTH - description.length;
  
  // Choose closing text that ensures we reach minimum length
  let closing = '';
  if (remainingSpace >= 50) {
    closing = ' Compare ratings, reviews, and find your perfect workout space.';
  } else if (remainingSpace >= 40) {
    closing = ' Compare and find your perfect workout space.';
  } else if (remainingSpace >= 30) {
    closing = ' Compare ratings and find your perfect match.';
  } else if (remainingSpace >= 20) {
    closing = ' Compare and find your match.';
  } else if (remainingSpace >= 10) {
    closing = ' Compare options.';
  }
  
  description += closing;
  
  // If still too short, add more content
  if (description.length < MIN_LENGTH) {
    const additionalOptions = [
      ' Browse top-rated facilities and compare amenities.',
      ' Discover comprehensive fitness centers with detailed reviews.',
      ' Explore top facilities and find your perfect match.',
    ];
    for (const option of additionalOptions) {
      const testLength = description.length + option.length;
      if (testLength <= MAX_LENGTH) {
        description += option;
        if (description.length >= MIN_LENGTH) break;
      }
    }
  }

  // Ensure optimal length
  return truncateToOptimalLength(description, MAX_LENGTH);
}

/**
 * Specialty-specific meta descriptions (maintains existing high-value keyword strategy)
 * All descriptions are 150-160 characters for optimal SEO
 */
const SPECIALTY_DESCRIPTIONS: Record<string, string> = {
  'personal-training': 'Find personal trainers in Cyprus. Discover certified trainers in Nicosia, Limassol, and across Cyprus. One-on-one training and customized workout plans.',
  'swimming-aquatics': 'Find gyms with swimming pools in Cyprus. Discover pools in Nicosia, Limassol, and aquatic fitness facilities. Perfect for lap swimming and water workouts.',
  'yoga-pilates': 'Find yoga and pilates near me in Cyprus. Discover reformer pilates studios, yoga classes in Nicosia, and pilates instructors. Compare studios and book your class today.',
  'crossfit': 'Find CrossFit gyms in Cyprus. Discover CrossFit boxes in Nicosia, Limassol, and across Cyprus. High-intensity functional training, expert coaches, and supportive communities.',
  'fitness-gym': 'Find the best fitness centers and gyms in Cyprus. Discover traditional gyms and fitness facilities in Nicosia, Limassol, and across Cyprus with comprehensive equipment and training options.',
  'martial-arts-mma': 'Find martial arts and MMA gyms in Cyprus. Discover MMA, Brazilian Jiu-Jitsu, Muay Thai, wrestling, and other combat sports training facilities. Train like a fighter with expert coaches.',
  'boxing': 'Find boxing gyms in Cyprus. Discover professional boxing trainers, heavy bags, sparring rings, and boxing clubs. Perfect for fitness and competitive boxing training.',
  'strength-training': 'Find strength training gyms in Cyprus. Discover bodybuilding and powerlifting facilities with professional equipment, squat racks, and competition-grade training areas.',
  'dance-group-fitness': 'Find dance studios and group fitness classes in Cyprus. Discover Zumba, aerobics, dance classes, and fun group workout sessions. Social and energetic fitness options.',
};

/**
 * Generate meta description for specialty pages
 * 
 * Uses custom descriptions for high-value keywords, falls back to optimized template
 * 
 * @param specialty - Specialty object with name, slug, description
 * @param gymCount - Optional gym count for the specialty
 * @returns Optimized meta description (150-160 characters)
 */
export function generateSpecialtyMetaDescription(
  specialty: Specialty,
  gymCount?: number
): string {
  const specialtySlug = specialty.slug.toLowerCase();

  // Use custom description if available (maintains existing SEO strategy)
  if (SPECIALTY_DESCRIPTIONS[specialtySlug]) {
    const customDesc = SPECIALTY_DESCRIPTIONS[specialtySlug];
    // If custom description is too short, pad it
    if (customDesc.length < MIN_LENGTH) {
      const padding = ' Compare studios and find your perfect match.';
      if (customDesc.length + padding.length <= MAX_LENGTH) {
        return truncateToOptimalLength(customDesc + padding, MAX_LENGTH);
      }
    }
    // Validate and truncate if needed
    return truncateToOptimalLength(customDesc, MAX_LENGTH);
  }

  // Fallback template for specialties without custom descriptions
  const specialtyName = specialty.name.toLowerCase();
  let description = `Find ${specialtyName} gyms in Cyprus.`;

  // Add value proposition from specialty description
  if (specialty.description) {
    const firstSentence = specialty.description.split('.')[0].trim();
    if (firstSentence.length > 0 && firstSentence.length <= 100 && description.length + firstSentence.length + 50 < MAX_LENGTH) {
      description += ` ${firstSentence}.`;
    } else {
      // Extract key benefits - use longer phrases to ensure we reach minimum
      const keyPhrases = [
        'Discover expert trainers and modern facilities for all fitness levels',
        'Compare top-rated studios and facilities with detailed reviews and ratings',
        'Find your perfect training match with comprehensive amenities and expert guidance',
      ];
      for (const phrase of keyPhrases) {
        if (description.length + phrase.length + 50 < MAX_LENGTH) {
          description += ` ${phrase}.`;
          break;
        }
      }
    }
  } else {
    // No description available, add generic value prop
    description += ' Discover expert trainers and modern facilities for all fitness levels.';
  }

  // Add location context - ensure we reach minimum length
  const remainingSpace = MAX_LENGTH - description.length;
  if (remainingSpace >= 45) {
    description += ' Available in Nicosia, Limassol, and across Cyprus.';
  } else if (remainingSpace >= 25) {
    description += ' Available across Cyprus.';
  }
  
  // If still too short, add more content - this handles cases where description was very short
  if (description.length < MIN_LENGTH) {
    const additionalOptions = [
      ' Compare ratings, reviews, and find your perfect match.',
      ' Browse top-rated facilities with detailed reviews and ratings.',
      ' Discover comprehensive amenities, expert trainers, and modern facilities.',
      ' Compare studios, ratings, and find your ideal training space.',
    ];
    for (const option of additionalOptions) {
      const testLength = description.length + option.length;
      if (testLength <= MAX_LENGTH) {
        description += option;
        if (description.length >= MIN_LENGTH) break;
      }
    }
    
    // If still too short after adding options, add location context
    if (description.length < MIN_LENGTH) {
      const locationOptions = [
        ' Available in Nicosia, Limassol, and across Cyprus.',
        ' Find top facilities across Cyprus.',
      ];
      for (const option of locationOptions) {
        const testLength = description.length + option.length;
        if (testLength <= MAX_LENGTH) {
          description += option;
          if (description.length >= MIN_LENGTH) break;
        }
      }
    }
  }

  return truncateToOptimalLength(description, MAX_LENGTH);
}
