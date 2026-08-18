'use client';

import {
  Layers3,
  Globe2,
  Tags,
  Truck,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const defaultFeatures = [
  { title: 'Genuine Products', description: 'We supply only authentic, thoroughly inspected parts sourced directly from trusted Korean suppliers, ensuring quality and reliability you can count on.', icon: ShieldCheck },
  { title: 'Global Import & Export', description: 'With a wide international network, we import and export quality auto parts across Asia, the Middle East, Africa, South America, and Europe.', icon: Globe2 },
  { title: 'Competitive Prices', description: 'Direct sourcing and efficient operations allow us to offer competitive pricing without compromising on quality or service.', icon: Tags },
  { title: 'Fast Worldwide Shipping', description: 'Our efficient logistics network ensures your orders are prepared and delivered promptly, wherever you are in the world.', icon: Truck },
  { title: 'Professional Support', description: 'Our experienced team is always ready to assist with part selection, technical guidance, and responsive customer service.', icon: Users },
  { title: 'Extensive Inventory', description: 'We maintain a large and diverse stock of quality used Korean parts and engines, ready for immediate dispatch.', icon: Layers3 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const WhyChooseUs = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Satisfaction Priority');
  const description = pickText(
    content.description,
    'The reason that we are trusted by our customers:',
  );
  const features = Array.isArray(content.features) && content.features.length
    ? content.features.map((item, index) => {
        if (typeof item === 'string') {
          const fallback = defaultFeatures[index % defaultFeatures.length];
          return { title: pickText(item, fallback.title), description: fallback.description, icon: fallback.icon };
        }
        const fallback = defaultFeatures[index % defaultFeatures.length];
        return {
          title: pickText(item?.title, fallback.title),
          description: pickText(item?.description, fallback.description),
          icon: fallback.icon,
        };
      })
    : defaultFeatures;

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Why Choose Us"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 85% 30%, color-mix(in srgb, var(--theme-secondary) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 15% 70%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative bg-white dark:bg-gray-950 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
              />

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: i % 2 === 0
                      ? 'color-mix(in srgb, var(--theme-primary) 10%, transparent)'
                      : 'color-mix(in srgb, var(--theme-accent) 12%, transparent)',
                    color: i % 2 === 0 ? 'var(--theme-primary)' : 'var(--theme-accent)',
                  }}
                >
                  <feature.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
