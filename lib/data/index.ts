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
    // Special handling for Swimming - check both specialties and amenities (pools)
    else if (specialtySlugLower === 'swimming' || specialtyNameLower === 'swimming') {
      specialty.gymCount = gyms.filter(gym => 
        gym.specialties.some(s => s.toLowerCase() === 'swimming') ||
        gym.amenities.some(a => a.toLowerCase().includes('pool') || a.toLowerCase().includes('swimming'))
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

