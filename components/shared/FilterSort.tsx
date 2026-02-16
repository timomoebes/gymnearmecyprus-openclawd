'use client';

import React from 'react';
import { Filter, SortAsc, MapPin } from 'lucide-react';
import { Button } from './Button';
import { GymSortOption } from '@/lib/types';

interface FilterSortProps {
  sortBy: GymSortOption;
  onSortChange: (sort: GymSortOption) => void;
  showFeaturedFilter?: boolean;
  featuredOnly?: boolean;
  onFeaturedFilterChange?: (featured: boolean) => void;
  specialtyFilter?: string;
  onSpecialtyFilterChange?: (specialty: string) => void;
  specialties?: string[];
  cityFilter?: string;
  onCityFilterChange?: (city: string) => void;
  cities?: Array<{ id: string; name: string }>;
}

export const FilterSort: React.FC<FilterSortProps> = ({
  sortBy,
  onSortChange,
  showFeaturedFilter = false,
  featuredOnly = false,
  onFeaturedFilterChange,
  specialtyFilter,
  onSpecialtyFilterChange,
  specialties = [],
  cityFilter,
  onCityFilterChange,
  cities = [],
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-surface-card rounded-card">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <SortAsc className="w-5 h-5 text-text-muted" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as GymSortOption)}
          className="bg-surface-lighter border border-surface-lighter rounded-lg px-4 py-2 text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
        >
          <option value="featured">Featured First</option>
          <option value="open">Open now</option>
          <option value="rating">Highest Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="name">Name (A-Z)</option>
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

      {/* Featured Filter */}
      {showFeaturedFilter && onFeaturedFilterChange && (
        <div className="flex items-center gap-2">
          <Button
            variant={featuredOnly ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onFeaturedFilterChange(!featuredOnly)}
          >
            {featuredOnly ? 'Show All' : 'Featured Only'}
          </Button>
        </div>
      )}
    </div>
  );
};

