// Core type definitions for GymNearMe Cyprus

export interface City {
  id: string;
  name: string;
  slug: string;
  description: string;
  gymCount: number;
  coordinates: [number, number]; // [lat, lng]
  heroImage: string;
  specialties: string[]; // Popular specialties in this city
}

export interface Gym {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  phone?: string;
  website?: string;
  email?: string;
  socialMedia?: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
  specialties: string[];
  amenities: string[];
  rating: number; // 0-5
  reviewCount: number;
  featured: boolean;
  description: string;
  images: string[];
  featuredImages?: string[]; // Owner-uploaded photos from Supabase Storage
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  pricing?: Record<string, string>; // Pricing information (e.g., { "Monthly": "€25", "Day Pass": "€6" })
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  gymId: string;
  source: 'google' | 'local';
  reviewerName: string;
  rating: number; // 1-5
  text: string;
  date: string; // ISO date string
  verified: boolean;
  helpful?: number;
}

export interface Specialty {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Icon name/component identifier
  gymCount: number;
  relatedSpecialties: string[]; // Related specialty IDs
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gymIds: string[]; // Gyms owned by this owner
  plan: 'free' | 'featured-monthly' | 'featured-yearly' | 'featured-lifetime';
  createdAt: string;
}

// Utility types
export type GymSortOption = 'rating' | 'name' | 'featured' | 'reviews';
export type FilterOption = {
  specialty?: string;
  city?: string;
  featured?: boolean;
  minRating?: number;
};

