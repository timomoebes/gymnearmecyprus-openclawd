import { Specialty } from '@/lib/types';

// MVP Visibility: Hide certain specialties on frontend for MVP launch
// Keep in database for future expansion
export const HIDDEN_FOR_MVP = ['hotel-gym', 'women-only'];

export const specialties: Specialty[] = [
  {
    id: 'crossfit',
    name: 'CrossFit',
    slug: 'crossfit',
    description: 'High-intensity functional fitness training combining weightlifting, cardio, and gymnastics. Find CrossFit boxes in Cyprus.',
    icon: 'dumbbell',
    gymCount: 0, // Will be calculated from gyms data
    relatedSpecialties: ['bodybuilding', 'mma', 'boxing'],
  },
  {
    id: 'bodybuilding',
    name: 'Bodybuilding',
    slug: 'bodybuilding',
    description: 'Strength training and muscle development facilities. Discover bodybuilding gyms with professional equipment and expert trainers.',
    icon: 'barbell',
    gymCount: 0,
    relatedSpecialties: ['crossfit', 'powerlifting'],
  },
  {
    id: 'yoga',
    name: 'Yoga',
    slug: 'yoga',
    description: 'Yoga studios offering various styles including Hatha, Vinyasa, Ashtanga, and Hot Yoga. Find your zen in Cyprus.',
    icon: 'lotus',
    gymCount: 0,
    relatedSpecialties: ['pilates', 'meditation'],
  },
  {
    id: 'pilates',
    name: 'Pilates',
    slug: 'pilates',
    description: 'Pilates studios focusing on core strength, flexibility, and body alignment. Mat and equipment-based classes available.',
    icon: 'activity',
    gymCount: 0,
    relatedSpecialties: ['yoga', 'dance'],
  },
  {
    id: 'mma',
    name: 'MMA',
    slug: 'mma',
    description: 'Mixed Martial Arts training facilities offering Brazilian Jiu-Jitsu, Muay Thai, wrestling, and boxing. Train like a fighter.',
    icon: 'shield',
    gymCount: 0,
    relatedSpecialties: ['boxing', 'jiu-jitsu', 'muay-thai'],
  },
  {
    id: 'boxing',
    name: 'Boxing',
    slug: 'boxing',
    description: 'Boxing gyms with professional trainers, heavy bags, and sparring rings. Perfect for fitness and competitive training.',
    icon: 'boxing-glove',
    gymCount: 0,
    relatedSpecialties: ['mma', 'kickboxing'],
  },
  {
    id: 'swimming',
    name: 'Swimming',
    slug: 'swimming',
    description: 'Gyms and facilities with swimming pools. Perfect for aquatic fitness, lap swimming, and water aerobics.',
    icon: 'waves',
    gymCount: 0,
    relatedSpecialties: ['aqua-fitness'],
  },
  {
    id: 'powerlifting',
    name: 'Powerlifting',
    slug: 'powerlifting',
    description: 'Specialized facilities for powerlifting training. Squat racks, deadlift platforms, and competition-grade equipment.',
    icon: 'weight',
    gymCount: 0,
    relatedSpecialties: ['bodybuilding', 'crossfit'],
  },
  {
    id: 'personal-training',
    name: 'Personal Training',
    slug: 'personal-training',
    description: 'Find certified personal trainers in Cyprus. One-on-one training sessions, customized workout plans, and expert guidance to achieve your fitness goals.',
    icon: 'user',
    gymCount: 0,
    relatedSpecialties: ['bodybuilding', 'crossfit', 'fitness'],
  },
  {
    id: 'fitness',
    name: 'Fitness',
    slug: 'fitness',
    description: 'General fitness centers and gyms offering a wide range of equipment and training options for overall fitness and wellness.',
    icon: 'dumbbell',
    gymCount: 0,
    relatedSpecialties: ['bodybuilding', 'crossfit', 'personal-training', 'gym'],
  },
  {
    id: 'gym',
    name: 'Gym',
    slug: 'gym',
    description: 'Traditional gyms and fitness centers offering a comprehensive range of equipment for strength training, cardio, and general fitness workouts.',
    icon: 'dumbbell',
    gymCount: 0,
    relatedSpecialties: ['fitness', 'bodybuilding', 'crossfit', 'personal-training'],
  },
];

// Helper function to get specialty by slug
export const getSpecialtyBySlug = (slug: string): Specialty | undefined => {
  return specialties.find(specialty => specialty.slug === slug);
};

// Helper function to get specialty by ID
export const getSpecialtyById = (id: string): Specialty | undefined => {
  return specialties.find(specialty => specialty.id === id);
};

