import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { getGymBySlug } from '@/lib/data';
import { ClaimForm } from './ClaimForm';
import { ClaimPageAuth } from './ClaimPageAuth';
import { getCurrentUserId } from '@/lib/supabase/server';

interface ClaimPageProps {
  params: { slug: string };
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  const gym = await getGymBySlug(decodedSlug);

  if (!gym) {
    notFound();
  }

  const currentUserId = await getCurrentUserId();

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { label: 'Gyms', href: '/gyms' },
            { label: gym.name, href: `/gyms/${gym.slug}` },
            { label: 'Claim', href: `/claim/${gym.slug}` },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-white mb-2">Claim this gym</h1>
          <p className="text-text-light mb-6">
            You are claiming: <strong className="text-text-white">{gym.name}</strong>
          </p>

          {!currentUserId ? (
            <ClaimPageAuth gymSlug={gym.slug} />
          ) : gym.ownerId === currentUserId ? (
            <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
              <p className="text-text-light mb-4">You already own this gym.</p>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg font-semibold px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-purple text-white hover:opacity-90"
              >
                Go to dashboard
              </Link>
            </div>
          ) : gym.ownerId ? (
            <div className="bg-surface-card rounded-card p-6 border border-surface-lighter">
              <p className="text-text-muted">This gym is already claimed by another owner.</p>
              <Link href={`/gyms/${gym.slug}`} className="text-primary-blue hover:underline mt-2 inline-block">
                Back to listing
              </Link>
            </div>
          ) : (
            <ClaimForm gymId={gym.id} gymName={gym.name} gymSlug={gym.slug} />
          )}
        </div>
      </div>
    </div>
  );
}
