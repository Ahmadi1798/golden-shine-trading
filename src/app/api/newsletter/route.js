import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { DEFAULT_TENANT_SLUG, getTenantBySlug } from '../../../lib/content';

const hasDatabaseUrl = Boolean(globalThis.process?.env?.DATABASE_URL);

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const tenant = body?.tenant || DEFAULT_TENANT_SLUG;

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!hasDatabaseUrl) {
      return NextResponse.json({
        message: 'Thank you for subscribing!',
        note: 'Newsletter storage is not available (no database configured).',
      });
    }

    const tenantRecord = await getTenantBySlug(tenant);
    if (!tenantRecord) {
      return NextResponse.json({ error: 'Tenant not found.' }, { status: 404 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { tenantId_email: { tenantId: tenantRecord.id, email } },
    });

    if (existing) {
      return NextResponse.json({ message: 'You\'re already subscribed!' });
    }

    await prisma.newsletterSubscriber.create({
      data: { tenantId: tenantRecord.id, email },
    });

    return NextResponse.json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.', details: String(error) },
      { status: 500 }
    );
  }
}
