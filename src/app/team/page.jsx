import TeamPage from '../../site-pages/TeamPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('team');
    return {
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | Team',
      description:
        page?.seoDescription ||
        'Meet the team behind Golden Shine Trading.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | Team',
      description: 'Meet the team behind Golden Shine Trading.',
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
    const page = await getPublicPageWithContent('team', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <TeamPage sections={sections} />
    </>
  );
}
