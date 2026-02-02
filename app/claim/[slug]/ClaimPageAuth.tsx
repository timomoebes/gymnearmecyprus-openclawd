'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';

interface ClaimPageAuthProps {
  gymSlug: string;
}

/**
 * Inline sign-in / sign-up on the claim page. User never leaves; after auth, page refreshes and shows ClaimForm.
 */
export function ClaimPageAuth({ gymSlug }: ClaimPageAuthProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const supabase = createClient();

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        return;
      }
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/claim/${gymSlug}` : undefined,
      },
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }
    if (data.session) {
      router.refresh();
      return;
    }
    setSuccessMessage('We sent a confirmation link to your email. Check your inbox and spam folder, then sign in above.');
    setStatus('idle');
  };

  return (
    <div className="bg-surface-card rounded-card p-6 border border-primary-blue/30">
      <p className="text-text-light mb-4">
        Sign in to submit a claim request. We will verify your identity and get back to you
        within 24–48 hours.
      </p>

      {successMessage && (
        <p className="text-secondary-green text-sm mb-4" role="status">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="claim-auth-email" className="block text-sm font-medium text-text-light mb-1">
            Email
          </label>
          <input
            id="claim-auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-2 rounded-lg bg-surface-lighter border border-surface-lighter text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="claim-auth-password" className="block text-sm font-medium text-text-light mb-1">
            Password
          </label>
          <input
            id="claim-auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            minLength={mode === 'signup' ? 6 : undefined}
            className="w-full px-4 py-2 rounded-lg bg-surface-lighter border border-surface-lighter text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
        {status === 'error' && (
          <p className="text-red-400 text-sm" role="alert">
            {errorMessage}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant="primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </Button>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setErrorMessage('');
            }}
            className="text-primary-blue hover:underline text-sm font-medium"
          >
            {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
