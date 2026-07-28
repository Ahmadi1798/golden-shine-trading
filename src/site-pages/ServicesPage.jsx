'use client';

import { useMemo } from 'react';
import ServicesCTA from '../Components/Services/ServicesCTA';
import ServicesHero from '../Components/Services/ServicesHero';
import ServicesList from '../Components/Services/ServicesList';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  serviceshero: ServicesHero,
  serviceslist: ServicesList,
  servicescta: ServicesCTA,
};

const sectionAliases = {
  hero: 'serviceshero',
  services: 'serviceslist',
  servicesoverview: 'serviceslist',
  list: 'serviceslist',
  cta: 'servicescta',
};

const defaultOrder = ['serviceshero', 'serviceslist', 'servicescta'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const ServicesPage = ({ sections = [] }) => {
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

    if (!dbOrder.length) return defaultOrder;

    // Keep canonical services flow stable (hero -> list -> cta), then append any extra sections.
    return [...new Set([...defaultOrder, ...dbOrder])];
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
export default ServicesPage;
