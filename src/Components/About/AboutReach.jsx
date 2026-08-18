'use client';

import { motion } from 'framer-motion';
import { Globe2, Ship, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const stats = [
  { value: '30+', label: 'Countries Served', icon: Globe2 },
  { value: '2014', label: 'Established', icon: Building2 },
  { value: '20K+', label: 'Engines in Stock', icon: Ship },
];

const AboutReach = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Worldwide Distribution');
  const description = pickText(
    content.description,
    'We have full facilities and expertise to prepare shipments and load containers. Our wide international network currently exports to more than 30 countries covering Asia, Middle East, Africa, USA, Australia, New Zealand, South America, and Europe. All engines and parts are carefully selected and inspected prior to shipment.',
  );

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Worldwide Distribution"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 50%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)' }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--theme-accent)' }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          Global Reach
        </motion.span>
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {heading}
        </motion.h2>
        <motion.p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {description}
        </motion.p>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
                <stat.icon size={24} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: 'var(--theme-accent)' }}>{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutReach;
