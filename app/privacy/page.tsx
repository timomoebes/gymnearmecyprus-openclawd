import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy | Gym Near Me Cyprus',
  description: 'Privacy policy for Gym Near Me Cyprus. How we collect, use, and protect your data when you use our gym directory and list or claim gyms.',
  keywords: 'privacy policy, gym directory cyprus, data protection',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy' }]} />

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-text-white mb-2">Privacy Policy</h1>
          <p className="text-text-muted text-sm">Last updated: 2026-02-15</p>
        </header>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-text-light">
          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">1. Who we are</h2>
            <p>
              This website is operated by <strong>Gym Near Me Cyprus</strong> (the data controller).
              For privacy-related requests you can reach us at{' '}
              <a href="mailto:gymnearmecyprus@gmail.com" className="text-primary-blue hover:underline">
                gymnearmecyprus@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">2. What data we collect</h2>
            <p>We may collect and process the following:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Contact and enquiry data</strong> — Name, email, phone, and any message you
                send when adding a gym, claiming a gym listing, contacting us, or using our contact
                or advertise forms.
              </li>
              <li>
                <strong>Account data</strong> — Email address and password (stored securely) when
                you sign up or log in to the owner dashboard, and any profile or gym management
                information you provide.
              </li>
              <li>
                <strong>Gym listing data</strong> — Information you submit about your gym (name,
                address, opening hours, amenities, photos, description, etc.) when listing or
                updating a gym on our directory.
              </li>
              <li>
                <strong>Usage data</strong> — Technical data such as IP address, browser type,
                device type, and pages visited, if we use analytics or similar tools.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">3. How we use your data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Run and display the gym directory (including listings you submit or manage).</li>
              <li>Respond to your enquiries and manage gym claims, listings, and advertising
                requests.</li>
              <li>Manage your account and access to the owner dashboard.</li>
              <li>Improve our website and services and comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We process your data on the basis of your <strong>consent</strong> (e.g. when you
              sign up or submit a form), or where necessary for the <strong>performance of a
              contract</strong> or our <strong>legitimate interests</strong> (e.g. operating the
              directory and improving our services), in line with applicable data protection law
              (including the GDPR where it applies).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">4. Cookies and similar technologies</h2>
            <p>
              We may use cookies and similar technologies for essential operation of the site (e.g.
              keeping you logged in), for analytics, and for third-party services such as security
              (e.g. captcha). You can control cookies through your browser settings. Blocking
              certain cookies may affect how the site or embedded tools work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">5. Third parties</h2>
            <p>
              We use trusted third-party services that may process your data on our behalf,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Vercel</strong> — Hosting and (optionally) analytics. Their privacy policy
                applies to infrastructure and any analytics they provide.
              </li>
              <li>
                <strong>Supabase</strong> — Authentication and database storage for accounts and gym
                listings. Their privacy policy applies to their processing.
              </li>
              <li>
                <strong>hCaptcha</strong> — Bot protection on signup and forms. Their privacy policy
                applies when you complete a captcha.
              </li>
              <li>
                <strong>Payment providers</strong> — If you purchase featured listings or
                advertising, payment data is handled by our payment provider; their policy applies
                to that processing.
              </li>
            </ul>
            <p className="mt-3">
              We choose providers that respect privacy and, where required, use agreements (e.g.
              data processing agreements) to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">6. How long we keep your data</h2>
            <p>
              We keep your data only as long as needed for the purposes above (e.g. running the
              directory, responding to you, managing your account, or complying with legal
              retention requirements). You can ask us to delete your data earlier where there is no
              overriding obligation to retain it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">7. Your rights</h2>
            <p>
              Depending on where you live (e.g. in the EU/EEA or UK), you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification</strong> — Ask us to correct inaccurate or incomplete data.</li>
              <li><strong>Erasure</strong> — Ask us to delete your personal data in certain
                circumstances.</li>
              <li><strong>Portability</strong> — Receive your data in a structured, machine-readable
                format where applicable.</li>
              <li><strong>Object or restrict</strong> — Object to certain processing or request
                restriction in certain cases.</li>
              <li><strong>Withdraw consent</strong> — Where we rely on consent, you can withdraw it
                at any time.</li>
              <li><strong>Complain</strong> — Lodge a complaint with a supervisory authority (e.g.
                your local data protection authority).</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a href="mailto:gymnearmecyprus@gmail.com" className="text-primary-blue hover:underline">
                gymnearmecyprus@gmail.com
              </a>
              . We will respond within the time limits required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">8. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your data against
              unauthorised access, loss, or misuse. No system is completely secure; we encourage
              you to use strong passwords and secure channels when sharing sensitive information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">9. International transfers</h2>
            <p>
              Your data may be processed in countries outside your residence (e.g. where our hosting
              or SaaS providers operate). Where we transfer data from the EU/EEA or UK, we ensure
              appropriate safeguards (e.g. standard contractual clauses or adequacy decisions) are
              in place as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">10. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. The “Last updated” date at the
              top will be revised when we do. We encourage you to review this page periodically.
              Continued use of the site after changes constitutes acceptance of the updated policy
              where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">11. Contact</h2>
            <p>
              For any questions about this privacy policy or your personal data, please contact us
              at{' '}
              <a href="mailto:gymnearmecyprus@gmail.com" className="text-primary-blue hover:underline">
                gymnearmecyprus@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-card flex flex-wrap gap-4">
          <Link
            href="/"
            className="text-primary-blue hover:underline text-sm font-medium"
          >
            Back to home
          </Link>
          <Link
            href="/terms"
            className="text-text-muted hover:text-primary-blue transition-colors text-sm"
          >
            Terms
          </Link>
          <Link
            href="/imprint"
            className="text-text-muted hover:text-primary-blue transition-colors text-sm"
          >
            Imprint
          </Link>
        </div>
      </div>
    </div>
  );
}
