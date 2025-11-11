/**
 * Data Migration Script: Mock Data → Supabase Database
 * 
 * This script migrates all 20 mock gyms from lib/data/gyms.ts to Supabase.
 * 
 * Usage:
 * 1. Ensure all migrations are applied
 * 2. Run: npx tsx scripts/migrate-mock-data-to-db.ts
 * 
 * Note: This script uses Supabase MCP server functions
 */

// City UUIDs (from database)
const CITY_UUIDS: Record<string, string> = {
  'larnaca': 'c2208ba4-aea9-4e22-b256-09177179763f',
  'limassol': 'a8d0fd41-5901-4a94-93d3-ecc28166b137',
  'nicosia': 'fa1518c7-1daf-4e05-a27b-d6296176ef2e',
  'paphos': '7978d742-eeea-4c7a-b37f-7dceacd4284b',
  'ayia-napa': '209d0e59-baa3-4a6d-88fa-1e908747bdb3',
  'protaras': '7b90b819-b3a9-43ce-ad48-22b016b9686b',
};

// Specialty slug to UUID mapping (will be fetched from DB)
const SPECIALTY_UUIDS: Record<string, string> = {
  'crossfit': 'ca21235b-511e-40d0-8772-9fb070ab7cf5',
  'bodybuilding': 'b3f29ef7-beb7-432b-8553-9cb1638a9e1b',
  'yoga': 'ea4205eb-b55b-4b0d-a762-d267ec55f123',
  'pilates': 'b85cb2e6-fb93-4167-aa98-d5f4444061b1',
  'mma': '7a0ab816-372c-410c-a373-9e7794cac9e6',
  'boxing': 'f6559489-8266-42f2-aea9-89a3a76eeea0',
  'swimming': '6d24f583-a572-4566-a1d1-bb822e9e0091',
  'powerlifting': '8117e3e2-07b3-46fd-b579-4e04020858a1',
  'personal-training': '1b9ecd3b-fe53-4432-9dc0-978f90eaacb3',
};

// Amenity name to UUID mapping (will be fetched from DB)
const AMENITY_UUIDS: Record<string, string> = {
  'Parking': '3aca2174-3c20-40f6-a2fb-c0b86ee59240',
  'Showers': 'abc944b3-8552-4824-829d-164993e15a80',
  'Locker Rooms': 'b6a4423a-775c-4c45-beca-f7c183c662e2',
  'Personal Training': 'e933a6e6-d9b5-4afb-ad9e-54ce90ff8fcd',
  '24/7 Access': '175c7168-835e-4955-9d15-730b57f9b9ff', // 24 Hour Gym
  'Sauna': '555d9fca-3c13-43f3-8139-d56606007b43',
  'Steam Room': '78b63197-a11d-4081-a2ba-28cffa215a40',
  'Swimming Pool': '92c13875-919d-4bf3-b619-0c4005b1d95e',
  'Cafe': '5d3ced7f-823a-43dd-91cc-45da729b5496',
  'Cardio Equipment': '030fd487-234b-450b-9080-c48419d88266',
  'Weight Training': '8f9622bd-57de-44d0-8c34-7be3bd921cdc',
  'Group Classes': '10959b05-8018-4780-a7d5-5053086d246a',
};

// Specialty name mapping (mock data uses different casing)
const SPECIALTY_NAME_TO_SLUG: Record<string, string> = {
  'CrossFit': 'crossfit',
  'Bodybuilding': 'bodybuilding',
  'Yoga': 'yoga',
  'Pilates': 'pilates',
  'MMA': 'mma',
  'Boxing': 'boxing',
  'Swimming': 'swimming',
  'Powerlifting': 'powerlifting',
  'Personal Training': 'personal-training',
  'Brazilian Jiu-Jitsu': 'mma', // Map to MMA
};

// Amenity name mapping
const AMENITY_NAME_MAPPING: Record<string, string> = {
  'Parking': 'Parking',
  'Showers': 'Showers',
  'Locker Rooms': 'Locker Rooms',
  'Personal Training': 'Personal Training',
  '24/7 Access': '24/7 Access',
  'Sauna': 'Sauna',
  'Steam Room': 'Steam Room',
  'Swimming Pool': 'Swimming Pool',
  'Pool': 'Swimming Pool',
  'Indoor Pool': 'Swimming Pool',
  'Outdoor Pool': 'Swimming Pool',
  'Olympic Pool': 'Swimming Pool',
  'Cafe': 'Cafe',
  'Cardio Equipment': 'Cardio Equipment',
  'Free Weights': 'Weight Training',
  'Weight Training': 'Weight Training',
  'Group Classes': 'Group Classes',
  'Changing Rooms': 'Locker Rooms',
  'Mats Provided': 'Group Classes',
  'Hot Yoga Room': 'Group Classes',
  'Beach Access': 'Outdoor',
  'Outdoor Training Area': 'Outdoor',
};

