'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { resolveProjectHref } from '../../utils/projects';
import { useLanguage } from '../../context/LanguageContext';

const badgeColors = {
  web: {
    bg: 'color-mix(in srgb, var(--theme-primary) 12%, transparent)',
    text: 'var(--theme-primary)',
    hoverBg: 'var(--theme-primary)',
    hoverText: 'white',
  },
  data: {
    bg: 'color-mix(in srgb, var(--theme-accent) 12%, transparent)',
    text: 'var(--theme-accent)',
    hoverBg: 'var(--theme-accent)',
    hoverText: 'white',
  },
};

const RelatedProjects = ({ projects = [], category = '' }) => {
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
      sectionLabel: 'Related Projects',
      related: 'Related Projects',
      morePrefix: 'More',
      projectsWord: 'Projects',
      viewProject: 'View Project',
      defaultTitle: 'Project',
      defaultDescription: 'Project overview',
      categoryLabels: {
        web: 'Web',
        data: 'Data',
      },
    },
    fa: {
      sectionLabel: 'پروژه های مرتبط',
      related: 'پروژه های مرتبط',
      morePrefix: 'پروژه های بیشتر',
      projectsWord: '',
      viewProject: 'مشاهده پروژه',
      defaultTitle: 'پروژه',
      defaultDescription: 'خلاصه پروژه',
      categoryLabels: {
        web: 'وب',
        data: 'داده',
      },
    },
    ps: {
      sectionLabel: 'اړوندې پروژې',
      related: 'اړوندې پروژې',
      morePrefix: 'نورې',
      projectsWord: 'پروژې',
      viewProject: 'پروژه وګورئ',
      defaultTitle: 'پروژه',
      defaultDescription: 'د پروژې لنډیز',
      categoryLabels: {
        web: 'وېب',
        data: 'ډاټا',
      },
    },
  }[language] || {};

  if (projects.length === 0) return null;

  const categoryLabel = (copy.categoryLabels && copy.categoryLabels[category]) || category;
  const sectionProjects = projects.map((project) => {
    const normalizedCategory = pickText(project.category, project.category || '');
    return {
      ...project,
      title: pickText(project.title, copy.defaultTitle || 'Project'),
      description: pickText(project.description, copy.defaultDescription || 'Project overview'),
      category: normalizedCategory,
      categoryLabel: (copy.categoryLabels && copy.categoryLabels[normalizedCategory]) || normalizedCategory,
    };
  });

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Related Projects'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 30% 30%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 70% 70%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="h-px mb-12 w-full"
          style={{ backgroundColor: 'color-mix(in srgb, var(--text-base) 6%, transparent)' }}
        />

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              color: 'white',
            }}
          >
            {copy.related || 'Related Projects'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {copy.morePrefix || 'More'} {categoryLabel ? `${categoryLabel} ` : ''}{copy.projectsWord || 'Projects'}
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sectionProjects.map((project, index) => {
            const href = resolveProjectHref(project);
            const badge = badgeColors[project.category] || badgeColors.web;
            const projectKey = `${project.slug || project.title || 'project'}-${project.category || 'category'}-${index}`;
            return (
              <motion.div
                key={projectKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={href}
                  className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 50%, transparent), transparent 50%)',
                      }}
                    />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300"
                      style={{ backgroundColor: badge.bg, color: badge.text }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = badge.hoverBg;
                        e.currentTarget.style.color = badge.hoverText;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = badge.bg;
                        e.currentTarget.style.color = badge.text;
                      }}
                    >
                      {project.categoryLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 text-left">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-[var(--theme-primary)]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                      {copy.viewProject || 'View Project'}
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProjects;
