import { Gym } from '@/lib/types';
import { getAllGyms } from '@/lib/data';

export interface SearchFilters {
  query?: string;
  cityId?: string;
  specialty?: string;
  minRating?: number;
  featured?: boolean;
}

export const searchGyms = (filters: SearchFilters): Gym[] => {
  let results = getAllGyms();

  // Filter by city
  if (filters.cityId) {
    results = results.filter(gym => gym.cityId === filters.cityId);
  }

  // Filter by specialty
  if (filters.specialty) {
    results = results.filter(gym =>
      gym.specialties.some(s => s.toLowerCase().includes(filters.specialty!.toLowerCase()))
    );
  }

  // Filter by minimum rating
  if (filters.minRating !== undefined) {
    results = results.filter(gym => gym.rating >= filters.minRating!);
  }

  // Filter by featured
  if (filters.featured !== undefined) {
    results = results.filter(gym => gym.featured === filters.featured);
  }

  // Search by query (name, address, specialties)
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(gym =>
      gym.name.toLowerCase().includes(query) ||
      gym.address.toLowerCase().includes(query) ||
      gym.specialties.some(s => s.toLowerCase().includes(query)) ||
      gym.description.toLowerCase().includes(query)
    );
  }

  return results;
};

export const sortGyms = (gyms: Gym[], sortBy: 'rating' | 'name' | 'featured' | 'reviews'): Gym[] => {
  const sorted = [...gyms];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => {
        // Featured first, then by rating
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.rating - a.rating;
      });
    case 'name':
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.rating - a.rating;
      });
    case 'reviews':
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.reviewCount - a.reviewCount;
      });
    default:
      return sorted;
  }
};

