import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  DEFAULT_TENANT_SLUG,
  getPagePublishValidation,
  publishPageById,
} from '../../../../../../lib/content';
import { getAdminSessionFromRequest } from '../../../../../../lib/admin-auth';

export async function POST(request, { params }) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const body = await request.json().catch(() => ({}));
    const note = String(body?.note || '').trim() || null;

    const validation = await getPagePublishValidation(resolvedParams?.id, tenant);
    if (!validation.ok) {
      return NextResponse.json(
        { error: 'Draft validation failed', validation },
        { status: 400 }
      );
    }

    const snapshot = await publishPageById(tenant, resolvedParams?.id, {
      actorEmail: session.email,
      note,
    });

    if (!snapshot) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const pagePath = snapshot.pageSlug === 'home' ? '/' : `/${snapshot.pageSlug}`;
    revalidatePath(pagePath);
    revalidatePath('/', 'layout');

    return NextResponse.json({
      published: true,
      publishedAt: snapshot.publishedAt,
      snapshot,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to publish page', details: String(error) },
      { status: 500 }
    );
  }
}
