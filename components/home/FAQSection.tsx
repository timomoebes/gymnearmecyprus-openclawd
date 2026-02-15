'use client';

import React from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

const FAQ_KEYS = [
  { q: 'faq.q1' as const, a: 'faq.a1' as const },
  { q: 'faq.q2' as const, a: 'faq.a2' as const },
  { q: 'faq.q3' as const, a: 'faq.a3' as const },
  { q: 'faq.q4' as const, a: 'faq.a4' as const },
];

export const FAQSection: React.FC = () => {
  const { t } = useLocale();

  return (
    <section id="faq" className="py-16 bg-background-dark-gray" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            {t('faq.heading')}
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_KEYS.map(({ q, a }) => (
            <div key={q} className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">{t(q)}</h3>
              <p className="text-text-light">{t(a)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
