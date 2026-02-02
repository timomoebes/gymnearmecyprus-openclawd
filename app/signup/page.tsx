import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SignupForm } from './SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Sign up', href: '/signup' }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-text-white mb-2">Create an account</h1>
          <p className="text-text-light mb-6">
            Sign up to claim your gym and manage your listing.
          </p>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}
