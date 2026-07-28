'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const badgeColors = {
  web: {
    bg: 'color-mix(in srgb, var(--theme-primary) 12%, transparent)',
    text: 'var(--theme-primary)',
  },
  data: {
    bg: 'color-mix(in srgb, var(--theme-accent) 12%, transparent)',
    text: 'var(--theme-accent)',
  },
};

const ProjectHero = ({ project = {} }) => {
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
      sectionLabel: 'Project Details',
      back: 'Back',
      breadcrumb: 'Breadcrumb',
      home: 'Home',
      portfolio: 'Portfolio',
      defaultTitle: 'Project',
      defaultDescription: 'Detailed information about this project will appear here.',
      categoryLabels: {
        web: 'Web',
        data: 'Data',
      },
    },
    fa: {
      sectionLabel: 'جزئیات پروژه',
      back: 'بازگشت',
      breadcrumb: 'مسیر صفحه',
      home: 'خانه',
      portfolio: 'نمونه کارها',
      defaultTitle: 'پروژه',
      defaultDescription: 'جزئیات این پروژه در این بخش نمایش داده می شود.',
      categoryLabels: {
        web: 'وب',
        data: 'داده',
      },
    },
    ps: {
      sectionLabel: 'د پروژې جزییات',
      back: 'بیرته',
      breadcrumb: 'لارښود',
      home: 'کور',
      portfolio: 'پورټفولیو',
      defaultTitle: 'پروژه',
      defaultDescription: 'د دې پروژې جزییات به دلته ښکاره شي.',
      categoryLabels: {
        web: 'وېب',
        data: 'ډاټا',
      },
    },
  }[language] || {};

  const title = pickText(project.title, copy.defaultTitle || 'Project');
  const category = pickText(project.category, '');
  const techs = Array.isArray(project.techs) ? project.techs : [];
  const description = pickText(project.description, copy.defaultDescription || 'Detailed information about this project will appear here.');
  const categoryLabel = (copy.categoryLabels && copy.categoryLabels[category]) || category;

  const badge = badgeColors[category] || badgeColors.web;

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Project Details'}>
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 25% 35%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 75% 65%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Top row: back button + breadcrumb with separator */}
        <motion.div
          className="flex items-center justify-between pb-5 mb-8 border-b"
          style={{ borderColor: 'color-mix(in srgb, var(--text-base) 8%, transparent)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:text-[var(--theme-primary)]"
            style={{ color: 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))' }}
          >
            <span
              className="flex items-center justify-center w-7 h-7 rounded-lg border transition-colors duration-300"
              style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)' }}
            >
              <ArrowLeft size={14} />
            </span>
            {copy.back || 'Back'}
          </Link>

          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500" aria-label={copy.breadcrumb || 'Breadcrumb'}>
            <Link href="/" className="transition-colors duration-300 hover:text-[var(--theme-primary)]">
              {copy.home || 'Home'}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <Link href="/portfolio" className="transition-colors duration-300 hover:text-[var(--theme-primary)]">
              {copy.portfolio || 'Portfolio'}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
              {title}
            </span>
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Category */}
          {category && (
            <span
              className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {categoryLabel}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            {title}
          </h1>

          {/* Gradient accent bar */}
          <div
            className="w-16 h-1 rounded-full mb-6"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
            }}
          />

          {/* Tech stack */}
          {techs.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {techs.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="inline-flex px-3 py-1 rounded-md text-xs font-medium border"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--text-base) 8%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--text-base) 3%, transparent)',
                    color: 'color-mix(in srgb, var(--text-base) 55%, transparent)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
