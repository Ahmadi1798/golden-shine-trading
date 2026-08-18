'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const defaultProducts = [
  {
    title: 'Used Korean Car Engines',
    subtitle: 'Diesel & Gasoline',
    image: '/images/products/engine.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Truck Engines',
    subtitle: '',
    image: '/images/products/truck-engine.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Whole Truck',
    subtitle: '',
    image: '/images/products/cabin.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Machineries',
    subtitle: '',
    image: '/images/products/truck-engine.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Half Cuts',
    subtitle: 'Front cut / Rear cut',
    image: '/images/products/halfcut.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Transmission',
    subtitle: '',
    image: '/images/products/transmission.jpg',
    href: '/products',
  },
  {
    title: 'Used Korean Auto Parts',
    subtitle: '',
    image: '/images/products/spareparts.jpg',
    href: '/products',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ServicesPreview = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const sectionHeading = pickText(content.heading, 'Our Products');
  const sectionDescription = pickText(
    content.description,
    'We specialize in import, export, and wholesale of Korean used automobile engines and spare parts.',
  );
  const products = Array.isArray(content.services) && content.services.length
    ? content.services.map((item, index) => {
        const fallback = defaultProducts[index % defaultProducts.length] || {};
        if (typeof item === 'string') {
          return { title: pickText(item, fallback.title || ''), subtitle: '', image: fallback.image, href: fallback.href };
        }
        return {
          title: pickText(item?.title, fallback.title || ''),
          subtitle: pickText(item?.subtitle || '', fallback.subtitle || ''),
          image: item?.image || fallback.image || '/images/products/placeholder.jpg',
          href: item?.href || fallback.href || '/products',
        };
      })
    : defaultProducts;

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Our Products"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 10% 20%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 90% 80%, color-mix(in srgb, var(--theme-accent) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            What We Offer
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sectionHeading}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sectionDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative h-72 md:h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <img
                src={product.image || '/images/products/placeholder.jpg'}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)',
                }}
              />
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                  {product.title}
                </h3>
                {product.subtitle && (
                  <p className="text-sm text-white/65 mb-4">{product.subtitle}</p>
                )}
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition-colors group/link"
                >
                  <span className="relative">
                    Read More
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
                  </span>
                  <ArrowUpRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesPreview;
