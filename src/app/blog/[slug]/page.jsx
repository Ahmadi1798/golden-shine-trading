import { notFound } from 'next/navigation';

import BlogPostPage from '../../../site-pages/BlogPostPage';
import { getPublicPageWithContent } from '../../../lib/content';
import { getAdminSessionFromCookies } from '../../../lib/admin-auth';
import { extractBlogPostsFromSections, findBlogPostBySlug } from '../../../utils/blogPosts';

const FALLBACK_META = {
  title: 'Golden Shine Trading | News',
  description: 'Company announcements and updates from Golden Shine Trading.',
};

async function fetchBlogSections(preview = false) {
  const page = await getPublicPageWithContent('blog', undefined, {
    preview,
  });

  return page?.sections || [];
}

export async function generateStaticParams() {
  try {
    const sections = await fetchBlogSections(false);
    const posts = extractBlogPostsFromSections(sections);
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams?.slug;
    const sections = await fetchBlogSections(false);
    const post = findBlogPostBySlug(sections, slug);

    if (!post) return FALLBACK_META;

    return {
      title: `${post.title} | Golden Shine Trading`,
      description: post.excerpt || post.description || FALLBACK_META.description,
    };
  } catch {
    return FALLBACK_META;
  }
}

export default async function BlogPostRoute({ params, searchParams }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const isPreviewRequested = resolvedSearchParams?.preview === '1';
  const adminSession = isPreviewRequested ? await getAdminSessionFromCookies() : null;
  const isPreviewEnabled = Boolean(adminSession) && isPreviewRequested;

  const sections = await fetchBlogSections(isPreviewEnabled);
  const post = findBlogPostBySlug(sections, slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
