'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = ({ content = {} }) => {
  const { t, language } = useLanguage();
  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const eyebrow = hasField('eyebrow')
    ? pickText(content.eyebrow, t('home.heroEyebrow', 'Award-winning Agency'))
    : t('home.heroEyebrow', 'Award-winning Agency');
  const heading = hasField('heading')
    ? pickText(content.heading, t('home.heroHeading', 'Elevate Your Brand with Exceptional Digital Experiences'))
    : t('home.heroHeading', 'Elevate Your Brand with Exceptional Digital Experiences');
  const description = hasField('description')
    ? pickText(
      content.description,
      t(
        'home.heroDescription',
        "KarFamSoft crafts scalable, user-focused websites and digital products that help businesses thrive. Let's turn your vision into reality with creativity and technology.",
      ),
    )
    : t(
        'home.heroDescription',
        "KarFamSoft crafts scalable, user-focused websites and digital products that help businesses thrive. Let's turn your vision into reality with creativity and technology.",
      );
  const primaryCta = {
    label:
      content.ctaPrimary?.label ||
      (hasField('ctaLabel') ? pickText(content.ctaLabel, t('home.viewPortfolio', 'View Portfolio')) : t('home.viewPortfolio', 'View Portfolio')),
    href: content.ctaPrimary?.href || (hasField('ctaHref') ? content.ctaHref : '/portfolio'),
  };
  const secondaryCta = {
    label:
      content.ctaSecondary?.label ||
      (hasField('secondaryCtaLabel') ? pickText(content.secondaryCtaLabel, t('home.contactUs', 'Contact Us')) : t('home.contactUs', 'Contact Us')),
    href: content.ctaSecondary?.href || (hasField('secondaryCtaHref') ? content.secondaryCtaHref : '/contact'),
  };
  const imageUrl = hasField('imageUrl') ? content.imageUrl : '/images/heroImage.webp';
  const imageAlt = hasField('imageAlt')
    ? pickText(content.imageAlt, t('home.heroImageAlt', 'Creative agency team collaborating on digital project'))
    : t('home.heroImageAlt', 'Creative agency team collaborating on digital project');

  return (
    <header className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0f172a] pt-24 lg:pt-28 pb-16">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 25% 35%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 75% 65%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 py-10 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--theme-primary)' }}
            >
              {eyebrow}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
              {heading}
            </h1>

            <div
              className="w-16 h-1 rounded-full my-6"
              style={{
                background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              }}
            />

            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={primaryCta.href}
                className="rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                  boxShadow: '0 8px 24px color-mix(in srgb, var(--theme-primary) 30%, transparent)',
                }}
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="rounded-xl border px-7 py-3 text-sm font-semibold transition hover:bg-gray-50 dark:hover:bg-gray-800"
                style={{
                  borderColor: 'color-mix(in srgb, var(--theme-primary) 30%, var(--text-base))',
                  color: 'color-mix(in srgb, var(--theme-primary) 80%, var(--text-base))',
                }}
              >
                {secondaryCta.label}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] lg:max-w-[560px]">
              <div
                className="absolute -inset-4 rounded-[2rem] pointer-events-none"
                style={{
                  background: 'linear-gradient(140deg, color-mix(in srgb, var(--theme-primary) 8%, transparent), color-mix(in srgb, var(--theme-secondary) 5%, transparent))',
                }}
              />
              <div className="relative overflow-hidden rounded-2xl shadow-lg dark:shadow-black/30 bg-white dark:bg-gray-900">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="h-[280px] w-full object-cover sm:h-[350px] lg:h-[min(55vh,480px)]"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
