'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_BLOG_POSTS, resolveBlogPostHref, slugifyBlogTitle } from '../../utils/blogPosts';
import { useLanguage } from '../../context/LanguageContext';

const defaultPosts = [
  { title: 'New Shipment of Korean Engines Arrived', excerpt: 'A fresh container of low-mileage used Korean engines has just arrived at our Klang warehouse.', image: '/images/products/engine.jpg', date: 'August 2026' },
  { title: 'Expanding Our Truck Engine Range', excerpt: 'We have added more Hyundai and Daewoo truck engines to meet growing commercial demand.', image: '/images/products/truck-engine.jpg', date: 'July 2026' },
  { title: 'Now Exporting to 30+ Countries', excerpt: 'Our international network keeps growing — now serving customers across five continents.', image: '/images/products/spareparts.jpg', date: 'June 2026' },
  { title: 'Container Loading Facility Upgrade', excerpt: 'We have upgraded our container loading facilities for faster turnaround on bulk orders.', image: '/images/products/halfcut.jpg', date: 'May 2026' },
  { title: 'Quality Inspection Process Explained', excerpt: 'A look at how every engine and part is inspected before it reaches our customers.', image: '/images/products/transmission.jpg', date: 'April 2026' },
  { title: 'New Half Cuts in Stock', excerpt: 'Fresh front and rear half cuts for popular Hyundai and Kia models are now available.', image: '/images/products/cabin.jpg', date: 'March 2026' },
];

const BlogPosts = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const fallbackPosts = defaultPosts.map((post, index) => {
    const canonical = DEFAULT_BLOG_POSTS[index % DEFAULT_BLOG_POSTS.length] || {};
    const slug = canonical.slug || slugifyBlogTitle(canonical.title || '') || `post-${index + 1}`;
    return {
      ...post,
      slug,
      link: canonical.link || `/blog/${slug}`,
    };
  });

  const searchParams = useSearchParams();
  const isPreviewMode = searchParams?.get('preview') === '1';

  const sectionPosts = Array.isArray(content.posts) && content.posts.length
    ? content.posts.map((item, index) => {
        const fallback = fallbackPosts[index % fallbackPosts.length] || {};
        const fallbackSlug = fallback.slug || `post-${index + 1}`;
        if (typeof item === 'string') {
          return {
            title: pickText(item, fallback.title || item),
            slug: fallbackSlug,
            excerpt: fallback.excerpt || '',
            image: fallback.image,
            date: fallback.date || '',
            link: fallback.link || `/blog/${fallbackSlug}`,
          };
        }
        const resolvedTitle = pickText(item?.title, fallback.title || '');
        const explicitSlug = slugifyBlogTitle(item?.slug || '');
        const resolvedExcerpt = pickText(item?.excerpt || item?.description, fallback.excerpt || '');
        return {
          title: resolvedTitle,
          slug: explicitSlug || fallbackSlug || slugifyBlogTitle(resolvedTitle),
          excerpt: resolvedExcerpt,
          description: resolvedExcerpt,
          image: item?.image || fallback.image,
          datePublished: item?.datePublished || fallback.datePublished,
          date: pickText(item?.date, fallback.date || ''),
          content: pickText(item?.content, fallback.content || ''),
          keyInsights: pickText(item?.keyInsights || item?.insights, fallback.keyInsights || ''),
          nextSteps: pickText(item?.nextSteps, fallback.nextSteps || ''),
          link: item?.link || fallback.link || '',
        };
      })
    : fallbackPosts;

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label="Blog Posts">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 30%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 70% 70%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--theme-primary)' }}>
            Stay Updated
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Latest Articles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectionPosts.map((post, i) => {
            const resolvedHref = resolveBlogPostHref(post);
            const readMoreHref = isPreviewMode
              ? `${resolvedHref}${resolvedHref.includes('?') ? '&' : '?'}preview=1`
              : resolvedHref;
            return (
              <motion.article
                key={`${post.slug || post.title || 'post'}-${i}`}
                className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/50 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={readMoreHref} className="flex flex-col flex-1">
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 50%, transparent), transparent 50%)' }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1 text-left">
                    <span className="text-xs font-medium mb-3 tracking-wide" style={{ color: 'var(--theme-accent)' }}>
                      {post.date || ''}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2.5 leading-snug transition-colors duration-300 group-hover:text-[var(--theme-primary)]">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed mb-4">
                      {post.excerpt || post.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                      Read More
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
