/**
 * Specialty Matcher Utility
 * Centralized logic for matching gyms to specialties with special handling for combined categories
 */

import { Gym } from '@/lib/types';

/**
 * Checks if a gym matches a given specialty name or slug
 * @param gym - The gym to check
 * @param specialtyNameOrSlug - The specialty name or slug to match against
 * @returns true if the gym matches the specialty
 */
export function gymMatchesSpecialty(gym: Gym, specialtyNameOrSlug: string): boolean {
  const specialtyLower = specialtyNameOrSlug.toLowerCase();

  // Special handling for Personal Training - check both specialties and amenities
  if (specialtyLower === 'personal training' || specialtyLower === 'personal-training') {
    return gym.specialties.some(s => s.toLowerCase().includes('personal training')) ||
           gym.amenities.some(a => a.toLowerCase().includes('personal training'));
  }

  // Special handling for Swimming & Aquatics - check both specialties and amenities (pools)
  if (specialtyLower === 'swimming' ||
      specialtyLower === 'swimming-aquatics' ||
      specialtyLower === 'swimming & aquatics') {
    return gym.specialties.some(s => s.toLowerCase().includes('swimming')) ||
           gym.amenities.some(a => a.toLowerCase().includes('pool') || a.toLowerCase().includes('swimming'));
  }

  // Special handling for Fitness/Gym - matches both "Fitness" and "Gym"
  if (specialtyLower === 'fitness-gym' ||
      specialtyLower === 'fitness/gym' ||
      specialtyLower === 'fitness' ||
      specialtyLower === 'gym') {
    return gym.specialties.some(s => {
      const sLower = s.toLowerCase();
      return sLower === 'fitness' || sLower === 'gym' || sLower === 'fitness/gym';
    });
  }

  // Special handling for Martial Arts & MMA - matches MMA only
  if (specialtyLower === 'martial-arts-mma' ||
      specialtyLower === 'martial arts & mma' ||
      specialtyLower === 'martial arts' ||
      specialtyLower === 'mma') {
    return gym.specialties.some(s => {
      const sLower = s.toLowerCase();
      return sLower === 'mma' || sLower === 'martial arts' || sLower === 'martial arts & mma';
    });
  }

  // Special handling for Boxing - matches Boxing only
  if (specialtyLower === 'boxing') {
    return gym.specialties.some(s => s.toLowerCase() === 'boxing');
  }

  // Special handling for Yoga & Pilates - matches both Yoga and Pilates
  if (specialtyLower === 'yoga-pilates' ||
      specialtyLower === 'yoga & pilates' ||
      specialtyLower === 'yoga' ||
      specialtyLower === 'pilates') {
    return gym.specialties.some(s => {
      const sLower = s.toLowerCase();
      return sLower === 'yoga' || sLower === 'pilates' || sLower === 'yoga & pilates';
    });
  }

  // Special handling for Strength Training - matches Bodybuilding and Powerlifting
  if (specialtyLower === 'strength-training' ||
      specialtyLower === 'strength training' ||
      specialtyLower === 'bodybuilding' ||
      specialtyLower === 'powerlifting') {
    return gym.specialties.some(s => {
      const sLower = s.toLowerCase();
      return sLower === 'bodybuilding' || sLower === 'powerlifting' || sLower === 'strength training';
    });
  }

  // Standard specialty matching - case-insensitive
  return gym.specialties.some(s => s.toLowerCase() === specialtyLower);
}

/**
 * Filters gyms by specialty
 * @param gyms - Array of gyms to filter
 * @param specialtyNameOrSlug - The specialty name or slug to filter by
 * @returns Array of gyms matching the specialty
 */
export function filterGymsBySpecialty(gyms: Gym[], specialtyNameOrSlug: string): Gym[] {
  return gyms.filter(gym => gymMatchesSpecialty(gym, specialtyNameOrSlug));
}
