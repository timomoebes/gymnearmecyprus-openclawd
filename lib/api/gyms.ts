import { supabase } from '@/lib/supabase/client';
import { Gym } from '@/lib/types';

// Transform Supabase gym data to match our Gym interface
function transformGymFromDB(dbGym: any, specialties: string[], amenities: string[], citySlug?: string): Gym {
  // Parse opening hours JSON
  let openingHours: Gym['openingHours'] = {};
  if (dbGym.opening_hours) {
    try {
      const hours = typeof dbGym.opening_hours === 'string' 
        ? JSON.parse(dbGym.opening_hours) 
        : dbGym.opening_hours;
      openingHours = {
        monday: hours.monday || hours.Monday,
        tuesday: hours.tuesday || hours.Tuesday,
        wednesday: hours.wednesday || hours.Wednesday,
        thursday: hours.thursday || hours.Thursday,
        friday: hours.friday || hours.Friday,
        saturday: hours.saturday || hours.Saturday,
        sunday: hours.sunday || hours.Sunday,
      };
    } catch (e) {
      // Invalid JSON, leave empty
    }
  }

  return {
    id: dbGym.id,
    name: dbGym.name,
    slug: dbGym.slug,
    cityId: citySlug || dbGym.city?.slug || dbGym.city_id,
    address: dbGym.address || '',
    coordinates: [dbGym.latitude || 0, dbGym.longitude || 0] as [number, number],
    phone: dbGym.phone || undefined,
    website: dbGym.website || undefined,
    email: dbGym.email || undefined,
    specialties,
    amenities,
    rating: dbGym.rating || 0,
    reviewCount: dbGym.review_count || 0,
    featured: dbGym.is_featured || false,
    description: dbGym.description || '',
    images: dbGym.cover_image_url ? [dbGym.cover_image_url] : [],
    openingHours,
    memberCount: dbGym.member_count || undefined,
    yearsInBusiness: dbGym.years_in_business || undefined,
    ownerId: dbGym.owner_id || undefined,
    createdAt: dbGym.created_at || new Date().toISOString(),
    updatedAt: dbGym.updated_at || new Date().toISOString(),
  };
}

// Fetch all gyms from Supabase
export async function getAllGymsFromDB(): Promise<Gym[]> {
  try {
    // Fetch gyms with their specialties, amenities, and city
    const { data: gyms, error } = await supabase
      .from('gyms')
      .select(`
        *,
        city:cities (slug),
        gym_specialties (
          specialty:specialties (slug, name)
        ),
        gym_amenities (
          amenity:amenities (name)
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching gyms:', error);
      return [];
    }

    if (!gyms) return [];

    // Transform each gym
    return gyms.map((gym: any) => {
      const specialties = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name || '').filter(Boolean);
      const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name || '').filter(Boolean);
      const citySlug = gym.city?.slug;
      return transformGymFromDB(gym, specialties, amenities, citySlug);
    });
  } catch (error) {
    console.error('Error in getAllGymsFromDB:', error);
    return [];
  }
}

// Fetch gyms by city
export async function getGymsByCityFromDB(cityId: string): Promise<Gym[]> {
  try {
    // First, get the city UUID from slug
    const { data: city } = await supabase
      .from('cities')
      .select('id')
      .eq('slug', cityId)
      .single();

    if (!city) return [];

    // Fetch gyms for this city
    const { data: gyms, error } = await supabase
      .from('gyms')
      .select(`
        *,
        city:cities!inner (slug),
        gym_specialties (
          specialty:specialties (slug, name)
        ),
        gym_amenities (
          amenity:amenities (name)
        )
      `)
      .eq('city_id', city.id)
      .order('name');

    if (error) {
      console.error('Error fetching gyms by city:', error);
      return [];
    }

    if (!gyms) return [];

    // Transform each gym
    return gyms.map((gym: any) => {
      const specialties = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name || '').filter(Boolean);
      const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name || '').filter(Boolean);
      const citySlug = gym.city?.slug || cityId; // Use cityId as fallback
      return transformGymFromDB(gym, specialties, amenities, citySlug);
    });
  } catch (error) {
    console.error('Error in getGymsByCityFromDB:', error);
    return [];
  }
}

// Fetch gym by slug
export async function getGymBySlugFromDB(slug: string): Promise<Gym | undefined> {
  try {
    const { data: gym, error } = await supabase
      .from('gyms')
      .select(`
        *,
        city:cities (slug),
        gym_specialties (
          specialty:specialties (slug, name)
        ),
        gym_amenities (
          amenity:amenities (name)
        )
      `)
      .eq('slug', slug)
      .single();

    if (error || !gym) {
      return undefined;
    }

    const specialties = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name || '').filter(Boolean);
    const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name || '').filter(Boolean);
    const citySlug = gym.city?.slug;
    return transformGymFromDB(gym, specialties, amenities, citySlug);
  } catch (error) {
    console.error('Error in getGymBySlugFromDB:', error);
    return undefined;
  }
}

// Fetch featured gyms
export async function getFeaturedGymsFromDB(): Promise<Gym[]> {
  try {
    const { data: gyms, error } = await supabase
      .from('gyms')
      .select(`
        *,
        city:cities (slug),
        gym_specialties (
          specialty:specialties (slug, name)
        ),
        gym_amenities (
          amenity:amenities (name)
        )
      `)
      .eq('is_featured', true)
      .order('name');

    if (error) {
      console.error('Error fetching featured gyms:', error);
      return [];
    }

    if (!gyms) return [];

    return gyms.map((gym: any) => {
      const specialties = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name || '').filter(Boolean);
      const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name || '').filter(Boolean);
      const citySlug = gym.city?.slug;
      return transformGymFromDB(gym, specialties, amenities, citySlug);
    });
  } catch (error) {
    console.error('Error in getFeaturedGymsFromDB:', error);
    return [];
  }
}

// Fetch gyms by specialty
export async function getGymsBySpecialtyFromDB(specialtySlug: string): Promise<Gym[]> {
  try {
    // First, get the specialty UUID from slug
    const { data: specialty } = await supabase
      .from('specialties')
      .select('id')
      .eq('slug', specialtySlug)
      .single();

    if (!specialty) return [];

    // Fetch gyms with this specialty
    const { data: gymSpecialties, error } = await supabase
      .from('gym_specialties')
      .select(`
        gym:gyms (
          *,
          city:cities (slug),
          gym_specialties (
            specialty:specialties (slug, name)
          ),
          gym_amenities (
            amenity:amenities (name)
          )
        )
      `)
      .eq('specialty_id', specialty.id);

    if (error) {
      console.error('Error fetching gyms by specialty:', error);
      return [];
    }

    if (!gymSpecialties) return [];

    // Transform each gym
    return gymSpecialties
      .map((gs: any) => gs.gym)
      .filter(Boolean)
      .map((gym: any) => {
        const specialties = (gym.gym_specialties || []).map((gs: any) => gs.specialty?.name || '').filter(Boolean);
        const amenities = (gym.gym_amenities || []).map((ga: any) => ga.amenity?.name || '').filter(Boolean);
        const citySlug = gym.city?.slug;
        return transformGymFromDB(gym, specialties, amenities, citySlug);
      });
  } catch (error) {
    console.error('Error in getGymsBySpecialtyFromDB:', error);
    return [];
  }
}

