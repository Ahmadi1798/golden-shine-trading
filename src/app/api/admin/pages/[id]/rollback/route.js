import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  DEFAULT_TENANT_SLUG,
  rollbackPageToRevision,
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
    const body = await request.json();
    const revisionId = String(body?.revisionId || '');
    const note = String(body?.note || '').trim() || null;

    if (!revisionId) {
      return NextResponse.json({ error: 'revisionId is required' }, { status: 400 });
    }

    const result = await rollbackPageToRevision(tenant, resolvedParams?.id, revisionId, {
      actorEmail: session.email,
      note,
    });

    if (!result) {
      return NextResponse.json({ error: 'Page or revision not found' }, { status: 404 });
    }

    const pagePath = result.pageSlug === 'home' ? '/' : `/${result.pageSlug}`;
    revalidatePath(pagePath);
    revalidatePath('/', 'layout');

    return NextResponse.json({
      ok: true,
      rolledBackToRevisionId: revisionId,
      publishedAt: result.publishedAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to rollback page', details: String(error) },
      { status: 500 }
    );
  }
}
