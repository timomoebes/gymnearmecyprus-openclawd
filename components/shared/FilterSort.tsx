'use client';

import React from 'react';
import { Filter, SortAsc, MapPin } from 'lucide-react';
import { GymSortOption } from '@/lib/types';

/** Value of the main sort/filter dropdown: sort option or a quick filter. */
export type SortOrFilterValue = GymSortOption | 'filter-24' | 'filter-featured';

interface FilterSortProps {
  /** Current value of the left dropdown (sort or filter). */
  sortOrFilterValue: SortOrFilterValue;
  /** Called when user selects an option from the left dropdown. */
  onSortOrFilterChange: (value: SortOrFilterValue) => void;
  /** Whether to show "Featured only" and "24/7 Access" inside the left dropdown. */
  showFilterOptionsInDropdown?: boolean;
  specialtyFilter?: string;
  onSpecialtyFilterChange?: (specialty: string) => void;
  specialties?: string[];
  cityFilter?: string;
  onCityFilterChange?: (city: string) => void;
  cities?: Array<{ id: string; name: string }>;
}

export const FilterSort: React.FC<FilterSortProps> = ({
  sortOrFilterValue,
  onSortOrFilterChange,
  showFilterOptionsInDropdown = true,
  specialtyFilter,
  onSpecialtyFilterChange,
  specialties = [],
  cityFilter,
  onCityFilterChange,
  cities = [],
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-surface-card rounded-card">
      {/* Sort & filter (single dropdown) */}
      <div className="flex items-center gap-2">
        <SortAsc className="w-5 h-5 text-text-muted" />
        <select
          value={sortOrFilterValue}
          onChange={(e) => onSortOrFilterChange(e.target.value as SortOrFilterValue)}
          className="bg-surface-lighter border border-surface-lighter rounded-lg px-4 py-2 text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
        >
          <option value="featured">Featured First</option>
          <option value="open">Open now</option>
          <option value="rating">Highest Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="name">Name (A-Z)</option>
          {showFilterOptionsInDropdown && (
            <>
              <option value="filter-featured">Featured only</option>
              <option value="filter-24">24/7 Access only</option>
            </>
          )}
        </select>
      </div>

      {/* City/Location Filter */}
      {onCityFilterChange && cities.length > 0 && (
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-text-muted" />
          <select
            value={cityFilter || ''}
            onChange={(e) => onCityFilterChange(e.target.value)}
            className="bg-surface-lighter border border-surface-lighter rounded-lg px-4 py-2 text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            <option value="">All Locations</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Specialty Filter */}
      {onSpecialtyFilterChange && specialties.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-muted" />
          <select
            value={specialtyFilter || ''}
            onChange={(e) => onSpecialtyFilterChange(e.target.value)}
            className="bg-surface-lighter border border-surface-lighter rounded-lg px-4 py-2 text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

