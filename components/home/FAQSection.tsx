'use client';

import React from 'react';

const FAQ_ITEMS = [
  {
    q: 'How do I find a gym near me in Cyprus?',
    a: 'Use our search bar to find gyms near me by entering your city or area. You can also browse by city using our city directory, or filter by specialty to find fitness centers that match your interests. Our location-based search helps you find nearby gyms and gyms close to me quickly and easily.',
  },
  {
    q: 'Are there 24 hour gyms near me in Cyprus?',
    a: 'Yes! Many gyms in Cyprus offer 24/7 access. Look for the "24/7 Access" amenity when browsing gym listings. You can also use our filter to specifically search for 24 hour gyms and 24 7 gyms near me. These facilities are perfect for early morning workouts, late-night training, or anyone with a flexible schedule.',
  },
  {
    q: "What's the difference between a fitness center and a health club?",
    a: 'Fitness centers typically focus on exercise equipment and workout facilities, while health clubs often offer additional amenities like swimming pools, saunas, group classes, and sometimes spa services. Both are great options when searching for a gym near me - choose based on your specific needs and preferences.',
  },
  {
    q: 'How do I compare gyms near me?',
    a: 'Our directory makes it easy to compare gyms near me. Each listing shows ratings, reviews, amenities, specialties, opening hours, and location. You can filter by rating, specialty, or amenities to narrow down your search. Read reviews from real members to get insights into each fitness center or health club.',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 bg-background-dark-gray" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Frequently Asked Questions About Finding Gyms Near Me
          </h2>
        </div>

        <div className="space-y-6">
          {FAQ_ITEMS.map(({ q, a }, index) => (
            <div key={index} className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">{q}</h3>
              <p className="text-text-light">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
