import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  getPagePublishDiff,
} from '../../../../../../lib/content';
import { getAdminSessionFromRequest } from '../../../../../../lib/admin-auth';

export async function GET(request, { params }) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const diff = await getPagePublishDiff(resolvedParams?.id, tenant);

    if (!diff) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ diff });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load publish diff', details: String(error) },
      { status: 500 }
    );
  }
}
