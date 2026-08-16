'use client';

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

  const heading = pickText(content.heading, 'Need Auto Parts?');
  const description = pickText(content.description, 'Contact our team for availability, pricing, and bulk order inquiries.');
  const ctaLabel = pickText(content.ctaLabel, 'Contact Us');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--theme-primary)_6%,#f9fafb)] via-white to-[color-mix(in_srgb,var(--theme-accent)_6%,#f9fafb)] dark:from-[color-mix(in_srgb,var(--theme-primary)_8%,#0f172a)] dark:via-[#0f172a] dark:to-[color-mix(in_srgb,var(--theme-accent)_8%,#0f172a)]" aria-label="Blog Call to Action">
      <div className="relative max-w-xl mx-auto">
        <motion.div className="rounded-2xl p-6 sm:p-8 text-center shadow-lg dark:shadow-black/30" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-primary) 4%, transparent)' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <motion.div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))' }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
            <MessageCircle size={18} className="text-white" />
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight tracking-tight">
            {heading}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 max-w-md mx-auto">
            {description}
          </p>
          <Link href={ctaHref} className="group inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm text-white shadow-md hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }}>
            {ctaLabel}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogCTA;
