'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { SearchBar } from '@/components/home/SearchBar';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Gym } from '@/lib/types';
import type { City } from '@/lib/types';

interface HomeHeroProps {
  gyms: Gym[];
  cities: City[];
}

export function HomeHero({ gyms, cities }: HomeHeroProps) {
  const { t } = useLocale();
  const gymCount = gyms.length;

  // Dynamic subtitle with gym count
  const dynamicSubtitle = `Find the best gym near me in Cyprus. Search ${gymCount}+ gyms in Limassol, Nicosia, Paphos & more. Compare ratings, amenities, hours. Pilates, CrossFit, 24-hour gyms, fitness centers—your perfect fit is here.`;

  return (
    <section className="relative bg-gradient-to-br from-background-dark via-background-dark-gray to-background-dark py-24 lg:py-40 overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-purple opacity-5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-white leading-tight">
            {t('hero.titleBefore')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple animate-pulse">
              {t('hero.titleCyprus')}
            </span>
          </h1>
          
          <p className="text-lg text-text-light max-w-3xl mx-auto leading-relaxed font-light opacity-90 px-4">
            {dynamicSubtitle}
          </p>

          <div className="pt-4">
            <SearchBar gyms={gyms} cities={cities} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/cities">
              <Button variant="primary" size="lg" className="px-8 font-semibold">
                {t('hero.exploreGyms')}
              </Button>
            </Link>
            <Link href="/add-gym">
              <Button variant="outline" size="lg" className="px-8 font-semibold">
                {t('hero.listYourGymFree')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
