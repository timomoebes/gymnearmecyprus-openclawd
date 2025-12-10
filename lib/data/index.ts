// Centralized data access layer
// This will make it easy to swap mock data for real API calls later

export * from './cities';
export * from './gyms';
export * from './reviews';
export * from './specialties';

// Re-export types for convenience
export * from '../types';

// Re-export specialty visibility config
export { HIDDEN_FOR_MVP } from './specialties';

// Data aggregation helpers
import { cities } from './cities';
import { gyms } from './gyms';
import { specialties } from './specialties';

// Update city gym counts
export const updateCityGymCounts = () => {
  cities.forEach(city => {
    city.gymCount = gyms.filter(gym => gym.cityId === city.id).length;
  });
};

// Update specialty gym counts
export const updateSpecialtyGymCounts = () => {
  specialties.forEach(specialty => {
    const specialtyNameLower = specialty.name.toLowerCase();
    const specialtySlugLower = specialty.slug.toLowerCase();
    
    // Special handling for Personal Training - check both specialties and amenities
    if (specialtySlugLower === 'personal-training' || specialtyNameLower === 'personal training') {
      specialty.gymCount = gyms.filter(gym => 
        gym.specialties.some(s => s.toLowerCase().includes('personal training')) ||
        gym.amenities.some(a => a.toLowerCase().includes('personal training'))
      ).length;
    } 
    // Special handling for Swimming & Aquatics - check both specialties and amenities (pools)
    else if (specialtySlugLower === 'swimming-aquatics' || specialtyNameLower === 'swimming & aquatics' || specialtyNameLower === 'swimming') {
      specialty.gymCount = gyms.filter(gym => 
        gym.specialties.some(s => s.toLowerCase().includes('swimming')) ||
        gym.amenities.some(a => a.toLowerCase().includes('pool') || a.toLowerCase().includes('swimming'))
      ).length;
    }
    // Special handling for Fitness/Gym - matches both "Fitness" and "Gym" specialties
    else if (specialtySlugLower === 'fitness-gym' || specialtyNameLower === 'fitness/gym') {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => {
          const sLower = s.toLowerCase();
          return sLower === 'fitness' || sLower === 'gym' || sLower === 'fitness/gym';
        })
      ).length;
    }
    // Special handling for Martial Arts & MMA - matches MMA only
    else if (specialtySlugLower === 'martial-arts-mma' || specialtyNameLower === 'martial arts & mma' || specialtyNameLower === 'martial arts & mma') {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => {
          const sLower = s.toLowerCase();
          return sLower === 'mma' || sLower === 'martial arts' || sLower === 'martial arts & mma';
        })
      ).length;
    }
    // Special handling for Boxing - matches Boxing only
    else if (specialtySlugLower === 'boxing' || specialtyNameLower === 'boxing') {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => {
          const sLower = s.toLowerCase();
          return sLower === 'boxing';
        })
      ).length;
    }
    // Special handling for Yoga & Pilates - matches both Yoga and Pilates
    else if (specialtySlugLower === 'yoga-pilates' || specialtyNameLower === 'yoga & pilates') {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => {
          const sLower = s.toLowerCase();
          return sLower === 'yoga' || sLower === 'pilates' || sLower === 'yoga & pilates';
        })
      ).length;
    }
    // Special handling for Strength Training - matches Bodybuilding and Powerlifting
    else if (specialtySlugLower === 'strength-training' || specialtyNameLower === 'strength training') {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => {
          const sLower = s.toLowerCase();
          return sLower === 'bodybuilding' || sLower === 'powerlifting' || sLower === 'strength training';
        })
      ).length;
    }
    // Standard specialty matching - case-insensitive
    else {
      specialty.gymCount = gyms.filter(gym =>
        gym.specialties.some(s => s.toLowerCase() === specialtyNameLower)
      ).length;
    }
  });
};

// Initialize counts
updateCityGymCounts();
updateSpecialtyGymCounts();

