/**
 * Validation Script for Meta Descriptions
 * 
 * Tests all meta description generators to ensure they produce
 * descriptions within the 150-160 character range and include required elements.
 */

import { generateGymMetaDescription, generateCityMetaDescription, generateSpecialtyMetaDescription, validateMetaDescription } from '@/lib/utils/meta-descriptions';
import { Gym, City, Specialty } from '@/lib/types';

// Sample test data
const sampleCity: City = {
  id: 'test-city',
  name: 'Limassol',
  slug: 'limassol',
  description: 'Limassol is a vibrant city in Cyprus',
  gymCount: 25,
  coordinates: [34.7071, 33.0226],
  heroImage: '/images/cities/limassol.jpg',
  specialties: ['Fitness', 'CrossFit'],
};

const sampleGym: Gym = {
  id: 'test-gym',
  name: 'World Gym Ayia Napa',
  slug: 'world-gym-ayia-napa',
  cityId: 'test-city',
  address: '123 Test Street',
  coordinates: [34.7071, 33.0226],
  phone: '+357-25-123456',
  specialties: ['24 Hour Gym', 'Fitness'],
  amenities: ['24/7 Access', 'Parking', 'Showers'],
  rating: 4.5,
  reviewCount: 120,
  featured: false,
  description: 'World Gym Ayia Napa is a modern 24/7 fitness center with state-of-the-art equipment and expert trainers. Perfect for early morning workouts or late-night training sessions.',
  images: ['/images/gyms/world-gym.jpg'],
  openingHours: {},
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
};

const sampleSpecialty: Specialty = {
  id: 'test-specialty',
  name: 'Personal Training',
  slug: 'personal-training',
  description: 'Find certified personal trainers in Cyprus. One-on-one training sessions and customized workout plans.',
  icon: 'user',
  gymCount: 15,
  relatedSpecialties: [],
};

// Test cases
const testCases = {
  gym: [
    {
      name: 'Short gym name',
      gym: { ...sampleGym, name: 'Fit Gym' },
      city: sampleCity,
    },
    {
      name: 'Long gym name',
      gym: { ...sampleGym, name: 'BAD DOG BJJ Brazilian Jiu-Jitsu Training Club' },
      city: sampleCity,
    },
    {
      name: 'No specialties',
      gym: { ...sampleGym, specialties: [], amenities: ['Parking'] },
      city: sampleCity,
    },
    {
      name: 'High rating',
      gym: { ...sampleGym, rating: 5.0, reviewCount: 500 },
      city: sampleCity,
    },
    {
      name: 'No city data',
      gym: sampleGym,
      city: null,
    },
  ],
  city: [
    {
      name: 'High gym count',
      city: { ...sampleCity, name: 'Limassol', gymCount: 25 },
      gymCount: 25,
    },
    {
      name: 'Low gym count',
      city: { ...sampleCity, name: 'Ayia Napa', gymCount: 3 },
      gymCount: 3,
    },
    {
      name: 'Zero gyms',
      city: { ...sampleCity, name: 'Protaras', gymCount: 0 },
      gymCount: 0,
    },
  ],
  specialty: [
    {
      name: 'Personal Training (high-value)',
      specialty: { ...sampleSpecialty, slug: 'personal-training' },
    },
    {
      name: 'Swimming & Aquatics (high-value)',
      specialty: { ...sampleSpecialty, name: 'Swimming & Aquatics', slug: 'swimming-aquatics', description: 'Gyms with swimming pools' },
    },
    {
      name: 'Generic specialty',
      specialty: { ...sampleSpecialty, name: 'Test Specialty', slug: 'test-specialty', description: 'A test specialty for validation' },
    },
  ],
};

// Validation function
function validateAllDescriptions() {
  console.log('='.repeat(80));
  console.log('Meta Description Validation');
  console.log('='.repeat(80));
  console.log();

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  // Test Gym Descriptions
  console.log('Testing Gym Descriptions:');
  console.log('-'.repeat(80));
  testCases.gym.forEach((testCase) => {
    totalTests++;
    try {
      const description = generateGymMetaDescription(testCase.gym, testCase.city);
      const validation = validateMetaDescription(description);
      
      console.log(`\n[${testCase.name}]`);
      console.log(`  Description: "${description}"`);
      console.log(`  Length: ${description.length} characters`);
      console.log(`  Valid: ${validation.valid ? '✓' : '✗'}`);
      
      if (validation.valid) {
        passedTests++;
        console.log(`  Status: PASS`);
      } else {
        failedTests++;
        console.log(`  Status: FAIL - ${validation.message}`);
      }
    } catch (error) {
      failedTests++;
      console.log(`\n[${testCase.name}]`);
      console.log(`  Status: ERROR - ${error}`);
    }
  });

  console.log();
  console.log('-'.repeat(80));

  // Test City Descriptions
  console.log('\nTesting City Descriptions:');
  console.log('-'.repeat(80));
  testCases.city.forEach((testCase) => {
    totalTests++;
    try {
      const description = generateCityMetaDescription(testCase.city, testCase.gymCount);
      const validation = validateMetaDescription(description);
      
      console.log(`\n[${testCase.name}]`);
      console.log(`  Description: "${description}"`);
      console.log(`  Length: ${description.length} characters`);
      console.log(`  Valid: ${validation.valid ? '✓' : '✗'}`);
      
      if (validation.valid) {
        passedTests++;
        console.log(`  Status: PASS`);
      } else {
        failedTests++;
        console.log(`  Status: FAIL - ${validation.message}`);
      }
    } catch (error) {
      failedTests++;
      console.log(`\n[${testCase.name}]`);
      console.log(`  Status: ERROR - ${error}`);
    }
  });

  console.log();
  console.log('-'.repeat(80));

  // Test Specialty Descriptions
  console.log('\nTesting Specialty Descriptions:');
  console.log('-'.repeat(80));
  testCases.specialty.forEach((testCase) => {
    totalTests++;
    try {
      const description = generateSpecialtyMetaDescription(testCase.specialty);
      const validation = validateMetaDescription(description);
      
      console.log(`\n[${testCase.name}]`);
      console.log(`  Description: "${description}"`);
      console.log(`  Length: ${description.length} characters`);
      console.log(`  Valid: ${validation.valid ? '✓' : '✗'}`);
      
      if (validation.valid) {
        passedTests++;
        console.log(`  Status: PASS`);
      } else {
        failedTests++;
        console.log(`  Status: FAIL - ${validation.message}`);
      }
    } catch (error) {
      failedTests++;
      console.log(`\n[${testCase.name}]`);
      console.log(`  Status: ERROR - ${error}`);
    }
  });

  // Summary
  console.log();
  console.log('='.repeat(80));
  console.log('Validation Summary');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✓`);
  console.log(`Failed: ${failedTests} ${failedTests > 0 ? '✗' : ''}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));

  if (failedTests === 0) {
    console.log('\n✅ All meta descriptions are valid!');
    return true;
  } else {
    console.log('\n❌ Some meta descriptions failed validation. Please review and fix.');
    return false;
  }
}

// Run validation
if (require.main === module) {
  validateAllDescriptions();
}

export { validateAllDescriptions };
