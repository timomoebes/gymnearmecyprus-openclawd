'use client';

import React from 'react';

interface HeroTrustBarProps {
  totalGyms: number;
  formattedAverageRating: string;
}

export function HeroTrustBar({ totalGyms, formattedAverageRating }: HeroTrustBarProps) {
  return (
    <div className="border-y border-surface-lighter bg-background-dark-gray/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm">
          <span className="text-text-light">
            <strong className="text-primary-blue font-semibold">{totalGyms}+</strong>{' '}
            Gyms Listed
          </span>
          <span className="text-surface-lighter" aria-hidden>·</span>
          <span className="text-text-light">
            <strong className="text-secondary-green font-semibold">100%</strong>{' '}
            Free to List
          </span>
          <span className="text-surface-lighter" aria-hidden>·</span>
          <span className="text-text-light">
            <strong className="text-primary-purple font-semibold">{formattedAverageRating}+</strong>{' '}
            Average Rating
          </span>
        </div>
      </div>
    </div>
  );
}
