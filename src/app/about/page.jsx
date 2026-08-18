import AboutPage from '../../site-pages/AboutPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('about');
    return {
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | About',
      description:
        page?.seoDescription ||
        'Learn about Golden Shine Trading and our commitment to quality auto parts.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | About',
      description: 'Learn about Golden Shine Trading.',
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
    const page = await getPublicPageWithContent('about', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <AboutPage sections={sections} />
    </>
  );
}
