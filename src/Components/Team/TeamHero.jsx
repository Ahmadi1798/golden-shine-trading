'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TeamHero = ({ content = {} }) => {
  const { t, language } = useLanguage();
  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const eyebrow = pickText(
    hasField('eyebrow') ? content.eyebrow : undefined,
    t('team.eyebrow', 'Our Team')
  );
  const heading = pickText(
    hasField('heading') ? content.heading : undefined,
    t('team.heading', 'Meet the People Behind the Work')
  );
  const description = pickText(
    hasField('description') ? content.description : undefined,
    t(
      'team.description',
      'We are a focused team of strategists, designers, and engineers building modern digital products that feel effortless and perform reliably.',
    )
  );

  return (
    <section className="relative pt-28 lg:pt-32 pb-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 25% 35%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 75% 65%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
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

        <motion.div
          className="w-16 h-1 rounded-full mx-auto mb-6"
          style={{
            background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        />

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

export default TeamHero;
