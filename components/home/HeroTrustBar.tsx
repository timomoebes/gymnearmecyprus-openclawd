'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface HeroTrustBarProps {
  totalGyms: number;
  formattedAverageRating: string;
  cityCount?: number;
}

export function HeroTrustBar({ totalGyms, formattedAverageRating, cityCount = 0 }: HeroTrustBarProps) {
  return (
    <div className="relative border-y border-primary-blue/20 bg-gradient-to-r from-background-dark-gray via-surface-lighter/5 to-background-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-center text-text-muted text-sm mb-3 flex items-center justify-center gap-1.5">
          <Users className="w-4 h-4" aria-hidden />
          Join thousands finding their gym in Cyprus
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-center text-base">
          <span className="text-text-light">
            <strong className="text-primary-blue font-bold text-lg">{totalGyms}+</strong>{' '}
            Gyms
          </span>
          <span className="text-surface-lighter" aria-hidden>·</span>
          <span className="text-text-light">
            <strong className="text-secondary-green font-bold text-lg">100%</strong>{' '}
            Free to List
          </span>
          <span className="text-surface-lighter" aria-hidden>·</span>
          <span className="text-text-light">
            <strong className="text-primary-purple font-bold text-lg">{formattedAverageRating}+</strong>{' '}
            Rating
          </span>
          {cityCount > 0 && (
            <>
              <span className="text-surface-lighter" aria-hidden>·</span>
              <span className="text-text-light">
                <strong className="text-text-white font-bold text-lg">{cityCount}</strong>{' '}
                Cities
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
