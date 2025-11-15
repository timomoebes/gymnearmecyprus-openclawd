import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSpecialtyBySlug, getGymsBySpecialty, specialties } from '@/lib/data';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SpecialtyPageClient } from './SpecialtyPageClient';
import { generateBreadcrumbSchema, generateCollectionPageSchema, generateFAQPageSchema } from '@/lib/utils/schema';
import { CheckCircle } from 'lucide-react';

interface SpecialtyPageProps {
  params: {
    specialty: string;
  };
}

// Enable revalidation so pages update when gym counts change
export const revalidate = 0; // 0 = always revalidate, or use a number for seconds

export async function generateStaticParams() {
  return specialties.map((specialty) => ({
    specialty: specialty.slug,
  }));
}

export async function generateMetadata({ params }: SpecialtyPageProps): Promise<Metadata> {
  const specialty = getSpecialtyBySlug(params.specialty);
  
  if (!specialty) {
    return {
      title: 'Specialty Not Found',
    };
  }

  // Custom metadata for high-value keywords
  const specialtySlug = specialty.slug.toLowerCase();
  // Note: We'll use a placeholder for title since we need async data
  // The actual count will be in the page content
  let title = `Best ${specialty.name} Gyms in Cyprus`;
  let description = specialty.description;
  let keywords = `${specialty.name} gyms cyprus, ${specialty.name} training, ${specialty.name} fitness centers`;

  // Personal Training - Quick Win (210 vol, 13 diff)
  if (specialtySlug === 'personal-training') {
    title = 'Find Personal Trainers in Cyprus | Best Personal Training Gyms | Expert Trainers';
    description = 'Find personal trainers in Cyprus. Discover certified personal trainers in Nicosia, Limassol, and across Cyprus. One-on-one training, customized workout plans, and expert guidance.';
    keywords = 'personal trainer nicosia, personal training cyprus, personal trainers limassol, certified personal trainer, fitness trainer cyprus';
  }
  
  // Swimming - High Volume Quick Win (1,000 + 720 vol, 17 diff)
  if (specialtySlug === 'swimming') {
    title = 'Gyms with Swimming Pools in Cyprus | Find Pools Near Me | Swimming Facilities';
    description = 'Find gyms with swimming pools in Cyprus. Discover swimming pools in Nicosia, pools in Nicosia, and aquatic fitness facilities. Perfect for lap swimming, water aerobics, and low-impact workouts.';
    keywords = 'swimming pool nicosia, pools in nicosia, gyms with pools cyprus, swimming facilities, aquatic fitness, pool access gyms';
  }
  
  // Pilates - Quick Win (210 + 170 vol, 10-14 diff)
  if (specialtySlug === 'pilates') {
    title = 'Find Pilates Classes Near Me in Cyprus | Reformer Pilates Studios | Pilates Near Me';
    description = 'Find pilates near me in Cyprus. Discover reformer pilates studios, pilates classes in Nicosia, and pilates instructors. Compare studios and book your class today.';
    keywords = 'pilates near me, pilates nicosia, reformer pilates near me, pilates reformer nicosia, pilates classes cyprus, pilates studio';
  }
  
  // CrossFit - Quick Win (170 vol, 15 diff)
  if (specialtySlug === 'crossfit') {
    title = 'Best CrossFit Gyms in Cyprus | Find CrossFit Near Me | CrossFit Nicosia';
    description = 'Find CrossFit gyms in Cyprus. Discover CrossFit boxes in Nicosia, Limassol, and across Cyprus. High-intensity functional training, expert coaches, and supportive communities.';
    keywords = 'crossfit nicosia, crossfit cyprus, crossfit gyms, crossfit near me, crossfit boxes, functional fitness';
  }

  return {
    title,
    description,
    keywords,
  };
}

