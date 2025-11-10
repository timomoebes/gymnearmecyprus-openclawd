import { City } from '@/lib/types';

// Major cities in Cyprus with realistic data
export const cities: City[] = [
  {
    id: 'limassol',
    name: 'Limassol',
    slug: 'limassol',
    description: 'Discover the best gyms in Limassol, Cyprus\'s vibrant coastal city. From modern fitness centers to specialized training facilities, find your perfect workout space.',
    gymCount: 0, // Will be calculated from gyms data
    coordinates: [34.7071, 33.0226],
    heroImage: '/images/cities/limassol.jpg',
    specialties: ['CrossFit', 'Bodybuilding', 'Yoga', 'Pilates', 'MMA'],
  },
  {
    id: 'nicosia',
    name: 'Nicosia',
    slug: 'nicosia',
    description: 'Explore top-rated gyms in Nicosia, the capital of Cyprus. Find state-of-the-art facilities, expert trainers, and diverse fitness programs.',
    gymCount: 0,
    coordinates: [35.1856, 33.3823],
    heroImage: '/images/cities/nicosia.jpg',
    specialties: ['Bodybuilding', 'Yoga', 'Pilates', 'Boxing', 'Swimming'],
  },
  {
    id: 'paphos',
    name: 'Paphos',
    slug: 'paphos',
    description: 'Find premier gyms and fitness centers in Paphos. Whether you\'re a local or visiting, discover the best workout facilities in this beautiful coastal city.',
    gymCount: 0,
    coordinates: [34.7756, 32.4242],
    heroImage: '/images/cities/paphos.jpg',
    specialties: ['Yoga', 'Pilates', 'Bodybuilding', 'CrossFit'],
  },
  {
    id: 'larnaca',
    name: 'Larnaca',
    slug: 'larnaca',
    description: 'Browse the finest gyms in Larnaca. From beachside fitness centers to comprehensive training facilities, find your ideal fitness destination.',
    gymCount: 0,
    coordinates: [34.9167, 33.6333],
    heroImage: '/images/cities/larnaca.jpg',
    specialties: ['Bodybuilding', 'Yoga', 'Swimming', 'Boxing'],
  },
  {
    id: 'ayia-napa',
    name: 'Ayia Napa',
    slug: 'ayia-napa',
    description: 'Discover fitness centers in Ayia Napa. Stay fit while enjoying this popular resort destination with top-quality gym facilities.',
    gymCount: 0,
    coordinates: [34.9881, 34.0125],
    heroImage: '/images/cities/ayia-napa.jpg',
    specialties: ['Bodybuilding', 'Yoga', 'CrossFit'],
  },
  {
    id: 'protaras',
    name: 'Protaras',
    slug: 'protaras',
    description: 'Find excellent gyms in Protaras. Combine your beach vacation with a great workout at modern fitness facilities.',
    gymCount: 0,
    coordinates: [35.0125, 34.0583],
    heroImage: '/images/cities/protaras.jpg',
    specialties: ['Yoga', 'Pilates', 'Bodybuilding'],
  },
];

// Helper function to get city by slug
export const getCityBySlug = (slug: string): City | undefined => {
  return cities.find(city => city.slug === slug);
};

// Helper function to get city by ID
export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};

