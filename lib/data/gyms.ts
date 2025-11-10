import { Gym } from '@/lib/types';

// Mock gym data - realistic gyms in Cyprus
export const gyms: Gym[] = [
  {
    id: 'powerhouse-gym-limassol',
    name: 'Powerhouse Gym Limassol',
    slug: 'powerhouse-gym-limassol',
    cityId: 'limassol',
    address: '123 Makarios Avenue, Limassol 3040',
    coordinates: [34.7071, 33.0226],
    phone: '+357-25-123456',
    website: 'https://powerhousegym.com',
    email: 'limassol@powerhousegym.com',
    specialties: ['Bodybuilding', 'CrossFit'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Personal Training', '24/7 Access', 'Sauna'],
    rating: 4.5,
    reviewCount: 127,
    featured: true,
    description: 'Powerhouse Gym Limassol is a state-of-the-art fitness facility offering world-class equipment and expert trainers. With over 3,000 square meters of training space, we provide everything you need for your fitness journey.',
    images: [
      '/images/gyms/powerhouse-limassol-1.jpg',
      '/images/gyms/powerhouse-limassol-2.jpg',
      '/images/gyms/powerhouse-limassol-3.jpg',
    ],
    openingHours: {
      monday: '6:00 AM - 11:00 PM',
      tuesday: '6:00 AM - 11:00 PM',
      wednesday: '6:00 AM - 11:00 PM',
      thursday: '6:00 AM - 11:00 PM',
      friday: '6:00 AM - 11:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 10:00 PM',
    },
    memberCount: 2500,
    yearsInBusiness: 8,
    createdAt: '2016-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'zen-yoga-studio-limassol',
    name: 'Zen Yoga Studio Limassol',
    slug: 'zen-yoga-studio-limassol',
    cityId: 'limassol',
    address: '45 Amathus Avenue, Limassol 3040',
    coordinates: [34.7100, 33.0250],
    phone: '+357-25-234567',
    website: 'https://zenyogalimassol.com',
    specialties: ['Yoga', 'Pilates'],
    amenities: ['Parking', 'Showers', 'Changing Rooms', 'Mats Provided', 'Hot Yoga Room'],
    rating: 4.8,
    reviewCount: 89,
    featured: false,
    description: 'A peaceful sanctuary in the heart of Limassol. Zen Yoga Studio offers various yoga styles including Hatha, Vinyasa, Ashtanga, and Hot Yoga. Our experienced instructors guide you through your practice in a serene environment.',
    images: [
      '/images/gyms/zen-yoga-1.jpg',
      '/images/gyms/zen-yoga-2.jpg',
    ],
    openingHours: {
      monday: '7:00 AM - 9:00 PM',
      tuesday: '7:00 AM - 9:00 PM',
      wednesday: '7:00 AM - 9:00 PM',
      thursday: '7:00 AM - 9:00 PM',
      friday: '7:00 AM - 9:00 PM',
      saturday: '8:00 AM - 7:00 PM',
      sunday: '9:00 AM - 6:00 PM',
    },
    memberCount: 450,
    yearsInBusiness: 5,
    createdAt: '2019-03-10',
    updatedAt: '2024-01-18',
  },
  {
    id: 'elite-fitness-nicosia',
    name: 'Elite Fitness Nicosia',
    slug: 'elite-fitness-nicosia',
    cityId: 'nicosia',
    address: '78 Ledra Street, Nicosia 1065',
    coordinates: [35.1856, 33.3823],
    phone: '+357-22-345678',
    website: 'https://elitefitnesscy.com',
    specialties: ['Bodybuilding', 'Powerlifting', 'Personal Training'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Personal Training', 'Nutrition Counseling', 'Sauna', 'Steam Room'],
    rating: 4.6,
    reviewCount: 203,
    featured: true,
    description: 'Elite Fitness Nicosia is the capital\'s premier strength training facility. With competition-grade equipment and certified trainers, we cater to bodybuilders, powerlifters, and fitness enthusiasts of all levels.',
    images: [
      '/images/gyms/elite-nicosia-1.jpg',
      '/images/gyms/elite-nicosia-2.jpg',
      '/images/gyms/elite-nicosia-3.jpg',
    ],
    openingHours: {
      monday: '5:00 AM - 12:00 AM',
      tuesday: '5:00 AM - 12:00 AM',
      wednesday: '5:00 AM - 12:00 AM',
      thursday: '5:00 AM - 12:00 AM',
      friday: '5:00 AM - 12:00 AM',
      saturday: '6:00 AM - 11:00 PM',
      sunday: '7:00 AM - 10:00 PM',
    },
    memberCount: 3200,
    yearsInBusiness: 12,
    createdAt: '2012-05-20',
    updatedAt: '2024-01-22',
  },
  {
    id: 'beachfit-paphos',
    name: 'BeachFit Paphos',
    slug: 'beachfit-paphos',
    cityId: 'paphos',
    address: '12 Poseidonos Avenue, Paphos 8041',
    coordinates: [34.7756, 32.4242],
    phone: '+357-26-456789',
    specialties: ['CrossFit', 'Yoga', 'Pilates'],
    amenities: ['Parking', 'Showers', 'Beach Access', 'Outdoor Training Area', 'Cafe'],
    rating: 4.4,
    reviewCount: 156,
    featured: false,
    description: 'Train with a view at BeachFit Paphos. Our unique location offers both indoor and outdoor training spaces, with beach access for running and outdoor workouts. Perfect for those who love training in nature.',
    images: [
      '/images/gyms/beachfit-paphos-1.jpg',
      '/images/gyms/beachfit-paphos-2.jpg',
    ],
    openingHours: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 8:00 PM',
    },
    memberCount: 800,
    yearsInBusiness: 4,
    createdAt: '2020-06-01',
    updatedAt: '2024-01-15',
  },
  {
    id: 'combat-zone-larnaca',
    name: 'Combat Zone Larnaca',
    slug: 'combat-zone-larnaca',
    cityId: 'larnaca',
    address: '34 Finikoudes Promenade, Larnaca 6021',
    coordinates: [34.9167, 33.6333],
    phone: '+357-24-567890',
    website: 'https://combatzonecy.com',
    specialties: ['MMA', 'Boxing', 'Brazilian Jiu-Jitsu'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Sparring Ring', 'Heavy Bags', 'Mats'],
    rating: 4.7,
    reviewCount: 94,
    featured: true,
    description: 'Combat Zone Larnaca is Cyprus\'s premier martial arts training facility. Learn MMA, Boxing, and Brazilian Jiu-Jitsu from experienced fighters and coaches. Whether you\'re training for competition or fitness, we have the programs for you.',
    images: [
      '/images/gyms/combat-zone-1.jpg',
      '/images/gyms/combat-zone-2.jpg',
      '/images/gyms/combat-zone-3.jpg',
    ],
    openingHours: {
      monday: '4:00 PM - 10:00 PM',
      tuesday: '4:00 PM - 10:00 PM',
      wednesday: '4:00 PM - 10:00 PM',
      thursday: '4:00 PM - 10:00 PM',
      friday: '4:00 PM - 10:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
    memberCount: 350,
    yearsInBusiness: 6,
    createdAt: '2018-02-14',
    updatedAt: '2024-01-19',
  },
  {
    id: 'aqua-fitness-nicosia',
    name: 'Aqua Fitness Nicosia',
    slug: 'aqua-fitness-nicosia',
    cityId: 'nicosia',
    address: '45 Makarios Avenue, Nicosia 1065',
    coordinates: [35.1750, 33.3600],
    phone: '+357-22-789012',
    website: 'https://aquafitnessnicosia.com',
    email: 'info@aquafitnessnicosia.com',
    specialties: ['Swimming', 'Personal Training', 'Yoga'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Swimming Pool', 'Indoor Pool', 'Outdoor Pool', 'Sauna', 'Steam Room', 'Cafe', 'Personal Training'],
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    description: 'Aqua Fitness Nicosia is a premier health club featuring state-of-the-art swimming facilities. Our facility includes both indoor and outdoor pools, perfect for lap swimming, water aerobics, and aquatic fitness. Located in the heart of Nicosia, we offer comprehensive fitness programs including swimming lessons, personal training, and group classes.',
    images: [
      '/images/gyms/aqua-fitness-1.jpg',
      '/images/gyms/aqua-fitness-2.jpg',
      '/images/gyms/aqua-fitness-3.jpg',
    ],
    openingHours: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 8:00 PM',
    },
    memberCount: 1800,
    yearsInBusiness: 10,
    createdAt: '2014-03-15',
    updatedAt: '2024-01-25',
  },
  {
    id: 'olympus-health-club-nicosia',
    name: 'Olympus Health Club Nicosia',
    slug: 'olympus-health-club-nicosia',
    cityId: 'nicosia',
    address: '12 Stasikratous Street, Nicosia 1065',
    coordinates: [35.1700, 33.3650],
    phone: '+357-22-890123',
    website: 'https://olympushealthclub.com',
    email: 'nicosia@olympushealthclub.com',
    specialties: ['Swimming', 'Bodybuilding', 'Personal Training'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Swimming Pool', 'Olympic Pool', 'Indoor Pool', 'Sauna', 'Steam Room', 'Jacuzzi', 'Personal Training', 'Nutrition Counseling'],
    rating: 4.8,
    reviewCount: 234,
    featured: true,
    description: 'Olympus Health Club Nicosia is one of the most prestigious health clubs in the capital. Our facility features an Olympic-size swimming pool, perfect for serious swimmers and competitive training. Along with our comprehensive gym facilities, we offer swimming lessons, water aerobics classes, and personal training services. Our pools in Nicosia are among the best-equipped in Cyprus.',
    images: [
      '/images/gyms/olympus-1.jpg',
      '/images/gyms/olympus-2.jpg',
      '/images/gyms/olympus-3.jpg',
    ],
    openingHours: {
      monday: '5:30 AM - 11:00 PM',
      tuesday: '5:30 AM - 11:00 PM',
      wednesday: '5:30 AM - 11:00 PM',
      thursday: '5:30 AM - 11:00 PM',
      friday: '5:30 AM - 11:00 PM',
      saturday: '6:00 AM - 10:00 PM',
      sunday: '7:00 AM - 9:00 PM',
    },
    memberCount: 2800,
    yearsInBusiness: 15,
    createdAt: '2009-06-01',
    updatedAt: '2024-01-20',
  },
  {
    id: 'coastal-fitness-limassol',
    name: 'Coastal Fitness Limassol',
    slug: 'coastal-fitness-limassol',
    cityId: 'limassol',
    address: '88 Amathus Avenue, Limassol 3040',
    coordinates: [34.7150, 33.0300],
    phone: '+357-25-901234',
    website: 'https://coastalfitnesslimassol.com',
    email: 'info@coastalfitnesslimassol.com',
    specialties: ['Swimming', 'CrossFit', 'Yoga'],
    amenities: ['Parking', 'Showers', 'Locker Rooms', 'Swimming Pool', 'Outdoor Pool', 'Beach Access', 'Personal Training', 'Cafe'],
    rating: 4.6,
    reviewCount: 142,
    featured: false,
    description: 'Coastal Fitness Limassol offers a unique fitness experience with both indoor and outdoor swimming pools. Our facility combines traditional gym equipment with aquatic fitness options. Perfect for those who enjoy swimming as part of their fitness routine, we offer lap swimming, water aerobics, and pool-based training programs.',
    images: [
      '/images/gyms/coastal-fitness-1.jpg',
      '/images/gyms/coastal-fitness-2.jpg',
    ],
    openingHours: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 8:00 PM',
    },
    memberCount: 1200,
    yearsInBusiness: 7,
    createdAt: '2017-04-10',
    updatedAt: '2024-01-18',
  },
];

// Helper functions
export const getGymBySlug = (slug: string): Gym | undefined => {
  return gyms.find(gym => gym.slug === slug);
};

export const getGymById = (id: string): Gym | undefined => {
  return gyms.find(gym => gym.id === id);
};

export const getGymsByCity = (cityId: string): Gym[] => {
  return gyms.filter(gym => gym.cityId === cityId);
};

export const getGymsBySpecialty = (specialtyName: string): Gym[] => {
  const specialtyLower = specialtyName.toLowerCase();
  
  // Special handling for Personal Training - check both specialties and amenities
  if (specialtyLower === 'personal training' || specialtyLower === 'personal-training') {
    return gyms.filter(gym => 
      gym.specialties.some(s => s.toLowerCase().includes('personal training')) ||
      gym.amenities.some(a => a.toLowerCase().includes('personal training'))
    );
  }
  
  // Special handling for Swimming - check both specialties and amenities (pools)
  if (specialtyLower === 'swimming') {
    return gyms.filter(gym => 
      gym.specialties.some(s => s.toLowerCase() === 'swimming') ||
      gym.amenities.some(a => a.toLowerCase().includes('pool') || a.toLowerCase().includes('swimming'))
    );
  }
  
  // Standard specialty matching - case-insensitive
  return gyms.filter(gym => 
    gym.specialties.some(s => s.toLowerCase() === specialtyLower)
  );
};

export const getFeaturedGyms = (): Gym[] => {
  return gyms.filter(gym => gym.featured);
};

export const getAllGyms = (): Gym[] => {
  return gyms;
};

