'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Specialty } from '@/lib/types';

interface SpecialtyCardGridProps {
  specialties: Specialty[];
  specialtyGymCounts: Record<string, number>;
}

const SPECIALTY_EMOJIS: Record<string, string> = {
  'fitness-gym': '💪',
  'crossfit': '🔥',
  'personal-training': '👨‍🏫',
  'martial-arts-mma': '🥊',
  'boxing': '👊',
  'yoga-pilates': '🧘',
  'dance-group-fitness': '💃',
  'strength-training': '🏋️',
  'swimming-aquatics': '🏊',
};

export const SpecialtyCardGrid: React.FC<SpecialtyCardGridProps> = ({
  specialties,
  specialtyGymCounts,
}) => {
  const { t } = useLocale();
  const visibleSpecialties = specialties.filter(
    (s) => !['hotel-gym', 'women-only'].includes(s.slug)
  );

  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            {t('specialties.heading')}
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            {t('specialties.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
          {visibleSpecialties.map((specialty) => {
            const emoji = SPECIALTY_EMOJIS[specialty.id] || '💪';

            return (
              <Link
                key={specialty.id}
                href={`/specialties/${specialty.slug}`}
                className="group relative bg-surface-card rounded-card p-6 text-center hover:bg-surface-lighter transition-all duration-200 hover:shadow-card-hover overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-purple/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary-purple/20 transition-colors" />

                <div className="relative z-10">
                  <div className="text-4xl mb-3">{emoji}</div>
                  <h3 className="text-lg font-bold text-text-white mb-2 group-hover:text-primary-blue transition-colors">
                    {specialty.name}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {specialtyGymCounts[specialty.id] || 0}{' '}
                    {(specialtyGymCounts[specialty.id] || 0) === 1 ? t('specialties.gym') : t('specialties.gyms')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Specialties Button */}
        <div className="text-center">
          <Link href="/specialties">
            <Button variant="outline" size="lg">
              {t('specialties.viewAllSpecialties')}
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
