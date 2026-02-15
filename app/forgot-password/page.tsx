import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Login', href: '/login' }, { label: 'Forgot password', href: '/forgot-password' }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-white mb-2">Forgot password</h1>
          <p className="text-text-light mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
