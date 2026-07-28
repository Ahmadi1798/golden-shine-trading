import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AboutCTA = ({ content = {} }) => {
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
      heading: 'Let\'s Build Something Meaningful Together',
      description: 'Whether you\'re launching a new brand, building a product, or reimagining your digital experience - KarFamSoft Agency is ready to partner with you.',
      ctaLabel: 'Contact Us',
      sectionLabel: 'Agency Call to Action',
      eyebrow: 'Get In Touch',
      ctaAria: 'Contact KarFamSoft Agency',
    },
    fa: {
      heading: 'بیایید با هم چیزی ارزشمند بسازیم',
      description: 'چه در حال راه اندازی برند جدید باشید، چه ساخت محصول یا بازآفرینی تجربه دیجیتال، کارفم سافت آماده همکاری با شماست.',
      ctaLabel: 'تماس با ما',
      sectionLabel: 'دعوت به اقدام آژانس',
      eyebrow: 'در تماس باشید',
      ctaAria: 'تماس با کارفم سافت',
    },
    ps: {
      heading: 'راځئ یوځای یو ارزښتناک کار جوړ کړو',
      description: 'که نوی برانډ پیل کوئ، محصول جوړوئ یا خپله ډیجیټل تجربه بیا طرحه کوئ، KarFamSoft Agency ستاسو د ملګرتیا لپاره چمتو ده.',
      ctaLabel: 'اړیکه ونیسئ',
      sectionLabel: 'د ادارې بلنه د اقدام لپاره',
      eyebrow: 'اړیکه ونیسئ',
      ctaAria: 'KarFamSoft Agency سره اړیکه',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Let\'s Build Something Meaningful Together');
  const description =
    pickText(content.description, copy.description || 'Whether you\'re launching a new brand, building a product, or reimagining your digital experience - KarFamSoft Agency is ready to partner with you.');
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'Contact Us');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section
      className="relative py-20 px-4 text-white overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
      }}
      aria-label={copy.sectionLabel || 'Agency Call to Action'}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--theme-accent)' }}
      />
      <div
        className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'color-mix(in srgb, var(--theme-primary) 60%, white)' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 opacity-70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {copy.eyebrow || 'Get In Touch'}
        </motion.span>

        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heading}
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed"
          style={{ color: 'color-mix(in srgb, white 75%, transparent)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-base"
            style={{
              background: 'white',
              color: 'var(--theme-primary)',
            }}
            aria-label={copy.ctaAria || 'Contact KarFamSoft Agency'}
          >
            {ctaLabel}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
