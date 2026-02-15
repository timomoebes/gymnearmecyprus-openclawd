import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ResetPasswordForm } from './ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Reset password', href: '/reset-password' }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-white mb-2">Set new password</h1>
          <p className="text-text-light mb-6">
            Enter your new password below. You got here from the link we sent to your email.
          </p>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
