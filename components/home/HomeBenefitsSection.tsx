'use client';

import React from 'react';
import { Clock, CheckCircle, MapPin, Star } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export function HomeBenefitsSection() {
  const { t } = useLocale();

  const benefits = [
    {
      icon: MapPin,
      iconBg: 'bg-primary-blue/20',
      iconColor: 'text-primary-blue',
      titleKey: 'benefits.benefit1Title' as const,
      textKey: 'benefits.benefit1Text' as const,
    },
    {
      icon: Star,
      iconBg: 'bg-secondary-green/20',
      iconColor: 'text-secondary-green',
      titleKey: 'benefits.benefit2Title' as const,
      textKey: 'benefits.benefit2Text' as const,
    },
    {
      icon: Clock,
      iconBg: 'bg-primary-purple/20',
      iconColor: 'text-primary-purple',
      titleKey: 'benefits.benefit3Title' as const,
      textKey: 'benefits.benefit3Text' as const,
    },
  ] as const;

  return (
    <section className="py-16 bg-background-dark-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            {t('benefits.heading')}
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            {t('benefits.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, iconBg, iconColor, titleKey, textKey }) => (
            <div key={titleKey} className="bg-surface-card rounded-card p-6">
              <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-text-white mb-3">{t(titleKey)}</h3>
              <p className="text-text-light">{t(textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
