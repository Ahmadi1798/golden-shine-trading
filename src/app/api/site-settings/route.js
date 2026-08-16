import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  DEFAULT_TENANT_SLUG,
  getSiteData,
  updateSiteSettings,
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

    return NextResponse.json({
      tenant: { id: data.id, slug: data.slug, name: data.name },
      siteSettings: data.siteSettings,
      navigationItems: data.navigationItems,
      footerItems: data.footerItems,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load site settings', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || DEFAULT_TENANT_SLUG;

  try {
    const payload = await request.json();
    const updated = await updateSiteSettings(tenant, payload);

    if (!updated) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/products');
    revalidatePath('/photos');
    revalidatePath('/services');
    revalidatePath('/blog');
    revalidatePath('/contact');
    revalidatePath('/team');

    return NextResponse.json({ siteSettings: updated });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update site settings', details: String(error) },
      { status: 500 }
    );
  }
}
