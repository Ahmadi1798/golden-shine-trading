'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  BarChart3,
  Brush,
  Code,
  Globe2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  Palette,
  Smartphone,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const iconByKeyword = [
  [/web|development|code|programming|software|engineering|frontend|backend/i, Code],
  [/ui|ux|design|interface|user.?experience/i, Brush],
  [/digital.?strateg|strateg|consulting|consult/i, BarChart3],
  [/performance|speed|optimiz|fast/i, Zap],
  [/mobile|app|ios|android|smartphone/i, Smartphone],
  [/seo|search|visibility|organic|traffic|globe|global/i, Globe2],
  [/brand|identity|logo|visual.?identity/i, Layers3],
  [/creative|art|illustration|graphic|palette|visual/i, Palette],
  [/support|maintenance|care|help|service|managed/i, HeartHandshake],
  [/innov|idea|research|r.?d|lab/i, Lightbulb],
];

const fallbackIcons = [Code, Brush, BarChart3, Smartphone, Globe2, Layers3, Zap, Lightbulb, HeartHandshake, Palette];

const getIconForTitle = (title, index) => {
  if (!title) return fallbackIcons[index % fallbackIcons.length];
  for (const [pattern, icon] of iconByKeyword) {
    if (pattern.test(title)) return icon;
  }
  return fallbackIcons[index % fallbackIcons.length];
};

const iconTintStyles = [
  { bg: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', color: 'var(--theme-primary)', border: 'var(--theme-primary)' },
  { bg: 'color-mix(in srgb, var(--theme-secondary) 10%, transparent)', color: 'var(--theme-secondary)', border: 'var(--theme-secondary)' },
  { bg: 'color-mix(in srgb, var(--theme-accent) 10%, transparent)', color: 'var(--theme-accent)', border: 'var(--theme-accent)' },
  { bg: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', color: 'var(--theme-primary)', border: 'var(--theme-primary)' },
  { bg: 'color-mix(in srgb, var(--theme-secondary) 10%, transparent)', color: 'var(--theme-secondary)', border: 'var(--theme-secondary)' },
  { bg: 'color-mix(in srgb, var(--theme-accent) 10%, transparent)', color: 'var(--theme-accent)', border: 'var(--theme-accent)' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ServicesPreview = ({ content = {} }) => {
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
      sectionHeading: 'What We Do',
      sectionDescription: 'We help brands build user-focused digital experiences with scalable design and code.',
      sectionLabel: 'Our Services',
      ctaLabel: 'View All Services',
      ctaAria: 'View all services',
      defaultServices: [
        { title: 'Web Development', icon: Code, description: 'High-performance websites using modern stacks like React and Tailwind.' },
        { title: 'UI/UX Design', icon: Brush, description: 'User-first designs that balance aesthetics and functionality.' },
        { title: 'Digital Strategy', icon: BarChart3, description: 'Clear and actionable strategies to launch and grow your product.' },
      ],
    },
    fa: {
      sectionHeading: 'چه کار می کنیم',
      sectionDescription: 'ما به برندها کمک می کنیم تجربه های دیجیتال کاربرمحور با طراحی و کدنویسی مقیاس پذیر بسازند.',
      sectionLabel: 'خدمات ما',
      ctaLabel: 'مشاهده همه خدمات',
      ctaAria: 'مشاهده همه خدمات',
      defaultServices: [
        { title: 'توسعه وب', icon: Code, description: 'وب سایت های سریع و مقیاس پذیر با فناوری های مدرن مانند ری اکت و تیلویند.' },
        { title: 'طراحی UI/UX', icon: Brush, description: 'طراحی های کاربرمحور با تعادل بین زیبایی و کارایی.' },
        { title: 'استراتژی دیجیتال', icon: BarChart3, description: 'استراتژی های عملی برای راه اندازی و رشد محصول شما.' },
        { title: 'توسعه اپلیکیشن موبایل', icon: Smartphone, description: 'اپلیکیشن های حرفه ای برای iOS و اندروید با جدیدترین فناوری‌ها.' },
        { title: 'سئو و بهینه سازی', icon: Globe2, description: 'بهبود رتبه سایت شما در موتورهای جستجو و افزایش ترافیک ارگانیک.' },
        { title: 'برندینگ و هویت بصری', icon: Layers3, description: 'طراحی هویت برند منحصربه‌فرد شامل لوگو، رنگ‌بندی و سبک بصری.' },
      ],
    },
    ps: {
      sectionHeading: 'موږ څه کوو',
      sectionDescription: 'موږ برانډونو سره مرسته کوو چې د کاروونکي-محور ډیجیټل تجربې د پراخېدونکي ډیزاین او کوډ سره جوړې کړي.',
      sectionLabel: 'زموږ خدمتونه',
      ctaLabel: 'ټول خدمتونه وګورئ',
      ctaAria: 'ټول خدمتونه وګورئ',
      defaultServices: [
        { title: 'وېب پراختیا', icon: Code, description: 'لوړ فعالیت لرونکې وېبپاڼې د React او Tailwind په څېر عصري ټېکنالوژۍ سره.' },
        { title: 'UI/UX ډیزاین', icon: Brush, description: 'کاروونکي-محور ډیزاینونه چې ښکلا او کارېدنه سره توازن کوي.' },
        { title: 'ډیجیټل ستراتیژي', icon: BarChart3, description: 'ستاسو د محصول د پیل او ودې لپاره روښانه او عملي ستراتیژۍ.' },
        { title: 'د موبایل اپلیکیشن پراختیا', icon: Smartphone, description: 'د iOS او Android لپاره مسلکي اپلیکیشنونه د عصري ټیکنالوژۍ سره.' },
        { title: 'SEO او اصلاح', icon: Globe2, description: 'ستاسو د سایټ درجه بندي په لټون انجنونو کې ښه کول او عضوي ترافیک زیاتول.' },
        { title: 'برانډنګ او بصري هویت', icon: Layers3, description: 'د برانډ ځانګړی هویت ډیزاین کول لکه لوګو، رنګونه او بصري سټایل.' },
      ],
    },
  }[language] || {};

  const defaultServices = copy.defaultServices || [];
  const sectionHeading = pickText(content.heading, copy.sectionHeading || 'What We Do');
  const sectionDescription =
    pickText(content.description, copy.sectionDescription || 'We help brands build user-focused digital experiences with scalable design and code.');
  const sectionServices = Array.isArray(content.services) && content.services.length
    ? content.services.map((item, index) => {
        const fallbackService = defaultServices[index % defaultServices.length] || {};
        const rawTitle = typeof item === 'string' ? item : item?.title;
        const title = pickText(rawTitle, fallbackService.title || '');
        return {
          title,
          description: pickText(typeof item === 'string' ? '' : item?.description, fallbackService.description || ''),
          icon: getIconForTitle(title, index),
        };
      })
    : defaultServices;
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'View All Services');
  const ctaHref = content.ctaHref || '/services';

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={copy.sectionLabel || 'Our Services'}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 10% 20%, color-mix(in srgb, var(--theme-primary) 6%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 90% 80%, color-mix(in srgb, var(--theme-accent) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sectionHeading}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sectionDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectionServices.map((service, i) => {
            const tint = iconTintStyles[i % iconTintStyles.length];
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="group relative bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-shadow duration-300"
              >
                <div
                  className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, var(--theme-primary), var(--theme-accent))` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: tint.bg, color: tint.color }}
                >
                  <service.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            }}
            aria-label={copy.ctaAria || 'View all services'}
          >
            {ctaLabel}
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesPreview;
