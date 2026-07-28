import ServicesPage from '../../site-pages/ServicesPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('services');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Services',
      description:
        page?.seoDescription ||
        'Discover web, design, and development services by KarFamSoft.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Services',
      description: 'Discover web, design, and development services by KarFamSoft.',
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
    const page = await getPublicPageWithContent('services', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <ServicesPage sections={sections} />
    </>
  );
}
