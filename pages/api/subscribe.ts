import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import WelcomeEmail from '../../emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL || 'https://formal-tern-925.eu-west-1.convex.site';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, site = 'go2japan', locale = 'en' } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Store in Convex and Resend in parallel
  const [convexResult, resendResult] = await Promise.allSettled([
    // Convex — central subscriber store
    fetch(`${CONVEX_SITE_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, site, locale }),
    }).then(async (r) => {
      if (!r.ok) throw new Error(`Convex ${r.status}: ${await r.text()}`);
      return r.json();
    }),
    // Resend — email marketing
    resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    }),
  ]);

  if (convexResult.status === 'rejected') {
    console.error('Convex subscribe error:', convexResult.reason);
  }
  if (resendResult.status === 'rejected') {
    console.error('Resend contact creation error:', resendResult.reason);
  }

  // Fail only if both failed
  if (convexResult.status === 'rejected' && resendResult.status === 'rejected') {
    return res.status(500).json({ error: 'Failed to subscribe' });
  }

  // Send welcome email (non-blocking — don't fail subscription if email fails)
  try {
    await resend.emails.send({
      from: 'Go2Japan <hello@go2-japan.com>',
      to: email,
      subject: 'Welcome to Go2Japan! 🇯🇵',
      react: WelcomeEmail(),
    });
  } catch (error: any) {
    console.error('Welcome email send error (contact was still created):', error);
  }

  return res.status(200).json({ success: true });
}
