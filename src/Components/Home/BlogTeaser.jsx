'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { resolveBlogPostHref } from '../../utils/blogPosts';
import { useLanguage } from '../../context/LanguageContext';

const posts = [
  {
    title: 'The Power of Purposeful Design',
    image: '/blogs/1.jpg',
    date: 'May 2025',
    link: '#',
    description:
      'Discover how intentional design choices drive business growth and user engagement.',
  },
  {
    title: 'Top 5 Tools We Use to Build Scalable Websites',
    image: '/blogs/2.jpg',
    date: 'April 2025',
    link: '#',
    description:
      'Explore our favorite tools for building robust, scalable digital products.',
  },
  {
    title: 'Why Every Brand Needs a Design System',
    image: '/blogs/3.jpg',
    date: 'March 2025',
    link: '#',
    description:
      'Learn why a unified design system is essential for brand consistency and speed.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const BlogTeaser = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const searchParams = useSearchParams();
  const isPreviewMode = searchParams?.get('preview') === '1';

  const copy = {
    en: {
      heading: 'From the Blog',
      description: 'Insights and ideas from the KarFamSoft team to inspire your next project.',
      ctaLabel: 'Visit Blog',
      latestInsights: 'Latest Insights',
      readMore: 'Read more',
      latestBlogPosts: 'Latest Blog Posts',
      fullBlogAria: 'Visit our full blog',
      posts,
    },
    fa: {
      heading: 'از وبلاگ',
      description: 'بینش ها و ایده های تیم کارفم سافت برای الهام بخشیدن به پروژه بعدی شما.',
      ctaLabel: 'مشاهده وبلاگ',
      latestInsights: 'آخرین بینش ها',
      readMore: 'بیشتر بخوانید',
      latestBlogPosts: 'آخرین مقالات وبلاگ',
      fullBlogAria: 'مشاهده همه مقالات وبلاگ',
      posts: [
        {
          title: 'قدرت طراحی هدفمند',
          image: '/blogs/1.jpg',
          date: 'می ۲۰۲۵',
          link: '#',
          description: 'ببینید چگونه تصمیم های طراحی آگاهانه باعث رشد کسب و کار و تعامل کاربر می شوند.',
        },
        {
          title: '۵ ابزار اصلی ما برای ساخت وب سایت های مقیاس پذیر',
          image: '/blogs/2.jpg',
          date: 'آوریل ۲۰۲۵',
          link: '#',
          description: 'ابزارهای محبوب ما برای ساخت محصولات دیجیتال پایدار و مقیاس پذیر را بررسی کنید.',
        },
        {
          title: 'چرا هر برند به سیستم طراحی نیاز دارد',
          image: '/blogs/3.jpg',
          date: 'مارس ۲۰۲۵',
          link: '#',
          description: 'چرا یک سیستم طراحی یکپارچه برای انسجام برند و سرعت اجرا ضروری است.',
        },
      ],
    },
    ps: {
      heading: 'له بلاګ څخه',
      description: 'ستاسو د راتلونکې پروژې لپاره د کارفم سافټ د ټیم لیدلوري او نظریات.',
      ctaLabel: 'بلاګ وګورئ',
      latestInsights: 'وروستي لیدلوري',
      readMore: 'نور ولولئ',
      latestBlogPosts: 'وروستي بلاګ مقالې',
      fullBlogAria: 'زموږ بشپړ بلاګ وګورئ',
      posts: [
        {
          title: 'د هدفمند ډیزاین ځواک',
          image: '/blogs/1.jpg',
          date: 'مې ۲۰۲۵',
          link: '#',
          description: 'وګورئ چې قصدي ډیزاین څنګه د سوداګرۍ وده او د کاروونکي تعامل زیاتوي.',
        },
        {
          title: 'د پراخېدونکو وېبپاڼو لپاره زموږ ۵ مهم ابزار',
          image: '/blogs/2.jpg',
          date: 'اپریل ۲۰۲۵',
          link: '#',
          description: 'زموږ د خوښې وسایل وپېژنئ چې پرې پیاوړي او پراخېدونکي ډیجیټل محصولات جوړوو.',
        },
        {
          title: 'ولې هر برانډ د ډیزاین سیسټم ته اړتیا لري',
          image: '/blogs/3.jpg',
          date: 'مارچ ۲۰۲۵',
          link: '#',
          description: 'زده کړئ چې یو متحد ډیزاین سیسټم څنګه د برانډ ثبات او چټکتیا ته ځواک ورکوي.',
        },
      ],
    },
  }[language] || {
    heading: 'From the Blog',
    description: 'Insights and ideas from the KarFamSoft team to inspire your next project.',
    ctaLabel: 'Visit Blog',
    latestInsights: 'Latest Insights',
    readMore: 'Read more',
    latestBlogPosts: 'Latest Blog Posts',
    fullBlogAria: 'Visit our full blog',
  };

  const defaultPosts = copy.posts || posts;
  const heading = pickText(content.heading, copy.heading);
  const description =
    pickText(content.description, copy.description);
  const sectionPosts = Array.isArray(content.posts) && content.posts.length
    ? content.posts.map((item, index) => {
        const fallbackPost = defaultPosts[index % defaultPosts.length] || {};
        if (typeof item === 'string') {
          return {
            title: pickText(item, fallbackPost.title || ''),
            image: fallbackPost.image || posts[index % posts.length].image,
            date: fallbackPost.date || posts[index % posts.length].date,
            link: '',
            description: fallbackPost.description || '',
          };
        }
        return {
          title: pickText(item?.title, fallbackPost.title || posts[index % posts.length].title),
          image: item?.image || fallbackPost.image || posts[index % posts.length].image,
          date: pickText(item?.date, fallbackPost.date || posts[index % posts.length].date),
          link: item?.link || '',
          description: pickText(item?.description || item?.excerpt || '', fallbackPost.description || ''),
          excerpt: item?.excerpt || '',
        };
      })
    : defaultPosts;
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel);
  const ctaHref = content.ctaHref || '/blog';

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={copy.latestBlogPosts}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 80%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 90% 20%, color-mix(in srgb, var(--theme-secondary) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {copy.latestInsights}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectionPosts.map((post, i) => {
            const resolvedHref = resolveBlogPostHref(post);
            const readMoreHref = isPreviewMode
              ? `${resolvedHref}${resolvedHref.includes('?') ? '&' : '?'}preview=1`
              : resolvedHref;

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 60%, transparent), transparent 50%)',
                    }}
                  />
                  <span
                    className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 backdrop-blur-sm"
                  >
                    {post.date}
                  </span>
                </div>

                <div
                  className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
                />

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {post.description || post.excerpt}
                  </p>
                  <Link
                    href={readMoreHref}
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:gap-2"
                    style={{ color: 'var(--theme-primary)' }}
                    aria-label={`${copy.readMore} ${post.title}`}
                  >
                    {copy.readMore}
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            }}
            aria-label={copy.fullBlogAria}
          >
            {ctaLabel}
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogTeaser;
