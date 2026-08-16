'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HomeQuote = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const quote = pickText(
    content.quote,
    'When you trust your car to Golden Shine Trading, we promise to provide the best customer service and highest quality of service available anywhere.',
  );
  const author = pickText(content.author, 'Golden Shine Trading');
  const ctaLabel = pickText(content.ctaLabel, 'Get in Touch');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--theme-primary)_6%,#f9fafb)] via-white to-[color-mix(in_srgb,var(--theme-accent)_6%,#f9fafb)] dark:from-[color-mix(in_srgb,var(--theme-primary)_8%,#0f172a)] dark:via-[#0f172a] dark:to-[color-mix(in_srgb,var(--theme-accent)_8%,#0f172a)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Trust statement"
    >
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-md mb-8"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))',
            }}
          >
            <Quote size={22} className="text-white" />
          </div>
        </motion.div>

        <motion.blockquote
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 leading-relaxed mb-8 italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div
            className="inline-block h-px w-12 mb-4"
            style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
          />
          <p
            className="text-sm font-semibold uppercase tracking-[0.15em] mb-8"
            style={{ color: 'var(--theme-accent)' }}
          >
            {author}
          </p>

          {ctaLabel && (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
            >
              {ctaLabel}
            </Link>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeQuote;
