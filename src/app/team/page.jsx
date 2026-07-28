import TeamPage from '../../site-pages/TeamPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('team');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Team',
      description:
        page?.seoDescription ||
        'Meet the KarFamSoft team of strategists, designers, and engineers building modern digital products.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Team',
      description:
        'Meet the KarFamSoft team of strategists, designers, and engineers building modern digital products.',
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
