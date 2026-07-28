import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  deleteMediaAsset,
  updateMediaAsset,
} from '../../../../lib/content';
import { getAdminSessionFromRequest } from '../../../../lib/admin-auth';

export async function PATCH(request, { params }) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const payload = await request.json();
    const mediaAsset = await updateMediaAsset(tenant, resolvedParams?.id, payload);

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    return NextResponse.json({ mediaAsset });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update media asset', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resolvedParams = await Promise.resolve(params);

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const deleted = await deleteMediaAsset(tenant, resolvedParams?.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });
    }

    return NextResponse.json({ deleted });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete media asset', details: String(error) },
      { status: 500 }
    );
  }
}