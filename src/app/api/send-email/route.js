import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is missing. Simulating email send.");
      return NextResponse.json({ success: true, mock: true, message: 'Mock email sent successfully.' });
    }

    const resend = new Resend(resendApiKey);

    const data = await resend.emails.send({
      from: 'Home Decor Supplier <onboarding@resend.dev>',
      to,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
