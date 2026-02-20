'use client';

import React from 'react';
import { FAQ_DATA } from '@/lib/data/faq';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 bg-background-dark-gray" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_DATA.map(({ question, answer }, index) => (
            <div key={index} className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">{question}</h3>
              <p className="text-text-light">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
