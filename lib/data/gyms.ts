import { Gym } from '@/lib/types';
import {
  getAllGymsFromDB,
  getGymBySlugFromDB,
  getGymsByCityFromDB,
  getGymsBySpecialtyFromDB,
  getFeaturedGymsFromDB,
} from '@/lib/api/gyms';
import { filterGymsBySpecialty } from '@/lib/utils/specialty-matcher';

// Mock gym data (fallback only)
// Only keeping the 5 test-imported gyms - all mock/demo gyms removed
const mockGyms: Gym[] = [
  // Test imports from Supabase (Google Maps Scrape)
  {
    id: 'c1cedf1e-46b3-45d8-8e2a-14ccb3e9724b',
    name: 'Ballet School & Pilates Studio Monika Perikleous',
    slug: 'ballet-school-pilates-studio-monika-perikleous',
    cityId: 'limassol',
    address: 'Kosti Palama 57, Limassol, Cyprus',
    coordinates: [34.6890308, 33.0507125],
    phone: '+35799785748',
    website: 'https://www.monicadancepilatesstudio.com/',
    specialties: ['Pilates'],
    amenities: ['Group Classes'],
    rating: 5.0,
    reviewCount: 18,
    featured: false,
    description: 'Ballet School & Pilates Studio Monika Perikleous is a premier Pilates studio in Limassol, Cyprus, offering professional Pilates instruction and ballet training. Located on Kosti Palama 57, this studio combines classical ballet techniques with modern Pilates methods to provide a comprehensive fitness experience. Perfect for those seeking Pilates classes in Limassol, the studio offers personalized instruction suitable for all fitness levels. With a 5.0 rating and 18 reviews, it\'s recognized as one of the best Pilates studios in Limassol. Whether you\'re looking for Pilates near me in Limassol or specialized ballet training, this studio provides expert guidance in a welcoming environment.',
    images: [],
    openingHours: {},
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
  {
    id: '8c1521e6-7412-4b73-ac90-3547fe972156',
    name: 'Vinyasa Yoga Studio Limassol',
    slug: 'vinyasa-yoga-studio-limassol',
    cityId: 'limassol',
    address: 'Athina Court, Ypsilantou 6, Limassol, Cyprus',
    coordinates: [34.7071, 33.0226],
    phone: '+35725106848',
    website: 'http://www.vinyasayogacyprus.com/',
    specialties: ['Yoga'],
    amenities: ['Group Classes'],
    rating: 5.0,
    reviewCount: 17,
    featured: false,
    description: 'Vinyasa Yoga Studio Limassol is a top-rated yoga studio in Limassol, Cyprus, specializing in Vinyasa flow yoga classes. Located at Athina Court on Ypsilantou 6, this studio offers dynamic yoga sessions that combine movement with breath for a transformative practice. With a perfect 5.0 rating and 17 reviews, it\'s one of the most highly regarded yoga studios in Limassol. Whether you\'re a beginner looking for yoga classes near me in Limassol or an experienced practitioner seeking advanced Vinyasa flows, this studio provides expert instruction in a serene setting. Find your perfect yoga practice at this premier Limassol yoga studio.',
    images: [],
    openingHours: {}, // Class schedule has multiple sessions per day - better to leave blank than show incomplete info
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
  {
    id: 'f13c086f-b981-408a-883a-f961cace6e52',
    name: 'Piero Judo Academy',
    slug: 'piero-judo-academy',
    cityId: 'limassol',
    address: 'Eustathiou Paraskeva 18, Limassol, Cyprus',
    coordinates: [34.7071, 33.0226],
    phone: '+35799580158',
    specialties: ['Martial Arts & MMA'],
    amenities: [],
    rating: 5.0,
    reviewCount: 122,
    featured: false,
    description: 'Piero Judo Academy is a leading martial arts school in Limassol, Cyprus, specializing in Judo and MMA training. Located on Eustathiou Paraskeva 18, this academy offers professional martial arts instruction for all ages and skill levels. With an impressive 5.0 rating and 122 reviews, it\'s one of the most trusted MMA and Judo facilities in Limassol. Whether you\'re looking for MMA training near me in Limassol, Judo classes, or self-defense instruction, Piero Judo Academy provides expert coaching in a supportive environment. Join one of Limassol\'s premier martial arts academies and develop your skills with experienced instructors.',
    images: [],
    openingHours: {},
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
  {
    id: 'e685a26c-b80b-4358-8eef-4ef399eada84',
    name: 'Limassol Fitness',
    slug: 'limassol-fitness',
    cityId: 'limassol',
    address: 'Eleftherias 109-3042, Limassol, Cyprus',
    coordinates: [34.7154633, 33.1101986],
    phone: '+35795144819',
    website: 'http://limassol-fitness.com/',
    specialties: ['Personal Training'],
    amenities: ['Personal Training', 'Cardio Equipment'],
    rating: 5.0,
    reviewCount: 11,
    featured: false,
    description: 'Limassol Fitness is a professional personal training facility in Limassol, Cyprus, offering personalized fitness coaching and training programs. Located on Eleftherias 109-3042, this fitness center specializes in one-on-one personal training sessions tailored to individual goals. With a perfect 5.0 rating and 11 reviews, it\'s recognized as one of the best personal training studios in Limassol. Whether you\'re looking for a personal trainer near me in Limassol, weight loss coaching, strength training, or fitness guidance, Limassol Fitness provides expert instruction to help you achieve your fitness goals. Experience personalized training at this premier Limassol fitness facility.',
    images: [],
    openingHours: {},
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
  {
    id: 'f2b85511-93a3-45dd-b2e1-e8cee676e732',
    name: 'Soul Vibe Space',
    slug: 'soul-vibe-space',
    cityId: 'limassol',
    address: 'Agias Zonis 50, Limassol, Cyprus',
    coordinates: [34.6805802, 33.0432715],
    phone: '+35795642888',
    website: 'https://soulvibespace.simplybook.it/',
    specialties: ['Yoga'],
    amenities: [],
    rating: 4.7,
    reviewCount: 12,
    featured: false,
    description: 'Soul Vibe Space is a welcoming yoga and wellness studio in Limassol, Cyprus, offering yoga classes and holistic wellness services. Located on Agias Zonis 50, this studio creates a peaceful environment for yoga practice and personal growth. With a 4.7 rating and 12 reviews, it\'s a popular choice for yoga enthusiasts in Limassol. Whether you\'re searching for yoga classes near me in Limassol, meditation sessions, or a space for mindfulness practice, Soul Vibe Space provides a nurturing atmosphere for your wellness journey. Discover your inner peace at this serene Limassol yoga studio.',
    images: [],
    openingHours: {},
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },
];

// Mock helper functions (fallback)
const getGymBySlugMock = (slug: string): Gym | undefined => {
  return mockGyms.find(gym => gym.slug === slug);
};

const getGymByIdMock = (id: string): Gym | undefined => {
  return mockGyms.find(gym => gym.id === id);
};

const getGymsByCityMock = (cityId: string): Gym[] => {
  return mockGyms.filter(gym => gym.cityId === cityId);
};

const getGymsBySpecialtyMock = (specialtyName: string): Gym[] => {
  return filterGymsBySpecialty(mockGyms, specialtyName);
};

const getFeaturedGymsMock = (): Gym[] => {
  return mockGyms.filter(gym => gym.featured);
};

const getAllGymsMock = (): Gym[] => {
  return mockGyms;
};

// Unified data access functions (Supabase first, fallback to mock)
export async function getGymBySlug(slug: string): Promise<Gym | undefined> {
  try {
    const gym = await getGymBySlugFromDB(slug);
    if (gym) return gym;
  } catch (error) {
    console.warn('Supabase fetch failed for getGymBySlug, using mock data:', error);
  }
  return getGymBySlugMock(slug);
}

export async function getGymById(id: string): Promise<Gym | undefined> {
  // For now, use mock data for ID lookup (can be enhanced later)
  return getGymByIdMock(id);
}

export async function getGymsByCity(cityId: string): Promise<Gym[]> {
  try {
    const gyms = await getGymsByCityFromDB(cityId);
    if (gyms.length > 0) return gyms;
  } catch (error) {
    console.warn('Supabase fetch failed for getGymsByCity, using mock data:', error);
  }
  return getGymsByCityMock(cityId);
}

export async function getGymsBySpecialty(specialtyNameOrSlug: string): Promise<Gym[]> {
  try {
    // Convert specialty name to slug (handle both names and slugs)
    // If it already contains hyphens and no spaces, treat it as a slug
    let specialtySlug: string;
    if (specialtyNameOrSlug.includes('-') && !specialtyNameOrSlug.includes(' ')) {
      // Already a slug format
      specialtySlug = specialtyNameOrSlug.toLowerCase();
    } else {
      // Convert name to slug: lowercase, replace spaces with hyphens, remove special chars like &
      specialtySlug = specialtyNameOrSlug.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, '')
        .replace(/[^a-z0-9-]/g, '');
    }
    const gyms = await getGymsBySpecialtyFromDB(specialtySlug);
    if (gyms.length > 0) return gyms;
  } catch (error) {
    console.warn('Supabase fetch failed for getGymsBySpecialty, using mock data:', error);
  }
  return getGymsBySpecialtyMock(specialtyNameOrSlug);
}

export async function getFeaturedGyms(): Promise<Gym[]> {
  try {
    const gyms = await getFeaturedGymsFromDB();
    if (gyms.length > 0) return gyms;
  } catch (error) {
    console.warn('Supabase fetch failed for getFeaturedGyms, using mock data:', error);
  }
  return getFeaturedGymsMock();
}

export async function getAllGyms(): Promise<Gym[]> {
  try {
    const gyms = await getAllGymsFromDB();
    if (gyms.length > 0) return gyms;
  } catch (error) {
    console.warn('Supabase fetch failed for getAllGyms, using mock data:', error);
  }
  return getAllGymsMock();
}

export async function getGymsBySpecialtyAndCity(specialtySlug: string, cityId: string): Promise<Gym[]> {
  try {
    const { getGymsBySpecialtyAndCityFromDB } = await import('@/lib/api/gyms');
    const gyms = await getGymsBySpecialtyAndCityFromDB(specialtySlug, cityId);
    if (gyms.length > 0) return gyms;
  } catch (error) {
    console.warn('Supabase fetch failed for getGymsBySpecialtyAndCity, using fallback:', error);
    // Fallback: get all gyms by city, then filter by specialty
    const cityGyms = await getGymsByCity(cityId);
    const specialtyGyms = await getGymsBySpecialty(specialtySlug);
    // Return intersection
    const cityGymIds = new Set(cityGyms.map(g => g.id));
    return specialtyGyms.filter(g => cityGymIds.has(g.id));
  }
  return [];
}

// Export mock gyms for backward compatibility (used in data/index.ts)
export const gyms = mockGyms;
