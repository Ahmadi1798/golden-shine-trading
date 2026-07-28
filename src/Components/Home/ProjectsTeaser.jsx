'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { DEFAULT_PROJECTS, resolveProjectHref, slugifyProjectTitle } from '../../utils/projects';
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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ProjectsTeaser = ({ content = {} }) => {
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
      heading: 'Featured Projects',
      description: 'A quick look at the work we\'ve done for forward-thinking brands.',
      sectionLabel: 'Featured Projects',
      eyebrow: 'Our Work',
      viewProject: 'View Project',
      ctaLabel: 'View Full Portfolio',
      ctaAria: 'View full portfolio',
      projects: [
        {
          title: 'TechNova Redesign',
          image: '/images/1.jpg',
          description: 'Full website redesign + SEO optimization. Increased engagement by 48%.',
          category: 'web',
        },
        {
          title: 'GlowCare App UI',
          image: '/images/2.jpg',
          description: 'Mobile app design for a wellness startup. Built with Figma + React Native.',
          category: 'web',
        },
        {
          title: 'NovaFin Dashboard',
          image: '/images/3.jpg',
          description: 'Custom dashboard UI with Tailwind and chart integrations for a fintech product.',
          category: 'data',
        },
      ],
    },
    fa: {
      heading: 'پروژه های برجسته',
      description: 'نگاهی سریع به کارهایی که برای برندهای آینده نگر انجام داده ایم.',
      sectionLabel: 'پروژه های برجسته',
      eyebrow: 'نمونه کارهای ما',
      viewProject: 'مشاهده پروژه',
      ctaLabel: 'مشاهده همه نمونه کارها',
      ctaAria: 'مشاهده همه نمونه کارها',
      projects: [
        {
          title: 'بازطراحی تک نوا',
          image: '/images/1.jpg',
          description: 'بازطراحی کامل وب سایت همراه با بهینه سازی سئو و افزایش ۴۸ درصدی تعامل.',
          category: 'web',
        },
        {
          title: 'رابط اپلیکیشن گلوکر',
          image: '/images/2.jpg',
          description: 'طراحی اپ موبایل برای استارتاپ حوزه سلامت با فیگما و ری اکت نیتیو.',
          category: 'web',
        },
        {
          title: 'داشبورد نوا فین',
          image: '/images/3.jpg',
          description: 'طراحی داشبورد سفارشی با تیلویند و نمودارهای تحلیلی برای فین تک.',
          category: 'data',
        },
      ],
    },
    ps: {
      heading: 'ځلانده پروژې',
      description: 'د هغو کارونو لنډه کتنه چې موږ یې د پرمختګ غوښتونکو برانډونو لپاره کړي دي.',
      sectionLabel: 'ځلانده پروژې',
      eyebrow: 'زموږ کارونه',
      viewProject: 'پروژه وګورئ',
      ctaLabel: 'ټول پورټفولیو وګورئ',
      ctaAria: 'ټول پورټفولیو وګورئ',
      projects: [
        {
          title: 'د ټېکنوا بیا ډیزاین',
          image: '/images/1.jpg',
          description: 'د وېبپاڼې بشپړ بیا ډیزاین او SEO ښه والی چې ۴۸ سلنه تعامل یې زیات کړ.',
          category: 'web',
        },
        {
          title: 'د ګلوکېر اپ UI',
          image: '/images/2.jpg',
          description: 'د روغتیايي سټارټ اپ لپاره د موبایل اپ ډیزاین د Figma او React Native سره.',
          category: 'web',
        },
        {
          title: 'د نوا فین ډشبورډ',
          image: '/images/3.jpg',
          description: 'د فین ټېک محصول لپاره سفارشي ډشبورډ د Tailwind او چارټونو سره.',
          category: 'data',
        },
      ],
    },
  }[language] || {};

  const projects = copy.projects || [];
  const heading = pickText(content.heading, copy.heading || 'Featured Projects');
  const description =
    pickText(content.description, copy.description || 'A quick look at the work we\'ve done for forward-thinking brands.');
  const sectionProjects = Array.isArray(content.projects) && content.projects.length
    ? content.projects.map((item, index) => {
        const defaultSlug = DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length]?.slug || '';
        if (typeof item === 'string') {
          return {
            title: pickText(item, projects[index % projects.length].title),
            slug: defaultSlug || slugifyProjectTitle(pickText(item, projects[index % projects.length].title)),
            image: projects[index % projects.length].image,
            description: projects[index % projects.length].description,
            category: projects[index % projects.length].category || '',
          };
        }
        const fallbackProject = projects[index % projects.length] || {};
        const resolvedTitle = pickText(item?.title, fallbackProject.title || '');
        return {
          title: resolvedTitle,
          slug: slugifyProjectTitle(item?.slug || '') || defaultSlug || slugifyProjectTitle(resolvedTitle || ''),
          image: item?.image || fallbackProject.image,
          description: pickText(item?.description, fallbackProject.description || ''),
          category: item?.category || fallbackProject.category || '',
        };
      })
    : projects.map((project, index) => ({
        ...project,
        slug: project.slug || DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length]?.slug || `project-${index + 1}`,
      }));
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'View Full Portfolio');
  const ctaHref = content.ctaHref || '/portfolio';

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={copy.sectionLabel || 'Featured Projects'}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% 30%, color-mix(in srgb, var(--theme-accent) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 20% 70%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {copy.eyebrow || 'Our Work'}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectionProjects.map((project, i) => {
            const href = resolveProjectHref(project);
            const badge = badgeColors[project.category] || badgeColors.web;
            const projectKey = `${project.slug || project.title || 'project'}-${project.category || 'category'}-${i}`;
            return (
              <motion.div
                key={projectKey}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Link
                  href={href}
                  className="group block bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 60%, transparent), transparent 50%)',
                      }}
                    />

                    {/* Category badge */}
                    {project.category && (
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
                        {project.category}
                      </div>
                    )}
                  </div>

                  <div
                    className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
                  />

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-[var(--theme-primary)]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    {/* View Project arrow */}
                    <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                      {copy.viewProject || 'View Project'}
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
            }}
            aria-label={copy.ctaAria || 'View full portfolio'}
          >
            {ctaLabel}
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsTeaser;
