'use server';

import { verifyHcaptchaToken } from '@/lib/hcaptcha';

export type VerifyCaptchaResult = { ok: true } | { ok: false; error: string };

function isCaptchaDisabledOnServer(): boolean {
  if (process.env.NODE_ENV === 'development') return true;
  const v = (process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA ?? '').toLowerCase().trim();
  if (['true', '1', 'yes', 'on'].includes(v)) return true;
  const skip = (process.env.HCAPTCHA_SKIP_VERIFY_IN_DEV ?? '').toLowerCase().trim();
  return ['true', '1', 'yes', 'on'].includes(skip);
}

/**
 * Verify hCaptcha token only. Use before client-side auth (login/signup)
 * so the client only proceeds after server confirms captcha.
 * When captcha is disabled (NODE_ENV=development, kill switch, or skip-in-dev), returns success without calling hCaptcha.
 */
export async function verifyCaptchaForAuth(token: string | null): Promise<VerifyCaptchaResult> {
  if (isCaptchaDisabledOnServer()) {
    return { ok: true };
  }
  const result = await verifyHcaptchaToken(token);
  return result.success ? { ok: true } : { ok: false, error: result.error };
}
