'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/reset-password`
        : undefined;

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
        <p className="text-text-light mb-4">
          Check your email for a link to reset your password. If you don&apos;t see it, check your spam folder.
        </p>
        <Link href="/login" className="text-primary-blue hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-light mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-2 rounded-lg bg-surface-card border border-surface-lighter text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
          placeholder="you@example.com"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send reset link'}
      </Button>

      <p className="text-sm text-text-muted text-center">
        <Link href="/login" className="text-primary-blue hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
