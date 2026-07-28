import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PortfolioHero = ({ content = {} }) => {
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
      heading: 'Our Work',
      description: 'Real results, creative execution, and scalable design - here\'s what we\'ve built for brands that trust us.',
      sectionLabel: 'KarFamSoft Portfolio',
      eyebrow: 'Portfolio',
    },
    fa: {
      heading: 'نمونه کارهای ما',
      description: 'نتیجه های واقعی، اجرای خلاقانه و طراحی مقیاس پذیر - ببینید برای برندهایی که به ما اعتماد کرده اند چه ساخته ایم.',
      sectionLabel: 'نمونه کارهای کارفم سافت',
      eyebrow: 'نمونه کارها',
    },
    ps: {
      heading: 'زموږ کارونه',
      description: 'رښتینې پایلې، تخلیقي اجرا او پراخېدونکی ډیزاین - دا هغه څه دي چې موږ د باور لرونکو برانډونو لپاره جوړ کړي دي.',
      sectionLabel: 'د KarFamSoft پورټفولیو',
      eyebrow: 'پورټفولیو',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Our Work');
  const description =
    pickText(content.description, copy.description || 'Real results, creative execution, and scalable design - here\'s what we\'ve built for brands that trust us.');

  return (
    <section
      className="relative pt-28 lg:pt-32 pb-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      aria-label={copy.sectionLabel || 'KarFamSoft Portfolio'}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 25% 40%, color-mix(in srgb, var(--theme-primary) 6%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 75% 60%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--theme-primary)' }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--theme-accent)' }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {copy.eyebrow || 'Portfolio'}
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heading}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PortfolioHero;
