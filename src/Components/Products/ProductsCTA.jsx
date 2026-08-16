'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ProductsCTA = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, "Can't Find What You Need?");
  const description = pickText(content.description, 'Contact our team for availability, pricing, and bulk order inquiries.');
  const ctaLabel = pickText(content.ctaLabel, 'Contact Us');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--theme-primary)_6%,#f9fafb)] via-white to-[color-mix(in_srgb,var(--theme-accent)_6%,#f9fafb)] dark:from-[color-mix(in_srgb,var(--theme-primary)_8%,#0f172a)] dark:via-[#0f172a] dark:to-[color-mix(in_srgb,var(--theme-accent)_8%,#0f172a)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Call to Action"
    >
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {heading}
        </motion.h2>
        <motion.p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {description}
        </motion.p>
        {ctaLabel && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link href={ctaHref} className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default ProductsCTA;
