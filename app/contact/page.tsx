import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowRight, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { ContactForm } from '@/components/contact/ContactForm';

const CONTACT_EMAIL = 'info@gymnearme.cy';

export const metadata: Metadata = {
  title: 'Contact Us | Gym Near Me Cyprus',
  description:
    'Get in touch with Gym Near Me Cyprus. Questions, add your gym, report an error, or send feedback. We reply within 24 hours.',
  keywords: 'contact gym directory cyprus, add gym cyprus, gym feedback, report error',
};

const faqs = [
  {
    question: 'How do I add my gym to the directory?',
    answer:
      'Use our free "Add Your Gym" form from the main menu or the link below. You can also email us at info@gymnearme.cy with your gym details (name, address, phone, hours, and services). We\'ll review and add it within 2–3 business days.',
  },
  {
    question: 'Is the directory free to use?',
    answer:
      'Yes. Browsing and searching gyms is completely free—no registration required. Gym owners can list and claim their gym for free; we also offer optional featured listings for extra visibility.',
  },
  {
    question: 'How often is the directory updated?',
    answer:
      'We continuously add new gyms and update existing listings. Claimed gyms are managed by their owners, and we regularly verify information to keep the directory accurate.',
  },
  {
    question: 'Can I report incorrect or outdated information?',
    answer:
      'Absolutely. If you see wrong address, hours, or other details, email us at info@gymnearme.cy with the gym name and what needs changing. We\'ll update the listing promptly.',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have questions, want to add a gym, or have feedback—we&apos;re here to help.
          </p>
        </section>

        {/* Ways to reach us - Email */}
        <section className="mb-12" aria-labelledby="reach-heading">
          <h2 id="reach-heading" className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
            <Mail className="w-7 h-7 text-primary-blue" aria-hidden />
            Ways to Reach Us
          </h2>
          <div className="bg-surface-card rounded-card p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-text-white mb-2">Email us</h3>
            <p className="text-text-light mb-4">
              For questions, gym submissions, or feedback, send us an email. We&apos;ll get back to you within 24 hours.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary-blue hover:text-primary-purple font-medium break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>

        {/* Quick contact form */}
        <section className="mb-12" aria-labelledby="form-heading">
          <h2 id="form-heading" className="text-2xl font-bold text-text-white mb-6">
            Quick Contact Form
          </h2>
          <div className="bg-surface-card rounded-card p-6 border border-gray-800">
            <ContactForm />
            <p className="text-text-muted text-sm mt-4">
              This form opens your email client with the message pre-filled. For the fastest response, you can also email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-blue hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-primary-blue" aria-hidden />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-surface-card rounded-card p-6 border border-gray-800"
              >
                <h3 className="text-lg font-bold text-text-white mb-2">{faq.question}</h3>
                <p className="text-text-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA - Help us grow */}
        <section className="text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-xl font-bold text-text-white mb-3">
            Help Us Grow the Directory
          </h2>
          <p className="text-text-light mb-6 max-w-xl mx-auto">
            Know a gym that isn&apos;t listed? Suggest it so others can find it too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Gym%20Submission`}
                className="inline-flex items-center gap-2"
              >
                Suggest a Gym
                <ArrowRight className="w-5 h-5" aria-hidden />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/cities">Browse Directory</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
