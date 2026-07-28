'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';
import { applyLocalizedBlogPostFallback } from '../utils/blogPosts';

const BlogPostPage = ({ post }) => {
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
      sectionLabel: 'Blog Post',
      back: 'Back',
      breadcrumb: 'Breadcrumb',
      home: 'Home',
      blog: 'Blog',
      articleLabel: 'Blog Article',
      defaultTitle: 'Blog Post',
      defaultExcerpt: 'Practical ideas and strategies from our team.',
      defaultOverview:
        'This article shares practical ideas, implementation notes, and strategic guidance to help teams create better digital products.',
      overview: 'Overview',
      insights: 'Key Insights',
      nextSteps: 'Practical Next Steps',
      backToBlog: 'Back to Blog',
      imageAltPrefix: 'Blog post',
      fallbackInsights: [
        'Align design decisions with measurable business outcomes.',
        'Prioritize clarity and consistency in user-facing experiences.',
        'Use iterative improvements to reduce risk and improve delivery speed.',
      ],
      fallbackNextSteps:
        'Start by auditing your current experience, then define the smallest high-impact changes you can ship quickly. Measure the results, then iterate.',
    },
    fa: {
      sectionLabel: 'صفحه مطلب بلاگ',
      back: 'بازگشت',
      breadcrumb: 'مسیر صفحه',
      home: 'خانه',
      blog: 'بلاگ',
      articleLabel: 'مطلب بلاگ',
      defaultTitle: 'مطلب بلاگ',
      defaultExcerpt: 'ایده ها و راهکارهای عملی از تیم ما.',
      defaultOverview:
        'در این مطلب، نکته های کاربردی، تجربه های اجرا و راهکارهای استراتژیک برای ساخت محصولات دیجیتال بهتر بررسی می شود.',
      overview: 'نمای کلی',
      insights: 'نکته های کلیدی',
      nextSteps: 'گام های عملی بعدی',
      backToBlog: 'بازگشت به بلاگ',
      imageAltPrefix: 'مطلب بلاگ',
      fallbackInsights: [
        'تصمیم های طراحی را با اهداف قابل اندازه گیری هماهنگ کنید.',
        'شفافیت و یکپارچگی تجربه کاربر را در اولویت نگه دارید.',
        'با بهبودهای مرحله ای، ریسک را کاهش دهید و سرعت تحویل را بالا ببرید.',
      ],
      fallbackNextSteps:
        'از ارزیابی تجربه فعلی شروع کنید، تغییرات کوچک اما پراثر را اجرا کنید و نتیجه را با شاخص های واقعی پایش کنید.',
    },
    ps: {
      sectionLabel: 'د بلاګ لیکنې پاڼه',
      back: 'بیرته',
      breadcrumb: 'لارښود',
      home: 'کور',
      blog: 'بلاګ',
      articleLabel: 'د بلاګ لیکنه',
      defaultTitle: 'د بلاګ لیکنه',
      defaultExcerpt: 'زموږ له ټیمه عملي نظریات او ستراتیژۍ.',
      defaultOverview:
        'دا لیکنه عملي لارې چارې، د پلي کېدو یادښتونه او ستراتیژیک نظرونه وړاندې کوي تر څو ټیمونه غوره ډیجیټل محصولات جوړ کړي.',
      overview: 'لنډیز',
      insights: 'مهم لیدلوري',
      nextSteps: 'عملي راتلونکي ګامونه',
      backToBlog: 'بلاګ ته بېرته',
      imageAltPrefix: 'د بلاګ لیکنه',
      fallbackInsights: [
        'د ډیزاین پرېکړې د اندازه کېدونکو موخو سره وتړئ.',
        'د کاروونکي تجربې روښانتیا او یو شان والی وساتئ.',
        'په مرحلې وار ښه والي سره خطر کم او د تحویلي سرعت لوړ کړئ.',
      ],
      fallbackNextSteps:
        'له اوسني تجربې ارزونې پیل وکړئ، وړې خو اغېزمنې بدلونونه پلي کړئ او پایله د حقیقي شاخصونو له لارې وڅارئ.',
    },
  }[language] || {};

  const localizedPost = applyLocalizedBlogPostFallback(resolveLocalizedContent(post || {}, language), language);

  const title = pickText(localizedPost?.title, copy.defaultTitle || 'Blog Post');
  const excerpt = pickText(localizedPost?.excerpt || localizedPost?.description, copy.defaultExcerpt || '');
  const fullContent = String(localizedPost?.content || '').trim();
  const overview = pickText(fullContent, copy.defaultOverview || '');
  const keyInsights = String(localizedPost?.keyInsights || localizedPost?.insights || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const normalizedInsights = keyInsights.length
    ? keyInsights.map((insight) => pickText(insight, insight))
    : copy.fallbackInsights || [];
  const nextSteps = pickText(
    String(localizedPost?.nextSteps || '').trim(),
    copy.fallbackNextSteps || ''
  );
  const image = localizedPost?.image || '/blogs/1.jpg';
  const dateLabel = pickText(localizedPost?.date, localizedPost?.date || '');

  return (
    <article className="bg-white dark:bg-[#0f172a] min-h-screen" aria-label={copy.sectionLabel || 'Blog Post'}>
      {/* Hero section */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 70% 50% at 25% 35%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 75% 65%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
          `,
        }} />

        <div className="relative max-w-4xl mx-auto">
          {/* Back button + breadcrumb */}
          <motion.div
            className="flex items-center justify-between pb-5 mb-8 border-b"
            style={{ borderColor: 'color-mix(in srgb, var(--text-base) 8%, transparent)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-[var(--theme-primary)]"
              style={{ color: 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))' }}
            >
              <span
                className="flex items-center justify-center w-7 h-7 rounded-lg border transition-colors duration-300"
                style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)' }}
              >
                <ArrowLeft size={14} />
              </span>
              {copy.back || 'Back'}
            </Link>

            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500" aria-label={copy.breadcrumb || 'Breadcrumb'}>
              <Link href="/" className="transition-colors duration-300 hover:text-[var(--theme-primary)]">
                {copy.home || 'Home'}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <Link href="/blog" className="transition-colors duration-300 hover:text-[var(--theme-primary)]">
                {copy.blog || 'Blog'}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                {title}
              </span>
            </nav>
          </motion.div>

          {/* Title area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--theme-primary)' }}
            >
              {copy.articleLabel || 'Blog Article'}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
              {title}
            </h1>

            <div
              className="w-16 h-1 rounded-full mb-6"
              style={{
                background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              }}
            />

            {dateLabel && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{dateLabel}</p>
            )}

            {excerpt && (
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                {excerpt}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Image */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl dark:shadow-black/30">
            <img
              src={image}
              alt={`${copy.imageAltPrefix || 'Blog post'}: ${title}`}
              className="w-full h-[260px] sm:h-[420px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="px-4 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {/* Overview */}
            <motion.div
              className="rounded-2xl p-8 sm:p-10 shadow-lg dark:shadow-black/30"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--text-base) 1%, transparent)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                {copy.overview || 'Overview'}
              </h2>
              <div
                className="w-10 h-0.5 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                }}
              />
              <p className="whitespace-pre-line text-base leading-7 text-gray-600 dark:text-gray-300">
                {overview}
              </p>
            </motion.div>

            {/* Key Insights */}
            <motion.div
              className="rounded-2xl p-8 sm:p-10 shadow-lg dark:shadow-black/30"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--text-base) 1%, transparent)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                {copy.insights || 'Key Insights'}
              </h2>
              <div
                className="w-10 h-0.5 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                }}
              />
              <ul className="space-y-3">
                {normalizedInsights.map((insight, index) => (
                  <li key={`${insight}-${index}`} className="flex items-start gap-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--theme-primary)' }}
                    />
                    {insight}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              className="rounded-2xl p-8 sm:p-10 shadow-lg dark:shadow-black/30"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--text-base) 1%, transparent)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                {copy.nextSteps || 'Practical Next Steps'}
              </h2>
              <div
                className="w-10 h-0.5 rounded-full mb-5"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                }}
              />
              <p className="whitespace-pre-line text-base leading-7 text-gray-600 dark:text-gray-300">
                {nextSteps}
              </p>
            </motion.div>

            {/* Back to Blog */}
            <motion.div
              className="pt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-xl text-sm text-white shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                }}
              >
                {copy.backToBlog || 'Back to Blog'}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPostPage;
