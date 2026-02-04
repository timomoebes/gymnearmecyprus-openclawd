/**
 * Server-side hCaptcha token verification.
 * See https://docs.hcaptcha.com/#verifying-the-user-response-server-side
 */

const SITEVERIFY_URL = 'https://hcaptcha.com/siteverify';

export type HcaptchaVerifyResult =
  | { success: true }
  | { success: false; error: string };

function isCaptchaDisabled(): boolean {
  const v = (process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA ?? '').toLowerCase().trim();
  if (['true', '1', 'yes', 'on'].includes(v)) return true;
  const skip = (process.env.HCAPTCHA_SKIP_VERIFY_IN_DEV ?? '').toLowerCase().trim();
  return ['true', '1', 'yes', 'on'].includes(skip);
}

/**
 * Verify an hCaptcha response token. Call this in a server action before
 * performing the protected operation (e.g. claim request, signup).
 *
 * Verification is skipped when:
 * - NEXT_PUBLIC_DISABLE_HCAPTCHA is set (recommended: use this to turn off captcha entirely), or
 * - HCAPTCHA_SKIP_VERIFY_IN_DEV is set (for localhost), or
 * - NODE_ENV === 'development'.
 */
export async function verifyHcaptchaToken(token: string | null): Promise<HcaptchaVerifyResult> {
  if (isCaptchaDisabled()) {
    return { success: true };
  }

  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret?.trim()) {
    return { success: false, error: 'hCaptcha is not configured.' };
  }

  if (!token?.trim()) {
    return { success: false, error: 'Please complete the captcha.' };
  }

  if (process.env.NODE_ENV === 'development') {
    return { success: true };
  }

  try {
    const form = new URLSearchParams();
    form.set('secret', secret);
    form.set('response', token);

    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (data.success === true) {
      return { success: true };
    }

    const errors = data['error-codes'] ?? ['unknown'];
    return { success: false, error: `Captcha verification failed: ${errors.join(', ')}` };
  } catch (e) {
    console.error('hCaptcha verify error:', e);
    return { success: false, error: 'Captcha verification failed. Please try again.' };
  }
}
