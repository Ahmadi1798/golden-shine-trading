'use client';

import AboutHero from '../Components/About/AboutHero';
import WhoWeAre from '../Components/About/whoWeAre';
import CoreValues from '../Components/About/CoreValues';
import OurApproach from '../Components/About/OurApproach';
import AboutCTA from '../Components/About/AboutCTA';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  abouthero: AboutHero,
  whoweare: WhoWeAre,
  corevalues: CoreValues,
  ourapproach: OurApproach,
  aboutcta: AboutCTA,
};

const sectionAliases = {
  hero: 'abouthero',
  abouthero: 'abouthero',
  about: 'abouthero',
  whowearesection: 'whoweare',
  values: 'corevalues',
  cta: 'aboutcta',
};

const defaultOrder = ['abouthero', 'whoweare', 'corevalues', 'ourapproach', 'aboutcta'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const AboutPage = ({ sections = [] }) => {
  const { language } = useLanguage();
  const contentMap = Array.isArray(sections)
    ? sections.reduce((acc, section) => {
        const id = normalizeSectionId(section.sectionKey || section.sectionType);
        acc[id] = resolveLocalizedContent(section.content?.content || {}, language);
        return acc;
      }, {})
    : {};

  const dbOrder = Array.isArray(sections)
    ? sections
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .filter((s) => s.isVisible !== false)
        .map((s) => normalizeSectionId(s.sectionKey || s.sectionType))
        .filter((id) => sectionRegistry[id])
    : [];

  const finalOrder = dbOrder.length ? dbOrder : defaultOrder;

  return (
    <div className="about-page-theme-bg">
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        return <Component key={id} content={contentMap[id]} />;
      })}
    </div>
  );
};
export default AboutPage;
