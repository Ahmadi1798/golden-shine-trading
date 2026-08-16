import { notFound } from 'next/navigation';

import ProductDetailPage from '../../../site-pages/ProductDetailPage';
import { getPublicPageWithContent } from '../../../lib/content';
import { getAdminSessionFromCookies } from '../../../lib/admin-auth';
import { extractProductsFromSections, findProductBySlug, DEFAULT_PRODUCTS } from '../../../utils/products';

const FALLBACK_META = {
  title: 'Golden Shine Trading | Product',
  description: 'View our products at Golden Shine Trading.',
};

async function fetchProductsSections(preview = false) {
  const page = await getPublicPageWithContent('products', undefined, { preview });
  return page?.sections || [];
}

export async function generateStaticParams() {
  const allSlugs = new Set();
  try {
    const sections = await fetchProductsSections(false);
    const dbProducts = extractProductsFromSections(sections);
    dbProducts.forEach((p) => { if (p.slug) allSlugs.add(p.slug); });
  } catch {
    // fall through to defaults
  }
  DEFAULT_PRODUCTS.forEach((p) => { if (p.slug) allSlugs.add(p.slug); });
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams?.slug;
    const sections = await fetchProductsSections(false);
    let product = findProductBySlug(sections, slug);
    if (!product) product = DEFAULT_PRODUCTS.find((p) => p.slug === slug) || null;
    if (!product) return FALLBACK_META;
    return {
      title: `${product.title} | Golden Shine Trading`,
      description: product.description || FALLBACK_META.description,
    };
  } catch {
    return FALLBACK_META;
  }
}

export default async function ProductRoute({ params, searchParams }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const isPreviewRequested = resolvedSearchParams?.preview === '1';
  const adminSession = isPreviewRequested ? await getAdminSessionFromCookies() : null;
  const isPreviewEnabled = Boolean(adminSession) && isPreviewRequested;

  const sections = await fetchProductsSections(isPreviewEnabled);
  let product = findProductBySlug(sections, slug);
  if (!product) product = DEFAULT_PRODUCTS.find((p) => p.slug === slug) || null;

  if (!product) notFound();

  const allProducts = extractProductsFromSections(sections);
  const relatedProducts = allProducts
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 3);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
