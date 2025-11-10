'use client';

import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { City, Gym, GymSortOption } from '@/lib/types';
import { GymCard } from '@/components/gym/GymCard';
import { FilterSort } from '@/components/shared/FilterSort';
import { sortGyms } from '@/lib/utils/search';

interface CityPageClientProps {
  city: City;
  initialGyms: Gym[];
}

export const CityPageClient: React.FC<CityPageClientProps> = ({ city, initialGyms }) => {
  const [sortBy, setSortBy] = useState<GymSortOption>('featured');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  // Get all unique specialties from gyms
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    initialGyms.forEach(gym => {
      gym.specialties.forEach(s => specialties.add(s));
    });
    return Array.from(specialties).sort();
  }, [initialGyms]);

  // Filter and sort gyms
  const filteredGyms = useMemo(() => {
    let filtered = [...initialGyms];

    // Filter by featured
    if (featuredOnly) {
      filtered = filtered.filter(gym => gym.featured);
    }

    // Filter by specialty
    if (specialtyFilter) {
      filtered = filtered.filter(gym =>
        gym.specialties.some(s => s === specialtyFilter)
      );
    }

    // Sort
    return sortGyms(filtered, sortBy);
  }, [initialGyms, featuredOnly, specialtyFilter, sortBy]);

  const featuredGyms = filteredGyms.filter(gym => gym.featured);
  const standardGyms = filteredGyms.filter(gym => !gym.featured);

  return (
    <>
      {/* Featured Gyms Section */}
      {featuredGyms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-accent-gold" />
            Featured Gyms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} showCity={false} />
            ))}
          </div>
        </section>
      )}

      {/* All Gyms Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-white">
            All Gyms in {city.name}
          </h2>
          <span className="text-text-muted">
            {filteredGyms.length} {filteredGyms.length === 1 ? 'gym' : 'gyms'}
          </span>
        </div>

        <FilterSort
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFeaturedFilter={true}
          featuredOnly={featuredOnly}
          onFeaturedFilterChange={setFeaturedOnly}
          specialtyFilter={specialtyFilter}
          onSpecialtyFilterChange={setSpecialtyFilter}
          specialties={allSpecialties}
        />

        {filteredGyms.length === 0 ? (
          <div className="bg-surface-card rounded-card p-12 text-center">
            <p className="text-text-muted text-lg">
              No gyms found matching your filters.
            </p>
            <p className="text-text-muted mt-2">
              Try adjusting your filters or{' '}
              <a href="/add-gym" className="text-primary-blue hover:underline">
                list a gym
              </a>
              {' '}in this city.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} showCity={false} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

