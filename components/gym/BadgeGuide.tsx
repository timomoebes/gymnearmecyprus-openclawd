'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle, ExternalLink } from 'lucide-react';

const COPY = {
  title: 'How to promote your gym (4 steps)',
  step1Title: 'Step 1: Generate a badge',
  step1Body: 'Choose a style below (Minimal Link recommended for Google Business Profile).',
  step2Title: 'Step 2: Copy the code',
  step2Body: "Click \"Copy HTML Code\" to copy to clipboard, or \"Copy Direct Link\" for your GBP website field.",
  step3Title: 'Step 3: Add to your Google Business Profile',
  step3Sub1: 'Go to google.com/business',
  step3Sub2: 'Click your gym listing',
  step3Sub3: 'Find "Website" or "More" section',
  step3Sub4: 'Add the link (or paste the full HTML if embedding)',
  step3Sub5: 'Save',
  step4Title: 'Step 4: (Optional) Share on social media',
  step4Body: 'Post the badge on Instagram/Facebook for extra visibility and drive more traffic!',
  proTip: 'Pro Tip: The more places you link to your profile, the higher you rank in search results.',
  needHelp: 'Need help?',
  openGbp: 'Open Google Business Profile',
  screenshotCaption: 'Screenshot: Add widget in GBP',
};

const GBP_URL = 'https://google.com/business';
const HELP_URL = '/contact';

export function BadgeGuide() {
  const [expanded, setExpanded] = useState<number | null>(1);

  const steps = [
    {
      id: 1,
      title: COPY.step1Title,
      body: COPY.step1Body,
      screenshot: true,
    },
    {
      id: 2,
      title: COPY.step2Title,
      body: COPY.step2Body,
      screenshot: true,
    },
    {
      id: 3,
      title: COPY.step3Title,
      body: null,
      subSteps: [
        COPY.step3Sub1,
        COPY.step3Sub2,
        COPY.step3Sub3,
        COPY.step3Sub4,
        COPY.step3Sub5,
      ],
      screenshot: true,
      link: GBP_URL,
      linkLabel: COPY.openGbp,
    },
    {
      id: 4,
      title: COPY.step4Title,
      body: COPY.step4Body,
      screenshot: false,
    },
  ];

  return (
    <div className="rounded-card border border-surface-lighter bg-surface-card p-6">
      <h2 className="text-xl font-bold text-text-white mb-4 flex items-center gap-2">
        <span aria-hidden>📋</span>
        {COPY.title}
      </h2>
      <div className="flex flex-col gap-2">
        {steps.map((step) => {
          const isOpen = expanded === step.id;
          return (
            <div
              key={step.id}
              className="rounded-lg border border-surface-lighter overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : step.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left bg-surface-lighter/50 hover:bg-surface-lighter/70 transition-colors"
              >
                {isOpen ? (
                  <ChevronDown className="w-5 h-5 text-primary-blue flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
                )}
                <span className="font-semibold text-text-white">{step.title}</span>
              </button>
              {isOpen && (
                <div className="px-4 py-3 pt-0 space-y-3">
                  {step.body && (
                    <p className="text-text-light text-sm">{step.body}</p>
                  )}
                  {step.subSteps && (
                    <ol className="list-decimal list-inside text-text-light text-sm space-y-1">
                      {step.subSteps.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ol>
                  )}
                  {step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary-blue hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {step.linkLabel}
                    </a>
                  )}
                  {step.screenshot && (
                    <div className="mt-2 rounded border border-surface-lighter bg-background-dark/50 h-24 flex items-center justify-center">
                      <span className="text-text-muted text-xs">
                        {COPY.screenshotCaption}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-text-light text-sm border-t border-surface-lighter pt-4">
        💡 {COPY.proTip}
      </p>
      <a
        href={HELP_URL}
        className="mt-3 inline-flex items-center gap-2 text-sm text-primary-blue hover:underline"
      >
        <HelpCircle className="w-4 h-4" />
        {COPY.needHelp}
      </a>
    </div>
  );
}
