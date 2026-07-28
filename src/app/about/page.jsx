import AboutPage from '../../site-pages/AboutPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('about');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | About',
      description:
        page?.seoDescription ||
        'Learn about KarFamSoft and our creative digital approach.',
    };
  } catch {
    return {
      title: 'KarFamSoft | About',
      description: 'Learn about KarFamSoft and our creative digital approach.',
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
