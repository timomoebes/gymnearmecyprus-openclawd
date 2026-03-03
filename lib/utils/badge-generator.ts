/**
 * Badge generator utilities: tracking URL (slug + whitelisted style only) and HTML for Minimal / Card / Button.
 * No owner or internal IDs in public URLs.
 */

export type BadgeStyle = 'minimal' | 'card' | 'button';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeTheme = 'dark' | 'light' | 'brand';

const BADGE_STYLES: BadgeStyle[] = ['minimal', 'card', 'button'];

export function isBadgeStyle(s: string): s is BadgeStyle {
  return BADGE_STYLES.includes(s as BadgeStyle);
}

/**
 * Returns path + query for the badge click redirect (slug and whitelisted style only).
 * For absolute URL, caller must prepend baseUrl (e.g. window.location.origin or NEXT_PUBLIC_APP_URL).
 */
export function getBadgeTrackingUrl(slug: string, style: BadgeStyle, baseUrl = ''): string {
  const safeSlug = encodeURIComponent(slug);
  const safeStyle = isBadgeStyle(style) ? style : 'minimal';
  const path = `/api/analytics/badge-click?gym=${safeSlug}&style=${safeStyle}`;
  return baseUrl ? `${baseUrl.replace(/\/$/, '')}${path}` : path;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}

function starRatingHtml(rating: number): string {
  const full = Math.floor(Math.min(5, Math.max(0, rating)));
  const empty = 5 - full;
  const fullStars = '★'.repeat(full);
  const emptyStars = '☆'.repeat(empty);
  return `${fullStars}${emptyStars}`;
}

export interface BadgeHtmlInput {
  style: BadgeStyle;
  slug: string;
  gymName: string;
  rating: number;
  size?: BadgeSize;
  theme?: BadgeTheme;
  /** Origin for absolute href (e.g. https://gymnearme.cy). Required for embeds on other sites. */
  baseUrl?: string;
}

const CARD_SIZES = {
  small: { width: 100, height: 120 },
  medium: { width: 150, height: 180 },
  large: { width: 200, height: 240 },
};

const THEME_STYLES: Record<BadgeTheme, { bg: string; text: string; border: string }> = {
  dark: { bg: '#1a1a2e', text: '#eaeaea', border: '#2d2d44' },
  light: { bg: '#f5f5f5', text: '#1a1a2e', border: '#ddd' },
  brand: { bg: '#2563eb', text: '#fff', border: '#1d4ed8' },
};

/**
 * Generates HTML for the chosen badge style. Escapes gym name. Uses tracking URL for href.
 */
export function getBadgeHtml(input: BadgeHtmlInput): string {
  const {
    style,
    slug,
    gymName,
    rating,
    size = 'medium',
    theme = 'dark',
    baseUrl = '',
  } = input;
  const safeName = escapeHtml(gymName);
  const href = getBadgeTrackingUrl(slug, style, baseUrl);

  if (style === 'minimal') {
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">Check us on GymNearMe Cyprus</a>`;
  }

  if (style === 'button') {
    const th = THEME_STYLES[theme];
    return [
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 16px;background:${th.bg};color:${th.text};border:1px solid ${th.border};border-radius:8px;text-decoration:none;font-family:sans-serif;font-size:14px;">`,
      '&#127947; View on GymNearMe Cyprus',
      '</a>',
    ].join('');
  }

  if (style === 'card') {
    const dim = CARD_SIZES[size];
    const th = THEME_STYLES[theme];
    const stars = starRatingHtml(rating);
    return [
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:${dim.width}px;min-height:${dim.height}px;background:${th.bg};color:${th.text};border:1px solid ${th.border};border-radius:12px;padding:12px;text-decoration:none;font-family:sans-serif;font-size:12px;box-sizing:border-box;">`,
      '<div style="font-weight:700;margin-bottom:6px;">GymNearMe Cyprus</div>',
      `<div style="font-weight:600;margin-bottom:4px;">${safeName}</div>`,
      `<div style="margin-bottom:6px;">${stars} (${rating.toFixed(1)})</div>`,
      '<div style="font-size:11px;opacity:0.9;">Tap to View</div>',
      '</a>',
    ].join('');
  }

  return getBadgeHtml({ ...input, style: 'minimal' });
}
