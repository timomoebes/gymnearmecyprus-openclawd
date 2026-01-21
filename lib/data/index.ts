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
import { filterGymsBySpecialty } from '../utils/specialty-matcher';

// Update city gym counts
export const updateCityGymCounts = () => {
  cities.forEach(city => {
    city.gymCount = gyms.filter(gym => gym.cityId === city.id).length;
  });
};

// Update specialty gym counts
export const updateSpecialtyGymCounts = () => {
  specialties.forEach(specialty => {
    specialty.gymCount = filterGymsBySpecialty(gyms, specialty.slug).length;
  });
};

// Initialize counts
updateCityGymCounts();
updateSpecialtyGymCounts();

