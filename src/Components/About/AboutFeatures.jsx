'use client';

import { motion } from 'framer-motion';
import { Globe2, ShieldCheck, Tags, Truck, Users, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const defaultFeatures = [
  { title: 'Global Import and Export Expertise', description: 'Extensive international network with proven expertise in importing and exporting across global markets.', icon: Globe2 },
  { title: 'Premium Quality Products', description: 'Every part is carefully sourced and inspected to ensure premium quality and dependable performance.', icon: ShieldCheck },
  { title: 'Competitive Pricing', description: 'Direct sourcing keeps our pricing competitive without ever compromising on quality.', icon: Tags },
  { title: 'Fast & Secure Worldwide Shipping', description: 'Reliable logistics deliver your orders quickly and securely, anywhere in the world.', icon: Truck },
  { title: 'Professional Customer Support', description: 'Our knowledgeable team provides responsive guidance and support at every step.', icon: Users },
  { title: 'Trusted Business Partner', description: 'We build lasting relationships through integrity, transparency, and exceptional service.', icon: Award },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const AboutFeatures = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Why Choose Golden Shine Trading');
  const description = pickText(content.description, 'The reasons our customers trust us for their auto parts needs.');

  const features = Array.isArray(content.features) && content.features.length
    ? content.features.map((item, index) => {
        const fb = defaultFeatures[index % defaultFeatures.length];
        if (typeof item === 'string') return { title: item, description: fb.description, icon: fb.icon };
        return { title: pickText(item?.title, fb.title), description: pickText(item?.description, fb.description), icon: fb.icon };
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
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in srgb, var(--theme-secondary) 5%, transparent) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 70%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--theme-primary)' }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Why Choose Us
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {heading}
          </motion.h2>
          <motion.p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="group relative bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)', color: 'var(--theme-primary)' }}>
                <feature.icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutFeatures;