interface MockGym {
  id: string;
  name: string;
  slug: string;
  cityId: string;
  address: string;
  coordinates: [number, number];
  phone?: string;
  website?: string;
  email?: string;
  specialties: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  description: string;
  images: string[];
  openingHours: Record<string, string>;
  memberCount?: number;
  yearsInBusiness?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Convert mock gym data to database format
 */
function convertGymToDBFormat(gym: MockGym, cityUuid: string) {
  const [latitude, longitude] = gym.coordinates;
  
  // Convert openingHours to JSONB format
  const openingHoursJson = JSON.stringify(gym.openingHours);
  
  // For unclaimed gyms (featured: false), leave member_count NULL
  const memberCount = gym.featured && gym.memberCount ? gym.memberCount : null;
  const memberCountSource = gym.featured && gym.memberCount ? 'Demo Data' : null;
  
  return {
    name: gym.name,
    slug: gym.slug,
    description: gym.description,
    address: gym.address,
    city_id: cityUuid,
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    phone: gym.phone || null,
    email: gym.email || null,
    website: gym.website || null,
    logo_url: gym.images[0] || null,
    cover_image_url: gym.images[0] || null,
    opening_hours: openingHoursJson,
    is_featured: gym.featured,
    rating: gym.rating.toString(),
    review_count: gym.reviewCount,
    years_in_business: gym.yearsInBusiness || null,
    member_count: memberCount,
    member_count_source: memberCountSource,
    member_count_verified: false, // All mock data is unverified
    member_count_public: true,
    created_at: gym.createdAt,
    updated_at: gym.updatedAt,
  };
}

/**
 * Get specialty UUIDs for a gym
 */
function getSpecialtyUuids(specialties: string[]): string[] {
  return specialties
    .map(spec => {
      const slug = SPECIALTY_NAME_TO_SLUG[spec] || spec.toLowerCase().replace(/\s+/g, '-');
      return SPECIALTY_UUIDS[slug];
    })
    .filter(Boolean) as string[];
}

/**
 * Get amenity UUIDs for a gym
 */
function getAmenityUuids(amenities: string[]): string[] {
  return amenities
    .map(amenity => {
      const mapped = AMENITY_NAME_MAPPING[amenity] || amenity;
      return AMENITY_UUIDS[mapped];
    })
    .filter(Boolean) as string[];
}

/**
 * Generate SQL for inserting a gym
 */
function generateGymInsertSQL(gym: MockGym): string {
  const cityUuid = CITY_UUIDS[gym.cityId];
  if (!cityUuid) {
    throw new Error(`City UUID not found for: ${gym.cityId}`);
  }
  
  const dbGym = convertGymToDBFormat(gym, cityUuid);
  
  const columns = Object.keys(dbGym).join(', ');
  const values = Object.values(dbGym).map(val => {
    if (val === null) return 'NULL';
    if (typeof val === 'string') {
      // Escape single quotes
      const escaped = val.replace(/'/g, "''");
      // Check if it's JSON
      if (val.startsWith('{') || val.startsWith('[')) {
        return `'${escaped}'::jsonb`;
      }
      return `'${escaped}'`;
    }
    return val;
  }).join(', ');
  
  return `
    INSERT INTO gyms (${columns})
    VALUES (${values})
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      address = EXCLUDED.address,
      rating = EXCLUDED.rating,
      review_count = EXCLUDED.review_count,
      updated_at = EXCLUDED.updated_at
    RETURNING id;
  `;
}

/**
 * Generate SQL for inserting gym specialties
 */
function generateGymSpecialtiesSQL(gymId: string, specialties: string[]): string {
  const specialtyUuids = getSpecialtyUuids(specialties);
  
  if (specialtyUuids.length === 0) return '';
  
  const values = specialtyUuids
    .map(uuid => `('${gymId}', '${uuid}')`)
    .join(',\n      ');
  
  return `
    INSERT INTO gym_specialties (gym_id, specialty_id)
    VALUES
      ${values}
    ON CONFLICT DO NOTHING;
  `;
}

/**
 * Generate SQL for inserting gym amenities
 */
function generateGymAmenitiesSQL(gymId: string, amenities: string[]): string {
  const amenityUuids = getAmenityUuids(amenities);
  
  if (amenityUuids.length === 0) return '';
  
  const values = amenityUuids
    .map(uuid => `('${gymId}', '${uuid}')`)
    .join(',\n      ');
  
  return `
    INSERT INTO gym_amenities (gym_id, amenity_id)
    VALUES
      ${values}
    ON CONFLICT DO NOTHING;
  `;
}

// Export functions for use in migration script
export {
  CITY_UUIDS,
  SPECIALTY_UUIDS,
  AMENITY_UUIDS,
  convertGymToDBFormat,
  getSpecialtyUuids,
  getAmenityUuids,
  generateGymInsertSQL,
  generateGymSpecialtiesSQL,
  generateGymAmenitiesSQL,
};

