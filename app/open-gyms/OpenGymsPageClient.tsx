'use client';

import React, { useState, useMemo } from 'react';
import { Gym, GymSortOption } from '@/lib/types';
import { GymCard } from '@/components/gym/GymCard';
import { FilterSort, type SortOrFilterValue } from '@/components/shared/FilterSort';
import { sortGyms, has24_7Access } from '@/lib/utils/search';
import { sortSpecialties } from '@/lib/utils/sort-specialties-amenities';
import { cities } from '@/lib/data/cities';

interface OpenGymsPageClientProps {
  initialGyms: Gym[];
}

/**
 * Client component for the Open Gyms page: filtering by city and specialty,
 * sorting, and rendering the gym grid. Matches the filter UX of city/specialty pages.
 */
export function OpenGymsPageClient({ initialGyms }: OpenGymsPageClientProps) {
  const [sortBy, setSortBy] = useState<GymSortOption>('featured');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [only24_7, setOnly24_7] = useState(false);
  const [cityFilter, setCityFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  const availableCities = useMemo(() => {
    const cityIds = new Set(initialGyms.map(g => g.cityId).filter(Boolean));
    return cities
      .filter(c => cityIds.has(c.id))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(c => ({ id: c.id, name: c.name }));
  }, [initialGyms]);

  const availableSpecialties = useMemo(() => {
    const set = new Set<string>();
    initialGyms.forEach(g => g.specialties.forEach(s => set.add(s)));
    return sortSpecialties(Array.from(set));
  }, [initialGyms]);

  const filteredGyms = useMemo(() => {
    let filtered = [...initialGyms];
    if (cityFilter) {
      filtered = filtered.filter(g => g.cityId === cityFilter);
    }
    if (specialtyFilter) {
      filtered = filtered.filter(g =>
        g.specialties.some(s => s === specialtyFilter)
      );
    }
    if (featuredOnly) filtered = filtered.filter(g => g.featured);
    if (only24_7) filtered = filtered.filter(g => has24_7Access(g));
    return sortGyms(filtered, sortBy);
  }, [initialGyms, cityFilter, specialtyFilter, featuredOnly, only24_7, sortBy]);

  const sortOrFilterValue: SortOrFilterValue =
    featuredOnly ? 'filter-featured' : only24_7 ? 'filter-24' : sortBy;

  const handleSortOrFilterChange = (value: SortOrFilterValue) => {
    if (value === 'filter-featured') {
      setFeaturedOnly(true);
      setOnly24_7(false);
      return;
    }
    if (value === 'filter-24') {
      setOnly24_7(true);
      setFeaturedOnly(false);
      return;
    }
    setSortBy(value);
    setFeaturedOnly(false);
    setOnly24_7(false);
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-text-white">
          {filteredGyms.length} Open Gyms
        </h2>
        <span className="text-text-muted">
          {filteredGyms.length} {filteredGyms.length === 1 ? 'gym' : 'gyms'}
        </span>
      </div>

      <FilterSort
        sortOrFilterValue={sortOrFilterValue}
        onSortOrFilterChange={handleSortOrFilterChange}
        showFilterOptionsInDropdown={true}
        cityFilter={cityFilter}
        onCityFilterChange={setCityFilter}
        cities={availableCities}
        specialtyFilter={specialtyFilter}
        onSpecialtyFilterChange={setSpecialtyFilter}
        specialties={availableSpecialties}
      />

      {filteredGyms.length === 0 ? (
        <div className="bg-surface-card rounded-card p-12 text-center">
          <p className="text-text-muted text-lg">
            No open gyms match your filters.
          </p>
          <p className="text-text-muted mt-2">
            Try changing city or specialty, or{' '}
            <a href="/" className="text-primary-blue hover:underline">
              browse all gyms
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} showCity={true} />
          ))}
        </div>
      )}
    </section>
  );
}
