'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AboutHero = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'About Golden Shine Trading');
  const description = pickText(
    content.description,
    'Your trusted partner for Japanese used automobile parts — serving Malaysia and the world since 1992.',
  );
  const imageUrl = content.imageUrl || '/images/about/about-preview.jpg';
  const ctaLabel = pickText(content.ctaLabel, '');
  const ctaHref = content.ctaHref || '';

  return (
    <section className="relative flex min-h-[50vh] md:min-h-[60vh] items-center overflow-hidden bg-[#080810]">
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080810]/70 via-[#080810]/40 to-[#080810]/90" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 50%, var(--theme-primary) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 70% 50%, var(--theme-accent) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 md:py-28 text-center">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: 'var(--theme-accent)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.span>
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
            >
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutHero;
