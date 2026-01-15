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

// Validate coordinates - check if they're valid (not 0,0 and within reasonable bounds)
const isValidCoordinate = (coords: [number, number]): boolean => {
  const [lat, lng] = coords;
  // Check if coordinates are not the default fallback (0, 0)
  if (lat === 0 && lng === 0) return false;
  // Check if coordinates are within valid ranges
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return false;
  // Check if coordinates are valid numbers
  if (isNaN(lat) || isNaN(lng)) return false;
  return true;
};

export const GymMap: React.FC<GymMapProps> = ({ gym }) => {
  // Validate coordinates before rendering map
  if (!isValidCoordinate(gym.coordinates)) {
    return (
      <div className="w-full h-96 rounded-card bg-surface-card flex items-center justify-center border border-surface-lighter">
        <div className="text-center">
          <p className="text-text-muted mb-2">Map location unavailable</p>
          <p className="text-text-muted text-sm">Coordinates not available for this gym</p>
        </div>
      </div>
    );
  }

  const [lat, lng] = gym.coordinates;

  return (
    <div className="w-full h-96 rounded-card overflow-hidden border border-surface-lighter">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lat, lng]}
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
                href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=15`}
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

