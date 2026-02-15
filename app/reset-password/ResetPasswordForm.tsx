'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'no-session'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recoveryChecked, setRecoveryChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setRecoveryChecked(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setRecoveryChecked(true);
    });

    const t = setTimeout(() => {
      setRecoveryChecked(true);
    }, 1500);

    return () => {
      clearTimeout(t);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!recoveryChecked) return;
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) setStatus('no-session');
    });
  }, [recoveryChecked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setStatus('error');
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      return;
    }

    setStatus('success');
    router.push('/dashboard');
    router.refresh();
  };

  if (status === 'no-session' && recoveryChecked) {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-amber-500/30">
        <p className="text-text-light mb-4">
          This page is for setting a new password after clicking the link in your email. The link may have expired, or you may need to open it in the same browser where you requested the reset.
        </p>
        <p className="text-text-muted text-sm mb-4">
          Request a new reset link from the sign-in page.
        </p>
        <Link href="/forgot-password">
          <Button variant="primary">Request reset link</Button>
        </Link>
        <p className="mt-4 text-sm">
          <Link href="/login" className="text-primary-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
        <p className="text-text-light mb-4">Your password has been updated.</p>
        <Link href="/dashboard" className="text-primary-blue hover:underline">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-light mb-1">
          New password
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-light mb-1">
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {status === 'loading' ? 'Updating…' : 'Update password'}
      </Button>

      <p className="text-sm text-text-muted text-center">
        <Link href="/login" className="text-primary-blue hover:underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
