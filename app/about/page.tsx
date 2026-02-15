import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle2,
  Dumbbell,
  Search,
  Smartphone,
  BookOpen,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { getAllGyms, cities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us | Find the Best Gyms in Cyprus | Gym Near Me Cyprus',
  description:
    'We help you find the right gym in Cyprus. Browse verified gym listings across Limassol, Nicosia, Paphos, Larnaca & more. Free to use—built for the Cyprus fitness community.',
  keywords:
    'about gym directory cyprus, find gym cyprus, gym near me cyprus, fitness directory, gym finder',
};

const valueProps = [
  {
    icon: Dumbbell,
    title: 'Find Your Perfect Gym',
    description:
      'Compare facilities, specialties, and reviews in one place—so you can choose a gym that matches your goals and lifestyle.',
  },
  {
    icon: CheckCircle2,
    title: 'Verified Listings',
    description:
      'We work to keep our directory accurate and up to date. Gyms can claim their listing so you see real info from the source.',
  },
  {
    icon: MapPin,
    title: 'Cyprus-Wide Coverage',
    description:
      'From Limassol to Nicosia, Paphos to Larnaca and beyond—find gyms in every major city and region across Cyprus.',
  },
];

const whatWeOffer = [
  {
    icon: Dumbbell,
    title: 'Comprehensive Gym Directory',
    description:
      'Browse hundreds of verified gyms and fitness centres—from big chains to local studios, CrossFit boxes to yoga and Pilates.',
  },
  {
    icon: Search,
    title: 'Location-Based Search',
    description:
      'Search by city, specialty, or “gym near me.” See maps, addresses, and contact details so you can visit or call before you join.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Friendly Experience',
    description:
      'Use our directory on any device. Find opening hours, photos, and directions whether you’re at home or out and about.',
  },
  {
    icon: BookOpen,
    title: 'Useful Fitness Resources',
    description:
      'Learn about different gym types, specialties, and how to choose the right gym for your fitness journey.',
  },
];

export default async function AboutPage() {
  const allGyms = await getAllGyms();
  const totalGyms = allGyms.length;
  const totalCities = cities.length;

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'About Us', href: '/about' }]} />

        {/* Hero / Mission */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
            Helping You Find the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
              Right Gym in Cyprus
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto mb-4">
            We&apos;re dedicated to making it easy for everyone in Cyprus to discover quality gyms and fitness centres—so you can train where it fits you best.
          </p>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Our directory brings together hundreds of gyms across all major cities. Whether you&apos;re looking for strength training, CrossFit, yoga, Pilates, or a general fitness centre, we help you compare options, read reviews, and find trusted facilities near you.
          </p>
        </section>

        {/* Value props - 3 columns */}
        <section className="mb-16" aria-labelledby="why-use-heading">
          <h2 id="why-use-heading" className="sr-only">
            Why use our directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-surface-card rounded-card p-6 text-center border border-gray-800 hover:border-primary-blue/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-blue/20 text-primary-blue mb-4">
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-text-white mb-2">{item.title}</h3>
                  <p className="text-text-light">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats strip */}
        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-6 mb-16 text-center">
          <p className="text-text-muted text-sm mb-2">Real-time directory • Updated regularly</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-text-white">{totalGyms}+</div>
              <div className="text-text-light">Gym Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-white">{totalCities}</div>
              <div className="text-text-light">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-white">Free</div>
              <div className="text-text-light">To Browse & Compare</div>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <section className="mb-16" aria-labelledby="what-we-offer-heading">
          <h2 id="what-we-offer-heading" className="text-3xl font-bold text-text-white mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeOffer.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 bg-surface-card rounded-card p-6 border border-gray-800"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-purple/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-purple" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-white mb-2">{item.title}</h3>
                    <p className="text-text-light">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-16" aria-labelledby="commitment-heading">
          <div className="bg-surface-card rounded-card p-8 md:p-10 border border-gray-800">
            <h2 id="commitment-heading" className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
              <Heart className="w-7 h-7 text-primary-blue" aria-hidden />
              Our Commitment to You
            </h2>
            <p className="text-text-light mb-4">
              We&apos;re committed to keeping our directory accurate, useful, and comprehensive. We continuously add new gyms, update details, and let gym owners claim their listings so you get the most current information.
            </p>
            <p className="text-text-light">
              Whether you&apos;re new to Cyprus, moving cities, or simply looking for a better gym—we&apos;re here to help you find the right place to train. No sign-up required to browse; just search, compare, and visit.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-2xl font-bold text-text-white mb-4">
            Ready to Find Your Gym?
          </h2>
          <p className="text-text-light mb-8 max-w-xl mx-auto">
            Browse our directory by city or specialty and start comparing gyms in your area today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/cities" className="inline-flex items-center gap-2">
                Browse All Cities
                <ArrowRight className="w-5 h-5" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/add-gym">Add Your Gym Free</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
