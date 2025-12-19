'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym } from '@/lib/types';
import { getCityById } from '@/lib/data';
import Link from 'next/link';
import { Rating } from '@/components/shared/Rating';
import { Badge } from '@/components/shared/Badge';
import { defaultIcon, featuredIcon } from '@/lib/utils/map-icons';
import { formatGymNameWithCity } from '@/lib/utils/gym-name';
import { sortSpecialties } from '@/lib/utils/sort-specialties-amenities';

interface CityMapProps {
  cityId: string;
  gyms: Gym[];
}

export const CityMap: React.FC<CityMapProps> = ({ cityId, gyms }) => {
  const city = getCityById(cityId);

  if (!city || gyms.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-96 rounded-card overflow-hidden border border-surface-lighter">
      <MapContainer
        center={city.coordinates}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={gym.coordinates}
            icon={gym.featured ? featuredIcon : defaultIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-start justify-between mb-2">
                  <Link
                    href={`/gyms/${gym.slug}`}
                    className="font-semibold text-sm text-gray-900 hover:text-primary-blue"
                  >
                    {formatGymNameWithCity(gym.name, getCityById(gym.cityId)?.name)}
                  </Link>
                  {gym.featured && (
                    <Badge variant="featured" className="ml-2 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <Rating rating={gym.rating} reviewCount={gym.reviewCount} size="sm" />
                <div className="mt-2 text-xs text-gray-600">
                  {sortSpecialties(gym.specialties).slice(0, 2).join(', ')}
                </div>
                <Link
                  href={`/gyms/${gym.slug}`}
                  className="text-xs text-primary-blue hover:underline mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

