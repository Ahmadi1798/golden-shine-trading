'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AboutPreview = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Ultimate Used Automobile Parts');
  const description = pickText(
    content.description,
    'Golden Shine Trading was established in year 1992. We are specialized in import, export, and wholesale Japanese used automobile engines and spare parts. We have wide international network and currently export to more than 30 countries covering Asia, Middle East, Africa, USA, Australia, New Zealand, South America, and Europe.',
  );
  const imageUrl = content.imageUrl || '/images/about/about-preview.jpg';
  const imageAlt = content.imageAlt || 'Golden Shine Trading warehouse and operations';
  const ctaLabel = pickText(content.ctaLabel, 'Read More');
  const ctaHref = content.ctaHref || '/about';

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="About Golden Shine Trading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 15% 40%, color-mix(in srgb, var(--theme-primary) 6%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 85% 60%, color-mix(in srgb, var(--theme-accent) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl opacity-20 blur-2xl"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))' }}
            />
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10"
              style={{ background: 'linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))' }}
            />
            <img
              src={imageUrl}
              alt={imageAlt}
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3] max-h-[420px]"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            About Us
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heading}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
            >
              {ctaLabel}
              <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutPreview;
