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

  return (
    <section className="relative bg-gradient-to-br from-background-dark via-background-dark-gray to-background-dark py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
            {t('hero.titleBefore')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
              {t('hero.titleCyprus')}
            </span>
          </h1>
          <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <SearchBar gyms={gyms} cities={cities} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cities">
              <Button variant="primary" size="lg">{t('hero.exploreGyms')}</Button>
            </Link>
            <Link href="/add-gym">
              <Button variant="outline" size="lg">{t('hero.listYourGymFree')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
