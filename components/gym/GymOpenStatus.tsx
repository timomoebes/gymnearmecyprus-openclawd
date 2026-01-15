'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/shared/Badge';
import { OpeningHours, isGymOpenNow } from '@/lib/utils/opening-hours';

interface GymOpenStatusProps {
  openingHours: OpeningHours;
}

export const GymOpenStatus: React.FC<GymOpenStatusProps> = ({ openingHours }) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Only calculate on client side to avoid hydration mismatch
    setIsOpen(isGymOpenNow(openingHours));
  }, [openingHours]);

  // Don't render anything until we've calculated on the client
  if (isOpen === null) {
    return null;
  }

  return (
    <Badge 
      variant={isOpen ? "rating" : "specialty"}
      className={`text-xs ${
        isOpen 
          ? 'bg-green-500/20 text-green-400 border-green-500/50' 
          : 'bg-red-500/20 text-red-400 border-red-500/50'
      }`}
    >
      {isOpen ? '🟢 Open' : '🔴 Closed'}
    </Badge>
  );
};


