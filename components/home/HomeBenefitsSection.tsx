'use client';

import React from 'react';
import { Clock, CheckCircle, MapPin, Star, Users } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export function HomeBenefitsSection() {
  const { t } = useLocale();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary-blue" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.findGymsTitle')}</h3>
            <p className="text-text-light">{t('benefits.findGymsText')}</p>
          </div>

          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-secondary-green/20 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-secondary-green" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.compareTitle')}</h3>
            <p className="text-text-light">{t('benefits.compareText')}</p>
          </div>

          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-primary-purple/20 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary-purple" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.saveTimeTitle')}</h3>
            <p className="text-text-light">{t('benefits.saveTimeText')}</p>
          </div>

          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary-blue" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.discoverTitle')}</h3>
            <p className="text-text-light">{t('benefits.discoverText')}</p>
          </div>

          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-secondary-green/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-secondary-green" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.access24Title')}</h3>
            <p className="text-text-light">{t('benefits.access24Text')}</p>
          </div>

          <div className="bg-surface-card rounded-card p-6">
            <div className="w-12 h-12 bg-primary-purple/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary-purple" />
            </div>
            <h3 className="text-xl font-bold text-text-white mb-3">{t('benefits.accurateTitle')}</h3>
            <p className="text-text-light">{t('benefits.accurateText')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
