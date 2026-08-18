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
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | Contact',
      description:
        page?.seoDescription ||
        'Get in touch with Golden Shine Trading for inquiries, quotations, and support.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | Contact',
      description: 'Get in touch with Golden Shine Trading.',
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
