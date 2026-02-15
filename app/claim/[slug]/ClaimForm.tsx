'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { submitClaimRequest } from '@/lib/actions/claim';
import { Button } from '@/components/shared/Button';
import { createClient } from '@/lib/supabase/browser';

const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY ?? '';
const DISABLE_HCAPTCHA = ['true', '1', 'yes', 'on'].includes(
  (process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA ?? '').toLowerCase().trim()
);
const CAPTCHA_ENABLED = Boolean(HCAPTCHA_SITEKEY && !DISABLE_HCAPTCHA);

interface ClaimFormProps {
  gymId: string;
  gymName: string;
  gymSlug: string;
}

export function ClaimForm({ gymId, gymName, gymSlug }: ClaimFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    createClient()
      .auth.getSession()
      .then(({ data: { session } }) => setHasSession(!!session));
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (CAPTCHA_ENABLED && !hcaptchaToken) {
      setErrorMessage('Please complete the captcha first.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    const result = await submitClaimRequest(gymId, CAPTCHA_ENABLED ? hcaptchaToken : null);

    if (result.ok) {
      setStatus('success');
      setHasSession(true);
      captchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
    } else {
      setStatus('error');
      setErrorMessage(result.error);
      captchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
    }
  };

  if (status === 'success') {
    const dashboardHref = '/dashboard';
    const signInHref = `/login?redirectTo=${encodeURIComponent(dashboardHref)}`;
    const showSignInFallback = hasSession === false;

    return (
      <div className="bg-surface-card rounded-card p-6 border border-secondary-green/30">
        <p className="text-text-light mb-4">
          Your claim request has been submitted. We will verify your identity and get back to you
          within 24–48 hours.
        </p>
        {showSignInFallback ? (
          <>
            <p className="text-text-muted text-sm mb-4">
              Open this page in the same browser where you confirmed your email, or sign in below to reach your dashboard.
            </p>
            <Link href={signInHref}>
              <Button variant="primary">Sign in to go to dashboard</Button>
            </Link>
          </>
        ) : (
          <Link href={dashboardHref}>
            <Button variant="primary">Go to dashboard</Button>
          </Link>
        )}
      </div>
    );
  }

  // Require either: captcha disabled (dev) or sitekey set (production). When disabled, form works without any hCaptcha keys.
  const canShowForm = DISABLE_HCAPTCHA || HCAPTCHA_SITEKEY;
  if (!canShowForm) {
    return (
      <div className="bg-surface-card rounded-card p-6 border border-amber-500/30">
        <p className="text-amber-200 text-sm">
          Captcha is not configured. Set <code className="bg-black/30 px-1 rounded">NEXT_PUBLIC_HCAPTCHA_SITEKEY</code> and <code className="bg-black/30 px-1 rounded">HCAPTCHA_SECRET</code> in your environment to enable claim requests, or set <code className="bg-black/30 px-1 rounded">NEXT_PUBLIC_DISABLE_HCAPTCHA=true</code> for local development.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-card rounded-card p-6 border border-primary-blue/30">
      {DISABLE_HCAPTCHA && (
        <p className="text-amber-200/90 text-sm mb-4" role="status">
          Captcha disabled for development. Do not use in production.
        </p>
      )}
      <p className="text-text-light mb-6">
        By submitting, you confirm that you are the owner or authorized to manage <strong className="text-text-white">{gymName}</strong>.
        We will verify and approve your claim.
      </p>

      {CAPTCHA_ENABLED && (
        <div className="mb-4">
          <HCaptcha
            ref={captchaRef}
            sitekey={HCAPTCHA_SITEKEY}
            onVerify={(token) => setHcaptchaToken(token)}
            onExpire={() => setHcaptchaToken(null)}
            theme="dark"
          />
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading' || (CAPTCHA_ENABLED && !hcaptchaToken)}
        >
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
