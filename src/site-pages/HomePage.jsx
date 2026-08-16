'use client';

import { Brands, HomeAbout, Quote, Services, Testimonials } from '../Components/sections';
import HeroSlider from '../Components/sections/HeroSlider';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  heroSlider: HeroSlider,
  services: Services,
  about: HomeAbout,
  brands: Brands,
  testimonials: Testimonials,
  quote: Quote,
};

const sectionAliases = {
  homehero: 'heroSlider',
  herosection: 'heroSlider',
  homeheroslider: 'heroSlider',
  heroslider: 'heroSlider',
  sliderhero: 'heroSlider',
  homeservices: 'services',
  homeabout: 'about',
  homebrands: 'brands',
  features: 'testimonials',
  testimonial: 'testimonials',
  testimonails: 'testimonials',
  whychooseus: 'testimonials',
  homequote: 'quote',
};

const defaultOrder = ['heroSlider', 'services', 'about', 'brands', 'testimonials', 'quote'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const HomePage = ({ sections = [] }) => {
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

  const finalOrder = (() => {
    if (!dbOrder.length) return defaultOrder;
    const merged = [...dbOrder];
    for (const id of defaultOrder) {
      if (!merged.includes(id)) {
        let insertIdx = 0;
        const prevIdx = defaultOrder.indexOf(id) - 1;
        if (prevIdx >= 0) {
          const prevInMerged = merged.indexOf(defaultOrder[prevIdx]);
          if (prevInMerged >= 0) insertIdx = prevInMerged + 1;
        }
        merged.splice(insertIdx, 0, id);
      }
    }
    return merged;
  })();

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
export default HomePage;
