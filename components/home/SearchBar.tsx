'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import type { Gym } from '@/lib/types';
import type { City } from '@/lib/types';

interface SearchBarProps {
  gyms: Gym[];
  cities: City[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ gyms, cities }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (!searchQuery) return;

    const queryLower = searchQuery.toLowerCase();

    // FIRST: Check for city matches (cities should take priority over gyms)
    // Try exact match first
    let matchedCity = cities.find(city => {
      const cityNameLower = city.name.toLowerCase();
      const citySlugLower = city.slug.toLowerCase();
      return cityNameLower === queryLower || citySlugLower === queryLower;
    });

    // If no exact city match, try partial match (but only if query is a complete word match)
    if (!matchedCity) {
      matchedCity = cities.find(city => {
        const cityNameLower = city.name.toLowerCase();
        const citySlugLower = city.slug.toLowerCase();
        // Check if query matches the start of city name or is contained as a whole word
        return cityNameLower.startsWith(queryLower) || 
               citySlugLower.startsWith(queryLower) ||
               cityNameLower === queryLower ||
               citySlugLower === queryLower;
      });
    }

    if (matchedCity) {
      // Redirect to city page
      router.push(`/cities/${matchedCity.slug}`);
      return;
    }

    // SECOND: Check for gym matches (only if no city match found)
    // Try exact match first
    let matchedGym = gyms.find(gym => {
      const gymNameLower = gym.name.toLowerCase();
      const gymSlugLower = gym.slug.toLowerCase();
      return gymNameLower === queryLower || gymSlugLower === queryLower;
    });

    // If no exact match, try partial match
    if (!matchedGym) {
      matchedGym = gyms.find(gym => {
        const gymNameLower = gym.name.toLowerCase();
        const gymSlugLower = gym.slug.toLowerCase();
        return gymNameLower.includes(queryLower) || gymSlugLower.includes(queryLower);
      });
    }

    if (matchedGym) {
      // Redirect to gym page
      router.push(`/gyms/${matchedGym.slug}`);
      return;
    }

    // If no match, redirect to cities page with search query
    router.push(`/cities?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or gym name..."
            className="w-full pl-12 pr-4 py-3 bg-surface-card border border-surface-lighter rounded-lg text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
        <Button variant="primary" size="lg" type="submit" className="whitespace-nowrap">
          Search Gyms
        </Button>
      </div>
    </form>
  );
};

