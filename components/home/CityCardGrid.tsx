'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { City } from '@/lib/types';

interface CityCardGridProps {
  cities: City[];
  cityGymCounts: Record<string, number>;
}

const CITY_EMOJIS: Record<string, string> = {
  'limassol': '🌊', // Coastal city
  'nicosia': '🏛️', // Capital city
  'paphos': '🏖️', // Beach/tourist area
  'larnaca': '✈️', // Airport city
  'ayia-napa': '🎉', // Party/tourist destination
  'protaras': '🏝️', // Beach resort
};

export const CityCardGrid: React.FC<CityCardGridProps> = ({ cities, cityGymCounts }) => {
  const { t } = useLocale();
  return (
    <section className="py-16 bg-background-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            {t('cities.heading')}
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            {t('cities.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cities.map((city) => {
            const emoji = CITY_EMOJIS[city.id] || '🏋️';

            return (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="group relative bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-blue/20 transition-colors" />

                <div className="relative z-10">
                  {/* Emoji */}
                  <div className="text-4xl mb-3">{emoji}</div>

                  {/* City Name */}
                  <h3 className="text-xl font-bold text-text-white mb-3 group-hover:text-primary-blue transition-colors">
                    {city.name}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-4 text-text-muted text-sm">
                    <span>{cityGymCounts[city.id] || 0} {(cityGymCounts[city.id] || 0) === 1 ? t('cities.gym') : t('cities.gyms')}</span>
                  </div>

                  {/* View Directory Link */}
                  <div className="flex items-center text-primary-blue font-medium text-sm group-hover:underline">
                    <span>{t('cities.viewDirectory')}</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Cities Button */}
        <div className="text-center">
          <Link href="/cities">
            <Button variant="primary" size="lg">
              {t('cities.viewAllCities')}
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
