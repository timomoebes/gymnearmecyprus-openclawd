/**
 * Generate Example Meta Descriptions
 * 
 * Outputs 10 example meta descriptions using the utility functions
 */

import { generateGymMetaDescription, generateCityMetaDescription, generateSpecialtyMetaDescription } from '@/lib/utils/meta-descriptions';
import { Gym, City, Specialty } from '@/lib/types';

// Sample data
const sampleCity: City = {
  id: 'limassol',
  name: 'Limassol',
  slug: 'limassol',
  description: 'Limassol is a vibrant city in Cyprus',
  gymCount: 25,
  coordinates: [34.7071, 33.0226],
  heroImage: '/images/cities/limassol.jpg',
  specialties: ['Fitness', 'CrossFit'],
};

const sampleCity2: City = {
  id: 'nicosia',
  name: 'Nicosia',
  slug: 'nicosia',
  description: 'Nicosia is the capital of Cyprus',
  gymCount: 18,
  coordinates: [35.1856, 33.3823],
  heroImage: '/images/cities/nicosia.jpg',
  specialties: ['Fitness'],
};

const sampleCityAyiaNapa: City = {
  id: 'ayia-napa',
  name: 'Ayia Napa',
  slug: 'ayia-napa',
  description: 'Ayia Napa is a popular resort town',
  gymCount: 6,
  coordinates: [34.9894, 34.0128],
  heroImage: '/images/cities/ayia-napa.jpg',
  specialties: [],
};

const sampleGym1: Gym = {
  id: 'gym1',
  name: 'World Gym Ayia Napa',
  slug: 'world-gym-ayia-napa',
  cityId: 'ayia-napa',
  address: 'monte napa, Νίκου Καζαντζάκη 6, Ayia Napa',
  coordinates: [34.9881, 34.0125],
  phone: '+35796672947',
  specialties: ['24 Hour Gym', 'Fitness'],
  amenities: ['24/7 Access', 'Parking', 'Showers', 'Personal Training'],
  rating: 4.9,
  reviewCount: 1269,
  featured: false,
  description: 'World Gym Ayia Napa is a highly rated 4.9-star gym in Ayia Napa, Cyprus, fitness training. Located on monte napa, this fitness center offers workout equipment suitable for all fitness levels.',
  images: ['/images/gyms/world-gym.jpg'],
  openingHours: {},
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
};

const sampleGym2: Gym = {
  id: 'gym2',
  name: 'BAD DOG BJJ Brazilian Jiu-Jitsu Training Club',
  slug: 'bad-dog-bjj',
  cityId: 'ayia-napa',
  address: '456 Main Street, Ayia Napa',
  coordinates: [34.9894, 34.0128],
  phone: '+357-23-654321',
  specialties: ['Martial Arts', 'MMA', 'Brazilian Jiu-Jitsu'],
  amenities: ['Mats', 'Changing Rooms'],
  rating: 4.8,
  reviewCount: 85,
  featured: true,
  description: 'BAD DOG BJJ is a world-class Brazilian Jiu-Jitsu training facility with expert instructors and a supportive community. Perfect for beginners and advanced practitioners.',
  images: ['/images/gyms/bad-dog-bjj.jpg'],
  openingHours: {},
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
};

const sampleGym3: Gym = {
  id: 'gym3',
  name: 'FitZone Limassol',
  slug: 'fitzone-limassol',
  cityId: 'limassol',
  address: '789 Makarios Avenue, Limassol',
  coordinates: [34.7071, 33.0226],
  phone: '+357-25-789012',
  specialties: ['Personal Training', 'Fitness'],
  amenities: ['Personal Training', 'Group Classes', 'Sauna'],
  rating: 4.7,
  reviewCount: 203,
  featured: false,
  description: 'FitZone Limassol offers personalized training programs and group fitness classes in a modern facility with top-notch equipment.',
  images: ['/images/gyms/fitzone.jpg'],
  openingHours: {},
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
};

const sampleSpecialty1: Specialty = {
  id: 'personal-training',
  name: 'Personal Training',
  slug: 'personal-training',
  description: 'Find certified personal trainers in Cyprus',
  icon: 'user',
  gymCount: 15,
  relatedSpecialties: [],
};

const sampleSpecialty2: Specialty = {
  id: 'swimming-aquatics',
  name: 'Swimming & Aquatics',
  slug: 'swimming-aquatics',
  description: 'Gyms with swimming pools',
  icon: 'waves',
  gymCount: 8,
  relatedSpecialties: [],
};

const sampleSpecialty3: Specialty = {
  id: 'crossfit',
  name: 'CrossFit',
  slug: 'crossfit',
  description: 'High-intensity functional fitness training',
  icon: 'dumbbell',
  gymCount: 12,
  relatedSpecialties: [],
};

// Generate examples
console.log('='.repeat(80));
console.log('10 Example Meta Descriptions');
console.log('='.repeat(80));
console.log();

// Gym descriptions (4 examples)
console.log('GYM PAGES:');
console.log('-'.repeat(80));
console.log(`1. ${generateGymMetaDescription(sampleGym1, sampleCityAyiaNapa)}`);
console.log(`   Length: ${generateGymMetaDescription(sampleGym1, sampleCityAyiaNapa).length} chars\n`);

console.log(`2. ${generateGymMetaDescription(sampleGym2, null)}`);
console.log(`   Length: ${generateGymMetaDescription(sampleGym2, null).length} chars\n`);

console.log(`3. ${generateGymMetaDescription(sampleGym3, sampleCity)}`);
console.log(`   Length: ${generateGymMetaDescription(sampleGym3, sampleCity).length} chars\n`);

// City descriptions (3 examples)
console.log('CITY PAGES:');
console.log('-'.repeat(80));
console.log(`4. ${generateCityMetaDescription(sampleCity, 25)}`);
console.log(`   Length: ${generateCityMetaDescription(sampleCity, 25).length} chars\n`);

console.log(`5. ${generateCityMetaDescription(sampleCity2, 18)}`);
console.log(`   Length: ${generateCityMetaDescription(sampleCity2, 18).length} chars\n`);

console.log(`6. ${generateCityMetaDescription(sampleCityAyiaNapa, 6)}`);
console.log(`   Length: ${generateCityMetaDescription(sampleCityAyiaNapa, 6).length} chars\n`);

// Specialty descriptions (4 examples)
console.log('SPECIALTY PAGES:');
console.log('-'.repeat(80));
console.log(`7. ${generateSpecialtyMetaDescription(sampleSpecialty1)}`);
console.log(`   Length: ${generateSpecialtyMetaDescription(sampleSpecialty1).length} chars\n`);

console.log(`8. ${generateSpecialtyMetaDescription(sampleSpecialty2)}`);
console.log(`   Length: ${generateSpecialtyMetaDescription(sampleSpecialty2).length} chars\n`);

console.log(`9. ${generateSpecialtyMetaDescription(sampleSpecialty3)}`);
console.log(`   Length: ${generateSpecialtyMetaDescription(sampleSpecialty3).length} chars\n`);

const sampleSpecialty4: Specialty = {
  id: 'yoga-pilates',
  name: 'Yoga & Pilates',
  slug: 'yoga-pilates',
  description: 'Yoga and Pilates studios',
  icon: 'lotus',
  gymCount: 10,
  relatedSpecialties: [],
};
console.log(`10. ${generateSpecialtyMetaDescription(sampleSpecialty4)}`);
console.log(`    Length: ${generateSpecialtyMetaDescription(sampleSpecialty4).length} chars\n`);

console.log('='.repeat(80));
