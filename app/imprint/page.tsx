import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const metadata = {
  title: 'Imprint | GymNearMe Cyprus',
  description: 'Imprint and legal information for GymNearMe Cyprus. Operator details, responsible for content, and disclaimer.',
  keywords: 'imprint, legal notice, gym directory cyprus',
};

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Imprint', href: '/imprint' }]} />

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-text-white mb-2">Imprint</h1>
          <p className="text-text-muted text-sm">Last updated: 2026-02-15</p>
        </header>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-text-light">
          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">
              Information according to § 5 TMG
            </h2>
            <p>
              <strong>GymNearMe Cyprus</strong>
              <br />
              Timo Möbes
              <br />
              Freelancer / Technical Consultant
            </p>
            <p className="mt-3">
              <strong>Address:</strong>
              <br />
              Evagorou 21
              <br />
              Emba, Cyprus
              <br />
              8250
            </p>
            <p className="mt-3">
              <strong>Contact:</strong>
              <br />
              Email:{' '}
              <a href="mailto:info@gymnearme.cy" className="text-primary-blue hover:underline">
                info@gymnearme.cy
              </a>
              <br />
              Website:{' '}
              <a
                href="https://gymnearme.cy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-blue hover:underline"
              >
                gymnearme.cy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">
              Responsible for content
            </h2>
            <p>
              Responsible for the content of this website according to § 55 Abs. 2 RStV:
            </p>
            <p className="mt-3">
              <strong>Timo Möbes</strong>
              <br />
              Evagorou 21
              <br />
              Emba, Cyprus
              <br />
              8250
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">Dispute resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR), which
              you can access at{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-blue hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p className="mt-3">
              We are not willing or obliged to participate in dispute resolution proceedings before
              a consumer arbitration board.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">Disclaimer</h2>

            <h3 className="text-lg font-semibold text-text-white mt-6 mb-2">
              Liability for content
            </h3>
            <p>
              As a service provider, we are responsible for our own content on these pages according
              to general law. However, we are not obliged to monitor third-party information
              transmitted or stored on our website or to investigate circumstances that indicate
              illegal activity.
            </p>
            <p className="mt-3">
              Obligations to remove or block the use of information under general law remain
              unaffected. However, liability in this regard is only possible from the point in
              time at which a concrete infringement of the law becomes known. Upon becoming aware
              of such violations, we will remove this content immediately.
            </p>

            <h3 className="text-lg font-semibold text-text-white mt-6 mb-2">
              Liability for links
            </h3>
            <p>
              Our offer contains links to external websites of third parties, on whose contents we
              have no influence. Therefore, we cannot assume any liability for these external
              contents. The respective provider or operator of the pages is always responsible for
              the contents of the linked pages. The linked pages were checked for possible legal
              violations at the time of linking. Illegal contents were not recognizable at the time
              of linking.
            </p>
            <p className="mt-3">
              However, permanent monitoring of the content of the linked pages is not reasonable
              without concrete evidence of a violation of the law. Upon becoming aware of
              violations, we will remove such links immediately.
            </p>

            <h3 className="text-lg font-semibold text-text-white mt-6 mb-2">Copyright</h3>
            <p>
              The content and works created by the site operators on these pages are subject to
              copyright law. Duplication, processing, distribution, and any form of
              commercialization of such material beyond the scope of the copyright law shall
              require the prior written consent of its respective author or creator.
            </p>
            <p className="mt-3">
              Downloads and copies of this site are only permitted for private, non-commercial use.
              Insofar as the content on this site was not created by the operator, the copyrights
              of third parties are respected. In particular, third-party content is identified as
              such. Should you nevertheless become aware of a copyright infringement, please
              inform us accordingly. Upon becoming aware of violations, we will remove such
              content immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-white mb-3">Contact</h2>
            <p>
              For questions regarding this imprint or legal matters, please contact us at{' '}
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
          <Link
            href="/terms"
            className="text-text-muted hover:text-primary-blue transition-colors text-sm"
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
