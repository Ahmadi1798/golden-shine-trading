'use client';

import { Suspense } from 'react';
import BlogTeaser from '../Components/Home/BlogTeaser';
import HomeFAQ from '../Components/Home/HomeFAQ';
import OurProcess from '../Components/Home/OurProcess';
import { CTA, Hero, Portfolio, Services, Testimonials } from '../Components/sections';
import HeroSlider from '../Components/sections/HeroSlider';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  hero: Hero,
  heroSlider: HeroSlider,
  services: Services,
  testimonials: Testimonials,
  process: OurProcess,
  portfolio: Portfolio,
  blog: BlogTeaser,
  faq: HomeFAQ,
  cta: CTA,
};

const sectionAliases = {
  homehero: 'hero',
  herosection: 'hero',
  homeheroslider: 'heroSlider',
  heroslider: 'heroSlider',
  sliderhero: 'heroSlider',
  service: 'services',
  homeservices: 'services',
  servicespreview: 'services',
  features: 'testimonials',
  testimonial: 'testimonials',
  testimonails: 'testimonials',
  whychooseus: 'testimonials',
  ourapproach: 'process',
  ourprocess: 'process',
  homeportfolio: 'portfolio',
  projectsteaser: 'portfolio',
  homeblog: 'blog',
  blogteaser: 'blog',
  homefaq: 'faq',
};

const defaultOrder = ['hero', 'services', 'testimonials', 'process', 'portfolio', 'blog', 'faq', 'cta'];

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

  const finalOrder = dbOrder.length
    ? [...new Set([
        ...dbOrder,
        ...defaultOrder.filter((id) => !(id === 'hero' && dbOrder.includes('heroSlider'))),
      ])]
    : defaultOrder;

  return (
    <div className="home-page-theme-bg">
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        const element = <Component key={id} content={contentMap[id]} />;
        if (id === 'blog') {
          return (
            <Suspense key={id} fallback={null}>
              {element}
            </Suspense>
          );
        }
        return element;
      })}
    </div>
  );
};
export default HomePage;
