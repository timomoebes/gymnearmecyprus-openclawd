'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';
import { verifyCaptchaForAuth } from '@/lib/actions/verify-captcha';

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? '';
const DISABLE_HCAPTCHA = ['true', '1', 'yes', 'on'].includes(
  (process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA ?? '').toLowerCase().trim()
);
const CAPTCHA_ENABLED = Boolean(HCAPTCHA_SITEKEY && !DISABLE_HCAPTCHA);

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
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const needCaptcha = CAPTCHA_ENABLED && !isLocalhost;

    if (needCaptcha && !hcaptchaToken) {
      setErrorMessage('Please complete the captcha first.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    if (needCaptcha) {
      const verified = await verifyCaptchaForAuth(hcaptchaToken);
      if (!verified.ok) {
        setStatus('error');
        setErrorMessage(verified.error);
        captchaRef.current?.resetCaptcha();
        setHcaptchaToken(null);
        return;
      }
    }

    const supabase = createClient();
    const captchaOptions =
      needCaptcha && hcaptchaToken ? { captchaToken: hcaptchaToken } : undefined;

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        ...(captchaOptions ? { options: captchaOptions } : {}),
      });
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        if (CAPTCHA_ENABLED) {
          captchaRef.current?.resetCaptcha();
          setHcaptchaToken(null);
        }
        return;
      }
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        ...(captchaOptions ?? {}),
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/claim/${gymSlug}` : undefined,
      },
    });
    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
      if (CAPTCHA_ENABLED) {
        captchaRef.current?.resetCaptcha();
        setHcaptchaToken(null);
      }
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
        {CAPTCHA_ENABLED && (
          <div>
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              onVerify={setHcaptchaToken}
              onExpire={() => setHcaptchaToken(null)}
              theme="dark"
            />
          </div>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm" role="alert">
            {errorMessage}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'loading' || (CAPTCHA_ENABLED && !hcaptchaToken)}
          >
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
