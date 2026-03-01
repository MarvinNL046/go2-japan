import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import WelcomeEmail from '../../emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });
  } catch (error: any) {
    console.error('Resend contact creation error:', error);
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
