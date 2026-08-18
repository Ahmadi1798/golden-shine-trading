'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const defaultCategories = [
  { title: 'Used Korean Car Engines', subtitle: 'Diesel & Gasoline', description: 'High-quality used car engines imported directly from Korea, thoroughly inspected for performance and reliability.', image: '/images/products/engine.jpg' },
  { title: 'Used Korean Truck Engines', subtitle: '', description: 'Durable truck engines built to handle heavy loads and demanding commercial use.', image: '/images/products/truck-engine.jpg' },
  { title: 'Used Cabin', subtitle: '', description: 'Complete cabins with panels, seats, and interior components in excellent condition.', image: '/images/products/cabin.jpg' },
  { title: 'Used Half Cuts', subtitle: 'Front cut / Rear cut', description: 'Front and rear half cuts containing engine, transmission, suspension, and body parts.', image: '/images/products/halfcut.jpg' },
  { title: 'Used Transmissions', subtitle: '', description: 'Automatic and manual transmissions tested for smooth shifting and reliability.', image: '/images/products/transmission.jpg' },
  { title: 'Used Spare Parts', subtitle: '', description: 'Wide range of spare parts including alternators, starters, radiators, and more.', image: '/images/products/spareparts.jpg' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ProductCategories = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Product Categories');
  const description = pickText(content.description, 'Browse our full range of Korean used automobile parts.');

  const categories = Array.isArray(content.categories) && content.categories.length
    ? content.categories.map((item, index) => {
        const fb = defaultCategories[index % defaultCategories.length];
        if (typeof item === 'string') return { title: item, subtitle: fb.subtitle, description: fb.description, image: fb.image };
        return {
          title: pickText(item?.title, fb.title),
          subtitle: pickText(item?.subtitle || '', fb.subtitle),
          description: pickText(item?.description, fb.description),
          image: item?.image || fb.image || '/images/products/placeholder.jpg',
        };
      })
    : defaultCategories;

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Product Categories"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={category.image} alt={category.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 60%, transparent), transparent 50%)' }} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-[var(--theme-primary)]">{category.title}</h3>
                {category.subtitle && <p className="text-sm font-medium mb-3" style={{ color: 'var(--theme-accent)' }}>{category.subtitle}</p>}
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)] transition-all duration-300">
                  Read More
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProductCategories;
