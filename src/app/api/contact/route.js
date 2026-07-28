/* global process */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP not configured');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Full name, email, subject, and message are required.' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    const recipient = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"${fullName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipient,
      subject: `[Contact] ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${fullName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          ${phone ? `<tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone}</td></tr>` : ''}
          <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    if (error.message === 'SMTP not configured') {
      return NextResponse.json(
        { error: 'Mail server not configured. Please set SMTP env vars.' },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
