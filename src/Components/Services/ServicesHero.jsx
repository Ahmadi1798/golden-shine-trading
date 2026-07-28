import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ServicesHero = ({ content = {} }) => {
  const { language } = useLanguage();
  const copy = {
    en: {
      heading: 'Our Services',
      description: 'From concept to execution, we craft scalable digital services that blend strategy, design, and engineering.',
      ctaLabel: 'Get in Touch',
      sectionLabel: 'KarFamSoft Services',
      eyebrow: 'Services',
      ctaAria: 'Get in touch',
    },
    fa: {
      heading: 'خدمات ما',
      description: 'از ایده تا اجرا، خدمات دیجیتال مقیاس پذیر ارائه می کنیم که استراتژی، طراحی و مهندسی را یکپارچه می کند.',
      ctaLabel: 'ارتباط با ما',
      sectionLabel: 'خدمات کارفم سافت',
      eyebrow: 'خدمات',
      ctaAria: 'ارتباط با ما',
    },
    ps: {
      heading: 'زموږ خدمتونه',
      description: 'له مفکورې تر اجرا پورې، موږ پراخېدونکي ډیجیټل خدمتونه وړاندې کوو چې ستراتیژي، ډیزاین او انجنیرۍ سره یوځای کوي.',
      ctaLabel: 'اړیکه ونیسئ',
      sectionLabel: 'د KarFamSoft خدمتونه',
      eyebrow: 'خدمتونه',
      ctaAria: 'اړیکه ونیسئ',
    },
  }[language] || {};

  const heading = content.heading || copy.heading || 'Our Services';
  const description =
    content.description || copy.description || 'From concept to execution, we craft scalable digital services that blend strategy, design, and engineering.';
  const ctaLabel = content.ctaLabel || copy.ctaLabel || 'Get in Touch';
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section
      className="relative pt-28 lg:pt-32 pb-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      aria-label={copy.sectionLabel || 'KarFamSoft Services'}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 30% 30%, color-mix(in srgb, var(--theme-primary) 6%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 70% 70%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--theme-primary)' }} />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--theme-accent)' }} />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {copy.eyebrow || 'Services'}
        </motion.span>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heading}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2.5 font-semibold px-8 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 text-base text-white"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
              boxShadow: '0 12px 28px color-mix(in srgb, var(--theme-primary) 30%, transparent)',
            }}
            aria-label={copy.ctaAria || 'Get in touch'}
          >
            {ctaLabel}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
