// Centralized data access layer
// This will make it easy to swap mock data for real API calls later

export * from './cities';
export * from './gyms';
export * from './reviews';
export * from './specialties';

// Re-export types for convenience
export * from '../types';

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
    specialty.gymCount = gyms.filter(gym =>
      gym.specialties.some(s => s.toLowerCase() === specialty.name.toLowerCase())
    ).length;
  });
};

// Initialize counts
updateCityGymCounts();
updateSpecialtyGymCounts();

