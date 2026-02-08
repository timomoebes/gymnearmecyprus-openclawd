'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export function HomeGuideSection() {
  const { t } = useLocale();

  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            {t('guide.heading')}
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            {t('guide.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface-card rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-white mb-6">{t('guide.tipsTitle')}</h3>
            <ul className="space-y-4">
              {(
                [
                  ['guide.tip1Title', 'guide.tip1Text'],
                  ['guide.tip2Title', 'guide.tip2Text'],
                  ['guide.tip3Title', 'guide.tip3Text'],
                  ['guide.tip4Title', 'guide.tip4Text'],
                  ['guide.tip5Title', 'guide.tip5Text'],
                  ['guide.tip6Title', 'guide.tip6Text'],
                ] as const
              ).map(([titleKey, textKey]) => (
                <li key={titleKey} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-text-white">{t(titleKey)}</strong>
                    <p className="text-text-light text-sm mt-1">{t(textKey)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-card rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-white mb-6">{t('guide.typesTitle')}</h3>
            <div className="space-y-6">
              {(
                [
                  ['guide.type1Title', 'guide.type1Text'],
                  ['guide.type2Title', 'guide.type2Text'],
                  ['guide.type3Title', 'guide.type3Text'],
                  ['guide.type4Title', 'guide.type4Text'],
                  ['guide.type5Title', 'guide.type5Text'],
                  ['guide.type6Title', 'guide.type6Text'],
                ] as const
              ).map(([titleKey, textKey]) => (
                <div key={titleKey}>
                  <h4 className="text-lg font-semibold text-text-white mb-2">{t(titleKey)}</h4>
                  <p className="text-text-light text-sm">{t(textKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-8 border border-primary-blue/30">
          <h3 className="text-2xl font-bold text-text-white mb-4">💡 {t('guide.proTipTitle')}</h3>
          <p className="text-text-light text-lg">{t('guide.proTipText')}</p>
        </div>
      </div>
    </section>
  );
}
