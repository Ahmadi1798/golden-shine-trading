import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const BlogCTA = ({ content = {} }) => {
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
      heading: 'Let\'s Talk Strategy',
      description: 'Whether you\'re building from scratch or scaling up - we\'d love to hear about your next project.',
      ctaLabel: 'Contact Us',
      sectionLabel: 'Blog Call to Action',
      ctaAria: 'Contact KarFamSoft Agency',
    },
    fa: {
      heading: 'بیایید درباره استراتژی صحبت کنیم',
      description: 'چه از صفر شروع می کنید و چه در حال رشد هستید، دوست داریم درباره پروژه بعدی شما بدانیم.',
      ctaLabel: 'تماس با ما',
      sectionLabel: 'دعوت به اقدام بلاگ',
      ctaAria: 'تماس با کارفم سافت',
    },
    ps: {
      heading: 'راځئ د ستراتیژۍ په اړه خبرې وکړو',
      description: 'که له صفره جوړوئ او که پراختیا ورکوئ، موږ غواړو ستاسې د راتلونکې پروژې په اړه واورو.',
      ctaLabel: 'موږ سره اړیکه',
      sectionLabel: 'د بلاګ بلنه د اقدام لپاره',
      ctaAria: 'KarFamSoft Agency سره اړیکه',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Let\'s Talk Strategy');
  const description =
    pickText(content.description, copy.description || 'Whether you\'re building from scratch or scaling up - we\'d love to hear about your next project.');
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'Contact Us');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Blog Call to Action'}>
      <div className="relative max-w-xl mx-auto">
        <motion.div
          className="rounded-2xl p-6 sm:p-8 text-center shadow-lg dark:shadow-black/30"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--text-base) 1%, transparent)',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Icon */}
          <motion.div
            className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MessageCircle size={18} className="text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight tracking-tight">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-md mx-auto">
            {description}
          </p>

          {/* Button */}
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm text-white shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
            }}
            aria-label={copy.ctaAria || 'Contact KarFamSoft Agency'}
          >
            {ctaLabel}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogCTA;
