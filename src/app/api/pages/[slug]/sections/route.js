import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  getPageWithContent,
  upsertPageSections,
} from '../../../../../lib/content';
import { getAdminSessionFromRequest } from '../../../../../lib/admin-auth';

export async function GET(request, { params }) {
  const resolvedParams = await Promise.resolve(params);
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const page = await getPageWithContent(resolvedParams?.slug, tenant);

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ sections: page.sections });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load sections', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const body = await request.json();
    const sections = Array.isArray(body.sections) ? body.sections : [];

    const updated = await upsertPageSections(tenant, resolvedParams?.slug, sections);

    if (!updated) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ sections: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update sections', details: String(error) },
      { status: 500 }
    );
  }
}
