import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  getPublicPageWithContent,
  updatePage,
} from '../../../../lib/content';
import { getAdminSessionFromRequest } from '../../../../lib/admin-auth';

export async function GET(request, { params }) {
  const resolvedParams = await Promise.resolve(params);
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;
  const previewRequested = searchParams.get('preview') === '1';
  const canPreviewDraft = previewRequested && Boolean(getAdminSessionFromRequest(request));

  try {
    const page = await getPublicPageWithContent(resolvedParams?.slug, tenant, {
      preview: canPreviewDraft,
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load page content', details: String(error) },
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
    const updated = await updatePage(tenant, resolvedParams?.slug, {
      title: body.title,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update page', details: String(error) },
      { status: 500 }
    );
  }
}
