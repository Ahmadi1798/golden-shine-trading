'use client';

import { useMemo } from 'react';
import PortfolioHero from '../Components/Portfolio/PortfolioHero';
import ProjectsGallery from '../Components/Portfolio/ProjectsGallery';
import ProtfolioCTA from '../Components/Portfolio/ProtfolioCTA';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  portfoliohero: PortfolioHero,
  projectsgallery: ProjectsGallery,
  portfoliocta: ProtfolioCTA,
};

const sectionAliases = {
  hero: 'portfoliohero',
  portfolio: 'projectsgallery',
  projects: 'projectsgallery',
  cta: 'portfoliocta',
  protfoliocta: 'portfoliocta',
};

const defaultOrder = ['portfoliohero', 'projectsgallery', 'portfoliocta'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const PortfolioPage = ({ sections = [] }) => {
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
        return <Component key={id} content={contentMap[id]} />;
      })}
    </div>
  );
};
export default PortfolioPage;
