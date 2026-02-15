import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const metadata = {
  title: 'Terms of Service | GymNearMe Cyprus',
  description: 'Terms of service for GymNearMe Cyprus. Rules for using our gym directory, listing or claiming gyms, and advertising.',
  keywords: 'terms of service, gym directory cyprus, terms and conditions',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms' }]} />

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-text-white mb-2">Terms of Service</h1>
          <p className="text-text-muted text-sm">Last updated: 2026-02-15</p>
        </header>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-text-light">
          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">1. Agreement to terms</h2>
            <p>
              By accessing or using the website and services of <strong>GymNearMe Cyprus</strong> (“we,” “us,” or “our”),
              you agree to be bound by these Terms of Service (“Terms”). If you do not agree to these Terms,
              please do not use our website or services. These Terms apply to all users, including visitors
              browsing the directory, gym owners who list or claim gyms, advertisers, and anyone who signs up
              for an account or otherwise interacts with our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">2. Services offered</h2>
            <p>GymNearMe Cyprus provides a gym and fitness directory for Cyprus, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Directory</strong> — Browse gyms and fitness centers by city, specialty, and other
                criteria; view details, locations, and contact information.
              </li>
              <li>
                <strong>List your gym</strong> — Submit and manage gym listings (name, address, hours,
                amenities, photos, description) via our “Add gym” and owner dashboard flows.
              </li>
              <li>
                <strong>Claim a listing</strong> — Request verification and management rights for gym
                listings that represent your business.
              </li>
              <li>
                <strong>Owner dashboard</strong> — Account-based access to manage your gym listings,
                subject to eligibility and our approval processes.
              </li>
              <li>
                <strong>Advertising and featured listings</strong> — Paid options to promote your gym
                or business on our site, as described on our Pricing and Advertise With Us pages.
              </li>
              <li>
                <strong>Guides and content</strong> — Fitness guides and other informational content
                for users.
              </li>
            </ul>
            <p className="mt-3">
              Specific features, pricing, and availability may change. Paid services (e.g. featured
              listings, advertising) are subject to the terms presented at the time of purchase and
              any separate agreements we may enter with you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">3. Accounts, listings, and payment</h2>
            <p>
              <strong>Accounts:</strong> Where we offer accounts (e.g. owner dashboard), you must provide
              accurate information and keep your login details secure. You are responsible for all
              activity under your account.
            </p>
            <p className="mt-3">
              <strong>Listings and claims:</strong> By submitting a gym listing or claim request, you
              represent that you have the right to provide that information and that it is accurate
              and not misleading. We may reject, edit, or remove listings or claims at our discretion.
            </p>
            <p className="mt-3">
              <strong>Payment:</strong> Any fees for advertising, featured listings, or other paid
              services are due as specified at the time of purchase. Payment terms (methods, timing,
              refunds) will be communicated in the checkout or agreement flow. Unless stated otherwise,
              fees are quoted in the currency indicated and may be subject to applicable taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">4. User responsibilities</h2>
            <p>To use our services properly, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide accurate information about yourself, your business, and your gym listings.</li>
              <li>Use the site only for lawful purposes and in accordance with these Terms and
                applicable laws.</li>
              <li>Not impersonate any person or entity or misrepresent your affiliation with a gym
                or business.</li>
              <li>Not upload or transmit harmful code, spam, or content that infringes others’ rights.</li>
              <li>Not attempt to gain unauthorized access to our systems, other users’ accounts, or
                data.</li>
              <li>Respect intellectual property and not use our content (text, graphics, logos,
                layout) without our permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">5. Intellectual property</h2>
            <p>
              <strong>Our content:</strong> All content on this website that we create—including text,
              graphics, logos, and the design and structure of the site—is the property of GymNearMe
              Cyprus or its licensors and is protected by copyright and other intellectual property laws.
            </p>
            <p className="mt-3">
              <strong>Your content:</strong> You retain ownership of the information, images, and other
              content you submit (e.g. gym details, photos). By submitting content, you grant us a
              non-exclusive, royalty-free licence to use, display, and distribute it in connection with
              operating the directory and our services. You are responsible for ensuring you have the
              rights to grant this licence (e.g. you own the photos or have permission to use them).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">6. Limitation of liability</h2>
            <p>
              <strong>Service limitations:</strong> We strive to keep the directory accurate and useful,
              but we do not guarantee the completeness, accuracy, or availability of any listing or
              feature. Listings are provided by users and third parties; we do not verify every detail.
              Use of the site and any decisions based on it are at your own risk.
            </p>
            <p className="mt-3">
              <strong>Liability cap:</strong> To the maximum extent permitted by law, our total
              liability for any claims arising from or related to your use of our website or services
              shall not exceed the amount you paid us (if any) in the 12 months preceding the claim,
              or €100 if you have not paid us.
            </p>
            <p className="mt-3">
              <strong>Exclusions:</strong> We are not liable for any indirect, incidental, special,
              consequential, or punitive damages (including loss of profits, data, or business
              opportunities), even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">7. Third-party services</h2>
            <p>
              Our website may use or link to third-party services (e.g. hosting, authentication,
              databases, payment providers, maps, captcha). Your use of those services may be subject
              to their own terms and privacy policies. We are not responsible for the availability,
              functionality, or content of third-party services, and changes by those providers may
              affect how our site works.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">8. Prohibited uses</h2>
            <p>You agree not to use our services:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>For any illegal purpose or in violation of any applicable laws or regulations.</li>
              <li>To infringe upon the intellectual property or other rights of others.</li>
              <li>To transmit harmful code, viruses, or malicious software.</li>
              <li>To impersonate any person or entity or misrepresent your affiliation.</li>
              <li>To interfere with or disrupt our services or systems.</li>
              <li>To scrape, harvest, or automate access to our site in a way that violates our
                policies or places undue load on our systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">9. Modifications to services and terms</h2>
            <p>
              We may modify, suspend, or discontinue any part of our website or services at any time,
              with or without notice. We are not liable to you or any third party for any such change.
              We may also update these Terms from time to time; the “Last updated” date at the top will
              be revised when we do. Continued use of the site after changes constitutes acceptance of
              the updated Terms where permitted by law. If you do not agree, you must stop using our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">10. Termination</h2>
            <p>
              We may suspend or terminate your access to the website or your account (e.g. owner
              dashboard) at any time, without prior notice, if we believe you have breached these
              Terms or engaged in conduct that is harmful to us or other users.
            </p>
            <p className="mt-3">
              You may stop using our services at any time. Provisions that by their nature should
              survive termination (including intellectual property, limitation of liability, governing
              law, and dispute resolution) will remain in effect after termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">11. Dispute resolution and governing law</h2>
            <p>
              <strong>Governing law:</strong> These Terms shall be governed by and construed in
              accordance with the laws of Cyprus, without regard to its conflict of law provisions.
            </p>
            <p className="mt-3">
              <strong>Disputes:</strong> Any disputes arising from or related to these Terms or our
              services shall first be addressed through good-faith negotiation. If we cannot resolve
              a dispute amicably, you agree to submit to the exclusive jurisdiction of the courts of
              Cyprus.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">12. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the
              remaining provisions shall continue in full force and effect. The invalid provision
              shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">13. Entire agreement</h2>
            <p>
              These Terms, together with our{' '}
              <Link href="/privacy" className="text-primary-blue hover:underline">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and GymNearMe Cyprus regarding your use of
              our website and services and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">14. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:info@gymnearme.cy" className="text-primary-blue hover:underline">
                info@gymnearme.cy
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
            href="/privacy"
            className="text-text-muted hover:text-primary-blue transition-colors text-sm"
          >
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
