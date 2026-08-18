'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PRODUCT_CATEGORIES, resolveProductHref } from '../../utils/products';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ProductsList = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const [activeCategory, setActiveCategory] = useState('All');

  const heading = pickText(content.heading, 'Our Products');
  const description = pickText(content.description, 'Browse our full range of Korean used automobile parts.');

  const products = Array.isArray(content.products) && content.products.length
    ? content.products.map((item, index) => ({
        title: pickText(item?.title, `Product ${index + 1}`),
        category: item?.category || PRODUCT_CATEGORIES[index % PRODUCT_CATEGORIES.length],
        image: item?.image || '/images/products/placeholder.jpg',
        description: pickText(item?.description, ''),
        slug: item?.slug || '',
      }))
    : [];

  const configuredCategories = Array.isArray(content.categories)
    ? content.categories.map((c) => String(c).trim()).filter(Boolean)
    : [];

  const usedCategories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const categories = configuredCategories.length
    ? configuredCategories
    : usedCategories.length
      ? usedCategories
      : PRODUCT_CATEGORIES;
  const filterTabs = ['All', ...categories];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Our Products"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--theme-primary)' }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }}>
            Browse Our Range
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {heading}
          </motion.h2>
          <motion.p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {description}
          </motion.p>
        </div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-12" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}>
          {filterTabs.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: isActive ? 'var(--theme-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--theme-primary)',
                  border: `1px solid ${isActive ? 'var(--theme-primary)' : 'color-mix(in srgb, var(--theme-primary) 25%, transparent)'}`,
                }}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div key={`${product.title}-${i}`} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants}>
              <Link href={resolveProductHref(product)} className="group block bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 60%, transparent), transparent 50%)' }} />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 18%, white)', color: 'var(--theme-accent)' }}>
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-[var(--theme-primary)]">{product.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{product.description}</p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                    Read More
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {!filteredProducts.length && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">No products found in this category.</p>
        )}
      </div>
    </motion.section>
  );
};

export default ProductsList;
