import HomePage from '../site-pages/HomePage';
import { getPublicPageWithContent } from '../lib/content';
import { getAdminSessionFromCookies } from '../lib/admin-auth';
import PreviewModeBanner from '../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('home');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Home',
      description:
        page?.seoDescription ||
        'Explore KarFamSoft services, portfolio, process, and insights.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Home',
      description: 'Explore KarFamSoft services, portfolio, process, and insights.',
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
