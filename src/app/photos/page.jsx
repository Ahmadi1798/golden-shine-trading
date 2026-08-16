import PhotosPage from '../../site-pages/PhotosPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('photos');
    return {
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | Photo Gallery',
      description:
        page?.seoDescription ||
        'Browse our photo gallery — warehouse, products, and operations at Golden Shine Trading.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | Photo Gallery',
      description: 'Browse our photo gallery at Golden Shine Trading.',
    };
  }
}

export default async function Page({ searchParams }) {
  let sections = [];
  let isPreviewEnabled = false;

  try {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const isPreviewRequested = resolvedSearchParams?.preview === '1';
    const adminSession = isPreviewRequested ? await getAdminSessionFromCookies() : null;
    isPreviewEnabled = Boolean(adminSession) && isPreviewRequested;
    const page = await getPublicPageWithContent('photos', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <PhotosPage sections={sections} />
    </>
  );
}
