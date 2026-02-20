'use client';

import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/home/SearchBar';
import type { Gym } from '@/lib/types';
import type { City } from '@/lib/types';

interface HomeHeroProps {
  gyms: Gym[];
  cities: City[];
}

export function HomeHero({ gyms, cities }: HomeHeroProps) {
  const gymCount = gyms.length;

  const dynamicSubtitle = `Find gyms near you—search by city or 24/7. Compare ratings, hours, and amenities for gyms in Cyprus in one place.`;

  return (
    <section className="relative bg-gradient-to-br from-background-dark via-background-dark-gray to-background-dark py-24 lg:py-40 overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-purple opacity-5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-white leading-tight">
            Find Your Gym in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple animate-pulse">
              Cyprus
            </span>
          </h1>
          
          <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed font-light opacity-90 px-4">
            {dynamicSubtitle}
          </p>

          <div className="pt-2">
            <SearchBar gyms={gyms} cities={cities} />
          </div>

          <p className="text-text-muted text-sm pt-2 pb-2">
            <Link
              href="/cities"
              className="text-primary-blue hover:text-primary-blue-light transition-colors font-medium hover:underline underline-offset-2"
            >
              Explore Gyms
            </Link>
            <span className="mx-2" aria-hidden>·</span>
            <Link
              href="/add-gym"
              className="text-primary-blue hover:text-primary-blue-light transition-colors font-medium hover:underline underline-offset-2"
            >
              List Your Gym Free
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
