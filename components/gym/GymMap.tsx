'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym } from '@/lib/types';
import { defaultIcon, featuredIcon } from '@/lib/utils/map-icons';
import { formatGymNameWithCity } from '@/lib/utils/gym-name';
import { getCityById } from '@/lib/data';

interface GymMapProps {
  gym: Gym;
}

export const GymMap: React.FC<GymMapProps> = ({ gym }) => {
  return (
    <div className="w-full h-96 rounded-card overflow-hidden border border-surface-lighter">
      <MapContainer
        center={gym.coordinates}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={gym.coordinates}
          icon={gym.featured ? featuredIcon : defaultIcon}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="font-semibold text-sm text-gray-900 mb-2">
                {formatGymNameWithCity(gym.name, getCityById(gym.cityId)?.name)}
              </div>
              <div className="text-xs text-gray-600">
                {gym.address}
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${gym.coordinates[0]}&mlon=${gym.coordinates[1]}&zoom=15`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-blue hover:underline mt-2 inline-block"
              >
                Open in OpenStreetMap →
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

