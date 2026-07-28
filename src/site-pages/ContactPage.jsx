'use client';

import { Contact } from '../Components/sections';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  contact: Contact,
};

const sectionAliases = {
  contactform: 'contact',
};

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const ContactPage = ({ sections = [], siteSettings = null }) => {
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

  const finalOrder = dbOrder.length ? [...new Set([...dbOrder, 'contact'])] : ['contact'];

  return (
    <div>
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        return <Component key={id} content={contentMap[id]} siteSettings={siteSettings} />;
      })}
    </div>
  );
};
export default ContactPage;
