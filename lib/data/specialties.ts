import { Specialty } from '@/lib/types';

// MVP Visibility: Hide certain specialties on frontend for MVP launch
// Keep in database for future expansion
export const HIDDEN_FOR_MVP = ['hotel-gym', 'women-only'];

export const specialties: Specialty[] = [
  {
    id: 'fitness-gym',
    name: 'Fitness/Gym',
    slug: 'fitness-gym',
    description: 'General fitness centers and traditional gyms offering a comprehensive range of equipment for strength training, cardio, and overall fitness workouts. Perfect for all fitness levels.',
    icon: 'dumbbell',
    gymCount: 0, // Will be calculated from gyms data
    relatedSpecialties: ['crossfit', 'personal-training', 'strength-training'],
  },
  {
    id: 'crossfit',
    name: 'CrossFit',
    slug: 'crossfit',
    description: 'High-intensity functional fitness training combining weightlifting, cardio, and gymnastics. Find CrossFit boxes in Cyprus.',
    icon: 'dumbbell',
    gymCount: 0,
    relatedSpecialties: ['fitness-gym', 'strength-training', 'personal-training'],
  },
  {
    id: 'personal-training',
    name: 'Personal Training',
    slug: 'personal-training',
    description: 'Find certified personal trainers in Cyprus. One-on-one training sessions, customized workout plans, and expert guidance to achieve your fitness goals.',
    icon: 'user',
    gymCount: 0,
    relatedSpecialties: ['fitness-gym', 'crossfit', 'strength-training'],
  },
  {
    id: 'martial-arts-mma',
    name: 'Martial Arts & MMA',
    slug: 'martial-arts-mma',
    description: 'Martial arts training facilities offering MMA, Brazilian Jiu-Jitsu, Muay Thai, wrestling, and other combat sports. Train like a fighter.',
    icon: 'shield',
    gymCount: 0,
    relatedSpecialties: ['boxing', 'strength-training', 'fitness-gym'],
  },
  {
    id: 'boxing',
    name: 'Boxing',
    slug: 'boxing',
    description: 'Boxing gyms with professional trainers, heavy bags, and sparring rings. Perfect for fitness and competitive training.',
    icon: 'boxing-glove',
    gymCount: 0,
    relatedSpecialties: ['martial-arts-mma', 'strength-training'],
  },
  {
    id: 'yoga-pilates',
    name: 'Yoga & Pilates',
    slug: 'yoga-pilates',
    description: 'Yoga studios and Pilates facilities offering various styles including Hatha, Vinyasa, Ashtanga, Hot Yoga, mat Pilates, and reformer Pilates. Find your zen in Cyprus.',
    icon: 'lotus',
    gymCount: 0,
    relatedSpecialties: ['dance-group-fitness', 'personal-training'],
  },
  {
    id: 'dance-group-fitness',
    name: 'Dance & Group Fitness',
    slug: 'dance-group-fitness',
    description: 'Dance studios and group fitness facilities offering Zumba, aerobics, dance classes, and group workout sessions. Fun and social fitness options.',
    icon: 'activity',
    gymCount: 0,
    relatedSpecialties: ['yoga-pilates', 'fitness-gym'],
  },
  {
    id: 'strength-training',
    name: 'Strength Training',
    slug: 'strength-training',
    description: 'Specialized facilities for strength training, bodybuilding, and powerlifting. Squat racks, deadlift platforms, and competition-grade equipment for serious strength athletes.',
    icon: 'barbell',
    gymCount: 0,
    relatedSpecialties: ['fitness-gym', 'crossfit', 'personal-training'],
  },
  {
    id: 'swimming-aquatics',
    name: 'Swimming & Aquatics',
    slug: 'swimming-aquatics',
    description: 'Gyms and facilities with swimming pools. Perfect for aquatic fitness, lap swimming, water aerobics, and low-impact workouts.',
    icon: 'waves',
    gymCount: 0,
    relatedSpecialties: ['fitness-gym', 'personal-training'],
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

