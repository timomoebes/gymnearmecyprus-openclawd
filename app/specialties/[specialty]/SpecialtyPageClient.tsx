'use client';

import React, { useMemo } from 'react';
import { Specialty, Gym } from '@/lib/types';
import { GymListPageClient } from '@/components/shared/GymListPageClient';
import { cities } from '@/lib/data/cities';

interface SpecialtyPageClientProps {
  specialty: Specialty;
  initialGyms: Gym[];
}

export const SpecialtyPageClient: React.FC<SpecialtyPageClientProps> = ({ specialty, initialGyms }) => {
  // Get all unique cities from gyms, sorted by name
  const availableCities = useMemo(() => {
    const cityIds = new Set<string>();
    initialGyms.forEach(gym => {
      if (gym.cityId) {
        cityIds.add(gym.cityId);
      }
    });

    // Map cityIds to city objects and sort by name
    return cities
      .filter(city => cityIds.has(city.id))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(city => ({ id: city.id, name: city.name }));
  }, [initialGyms]);

  return (
    <GymListPageClient
      entityName={specialty.name}
      initialGyms={initialGyms}
      filterType="city"
      filterOptions={availableCities}
      showCityInCards={true}
      featuredTitle={`Featured ${specialty.name} Gyms`}
      allGymsTitle={`All ${specialty.name} Gyms`}
    />
  );
};

