'use client';

import React, { useState, useMemo } from 'react';
import { Specialty, Gym, GymSortOption } from '@/lib/types';
import { GymCard } from '@/components/gym/GymCard';
import { FilterSort } from '@/components/shared/FilterSort';
import { sortGyms } from '@/lib/utils/search';

interface SpecialtyPageClientProps {
  specialty: Specialty;
  initialGyms: Gym[];
}

export const SpecialtyPageClient: React.FC<SpecialtyPageClientProps> = ({ specialty, initialGyms }) => {
  const [sortBy, setSortBy] = useState<GymSortOption>('featured');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Filter and sort gyms
  const filteredGyms = useMemo(() => {
    let filtered = [...initialGyms];

    // Filter by featured
    if (featuredOnly) {
      filtered = filtered.filter(gym => gym.featured);
    }

    // Sort
    return sortGyms(filtered, sortBy);
  }, [initialGyms, featuredOnly, sortBy]);

  const featuredGyms = filteredGyms.filter(gym => gym.featured);
  const standardGyms = filteredGyms.filter(gym => !gym.featured);

  return (
    <>
      {/* Featured Gyms Section */}
      {featuredGyms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-white mb-6">
            Featured {specialty.name} Gyms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </section>
      )}

      {/* All Gyms Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-white mb-6">
            All {specialty.name} Gyms
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
        />

        {filteredGyms.length === 0 ? (
          <div className="bg-surface-card rounded-card p-12 text-center">
            <p className="text-text-muted text-lg">
              No {specialty.name.toLowerCase()} gyms found matching your filters.
            </p>
            <p className="text-text-muted mt-2">
              Try adjusting your filters or{' '}
              <a href="/add-gym" className="text-primary-blue hover:underline">
                list a {specialty.name.toLowerCase()} gym
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

