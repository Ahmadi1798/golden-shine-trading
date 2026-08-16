import HomePage from '../site-pages/HomePage';
import { getPublicPageWithContent } from '../lib/content';
import { getAdminSessionFromCookies } from '../lib/admin-auth';
import PreviewModeBanner from '../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('home');
    return {
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | Home',
      description:
        page?.seoDescription ||
        'Golden Shine Trading — your trusted partner for Japanese used automobile parts.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | Home',
      description: 'Golden Shine Trading — your trusted partner for Japanese used automobile parts.',
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
    const page = await getPublicPageWithContent('home', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <HomePage sections={sections} />
    </>
  );
}
