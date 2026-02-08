'use client';

import React from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface HomeTrustSectionProps {
  totalGyms: number;
  formattedAverageRating: string;
}

export function HomeTrustSection({ totalGyms, formattedAverageRating }: HomeTrustSectionProps) {
  const { t } = useLocale();

  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-blue mb-2">{totalGyms}+</div>
            <div className="text-text-light">{t('trust.gymsListed')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-secondary-green mb-2">100%</div>
            <div className="text-text-light">{t('trust.freeToList')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-purple mb-2">{formattedAverageRating}+</div>
            <div className="text-text-light">{t('trust.averageRating')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
