'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { GymMap } from './GymMap';
import { Gym } from '@/lib/types';

interface GymMapWithToggleProps {
  gym: Gym;
}

export const GymMapWithToggle: React.FC<GymMapWithToggleProps> = ({ gym }) => {
  const [showMap, setShowMap] = useState(false);

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

  const hasValidCoordinates = isValidCoordinate(gym.coordinates);

  if (!hasValidCoordinates) {
    return (
      <div className="bg-surface-card rounded-card p-6">
        <h3 className="text-xl font-bold text-text-white mb-4">Location</h3>
        <div className="w-full h-96 rounded-card bg-surface-card flex items-center justify-center border border-surface-lighter">
          <div className="text-center">
            <p className="text-text-muted mb-2">Map location unavailable</p>
            <p className="text-text-muted text-sm">Coordinates not available for this gym</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card rounded-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-text-white">Location</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>
      
      {showMap && (
        <>
          <GymMap gym={gym} />
          <a
            href={`https://www.openstreetmap.org/?mlat=${gym.coordinates[0]}&mlon=${gym.coordinates[1]}&zoom=15`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-blue hover:underline text-sm mt-4 inline-block"
          >
            Open in OpenStreetMap →
          </a>
        </>
      )}
    </div>
  );
};
