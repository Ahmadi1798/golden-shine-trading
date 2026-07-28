'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ProjectDetails = ({ project = {} }) => {
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
      details: 'Details',
      aboutPrefix: 'About',
      defaultTitle: 'Project',
      defaultDescription: 'A summary of this project and its outcomes.',
      defaultContent: 'Additional project details will be available soon.',
    },
    fa: {
      details: 'جزئیات',
      aboutPrefix: 'درباره',
      defaultTitle: 'پروژه',
      defaultDescription: 'خلاصه ای از این پروژه و نتایج آن.',
      defaultContent: 'جزئیات تکمیلی این پروژه به زودی در دسترس خواهد بود.',
    },
    ps: {
      details: 'جزییات',
      aboutPrefix: 'په اړه',
      defaultTitle: 'پروژه',
      defaultDescription: 'د دې پروژې لنډیز او پایلې.',
      defaultContent: 'د پروژې نور جزییات به ډېر ژر وړاندې شي.',
    },
  }[language] || {};

  const title = pickText(project.title, copy.defaultTitle || 'Project');
  const image = project.image || '/images/1.jpg';
  const description = pickText(project.description, copy.defaultDescription || 'A summary of this project and its outcomes.');
  const fullContent = pickText(project.content, copy.defaultContent || 'Additional project details will be available soon.');

  const paragraphs = fullContent
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]">

      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 70% 30%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 30% 70%, color-mix(in srgb, var(--theme-primary) 2%, transparent) 0%, transparent 50%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="h-px mb-12 w-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--text-base) 6%, transparent)' }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Image (matches content height) */}
          <motion.div
            className="relative min-h-[320px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-xl dark:shadow-black/30"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Details badge */}
            <span
              className="inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4"
              style={{
                background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                color: 'white',
              }}
            >
              {copy.details || 'Details'}
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
              {(copy.aboutPrefix || 'About')} {title}
            </h2>

            {/* Gradient accent bar */}
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{
                background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              }}
            />

            {/* Description lead */}
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              {description}
            </p>

            {/* Detailed paragraphs */}
            {paragraphs.length > 0 && (
              <div className="space-y-5">
                {paragraphs.slice(0, 2).map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
