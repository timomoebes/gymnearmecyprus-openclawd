'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Clock, MapPin, Star } from 'lucide-react';
import { formatGymNameWithCity } from '@/lib/utils/gym-name';
import type { Gym } from '@/lib/types';
import type { City } from '@/lib/types';

interface Home24HourSectionProps {
  twentyFourHourGyms: Gym[];
  cities: City[];
}

export function Home24HourSection({ twentyFourHourGyms, cities }: Home24HourSectionProps) {
  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Gyms Open 24/7
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            Early bird or night owl? Several gyms in Cyprus are open around the clock. Use the filter below or browse the list to find one that fits your schedule.
          </p>
        </div>

        {twentyFourHourGyms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {twentyFourHourGyms.slice(0, 3).map((gym) => {
              const city = cities.find((c) => c.id === gym.cityId);
              return (
                <Link
                  key={gym.id}
                  href={`/gyms/${gym.slug}`}
                  className="group bg-surface-card rounded-card p-6 hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-text-white group-hover:text-primary-blue transition-colors">
                      {formatGymNameWithCity(gym.name, city?.name)}
                    </h3>
                    <Clock className="w-5 h-5 text-primary-blue flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-text-muted text-sm mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {city?.name}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center text-text-light">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                      {gym.rating}
                    </div>
                    <div className="text-text-muted">
                      {gym.reviewCount} reviews
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Link href="/gyms?amenity=24-hour">
            <Button variant="outline" size="lg">
              View All 24 Hour Gyms
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
