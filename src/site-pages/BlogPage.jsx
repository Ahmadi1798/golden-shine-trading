'use client';

import { useMemo } from 'react';
import { Suspense } from 'react';
import BlogCTA from '../Components/Blogs/BlogCTA';
import BlogHero from '../Components/Blogs/BlogHero';
import BlogPosts from '../Components/Blogs/BlogPosts';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  bloghero: BlogHero,
  blogposts: BlogPosts,
  blogcta: BlogCTA,
};

const sectionAliases = {
  hero: 'bloghero',
  posts: 'blogposts',
  blog: 'blogposts',
  cta: 'blogcta',
};

const defaultOrder = ['bloghero', 'blogposts', 'blogcta'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const BlogPage = ({ sections = [] }) => {
  const { language } = useLanguage();
  const normalizedSections = useMemo(() => {
    if (!Array.isArray(sections)) return [];
    return [...sections].sort((a, b) => (Number(a?.orderIndex) || 0) - (Number(b?.orderIndex) || 0));
  }, [sections]);

  const contentMap = useMemo(
    () =>
      normalizedSections.reduce((acc, section) => {
        const id = normalizeSectionId(section.sectionKey || section.sectionType);
          acc[id] = resolveLocalizedContent(section.content?.content || {}, language);
        return acc;
      }, {}),
      [language, normalizedSections]
  );

  const finalOrder = useMemo(() => {
    const dbOrder = normalizedSections
      .filter((s) => s.isVisible !== false)
      .map((s) => normalizeSectionId(s.sectionKey || s.sectionType))
      .filter((id) => sectionRegistry[id]);

    return dbOrder.length ? [...new Set([...defaultOrder, ...dbOrder])] : defaultOrder;
  }, [normalizedSections]);

  return (
    <div className="home-page-theme-bg">
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        if (id === 'blogposts') {
          return (
            <Suspense key={id} fallback={null}>
              <Component content={contentMap[id]} />
            </Suspense>
          );
        }
        return <Component key={id} content={contentMap[id]} />;
      })}
    </div>
  );
};
export default BlogPage;
