'use client';

import React, { useMemo } from 'react';
import { City, Gym } from '@/lib/types';
import { GymListPageClient } from '@/components/shared/GymListPageClient';
import { sortSpecialties } from '@/lib/utils/sort-specialties-amenities';

interface CityPageClientProps {
  city: City;
  initialGyms: Gym[];
}

export const CityPageClient: React.FC<CityPageClientProps> = ({ city, initialGyms }) => {
  // Get all unique specialties from gyms, sorted by predefined order
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    initialGyms.forEach(gym => {
      gym.specialties.forEach(s => specialties.add(s));
    });
    return sortSpecialties(Array.from(specialties)).map(name => ({ id: name, name }));
  }, [initialGyms]);

  return (
    <GymListPageClient
      entityName={city.name}
      initialGyms={initialGyms}
      filterType="specialty"
      filterOptions={allSpecialties}
      showCityInCards={false}
      showStarIcon={true}
      allGymsTitle={`All Gyms in ${city.name}`}
    />
  );
};

