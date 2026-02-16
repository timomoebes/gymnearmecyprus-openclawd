'use client';

import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { Gym, GymSortOption } from '@/lib/types';
import { GymCard } from '@/components/gym/GymCard';
import { FilterSort } from '@/components/shared/FilterSort';
import { sortGyms } from '@/lib/utils/search';

type FilterType = 'specialty' | 'city';

interface FilterOption {
  id: string;
  name: string;
}

interface GymListPageClientProps {
  /** Display name for the entity (e.g., "Limassol", "CrossFit") */
  entityName: string;

  /** Initial gym list */
  initialGyms: Gym[];

  /** Type of secondary filter to show */
  filterType: FilterType;

  /** Available filter options (specialties or cities) */
  filterOptions: FilterOption[];

  /** Show city in gym cards */
  showCityInCards?: boolean;

  /** Show star icon in featured section header */
  showStarIcon?: boolean;

  /** Custom featured section title (defaults to "Featured Gyms") */
  featuredTitle?: string;

  /** Custom all gyms section title (defaults to "All Gyms in {entityName}") */
  allGymsTitle?: string;

  /** Use guide-style layout (numbered list instead of grid) */
  useGuideStyle?: boolean;
}

/**
 * Generic client component for displaying filtered/sorted gym lists
 * Used by both City and Specialty pages
 */
export const GymListPageClient: React.FC<GymListPageClientProps> = ({
  entityName,
  initialGyms,
  filterType,
  filterOptions,
  showCityInCards = true,
  showStarIcon = false,
  featuredTitle = 'Featured Gyms',
  allGymsTitle,
  useGuideStyle = false,
}) => {
  const [sortBy, setSortBy] = useState<GymSortOption>('featured');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  // Filter and sort gyms
  const filteredGyms = useMemo(() => {
    let filtered = [...initialGyms];

    // Apply secondary filter (city or specialty)
    if (filterValue) {
      if (filterType === 'city') {
        filtered = filtered.filter(gym => gym.cityId === filterValue);
      } else {
        filtered = filtered.filter(gym =>
          gym.specialties.some(s => s === filterValue)
        );
      }
    }

    // Filter by featured
    if (featuredOnly) {
      filtered = filtered.filter(gym => gym.featured);
    }

    // Sort
    return sortGyms(filtered, sortBy);
  }, [initialGyms, filterValue, featuredOnly, sortBy, filterType]);

  const featuredGyms = filteredGyms.filter(gym => gym.featured);

  const finalAllGymsTitle = allGymsTitle || `All Gyms in ${entityName}`;

  return (
    <>
      {/* Featured Gyms Section */}
      {featuredGyms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
            {showStarIcon && <Star className="w-6 h-6 text-accent-gold" />}
            {featuredTitle}
          </h2>
          {useGuideStyle ? (
            <div className="space-y-0">
              {featuredGyms.map((gym, idx) => (
                <GymCard 
                  key={gym.id} 
                  gym={gym} 
                  showCity={showCityInCards}
                  variant="guide-style"
                  index={idx + 1}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGyms.map((gym) => (
                <GymCard key={gym.id} gym={gym} showCity={showCityInCards} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All Gyms Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-white">
            {finalAllGymsTitle}
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
          {...(filterType === 'specialty' ? {
            specialtyFilter: filterValue,
            onSpecialtyFilterChange: setFilterValue,
            specialties: filterOptions.map(f => f.name),
          } : {
            cityFilter: filterValue,
            onCityFilterChange: setFilterValue,
            cities: filterOptions,
          })}
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
              .
            </p>
          </div>
        ) : useGuideStyle ? (
          <div className="space-y-0">
            {filteredGyms.map((gym, idx) => (
              <GymCard 
                key={gym.id} 
                gym={gym} 
                showCity={showCityInCards}
                variant="guide-style"
                index={idx + 1}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} showCity={showCityInCards} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
