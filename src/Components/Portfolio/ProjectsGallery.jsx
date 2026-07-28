import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { DEFAULT_PROJECTS, resolveProjectHref, slugifyProjectTitle } from '../../utils/projects';
import { useLanguage } from '../../context/LanguageContext';

const projectCategories = ['web', 'data'];

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

const defaultFilterCategories = [{ id: 'all', label: 'All' }, ...projectCategories.map((id) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }))];

const ProjectsGallery = ({ content = {} }) => {
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
      sectionLabel: 'Portfolio Gallery',
      all: 'All',
      viewProject: 'View Project',
      imageAltPrefix: 'Portfolio project',
      categoryLabels: { all: 'All', web: 'Web', data: 'Data' },
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
        {
          title: 'Brand Identity for Clover',
          image: '/images/4.jpg',
          description: 'Logo, typography, and print collateral for a sustainable clothing brand.',
          category: 'web',
        },
        {
          title: 'Analytics Dashboard for InsightPro',
          image: '/images/5.jpg',
          description: 'Custom admin panel with live data integration and KPIs for executives.',
          category: 'data',
        },
        {
          title: 'UX Collaboration Platform',
          image: '/images/6.jpg',
          description: 'Built a real-time interface for designers and PMs to co-edit mockups.',
          category: 'web',
        },
      ],
    },
    fa: {
      sectionLabel: 'گالری نمونه کارها',
      all: 'همه',
      viewProject: 'مشاهده پروژه',
      imageAltPrefix: 'پروژه نمونه کار',
      categoryLabels: { all: 'همه', web: 'وب', data: 'داده' },
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
          description: 'داشبورد سفارشی با تیلویند و نمودارهای تحلیلی برای محصول فین تک.',
          category: 'data',
        },
        {
          title: 'هویت برند برای کلاور',
          image: '/images/4.jpg',
          description: 'لوگو، تایپوگرافی و اقلام چاپی برای یک برند پوشاک پایدار.',
          category: 'web',
        },
        {
          title: 'داشبورد تحلیلی اینسایت پرو',
          image: '/images/5.jpg',
          description: 'پنل مدیریتی با یکپارچه سازی داده زنده و KPI برای مدیران.',
          category: 'data',
        },
        {
          title: 'پلتفرم همکاری UX',
          image: '/images/6.jpg',
          description: 'رابط بلادرنگ برای همکاری طراحان و مدیران محصول در ویرایش نمونه ها.',
          category: 'web',
        },
      ],
    },
    ps: {
      sectionLabel: 'د پورټفولیو ګالري',
      all: 'ټول',
      viewProject: 'پروژه وګورئ',
      imageAltPrefix: 'د پورټفولیو پروژه',
      categoryLabels: { all: 'ټول', web: 'وېب', data: 'ډاټا' },
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
        {
          title: 'د کلاور لپاره د برانډ هویت',
          image: '/images/4.jpg',
          description: 'لوګو، ټایپوګرافي او چاپي مواد د دوامدار کالیو برانډ لپاره.',
          category: 'web',
        },
        {
          title: 'د InsightPro تحلیلي ډشبورډ',
          image: '/images/5.jpg',
          description: 'د مدیرانو لپاره ژوندۍ ډیټا او KPI سره سفارشي اډمین پینل.',
          category: 'data',
        },
        {
          title: 'د UX همکارۍ پلاتفورم',
          image: '/images/6.jpg',
          description: 'د ډیزاینرانو او PM ګانو لپاره ریښتیني وخت ګډ کار انٹرفېس.',
          category: 'web',
        },
      ],
    },
  }[language] || {};

  const fallbackProjects = (copy.projects || []).map((project, index) => ({
    ...project,
    slug: project.slug || DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length]?.slug || `project-${index + 1}`,
  }));
  const categoryLabels = copy.categoryLabels || { all: 'All', web: 'Web', data: 'Data' };

  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = Array.isArray(content.categories) && content.categories.length
    ? content.categories.map((cat) => {
      if (typeof cat === 'string') {
        return { id: cat, label: pickText(cat, categoryLabels[cat] || cat) };
      }
      return {
        ...cat,
        label: pickText(cat.label, categoryLabels[cat.id] || cat.label || cat.id),
      };
    })
    : defaultFilterCategories.map((cat) => ({
      ...cat,
      label: categoryLabels[cat.id] || (cat.id === 'all' ? (copy.all || cat.label) : cat.label),
    }));

  const rawProjects = Array.isArray(content.projects) && content.projects.length
    ? content.projects
    : fallbackProjects;

  const sectionProjects = rawProjects.map((item, index) => {
    const fallback = fallbackProjects[index % fallbackProjects.length] || {};
    const fallbackSlug = fallback.slug || `project-${index + 1}`;
    if (typeof item === 'string') {
      const resolvedTitle = pickText(item, fallback.title || item);
      return {
        title: resolvedTitle,
        slug: fallbackSlug || slugifyProjectTitle(resolvedTitle),
        image: fallback.image,
        description: fallback.description || '',
        category: fallback.category,
      };
    }
    const resolvedTitle = pickText(item?.title, fallback.title || '');
    const sanitizedItemSlug = slugifyProjectTitle(item?.slug || '');
    return {
      title: resolvedTitle,
      slug: sanitizedItemSlug || fallbackSlug || slugifyProjectTitle(resolvedTitle || ''),
      image: item?.image || fallback.image,
      description: pickText(item?.description, fallback.description || ''),
      category: item?.category || fallback.category || '',
    };
  });

  const filteredProjects = activeFilter === 'all'
    ? sectionProjects
    : sectionProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Portfolio Gallery'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 30% 30%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 70% 70%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {filterCategories.map((cat, catIndex) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={`${cat.id || 'category'}-${catIndex}`}
                onClick={() => setActiveFilter(cat.id)}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none"
                style={{
                  color: isActive ? 'white' : 'color-mix(in srgb, var(--theme-primary) 50%, var(--text-base))',
                  background: isActive
                    ? 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))'
                    : 'transparent',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const href = resolveProjectHref(project);
              const badge = badgeColors[project.category] || badgeColors.web;
              const projectKey = `${project.slug || project.title || 'project'}-${project.category || 'category'}-${index}`;
              return (
                <motion.div
                  key={projectKey}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={href}
                    className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col"
                    itemScope
                    itemType="http://schema.org/CreativeWork"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${copy.imageAltPrefix || 'Portfolio project'}: ${project.title}`}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        itemProp="image"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 50%, transparent), transparent 50%)',
                        }}
                      />

                      {/* Category Badge */}
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = badge.hoverBg;
                          e.currentTarget.style.color = badge.hoverText;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = badge.bg;
                          e.currentTarget.style.color = badge.text;
                        }}
                      >
                        {categoryLabels[project.category] || project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 text-left">
                      <h3
                        className="font-bold text-lg text-gray-900 dark:text-white mb-2.5 transition-colors duration-300 group-hover:text-[var(--theme-primary)]"
                        itemProp="name"
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400 flex-1 leading-relaxed mb-4"
                        itemProp="description"
                      >
                        {project.description}
                      </p>

                      {/* Arrow */}
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                        {copy.viewProject || 'View Project'}
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
