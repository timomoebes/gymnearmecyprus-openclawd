import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Building2 } from 'lucide-react';
import type { Gym } from '@/lib/types';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';

interface GymOwnerBannerProps {
  gym: Gym;
  currentUserId: string | null;
}

/**
 * Presentational banner: Your gym / Claim this gym / Claimed by other.
 * Auth is resolved on the server (gym page passes currentUserId); no client-side Supabase.
 */
export function GymOwnerBanner({ gym, currentUserId }: GymOwnerBannerProps) {
  const isOwner = Boolean(currentUserId && gym.ownerId === currentUserId);
  const isUnclaimed = !gym.ownerId;

  if (isOwner) {
    return (
      <div className="mb-6 rounded-card border border-primary-blue/30 bg-primary-blue/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="rating" className="inline-flex items-center gap-1.5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4" />
              Your gym
            </Badge>
            <p className="text-sm text-text-light">
              You can update details, add photos, and upgrade to featured from your dashboard.
            </p>
          </div>
          <Button variant="primary" size="sm" asChild>
            <Link href="/dashboard">Manage listing</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isUnclaimed) {
    return (
      <div className="mb-6 rounded-card border border-primary-blue/30 bg-primary-blue/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary-blue flex-shrink-0" />
            <div>
              <p className="text-text-white font-medium">Is this your gym?</p>
              <p className="text-sm text-text-muted">
                Claim this listing to manage your info and get more visibility.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/claim/${gym.slug}`}>Claim this gym</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-card border border-surface-lighter bg-surface-card/50 p-3">
      <p className="text-sm text-text-muted">This listing is claimed.</p>
    </div>
  );
}
