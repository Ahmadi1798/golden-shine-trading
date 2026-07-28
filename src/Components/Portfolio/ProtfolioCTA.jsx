import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ProtfolioCTA = ({ content = {} }) => {
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
      heading: 'Let\'s Build Your Next Project',
      description: 'Ready to bring your ideas to life? We\'d love to hear about your project and explore how we can work together.',
      ctaLabel: 'Start a Project',
      sectionLabel: 'Portfolio Call to Action',
      ctaAria: 'Start a Project with KarFamSoft Agency',
    },
    fa: {
      heading: 'بیایید پروژه بعدی شما را بسازیم',
      description: 'آماده اید ایده هایتان را اجرا کنید؟ مشتاقیم درباره پروژه شما بدانیم و مسیر همکاری را بررسی کنیم.',
      ctaLabel: 'شروع پروژه',
      sectionLabel: 'دعوت به اقدام نمونه کارها',
      ctaAria: 'شروع پروژه با کارفم سافت',
    },
    ps: {
      heading: 'راځئ ستاسې راتلونکې پروژه جوړه کړو',
      description: 'ایا چمتو یاست خپل نظرونه عملي کړئ؟ موږ غواړو ستاسې د پروژې په اړه واورو او د ګډ کار لارې ولټوو.',
      ctaLabel: 'پروژه پیل کړئ',
      sectionLabel: 'د پورټفولیو بلنه د اقدام لپاره',
      ctaAria: 'د KarFamSoft Agency سره پروژه پیل کړئ',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Let\'s Build Your Next Project');
  const description =
    pickText(content.description, copy.description || 'Ready to bring your ideas to life? We\'d love to hear about your project and explore how we can work together.');
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'Start a Project');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Portfolio Call to Action'}>
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{
            borderColor: 'color-mix(in srgb, var(--text-base) 8%, transparent)',
            backgroundColor: 'color-mix(in srgb, var(--text-base) 1%, transparent)',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-1.5 leading-tight tracking-tight">
              {heading}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
              {description}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-sm text-white shadow-md hover:shadow-lg transition-all duration-300 shrink-0"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
            }}
            aria-label={copy.ctaAria || 'Start a Project with KarFamSoft Agency'}
          >
            {ctaLabel}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProtfolioCTA;
