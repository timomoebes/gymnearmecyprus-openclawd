'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/shared/Button';

const CONTACT_EMAIL = 'info@gymnearme.cy';

const SUBJECT_OPTIONS = [
  { value: '', label: 'Select a topic' },
  { value: 'Add a gym', label: 'Add a Gym' },
  { value: 'General question', label: 'General Question' },
  { value: 'Website feedback', label: 'Website Feedback' },
  { value: 'Business inquiry', label: 'Business Inquiry' },
  { value: 'Report incorrect info', label: 'Report Incorrect Info' },
  { value: 'Other', label: 'Other' },
];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subj = subject || 'Contact from Gym Near Me Cyprus';
    const body = [
      message.trim(),
      '',
      '---',
      `Sent by: ${name.trim() || '(not provided)'}`,
      `Email: ${email.trim() || '(not provided)'}`,
    ].join('\n');
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text-light mb-1">
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-surface-card border border-gray-700 text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          placeholder="Your name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text-light mb-1">
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-surface-card border border-gray-700 text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-text-light mb-1">
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-surface-card border border-gray-700 text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt.value || 'default'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text-light mb-1">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-surface-card border border-gray-700 text-text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-y"
          placeholder="Your message..."
          required
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        <span className="inline-flex items-center gap-2">
          <Send className="w-5 h-5" aria-hidden />
          Send Message
        </span>
      </Button>
    </form>
  );
}
