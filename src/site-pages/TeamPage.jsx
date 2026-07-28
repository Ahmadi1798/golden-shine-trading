'use client';

import { useMemo } from 'react';
import TeamHero from '../Components/Team/TeamHero';
import TeamStats from '../Components/Team/TeamStats';
import TeamMembers from '../Components/Team/TeamMembers';
import TeamValues from '../Components/Team/TeamValues';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  teamhero: TeamHero,
  teamstats: TeamStats,
  teammembers: TeamMembers,
  teamvalues: TeamValues,
};

const sectionAliases = {
  hero: 'teamhero',
  stats: 'teamstats',
  members: 'teammembers',
  values: 'teamvalues',
  principles: 'teamvalues',
  team: 'teamhero',
  teammembersection: 'teammembers',
  teamvaluessection: 'teamvalues',
};

const defaultOrder = ['teamhero', 'teamstats', 'teammembers', 'teamvalues'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const TeamPage = ({ sections = [] }) => {
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

    return [...new Set([...defaultOrder, ...dbOrder])];
  }, [normalizedSections]);

  return (
    <main className="bg-white dark:bg-[#0f172a]">
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        return <Component key={id} content={contentMap[id]} />;
      })}
    </main>
  );
};

export default TeamPage;
