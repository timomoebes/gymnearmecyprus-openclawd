import React from 'react';
import type { Metadata } from 'next';
import { Clock, X } from 'lucide-react';
import { getAllGyms, cities, specialties } from '@/lib/data';
import { searchGyms } from '@/lib/utils/search';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { GymCard } from '@/components/gym/GymCard';
import { Badge } from '@/components/shared/Badge';
import { GymListPageClient } from '@/components/shared/GymListPageClient';
import { sortGyms } from '@/lib/utils/search';

// Enable revalidation so page updates when gym counts change
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'All Gyms in Cyprus | Find Fitness Centers & Health Clubs',
  description: 'Browse all gyms in Cyprus. Filter by location, specialty, amenities, and ratings. Find 24-hour gyms, CrossFit boxes, yoga studios, and more.',
  keywords: 'gyms cyprus, all gyms, fitness centers cyprus, health clubs, 24 hour gyms, gym directory',
};

interface GymsPageProps {
  searchParams: {
    amenity?: string;
    city?: string;
    specialty?: string;
    featured?: string;
    minRating?: string;
  };
}

export default async function GymsPage({ searchParams }: GymsPageProps) {
  const allGyms = await getAllGyms();
  
  // Build filters from search params
  const filters: Parameters<typeof searchGyms>[0] = {};
  
  if (searchParams.amenity) {
    filters.amenity = searchParams.amenity;
  }
  if (searchParams.city) {
    filters.cityId = searchParams.city;
  }
  if (searchParams.specialty) {
    filters.specialty = searchParams.specialty;
  }
  if (searchParams.featured === 'true') {
    filters.featured = true;
  }
  if (searchParams.minRating) {
    filters.minRating = parseFloat(searchParams.minRating);
  }

  // Get filtered gyms
  const filteredGyms = await searchGyms(filters);
  const featuredGyms = filteredGyms.filter(gym => gym.featured);

  // Determine page title and description based on active filters
  let pageTitle = 'All Gyms in Cyprus';
  let pageDescription = 'Browse all gyms and fitness centers in Cyprus. Filter by location, specialty, amenities, and ratings to find your perfect workout space.';
  
  const activeFilters: string[] = [];
  
  if (searchParams.amenity) {
    if (searchParams.amenity.toLowerCase().includes('24')) {
      pageTitle = '24 Hour Gyms in Cyprus';
      pageDescription = 'Find gyms open 24 hours a day, 7 days a week in Cyprus. Perfect for early morning workouts, late-night training sessions, or flexible schedules.';
      activeFilters.push('24-Hour Access');
    } else {
      activeFilters.push(searchParams.amenity);
    }
  }
  
  if (searchParams.city) {
    const city = cities.find(c => c.id === searchParams.city || c.slug === searchParams.city);
    if (city) {
      activeFilters.push(city.name);
      if (!searchParams.amenity) {
        pageTitle = `All Gyms in ${city.name}`;
        pageDescription = `Browse all gyms and fitness centers in ${city.name}, Cyprus.`;
      }
    }
  }
  
  if (searchParams.specialty) {
    const specialty = specialties.find(s => s.slug === searchParams.specialty || s.name.toLowerCase().includes(searchParams.specialty!.toLowerCase()));
    if (specialty) {
      activeFilters.push(specialty.name);
    }
  }

  // Get unique specialties and cities for filter dropdowns
  const allSpecialties = Array.from(new Set(allGyms.flatMap(gym => gym.specialties))).sort();
  const cityOptions = cities.map(city => ({ id: city.id, name: city.name }));

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Gyms', href: '/gyms' }]} />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {searchParams.amenity?.toLowerCase().includes('24') && (
              <Clock className="w-8 h-8 text-primary-blue" />
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-text-white">
              {pageTitle}
            </h1>
          </div>
          <p className="text-xl text-text-light max-w-3xl mb-4">
            {pageDescription}
          </p>
          
          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-text-muted">Active filters:</span>
              {searchParams.amenity && (
                <Badge key="amenity" variant="specialty" className="flex items-center gap-2">
                  {searchParams.amenity.toLowerCase().includes('24') ? '24-Hour Access' : searchParams.amenity}
                  <a
                    href={`/gyms${buildQueryString(searchParams, 'amenity')}`}
                    className="hover:text-text-white"
                    aria-label="Remove amenity filter"
                  >
                    <X className="w-3 h-3" />
                  </a>
                </Badge>
              )}
              {searchParams.city && (
                <Badge key="city" variant="specialty" className="flex items-center gap-2">
                  {cities.find(c => c.id === searchParams.city || c.slug === searchParams.city)?.name || searchParams.city}
                  <a
                    href={`/gyms${buildQueryString(searchParams, 'city')}`}
                    className="hover:text-text-white"
                    aria-label="Remove city filter"
                  >
                    <X className="w-3 h-3" />
                  </a>
                </Badge>
              )}
              {searchParams.specialty && (
                <Badge key="specialty" variant="specialty" className="flex items-center gap-2">
                  {specialties.find(s => s.slug === searchParams.specialty || s.name.toLowerCase().includes(searchParams.specialty!.toLowerCase()))?.name || searchParams.specialty}
                  <a
                    href={`/gyms${buildQueryString(searchParams, 'specialty')}`}
                    className="hover:text-text-white"
                    aria-label="Remove specialty filter"
                  >
                    <X className="w-3 h-3" />
                  </a>
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 text-text-muted">
            <span className="text-lg font-semibold text-text-white">
              {filteredGyms.length} {filteredGyms.length === 1 ? 'Gym' : 'Gyms'} Found
            </span>
            {featuredGyms.length > 0 && (
              <Badge variant="featured">
                {featuredGyms.length} Featured {featuredGyms.length === 1 ? 'Gym' : 'Gyms'}
              </Badge>
            )}
          </div>
        </div>

        {/* Featured Gyms Section */}
        {featuredGyms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
              Featured Gyms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortGyms(featuredGyms, 'rating').map((gym) => (
                <GymCard key={gym.id} gym={gym} showCity={true} />
              ))}
            </div>
          </section>
        )}

        {/* All Gyms Section with Filtering */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-white">
              {featuredGyms.length > 0 ? 'All Gyms' : 'Gyms'}
            </h2>
            <span className="text-text-muted">
              {filteredGyms.length} {filteredGyms.length === 1 ? 'gym' : 'gyms'}
            </span>
          </div>

          <GymListPageClient
            entityName={searchParams.city ? cities.find(c => c.id === searchParams.city || c.slug === searchParams.city)?.name || 'Cyprus' : 'Cyprus'}
            initialGyms={filteredGyms}
            filterType="city"
            filterOptions={cityOptions}
            showCityInCards={true}
            featuredTitle="Featured Gyms"
            allGymsTitle={activeFilters.length > 0 ? `Filtered Gyms` : 'All Gyms'}
          />
        </section>
      </div>
    </div>
  );
}

// Helper function to build query string without a specific param
function buildQueryString(params: Record<string, string | undefined>, excludeKey: string): string {
  const filtered = Object.entries(params).filter(([key]) => key !== excludeKey);
  if (filtered.length === 0) return '';
  return '?' + filtered.map(([key, value]) => `${key}=${encodeURIComponent(value || '')}`).join('&');
}
