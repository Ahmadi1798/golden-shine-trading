import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  getSiteData,
  replaceFooterItems,
} from '../../../lib/content';
import { getAdminSessionFromRequest } from '../../../lib/admin-auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const data = await getSiteData(tenant);
    if (!data) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ footerItems: data.footerItems });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load footer items', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tenant = body.tenant || DEFAULT_TENANT_SLUG;
    const items = Array.isArray(body.items) ? body.items : [];

    const footerItems = await replaceFooterItems(tenant, items);
    if (!footerItems) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ footerItems });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to replace footer items', details: String(error) },
      { status: 500 }
    );
  }
}
