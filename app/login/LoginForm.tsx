'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }

    // Full page redirect so the next request (e.g. /admin/claims) sends the new session cookie
    window.location.href = redirectTo;
  };

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
          autoComplete="current-password"
          className="w-full px-4 py-2 rounded-lg bg-surface-card border border-surface-lighter text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-sm text-text-muted text-center">
        Don&apos;t have an account?{' '}
        <Link
          href={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="text-primary-blue hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
