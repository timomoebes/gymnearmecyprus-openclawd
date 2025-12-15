import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { cities, getAllGyms } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

// Enable revalidation so page updates when gym counts change
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

export default async function CitiesPage() {
  // Fetch all gyms to calculate dynamic city counts
  const allGyms = await getAllGyms();
  
  // Calculate actual city gym counts from fetched data
  const cityGymCounts = cities.reduce((acc, city) => {
    acc[city.id] = allGyms.filter(gym => gym.cityId === city.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Cities', href: '/cities' }]} />
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-white mb-4">
            All Cities in Cyprus
          </h1>
          <p className="text-xl text-text-light max-w-3xl">
            Explore gyms and fitness centers across all major cities in Cyprus. 
            Find the perfect workout space in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => {
            const gymCount = cityGymCounts[city.id] || 0;

            // Match homepage: assign a distinctive emoji per city
            const cityEmojis: Record<string, string> = {
              limassol: '🌊', // Coastal city
              nicosia: '🏛️', // Capital city
              paphos: '🏖️', // Beach / historic
              larnaca: '✈️', // Airport / travel hub
              'ayia-napa': '🎉', // Party / nightlife
              protaras: '🏝️', // Beach resort
            };

            const emoji = cityEmojis[city.id] || '🏋️';

            return (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="group bg-surface-card rounded-card p-8 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-white group-hover:text-primary-blue transition-colors">
                    {city.name}
                  </h2>
                  <span className="text-3xl" aria-hidden="true">
                    {emoji}
                  </span>
                </div>
                <p className="text-text-muted mb-4 line-clamp-3">
                  {city.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-surface-lighter">
                  <span className="text-text-light font-semibold">
                    {gymCount} {gymCount === 1 ? 'Gym' : 'Gyms'}
                  </span>
                  <span className="text-primary-blue text-sm font-medium group-hover:underline">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

