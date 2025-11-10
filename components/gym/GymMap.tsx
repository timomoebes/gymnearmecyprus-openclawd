'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Gym } from '@/lib/types';

// Fix for default marker icons in Next.js
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const featuredIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
                {gym.name}
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

