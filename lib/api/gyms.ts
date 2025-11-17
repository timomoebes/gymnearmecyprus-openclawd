import { supabase } from '@/lib/supabase/client';
import { Gym } from '@/lib/types';

// Transform Supabase gym data to match our Gym interface
function transformGymFromDB(dbGym: any, specialties: string[], amenities: string[], citySlug?: string): Gym {
  // Parse opening hours JSON - ALWAYS include all 7 days
  let openingHours: Gym['openingHours'] = {
    monday: 'Closed',
    tuesday: 'Closed',
    wednesday: 'Closed',
    thursday: 'Closed',
    friday: 'Closed',
    saturday: 'Closed',
    sunday: 'Closed',
  };
  
  if (dbGym.opening_hours) {
    try {
      const hours = typeof dbGym.opening_hours === 'string' 
        ? JSON.parse(dbGym.opening_hours) 
        : dbGym.opening_hours;
      
      // Handle "Monday-Sunday" format (applies to all days)
      if (hours['Monday-Sunday']) {
        const allWeekHours = hours['Monday-Sunday'];
        openingHours.monday = allWeekHours;
        openingHours.tuesday = allWeekHours;
        openingHours.wednesday = allWeekHours;
        openingHours.thursday = allWeekHours;
        openingHours.friday = allWeekHours;
        openingHours.saturday = allWeekHours;
        openingHours.sunday = allWeekHours;
      }
      // Handle "Monday-Friday" format
      else if (hours['Monday-Friday']) {
        const weekDaysHours = hours['Monday-Friday'];
        openingHours.monday = weekDaysHours;
        openingHours.tuesday = weekDaysHours;
        openingHours.wednesday = weekDaysHours;
        openingHours.thursday = weekDaysHours;
        openingHours.friday = weekDaysHours;
        // Saturday and Sunday remain "Closed" unless specified
        const satValue = hours.saturday || hours.Saturday;
        const sunValue = hours.sunday || hours.Sunday;
        openingHours.saturday = satValue && satValue.toLowerCase() !== 'no sessions' ? satValue : 'Closed';
        openingHours.sunday = sunValue && sunValue.toLowerCase() !== 'no sessions' ? sunValue : 'Closed';
      }
      // Handle "Week Days" format
      else if (hours['Week Days']) {
        const weekDaysHours = hours['Week Days'];
        openingHours.monday = weekDaysHours;
        openingHours.tuesday = weekDaysHours;
        openingHours.wednesday = weekDaysHours;
        openingHours.thursday = weekDaysHours;
        openingHours.friday = weekDaysHours;
        // Saturday and Sunday remain "Closed" unless specified
        const satValue = hours.saturday || hours.Saturday;
        const sunValue = hours.sunday || hours.Sunday;
        openingHours.saturday = satValue && satValue.toLowerCase() !== 'no sessions' ? satValue : 'Closed';
        openingHours.sunday = sunValue && sunValue.toLowerCase() !== 'no sessions' ? sunValue : 'Closed';
      }
      // Handle individual days
      else {
        openingHours.monday = hours.monday || hours.Monday || 'Closed';
        openingHours.tuesday = hours.tuesday || hours.Tuesday || 'Closed';
        openingHours.wednesday = hours.wednesday || hours.Wednesday || 'Closed';
        openingHours.thursday = hours.thursday || hours.Thursday || 'Closed';
        openingHours.friday = hours.friday || hours.Friday || 'Closed';
        openingHours.saturday = hours.saturday || hours.Saturday || 'Closed';
        openingHours.sunday = hours.sunday || hours.Sunday || 'Closed';
      }
      
      // Normalize "No sessions" to "Closed" for all days
      const normalizeClosed = (value: string): string => {
        if (!value) return 'Closed';
        const lower = value.toLowerCase();
        if (lower === 'no sessions' || lower === 'closed') return 'Closed';
        return value;
      };
      
      openingHours.monday = normalizeClosed(openingHours.monday);
      openingHours.tuesday = normalizeClosed(openingHours.tuesday);
      openingHours.wednesday = normalizeClosed(openingHours.wednesday);
      openingHours.thursday = normalizeClosed(openingHours.thursday);
      openingHours.friday = normalizeClosed(openingHours.friday);
      openingHours.saturday = normalizeClosed(openingHours.saturday);
      openingHours.sunday = normalizeClosed(openingHours.sunday);
    } catch (e) {
      // Invalid JSON - keep defaults (all "Closed")
    }
  }

  // Ensure website URL has protocol
  let website = dbGym.website || undefined;
  if (website && !website.startsWith('http://') && !website.startsWith('https://')) {
    website = `https://${website}`;
  }

  // Parse pricing if available (stored as JSONB or JSON string)
  let pricing: Record<string, string> | undefined = undefined;
  if (dbGym.pricing) {
    try {
      pricing = typeof dbGym.pricing === 'string' 
        ? JSON.parse(dbGym.pricing) 
        : dbGym.pricing;
    } catch (e) {
      // Invalid JSON, leave undefined
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
    website: website,
    email: dbGym.email || undefined,
    specialties,
    amenities,
    rating: dbGym.rating || 0,
    reviewCount: dbGym.review_count || 0,
    featured: dbGym.is_featured || false,
    description: dbGym.description || '',
    images: dbGym.cover_image_url ? [dbGym.cover_image_url] : [],
    openingHours,
    pricing,
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

