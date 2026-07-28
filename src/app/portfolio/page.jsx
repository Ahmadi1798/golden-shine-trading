import PortfolioPage from '../../site-pages/PortfolioPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('portfolio');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Portfolio',
      description:
        page?.seoDescription ||
        'See recent digital projects delivered by KarFamSoft.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Portfolio',
      description: 'See recent digital projects delivered by KarFamSoft.',
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
    const page = await getPublicPageWithContent('portfolio', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <PortfolioPage sections={sections} />
    </>
  );
}
