'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitClaimRequest } from '@/lib/actions/claim';
import { Button } from '@/components/shared/Button';

interface ClaimFormProps {
  gymId: string;
  gymName: string;
  gymSlug: string;
}

export function ClaimForm({ gymId, gymName, gymSlug }: ClaimFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await submitClaimRequest(gymId);

    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
        <p className="text-text-light mb-4">
          Your claim request has been submitted. We will verify your identity and get back to you
          within 24–48 hours.
        </p>
        <Link href="/dashboard">
          <Button variant="primary">Go to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-card rounded-card p-6 border border-primary-blue/30">
      <p className="text-text-light mb-6">
        By submitting, you confirm that you are the owner or authorized to manage <strong className="text-text-white">{gymName}</strong>.
        We will verify and approve your claim.
      </p>

      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="flex gap-4">
        <Button type="submit" variant="primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Submit claim request'}
        </Button>
        <Link href={`/gyms/${gymSlug}`}>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
