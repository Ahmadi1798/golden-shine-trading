import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  getPagePublishValidation,
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
    const validation = await getPagePublishValidation(resolvedParams?.id, tenant);

    return NextResponse.json({ validation });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate page draft', details: String(error) },
      { status: 500 }
    );
  }
}
