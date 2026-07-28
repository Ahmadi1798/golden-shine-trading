import BlogPage from '../../site-pages/BlogPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('blog');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Blog',
      description:
        page?.seoDescription ||
        'Read articles and insights from the KarFamSoft team.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Blog',
      description: 'Read articles and insights from the KarFamSoft team.',
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
    const page = await getPublicPageWithContent('blog', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <BlogPage sections={sections} />
    </>
  );
}
