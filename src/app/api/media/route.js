import { NextResponse } from 'next/server';
import {
  DEFAULT_TENANT_SLUG,
  createMediaAsset,
  getMediaAssets,
} from '../../../lib/content';
import { getAdminSessionFromRequest } from '../../../lib/admin-auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const mediaAssets = await getMediaAssets(tenant);
    return NextResponse.json({ mediaAssets });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load media assets', details: String(error) },
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

    if (!body.name || !body.url || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, url, type' },
        { status: 400 }
      );
    }

    const mediaAsset = await createMediaAsset(tenant, body);

    if (!mediaAsset) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ mediaAsset }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create media asset', details: String(error) },
      { status: 500 }
    );
  }
}