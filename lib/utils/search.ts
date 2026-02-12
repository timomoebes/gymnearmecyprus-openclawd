import { Gym } from '@/lib/types';
import { getAllGyms } from '@/lib/data';

export interface SearchFilters {
  query?: string;
  cityId?: string;
  specialty?: string;
  minRating?: number;
  featured?: boolean;
  amenity?: string; // Filter by amenity (e.g., "24-hour", "24/7", "pool", etc.)
}

/**
 * Search and filter gyms based on provided criteria.
 * 
 * @param filters - Search criteria including query, city, specialty, rating, and featured status
 * @returns Promise resolving to filtered array of gyms
 * 
 * @example
 * ```typescript
 * const results = await searchGyms({ 
 *   cityId: 'limassol', 
 *   minRating: 4.0 
 * });
 * ```
 */
export const searchGyms = async (filters: SearchFilters): Promise<Gym[]> => {
  const allGyms = await getAllGyms();
  let results = allGyms;

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

  // Filter by amenity
  if (filters.amenity) {
    const amenityQuery = filters.amenity.toLowerCase();
    results = results.filter(gym =>
      gym.amenities.some(amenity => {
        const amenityLower = amenity.toLowerCase();
        // Handle various 24-hour formats: "24-hour", "24/7", "24 hour", etc.
        if (amenityQuery.includes('24') || amenityQuery.includes('24/7') || amenityQuery.includes('24-hour')) {
          // Match any amenity that contains "24" or "24/7"
          return amenityLower.includes('24') || amenityLower.includes('24/7') || amenityLower.includes('access');
        }
        return amenityLower.includes(amenityQuery);
      })
    );
  }

  // Search by query (name, address, specialties)
  if (filters.query) {
    const query = filters.query.toLowerCase().trim().replace(/['’]/g, '');
    results = results.filter(gym => {
      const name = gym.name.toLowerCase().replace(/['’]/g, '');
      const address = gym.address.toLowerCase().replace(/['’]/g, '');
      const description = gym.description.toLowerCase().replace(/['’]/g, '');
      
      return (
        name.includes(query) ||
        address.includes(query) ||
        description.includes(query) ||
        gym.specialties.some(s => s.toLowerCase().replace(/['’]/g, '').includes(query))
      );
    });
  }

  return results;
};

/**
 * Sort an array of gyms by the specified criteria.
 * Featured gyms are always sorted first, then by the specified criteria.
 * 
 * @param gyms - Array of gyms to sort
 * @param sortBy - Sort criteria: 'rating', 'name', 'featured', or 'reviews'
 * @returns Sorted array of gyms
 * 
 * @example
 * ```typescript
 * const sorted = sortGyms(gyms, 'rating');
 * ```
 */
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