export default async function SpecialtyPage({ params }: SpecialtyPageProps) {
  const specialty = getSpecialtyBySlug(params.specialty);
  
  if (!specialty) {
    notFound();
  }

  const specialtySlug = specialty.slug.toLowerCase();
  const gyms = await getGymsBySpecialty(specialty.name);

  // Generate Schema.org JSON-LD
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://gymnearme.cy' },
    { name: 'Specialties', url: 'https://gymnearme.cy/specialties' },
    { name: specialty.name, url: `https://gymnearme.cy/specialties/${specialty.slug}` },
  ]);

  const collectionSchema = generateCollectionPageSchema(
    `Best ${specialty.name} Gyms in Cyprus`,
    specialty.description,
    gyms.map(gym => ({
      name: gym.name,
      url: `https://gymnearme.cy/gyms/${gym.slug}`,
    }))
  );

  // Specialty-specific FAQs
  const specialtyFaqs = [
    {
      question: `What are the best ${specialty.name} gyms in Cyprus?`,
      answer: `Our directory lists ${gyms.length} top-rated ${specialty.name.toLowerCase()} gyms and facilities in Cyprus. You can browse by city, read reviews, and compare amenities to find the best ${specialty.name.toLowerCase()} training facility near me that matches your fitness goals.`,
    },
    {
      question: `How do I find ${specialty.name.toLowerCase()} training near me?`,
      answer: `Use our directory to search for ${specialty.name.toLowerCase()} gyms by city. Each listing includes location, ratings, reviews, and amenities. Filter by your preferred city to find ${specialty.name.toLowerCase()} facilities close to you.`,
    },
    {
      question: `What should I look for in a ${specialty.name.toLowerCase()} gym?`,
      answer: `When choosing a ${specialty.name.toLowerCase()} gym, consider the quality of equipment, instructor qualifications, class schedules, facility cleanliness, and member reviews. Our directory helps you compare these factors across different ${specialty.name.toLowerCase()} facilities in Cyprus.`,
    },
    {
      question: `Are there ${specialty.name.toLowerCase()} classes available in Cyprus?`,
      answer: `Yes, many ${specialty.name.toLowerCase()} gyms in Cyprus offer group classes, personal training, and specialized programs. Browse our directory to find ${specialty.name.toLowerCase()} facilities that offer the type of training and class schedule that fits your needs.`,
    },
  ];

  const faqSchema = generateFAQPageSchema(specialtyFaqs);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Specialties', href: '/specialties' },
            { label: specialty.name, href: `/specialties/${specialty.slug}` },
          ]}
        />

        {/* Specialty Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {(() => {
              // Assign emojis to specialties (matching homepage)
              const specialtyEmojis: Record<string, string> = {
                'crossfit': '🔥',
                'bodybuilding': '💪',
                'yoga': '🧘',
                'pilates': '🤸',
                'mma': '🥊',
                'boxing': '👊',
                'swimming': '🏊',
                'powerlifting': '🏋️',
                'personal-training': '👨‍🏫',
              };
              const emoji = specialtyEmojis[specialty.id] || '💪';
              return <div className="text-5xl">{emoji}</div>;
            })()}
            <h1 className="text-4xl md:text-5xl font-bold text-text-white">
              {specialtySlug === 'personal-training' ? 'Find Personal Trainers in Cyprus' :
               specialtySlug === 'swimming' ? 'Gyms with Swimming Pools in Cyprus' :
               specialtySlug === 'pilates' ? 'Find Pilates Classes Near Me in Cyprus' :
               specialtySlug === 'crossfit' ? 'Best CrossFit Gyms in Cyprus' :
               `Best ${specialty.name} Gyms in Cyprus`}
            </h1>
          </div>
          <p className="text-xl text-text-light max-w-3xl mb-4">
            {specialty.description}
          </p>
          <div className="text-text-muted">
            <span className="text-lg font-semibold text-text-white">
              {gyms.length} {gyms.length === 1 ? 'Gym' : 'Gyms'} Found
            </span>
          </div>
        </div>

        {/* Keyword-Rich Content Sections */}
        {specialtySlug === 'personal-training' && (
          <section className="mb-12 bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Find Personal Trainers in Nicosia and Across Cyprus</h2>
            <p className="text-text-light mb-6">
              Looking for a personal trainer in Nicosia? Our directory connects you with certified personal trainers across Cyprus. Whether you're in Nicosia, Limassol, Larnaca, or Paphos, find expert trainers who can help you achieve your fitness goals with personalized workout plans and one-on-one guidance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Why Choose Personal Training?
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Customized workout plans tailored to your goals</li>
                  <li>• Expert guidance and proper form instruction</li>
                  <li>• Motivation and accountability</li>
                  <li>• Faster results with professional supervision</li>
                  <li>• Injury prevention through proper technique</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  What to Look For
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Certified and experienced trainers</li>
                  <li>• Specialization in your fitness goals</li>
                  <li>• Flexible scheduling options</li>
                  <li>• Positive reviews and testimonials</li>
                  <li>• Training location convenience</li>
                </ul>
              </div>
            </div>
            <div className="bg-primary-blue/10 rounded-lg p-6 border border-primary-blue/30">
              <p className="text-text-light">
                <strong className="text-text-white">Pro Tip:</strong> When searching for a personal trainer in Nicosia or other cities, look for trainers who specialize in your specific goals - whether that's weight loss, muscle building, athletic performance, or rehabilitation. Many gyms offer personal training services, so check gym listings for trainers with the "Personal Training" amenity.
              </p>
            </div>
          </section>
        )}

        {specialtySlug === 'swimming' && (
          <section className="mb-12 bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Find Swimming Pools in Nicosia and Across Cyprus</h2>
            <p className="text-text-light mb-6">
              Looking for swimming pools in Nicosia? Our directory lists gyms and health clubs with swimming pools across Cyprus. Whether you need a pool for lap swimming, water aerobics, or aquatic fitness, find the perfect facility near you. Many gyms in Nicosia offer pool access as part of their membership.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Benefits of Swimming
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Low-impact full-body workout</li>
                  <li>• Excellent cardiovascular exercise</li>
                  <li>• Ideal for rehabilitation and recovery</li>
                  <li>• Suitable for all fitness levels</li>
                  <li>• Great for cross-training</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Pool Facilities Available
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Olympic-size and standard pools</li>
                  <li>• Indoor and outdoor options</li>
                  <li>• Water aerobics classes</li>
                  <li>• Lap swimming lanes</li>
                  <li>• Family-friendly facilities</li>
                </ul>
              </div>
            </div>
            <div className="bg-primary-blue/10 rounded-lg p-6 border border-primary-blue/30">
              <p className="text-text-light">
                <strong className="text-text-white">Finding Pools in Nicosia:</strong> Many health clubs and fitness centers in Nicosia feature swimming pools. Look for the "Swimming" specialty or check gym amenities for pool access. Some facilities offer pool-only memberships, while others include pool access with full gym membership.
              </p>
            </div>
          </section>
        )}

        {specialtySlug === 'pilates' && (
          <section className="mb-12 bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Find Pilates Near Me - Reformer Pilates Studios in Cyprus</h2>
            <p className="text-text-light mb-6">
              Searching for pilates near me? Discover pilates classes in Nicosia and across Cyprus. Our directory includes mat pilates studios and reformer pilates facilities. Whether you're looking for pilates reformer nicosia or pilates near me, find the perfect studio for your practice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Types of Pilates
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• <strong>Reformer Pilates:</strong> Equipment-based pilates using reformers</li>
                  <li>• <strong>Mat Pilates:</strong> Traditional floor-based pilates</li>
                  <li>• <strong>Classical Pilates:</strong> Traditional Joseph Pilates method</li>
                  <li>• <strong>Contemporary Pilates:</strong> Modern adaptations</li>
                  <li>• <strong>Hot Pilates:</strong> Pilates in heated rooms</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Benefits of Pilates
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Core strength and stability</li>
                  <li>• Improved flexibility and posture</li>
                  <li>• Low-impact exercise option</li>
                  <li>• Mind-body connection</li>
                  <li>• Rehabilitation and injury prevention</li>
                </ul>
              </div>
            </div>
            <div className="bg-primary-blue/10 rounded-lg p-6 border border-primary-blue/30">
              <p className="text-text-light">
                <strong className="text-text-white">Reformer Pilates in Nicosia:</strong> Looking for reformer pilates near me? Many pilates studios in Nicosia offer reformer pilates classes. Reformer pilates uses specialized equipment to provide resistance and support, making it ideal for all fitness levels. Check studio listings for reformer pilates availability.
              </p>
            </div>
          </section>
        )}

        {specialtySlug === 'crossfit' && (
          <section className="mb-12 bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6">Find CrossFit Gyms in Nicosia and Across Cyprus</h2>
            <p className="text-text-light mb-6">
              Looking for CrossFit in Nicosia? Our directory lists CrossFit boxes and functional fitness gyms across Cyprus. Whether you're searching for CrossFit nicosia or CrossFit near me, discover high-intensity functional training facilities with expert coaches and supportive communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  What is CrossFit?
                </h3>
                <p className="text-text-light text-sm mb-3">
                  CrossFit is a high-intensity functional fitness program that combines weightlifting, cardio, and gymnastics. Workouts (WODs) are constantly varied and performed at high intensity.
                </p>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Constantly varied workouts</li>
                  <li>• Functional movements</li>
                  <li>• High-intensity training</li>
                  <li>• Community-driven atmosphere</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary-blue mr-2" />
                  Why Choose CrossFit?
                </h3>
                <ul className="space-y-2 text-text-light text-sm">
                  <li>• Full-body strength and conditioning</li>
                  <li>• Expert coaching and guidance</li>
                  <li>• Supportive community environment</li>
                  <li>• Scalable for all fitness levels</li>
                  <li>• Measurable progress tracking</li>
                </ul>
              </div>
            </div>
            <div className="bg-primary-blue/10 rounded-lg p-6 border border-primary-blue/30">
              <p className="text-text-light">
                <strong className="text-text-white">CrossFit in Nicosia:</strong> CrossFit boxes in Nicosia offer daily WODs (Workout of the Day), open gym access, and specialized programs. Many CrossFit gyms also offer foundations classes for beginners. Look for CrossFit-certified coaches and well-equipped facilities when choosing a box.
              </p>
            </div>
          </section>
        )}

        {/* Client Component for Filtering/Sorting */}
        <SpecialtyPageClient specialty={specialty} initialGyms={gyms} />

        {/* FAQ Section */}
        <section className="mt-16 py-12 bg-background-dark-gray rounded-card">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
                Frequently Asked Questions About {specialty.name} in Cyprus
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-3">What are the best {specialty.name.toLowerCase()} gyms in Cyprus?</h3>
                <p className="text-text-light">
                  Our directory lists {gyms.length} top-rated {specialty.name.toLowerCase()} gyms and facilities in Cyprus. You can browse by city, read reviews, and compare amenities to find the best {specialty.name.toLowerCase()} training facility near me that matches your fitness goals.
                </p>
              </div>
              
              <div className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-3">How do I find {specialty.name.toLowerCase()} training near me?</h3>
                <p className="text-text-light">
                  Use our directory to search for {specialty.name.toLowerCase()} gyms by city. Each listing includes location, ratings, reviews, and amenities. Filter by your preferred city to find {specialty.name.toLowerCase()} facilities close to you.
                </p>
              </div>
              
              <div className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-3">What should I look for in a {specialty.name.toLowerCase()} gym?</h3>
                <p className="text-text-light">
                  When choosing a {specialty.name.toLowerCase()} gym, consider the quality of equipment, instructor qualifications, class schedules, facility cleanliness, and member reviews. Our directory helps you compare these factors across different {specialty.name.toLowerCase()} facilities in Cyprus.
                </p>
              </div>
              
              <div className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-3">Are there {specialty.name.toLowerCase()} classes available in Cyprus?</h3>
                <p className="text-text-light">
                  Yes, many {specialty.name.toLowerCase()} gyms in Cyprus offer group classes, personal training, and specialized programs. Browse our directory to find {specialty.name.toLowerCase()} facilities that offer the type of training and class schedule that fits your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

