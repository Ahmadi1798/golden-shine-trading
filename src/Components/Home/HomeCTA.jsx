'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HomeCTA = ({ content = {} }) => {
  const { t, language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, t('home.ctaHeading', 'Ready to bring your vision to life?'));
  const description =
    pickText(content.description, t('home.ctaDescription', "Let's collaborate on something impactful and innovative."));
  const ctaLabel = pickText(content.ctaLabel, t('home.startProject', 'Start a Project'));
  const ctaHref = content.ctaHref || '/contact';

  return (
    <motion.section
      className="relative py-16 px-4 bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={t('home.callToAction', 'Call to Action')}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, color-mix(in srgb, white 12%, transparent) 1px, transparent 0)
              `,
              backgroundSize: '28px 28px',
            }}
          />

          <div
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'white' }}
          />
          <div
            className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{ backgroundColor: 'white' }}
          />

          <div className="relative">
            <motion.h2
              className="text-2xl md:text-4xl font-extrabold text-white mb-3 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="text-sm md:text-base mb-6 max-w-md mx-auto leading-relaxed"
              style={{ color: 'color-mix(in srgb, white 75%, transparent)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
            <motion.a
              href={ctaHref}
              className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{
                background: 'white',
                color: 'var(--theme-primary)',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              aria-label={ctaLabel}
            >
              {ctaLabel}
              <ArrowUpRight size={16} strokeWidth={2} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeCTA;
