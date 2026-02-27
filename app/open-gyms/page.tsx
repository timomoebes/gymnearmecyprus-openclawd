import React from 'react';
import type { Metadata } from 'next';
import { Clock } from 'lucide-react';
import { getAllGyms } from '@/lib/data';
import { isGymOpenNow } from '@/lib/utils/opening-hours';
import { has24_7Access } from '@/lib/utils/search';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { OpenGymsPageClient } from './OpenGymsPageClient';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/utils/schema';

// Enable revalidation so page updates frequently (since "open now" status changes)
export const revalidate = 300; // Revalidate every 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  const allGyms = await getAllGyms();
  const openGymsCount = allGyms.filter(gym => isGymOpenNow(gym.openingHours)).length;

  const title = `Open Gyms Today in Cyprus | Gyms Open Now Near Me`;
  const description = `Find open gyms near me in Cyprus right now. ${openGymsCount}+ gyms are open today. See real-time gym status, hours, and location. 24/7 gyms and open gyms available.`;
  const keywords = 'open gyms today, open gyms near me, gyms open now, 24 hour gym cyprus, gym hours cyprus, open gyms cyprus';

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.gymnearme.cy' },
    { name: 'Open Gyms Today', url: 'https://www.gymnearme.cy/open-gyms' },
  ]);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: 'https://www.gymnearme.cy/open-gyms',
      siteName: 'Gym Near Me Cyprus',
      type: 'website',
      images: [
        {
          url: 'https://www.gymnearme.cy/logo.png',
          width: 1200,
          height: 630,
          alt: 'Open Gyms Today in Cyprus',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.gymnearme.cy/logo.png'],
    },
    alternates: {
      canonical: 'https://www.gymnearme.cy/open-gyms',
    },
    other: {
      'article:published_time': new Date().toISOString(),
    },
  };
}

export default async function OpenGymsPage() {
  const allGyms = await getAllGyms();

  // Filter gyms that are open now or 24/7
  const openGyms = allGyms.filter(gym => isGymOpenNow(gym.openingHours));

  // Sort by rating (most relevant open gyms first)
  const sortedOpenGyms = openGyms.sort((a, b) => b.rating - a.rating);

  const openGymsCount = sortedOpenGyms.length;
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
  const count24_7 = openGyms.filter(g => has24_7Access(g)).length;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Open Gyms Today', href: '/open-gyms', active: true },
  ];

  return (
    <>
      <div className="min-h-screen bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-primary-blue" />
              <h1 className="text-4xl md:text-5xl font-bold text-text-white">
                Open Gyms Today
              </h1>
            </div>

            <p className="text-xl text-text-light max-w-3xl mb-6">
              {openGymsCount} gyms are open right now in Cyprus. Find a gym near you that&apos;s accepting members.
            </p>

            {/* Real-time status card */}
            <div className="bg-surface-card border-l-4 border-primary-blue rounded-card p-6 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-text-white mb-2">Real-Time Status</h3>
                  <p className="text-text-light text-sm">
                    This page shows {openGymsCount}+ gyms that are currently open in Cyprus for {timeOfDay} workouts.
                    Hours are updated regularly. Filter by city or specialty below to find your perfect gym.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-surface-card rounded-card p-5 border border-surface-lighter">
                <div className="text-3xl font-bold text-primary-blue">{openGymsCount}</div>
                <p className="text-text-muted text-sm mt-1">Gyms Open Now</p>
              </div>
              <div className="bg-surface-card rounded-card p-5 border border-surface-lighter">
                <div className="text-3xl font-bold text-text-white">{allGyms.length}</div>
                <p className="text-text-muted text-sm mt-1">Total Gyms in Cyprus</p>
              </div>
              <div className="bg-surface-card rounded-card p-5 border border-surface-lighter">
                <div className="text-3xl font-bold text-accent-gold">{count24_7}</div>
                <p className="text-text-muted text-sm mt-1">24/7 Open Now</p>
              </div>
            </div>

            {/* Gym list with filters (client) */}
            {sortedOpenGyms.length > 0 ? (
              <OpenGymsPageClient initialGyms={sortedOpenGyms} />
            ) : (
              <div className="bg-surface-card rounded-card p-12 text-center">
                <Clock className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-white mb-2">No Gyms Open Right Now</h3>
                <p className="text-text-light mb-6">
                  Check back later or browse all {allGyms.length} gyms by city to see their hours.
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary-blue text-text-white rounded-lg hover:bg-primary-blue/90 font-medium transition"
                >
                  Browse All Gyms
                </a>
              </div>
            )}

            {/* FAQ */}
            <section className="mt-16 py-12 bg-background-dark-gray rounded-card">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-surface-card rounded-card p-6">
                    <h3 className="text-xl font-bold text-text-white mb-3">How often is this page updated?</h3>
                    <p className="text-text-light text-sm">
                      This page updates every 5 minutes to reflect the most current gym status. Gym hours are sourced from verified directory data.
                    </p>
                  </div>
                  <div className="bg-surface-card rounded-card p-6">
                    <h3 className="text-xl font-bold text-text-white mb-3">Can I filter by specialty?</h3>
                    <p className="text-text-light text-sm">
                      Yes. Use the specialty filter above to show only open gyms for yoga, CrossFit, boxing, and more. You can also filter by city to find open gyms near you.
                    </p>
                  </div>
                  <div className="bg-surface-card rounded-card p-6">
                    <h3 className="text-xl font-bold text-text-white mb-3">What about 24/7 gyms?</h3>
                    <p className="text-text-light text-sm">
                      24/7 gyms are included on this page. Use the sort dropdown and choose &quot;24/7 Access only&quot; to see only 24-hour gyms.
                    </p>
                  </div>
                  <div className="bg-surface-card rounded-card p-6">
                    <h3 className="text-xl font-bold text-text-white mb-3">Do I need to book in advance?</h3>
                    <p className="text-text-light text-sm">
                      Most gyms accept walk-ins during posted hours. Click a gym card to see contact details and confirm availability.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
