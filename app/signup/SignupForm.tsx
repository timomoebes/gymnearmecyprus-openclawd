'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }

    // If session exists (e.g. email confirmation disabled), redirect to intended page
    if (data.session) {
      router.push(redirectTo);
      router.refresh();
      return;
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
        <p className="text-text-light">
          Check your email for the confirmation link, then sign in.
        </p>
        <Link
          href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="text-primary-blue hover:underline mt-2 inline-block"
        >
          Go to sign in
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

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-light mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={6}
          className="w-full px-4 py-2 rounded-lg bg-surface-card border border-surface-lighter text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Creating account…' : 'Sign up'}
      </Button>

      <p className="text-sm text-text-muted text-center">
        Already have an account?{' '}
        <Link
          href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="text-primary-blue hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
