import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  DEFAULT_BLOG_POSTS,
  applyLocalizedBlogPostFallbackList,
  resolveBlogPostHref,
  slugifyBlogTitle,
} from '../../utils/blogPosts';
import { useLanguage } from '../../context/LanguageContext';

const BlogPosts = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };
  const copy = {
    en: {
      sectionLabel: 'Blog Posts',
      latestArticles: 'Latest Articles',
      storiesHeading: 'Insights & Stories',
      readMore: 'Read More',
      imageAltPrefix: 'Blog post',
      posts: [
        { title: 'The Power of Purposeful Design', excerpt: 'How intentional design choices improve user engagement and brand trust.', image: '/blogs/1.jpg', datePublished: '2025-05-01', date: 'May 2025', link: '#' },
        { title: 'Top 5 Tools We Use to Build Scalable Websites', excerpt: 'From design to deployment, here\'s our go-to tech stack in 2025.', image: '/blogs/2.jpg', datePublished: '2025-04-01', date: 'April 2025', link: '#' },
        { title: 'Why Every Brand Needs a Design System', excerpt: 'A design system is more than visuals - it\'s your brand\'s operating manual.', image: '/blogs/3.jpg', datePublished: '2025-03-01', date: 'March 2025', link: '#' },
        { title: 'Dark Mode Design: Tips for Better UX', excerpt: 'How to design inclusive, legible, and stylish dark interfaces in 2025.', image: '/blogs/4.jpg', datePublished: '2025-02-01', date: 'February 2025', link: '#' },
        { title: 'How We Approach Mobile-First Design', excerpt: 'Learn why starting with mobile changes the way we build for the web.', image: '/blogs/5.jpg', datePublished: '2025-01-01', date: 'January 2025', link: '#' },
        { title: 'Web Performance in 2025: What Actually Matters', excerpt: 'Speed, accessibility, and user flow - the new performance checklist.', image: '/blogs/6.jpg', datePublished: '2024-12-01', date: 'December 2024', link: '#' },
      ],
    },
    fa: {
      sectionLabel: 'مطالب بلاگ',
      latestArticles: 'جدیدترین مقالات',
      storiesHeading: 'بینش ها و روایت ها',
      readMore: 'ادامه مطلب',
      imageAltPrefix: 'پست بلاگ',
      posts: [
        { title: 'قدرت طراحی هدفمند', excerpt: 'چگونه تصمیم های طراحی آگاهانه تعامل کاربر و اعتماد به برند را افزایش می دهد.', image: '/blogs/1.jpg', datePublished: '2025-05-01', date: 'می ۲۰۲۵', link: '#' },
        { title: '۵ ابزار اصلی ما برای ساخت وب سایت های مقیاس پذیر', excerpt: 'از طراحی تا استقرار، این ها ابزارهای اصلی ما در ۲۰۲۵ هستند.', image: '/blogs/2.jpg', datePublished: '2025-04-01', date: 'آوریل ۲۰۲۵', link: '#' },
        { title: 'چرا هر برند به سیستم طراحی نیاز دارد', excerpt: 'سیستم طراحی فقط ظاهر نیست؛ راهنمای عملیاتی برند شماست.', image: '/blogs/3.jpg', datePublished: '2025-03-01', date: 'مارس ۲۰۲۵', link: '#' },
        { title: 'طراحی حالت تاریک: نکته هایی برای UX بهتر', excerpt: 'چگونه رابط های تاریک فراگیر، خوانا و زیبا طراحی کنیم.', image: '/blogs/4.jpg', datePublished: '2025-02-01', date: 'فوریه ۲۰۲۵', link: '#' },
        { title: 'رویکرد ما به طراحی موبایل-اول', excerpt: 'ببینید چرا شروع از موبایل، شیوه ساخت برای وب را تغییر می دهد.', image: '/blogs/5.jpg', datePublished: '2025-01-01', date: 'ژانویه ۲۰۲۵', link: '#' },
        { title: 'عملکرد وب در ۲۰۲۵: چه چیز واقعاً مهم است', excerpt: 'سرعت، دسترس پذیری و جریان کاربر؛ چک لیست جدید عملکرد.', image: '/blogs/6.jpg', datePublished: '2024-12-01', date: 'دسامبر ۲۰۲۴', link: '#' },
      ],
    },
    ps: {
      sectionLabel: 'د بلاګ لیکنې',
      latestArticles: 'وروستۍ لیکنې',
      storiesHeading: 'لیدلوري او کیسې',
      readMore: 'نور ولولئ',
      imageAltPrefix: 'د بلاګ لیکنه',
      posts: [
        { title: 'د هدفمند ډیزاین ځواک', excerpt: 'قصدي ډیزاین څنګه د کاروونکي تعامل او د برانډ باور زیاتوي.', image: '/blogs/1.jpg', datePublished: '2025-05-01', date: 'مې ۲۰۲۵', link: '#' },
        { title: 'د پراخېدونکو وېبپاڼو لپاره زموږ ۵ مهم ابزار', excerpt: 'له ډیزاین تر ډیپلویمنت پورې، دا زموږ د ۲۰۲۵ مهم ټېک سټاک دی.', image: '/blogs/2.jpg', datePublished: '2025-04-01', date: 'اپریل ۲۰۲۵', link: '#' },
        { title: 'ولې هر برانډ د ډیزاین سیسټم ته اړتیا لري', excerpt: 'ډیزاین سیسټم یوازې لیدیز نه دی؛ دا د برانډ کاري لارښود دی.', image: '/blogs/3.jpg', datePublished: '2025-03-01', date: 'مارچ ۲۰۲۵', link: '#' },
        { title: 'ډارک موډ ډیزاین: د غوره UX لپاره لارښوونې', excerpt: 'څنګه ټول-شمول، لوستلو وړ او ښکلي تیاره انٹرفېسونه ډیزاین کړو.', image: '/blogs/4.jpg', datePublished: '2025-02-01', date: 'فبروري ۲۰۲۵', link: '#' },
        { title: 'موږ موبایل-اول ډیزاین څنګه ترسره کوو', excerpt: 'وګورئ چې له موبایل څخه پیل کول څنګه د وېب جوړولو طریقه بدلوي.', image: '/blogs/5.jpg', datePublished: '2025-01-01', date: 'جنوري ۲۰۲۵', link: '#' },
        { title: 'په ۲۰۲۵ کې د وېب فعالیت: څه واقعاً مهم دي', excerpt: 'چټکتیا، لاسرسی او د کاروونکي جریان - نوی چک لېسټ.', image: '/blogs/6.jpg', datePublished: '2024-12-01', date: 'دسمبر ۲۰۲۴', link: '#' },
      ],
    },
  }[language] || {};

  const fallbackPosts = (copy.posts || []).map((post, index) => {
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

  const rawSectionPosts = Array.isArray(content.posts) && content.posts.length
    ? content.posts.map((item, index) => {
        const fallback = fallbackPosts[index % fallbackPosts.length] || {};
        const fallbackSlug = fallback.slug || `post-${index + 1}`;
        if (typeof item === 'string') {
          const resolvedTitle = pickText(item, fallback.title || item);
          return {
            title: resolvedTitle,
            slug: fallbackSlug,
            excerpt: fallback.excerpt || '',
            description: fallback.excerpt || '',
            image: fallback.image,
            datePublished: fallback.datePublished,
            date: fallback.date,
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

  const sectionPosts = applyLocalizedBlogPostFallbackList(rawSectionPosts, language);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Blog Posts'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 30% 30%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 70% 70%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
          >
            {copy.latestArticles || 'Latest Articles'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {copy.storiesHeading || 'Insights & Stories'}
          </h2>
        </motion.div>

        {/* Posts grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {sectionPosts.map((post, i) => {
            const resolvedHref = resolveBlogPostHref(post);
            const readMoreHref = isPreviewMode
              ? `${resolvedHref}${resolvedHref.includes('?') ? '&' : '?'}preview=1`
              : resolvedHref;
            return (
              <motion.article
                key={`${post.slug || post.title || 'post'}-${i}`}
                className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                itemScope
                itemType="http://schema.org/BlogPosting"
              >
                <Link href={readMoreHref} className="flex flex-col flex-1">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={`${copy.imageAltPrefix || 'Blog post'}: ${post.title}`}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      itemProp="image"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 50%, transparent), transparent 50%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 text-left">
                    {/* Date */}
                    <span
                      className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3 tracking-wide"
                      itemProp="datePublished"
                    >
                        {post.date || ''}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-bold text-lg text-gray-900 dark:text-white mb-2.5 leading-snug transition-colors duration-300 group-hover:text-[var(--theme-primary)]"
                      itemProp="headline"
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed mb-4"
                      itemProp="description"
                    >
                      {post.excerpt || post.description}
                    </p>

                    {/* Read More arrow */}
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                      {copy.readMore || 'Read More'}
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPosts;
