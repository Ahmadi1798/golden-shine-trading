'use client';

import {
  Code2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const iconByKeyword = [
  [/proven|experience|expertis|modern|stack|technology|technical|full.?stack/i, Code2],
  [/human|centered|design.?first|user.?first|human.?centered|empathy/i, Lightbulb],
  [/speed|responsiveness|fast|quick|perform|clean.?code|efficien/i, Zap],
  [/collaborative|transparent|communication|trust|partner/i, HeartHandshake],
  [/quality|reliable|dependable|robust|stable|enterprise/i, ShieldCheck],
  [/innov|creative|forward|future|cutting.?edge|modern/i, Sparkles],
  [/scalable|growth|grow|scale|expand|result|deliver/i, Rocket],
];

const fallbackIcons = [Sparkles, Lightbulb, Zap, HeartHandshake, Code2, ShieldCheck, Rocket];

const getIconForFeature = (text, index) => {
  if (!text) return fallbackIcons[index % fallbackIcons.length];
  for (const [pattern, icon] of iconByKeyword) {
    if (pattern.test(text)) return icon;
  }
  return fallbackIcons[index % fallbackIcons.length];
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const WhyChooseUs = ({ content = {} }) => {
  const { t, language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const defaultFeatures = [
    t('home.whyFeature1', 'Proven experience with modern tech stacks'),
    t('home.whyFeature2', 'Human-centered, design-first thinking'),
    t('home.whyFeature3', 'Speed, responsiveness, and clean code'),
    t('home.whyFeature4', 'Collaborative and transparent communication'),
  ];

  const heading = pickText(content.heading, t('home.whyHeading', 'Why Choose KarFamSoft?'));
  const description =
    pickText(
      content.description,
      t(
        'home.whyDescription',
        'We bring clarity, design, and code together to help you build experiences that matter.',
      ),
    );
  const points = Array.isArray(content.features) && content.features.length
    ? content.features.map((feature, index) => pickText(feature, defaultFeatures[index % defaultFeatures.length]))
    : defaultFeatures;

  const featureCards = points.map((text, i) => ({
    text,
    icon: getIconForFeature(text, i),
  }));

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={t('home.whyAria', 'Why Choose Us')}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 85% 30%, color-mix(in srgb, var(--theme-secondary) 6%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 15% 70%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {t('home.whyLabel', 'Why us')}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featureCards.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
              />

              <div className="flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  <feature.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                    {feature.text}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 focus:outline-none"
            style={{ color: 'var(--theme-primary)' }}
          >
            {t('home.learnMoreAboutUs', 'Learn more about us')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l5 5-5 5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
