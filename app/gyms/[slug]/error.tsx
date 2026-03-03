'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';

export default function GymPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-text-white mb-2">Something went wrong</h1>
        <p className="text-text-muted mb-6">
          We couldn’t load this gym page. This can happen when the server is briefly unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gyms">Browse all gyms</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
