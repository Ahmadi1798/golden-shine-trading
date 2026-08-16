'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PhotosHero = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Photo Gallery');
  const description = pickText(
    content.description,
    'A look inside our warehouse, products, and day-to-day operations at Golden Shine Trading.',
  );
  const imageUrl = content.imageUrl || '/images/about/about-preview.jpg';

  return (
    <section className="relative flex min-h-[40vh] md:min-h-[50vh] items-center overflow-hidden bg-[#080810]">
      <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080810]/70 via-[#080810]/40 to-[#080810]/90" />
      <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, var(--theme-primary) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.08]" style={{ background: 'radial-gradient(ellipse 40% 40% at 70% 50%, var(--theme-accent) 0%, transparent 70%)' }} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
        <motion.span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--theme-accent)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Photo Album
        </motion.span>
        <motion.h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {heading}
        </motion.h1>
        <motion.p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PhotosHero;
