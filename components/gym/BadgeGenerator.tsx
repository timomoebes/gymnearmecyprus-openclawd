'use client';

import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import {
  getBadgeTrackingUrl,
  getBadgeHtml,
  type BadgeStyle,
  type BadgeSize,
  type BadgeTheme,
} from '@/lib/utils/badge-generator';

const COPY_UI = {
  chooseStyle: 'Choose Style',
  minimalLink: 'Minimal Link',
  card: 'Card',
  button: 'Button',
  size: 'Size',
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  theme: 'Theme',
  dark: 'Dark',
  light: 'Light',
  brand: 'Brand Color',
  preview: 'Preview',
  copyHtml: 'Copy HTML Code',
  copyLink: 'Copy Direct Link',
  tip: 'Use the direct link in your Google Business Profile.',
  copied: 'Copied!',
} as const;

interface BadgeGeneratorProps {
  slug: string;
  gymName: string;
  rating: number;
}

export function BadgeGenerator({ slug, gymName, rating }: BadgeGeneratorProps) {
  const [style, setStyle] = useState<BadgeStyle>('minimal');
  const [size, setSize] = useState<BadgeSize>('medium');
  const [theme, setTheme] = useState<BadgeTheme>('dark');
  const [copySuccess, setCopySuccess] = useState<'html' | 'link' | null>(null);

  const clearCopySuccess = useCallback(() => {
    const t = setTimeout(() => setCopySuccess(null), 2000);
    return () => clearTimeout(t);
  }, []);

  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const trackingUrl = getBadgeTrackingUrl(slug, style, baseUrl);
  const html = getBadgeHtml({
    style,
    slug,
    gymName,
    rating,
    size: style === 'card' ? size : undefined,
    theme: style !== 'minimal' ? theme : undefined,
    baseUrl,
  });

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopySuccess('html');
      clearCopySuccess();
    } catch {
      setCopySuccess(null);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopySuccess('link');
      clearCopySuccess();
    } catch {
      setCopySuccess(null);
    }
  };

  return (
    <div className="rounded-card border border-surface-lighter bg-surface-card p-6 space-y-6">
      <h2 className="text-xl font-bold text-text-white">Badge Generator</h2>

      <div>
        <label className="block text-text-white font-semibold mb-2">
          {COPY_UI.chooseStyle}
        </label>
        <div className="flex flex-wrap gap-3">
          {(['minimal', 'card', 'button'] as const).map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="badge-style"
                checked={style === s}
                onChange={() => setStyle(s)}
                className="text-primary-blue focus:ring-primary-blue"
              />
              <span className="text-text-light">
                {s === 'minimal'
                  ? COPY_UI.minimalLink
                  : s === 'card'
                    ? COPY_UI.card
                    : COPY_UI.button}
              </span>
            </label>
          ))}
        </div>
      </div>

      {style === 'card' && (
        <div>
          <label className="block text-text-white font-semibold mb-2">
            {COPY_UI.size}
          </label>
          <div className="flex flex-wrap gap-3">
            {(['small', 'medium', 'large'] as const).map((sz) => (
              <label
                key={sz}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="badge-size"
                  checked={size === sz}
                  onChange={() => setSize(sz)}
                  className="text-primary-blue focus:ring-primary-blue"
                />
                <span className="text-text-light">
                  {sz === 'small'
                    ? COPY_UI.small
                    : sz === 'medium'
                      ? COPY_UI.medium
                      : COPY_UI.large}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {(style === 'card' || style === 'button') && (
        <div>
          <label className="block text-text-white font-semibold mb-2">
            {COPY_UI.theme}
          </label>
          <div className="flex flex-wrap gap-3">
            {(['dark', 'light', 'brand'] as const).map((th) => (
              <label
                key={th}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="badge-theme"
                  checked={theme === th}
                  onChange={() => setTheme(th)}
                  className="text-primary-blue focus:ring-primary-blue"
                />
                <span className="text-text-light">
                  {th === 'dark'
                    ? COPY_UI.dark
                    : th === 'light'
                      ? COPY_UI.light
                      : COPY_UI.brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-text-white font-semibold mb-2">
          {COPY_UI.preview}
        </label>
        <div className="rounded-lg border border-surface-lighter bg-background-dark/50 p-6 min-h-[120px] flex items-center justify-center">
          {style === 'minimal' && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-blue hover:underline"
            >
              Check us on GymNearMe Cyprus
            </a>
          )}
          {style === 'card' && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl border border-surface-lighter p-4 text-center text-text-white bg-surface-lighter/30 hover:bg-surface-lighter/50 transition-colors"
              style={{
                minWidth: size === 'small' ? 100 : size === 'medium' ? 150 : 200,
              }}
            >
              <div className="font-bold text-sm mb-1">GymNearMe Cyprus</div>
              <div className="font-semibold text-sm mb-1">{gymName}</div>
              <div className="text-sm mb-2">
                {'★'.repeat(Math.min(5, Math.floor(rating)))}
                {'☆'.repeat(5 - Math.min(5, Math.floor(rating)))} ({rating.toFixed(1)})
              </div>
              <div className="text-xs opacity-90">Tap to View</div>
            </a>
          )}
          {style === 'button' && (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-blue text-white hover:opacity-90 text-sm font-medium"
            >
              🏋️ View on GymNearMe Cyprus
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyHtml}
          className="gap-2"
        >
          {copySuccess === 'html' ? (
            <Check className="w-4 h-4 text-secondary-green" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copySuccess === 'html' ? COPY_UI.copied : COPY_UI.copyHtml}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2"
        >
          {copySuccess === 'link' ? (
            <Check className="w-4 h-4 text-secondary-green" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copySuccess === 'link' ? COPY_UI.copied : COPY_UI.copyLink}
        </Button>
      </div>

      <p className="text-text-muted text-sm">💡 {COPY_UI.tip}</p>
    </div>
  );
}
