import { NextResponse } from 'next/server';
import { DEFAULT_TENANT_SLUG, createPage, getPages } from '../../../lib/content';
import { getAdminSessionFromRequest } from '../../../lib/admin-auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const pages = await getPages(tenant);

    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load pages', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tenant = body.tenant || DEFAULT_TENANT_SLUG;

    if (!body.slug || !body.title) {
      return NextResponse.json(
        { error: 'Missing required fields: slug and title' },
        { status: 400 }
      );
    }

    const page = await createPage(tenant, body);

    if (!page) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create page', details: String(error) },
      { status: 500 }
    );
  }
}
