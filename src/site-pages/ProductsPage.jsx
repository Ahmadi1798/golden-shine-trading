'use client';

import ProductsHero from '../Components/Products/ProductsHero';
import ProductsList from '../Components/Products/ProductsList';
import ProductsCTA from '../Components/Products/ProductsCTA';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';

const sectionRegistry = {
  productshero: ProductsHero,
  productcategories: ProductsList,
  productscta: ProductsCTA,
};

const sectionAliases = {
  hero: 'productshero',
  products: 'productcategories',
  productslist: 'productcategories',
  categories: 'productcategories',
  cta: 'productscta',
};

const defaultOrder = ['productshero', 'productcategories', 'productscta'];

const normalizeSectionId = (value = '') => {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');
  return sectionAliases[normalized] || normalized;
};

const ProductsPage = ({ sections = [] }) => {
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
    <div className="home-page-theme-bg">
      {finalOrder.map((id) => {
        const Component = sectionRegistry[id];
        if (!Component) return null;
        return <Component key={id} content={contentMap[id]} />;
      })}
    </div>
  );
};
export default ProductsPage;
