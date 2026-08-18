import ProductsPage from '../../site-pages/ProductsPage';
import { getPublicPageWithContent } from '../../lib/content';
import { getAdminSessionFromCookies } from '../../lib/admin-auth';
import PreviewModeBanner from '../../Components/PreviewModeBanner';

export async function generateMetadata() {
  try {
    const page = await getPublicPageWithContent('products');
    return {
      title: page?.seoTitle || page?.title || 'Golden Shine Trading | Our Products',
      description:
        page?.seoDescription ||
        'Explore our range of Korean used automobile parts — engines, transmissions, cabins, and more.',
    };
  } catch {
    return {
      title: 'Golden Shine Trading | Our Products',
      description: 'Explore our range of Korean used automobile parts.',
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
    const page = await getPublicPageWithContent('products', undefined, {
      preview: isPreviewEnabled,
    });
    sections = page?.sections || [];
  } catch {
    sections = [];
  }

  return (
    <>
      <PreviewModeBanner enabled={isPreviewEnabled} />
      <ProductsPage sections={sections} />
    </>
  );
}
