import ContactPage from '../../site-pages/ContactPage';
import {
  getPublicPageWithContent,
  getSiteContactSettings,
} from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('contact');
    return {
      title: page?.seoTitle || page?.title || 'KarFamSoft | Contact',
      description:
        page?.seoDescription ||
        'Get in touch with KarFamSoft to start your project.',
    };
  } catch {
    return {
      title: 'KarFamSoft | Contact',
      description: 'Get in touch with KarFamSoft to start your project.',
    };
  }
}

export default async function Page({ searchParams }) {
  let sections = [];
  let isPreviewEnabled = false;
  let siteSettings = null;

  try {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const isPreviewRequested = resolvedSearchParams?.preview === '1';
    const adminSession = isPreviewRequested ? await getAdminSessionFromCookies() : null;
    isPreviewEnabled = Boolean(adminSession) && isPreviewRequested;
    const [page, contactSettings] = await Promise.all([
      getPublicPageWithContent('contact', undefined, {
        preview: isPreviewEnabled,
      }),
      getSiteContactSettings(),
    ]);
    sections = page?.sections || [];
    siteSettings = contactSettings;
  } catch {
    sections = [];
    siteSettings = null;
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <ContactPage sections={sections} siteSettings={siteSettings} />
    </>
  );
}
