'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { createClient } from '@/lib/supabase/browser';
import { Button } from '@/components/shared/Button';
import { verifyCaptchaForAuth } from '@/lib/actions/verify-captcha';

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? '';
const DISABLE_HCAPTCHA = ['true', '1', 'yes', 'on'].includes(
  (process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA ?? '').toLowerCase().trim()
);
const CAPTCHA_ENABLED_INIT = Boolean(HCAPTCHA_SITEKEY && !DISABLE_HCAPTCHA);

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaEnabled, setCaptchaEnabled] = useState(CAPTCHA_ENABLED_INIT);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      setCaptchaEnabled(false);
    }
  }, []);

  const CAPTCHA_ENABLED = captchaEnabled;

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      ...(needCaptcha && hcaptchaToken ? { options: { captchaToken: hcaptchaToken } } : {}),
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

      {!CAPTCHA_ENABLED && (
        <p className="text-text-muted text-xs" aria-hidden="true">
          Captcha disabled for development.
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm" role="alert">
          {errorMessage}
        </p>
      )}

      <p className="text-sm text-text-muted text-right">
        <Link href="/forgot-password" className="text-primary-blue hover:underline">
          Forgot password?
        </Link>
      </p>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={status === 'loading' || (CAPTCHA_ENABLED && !hcaptchaToken)}
      >
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
