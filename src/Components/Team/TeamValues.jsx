'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TeamValues = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };
  const copy = {
    en: {
      heading: 'How We Work',
      subheading: 'Our Core Principles',
      defaultValues: [
        { title: 'Build With Clarity', description: 'We simplify complex requirements into practical phases with visible milestones.' },
        { title: 'Design For Humans', description: 'Every decision is made around usability, accessibility, and real user behavior.' },
        { title: 'Ship With Confidence', description: 'Quality and delivery discipline are built into every sprint from day one.' },
      ],
    },
    fa: {
      heading: 'نحوه کار ما',
      subheading: 'اصول کلیدی ما',
      defaultValues: [
        { title: 'شفاف بسازید', description: 'نیازهای پیچیده را به مراحل کاربردی با خروجی قابل مشاهده تبدیل می کنیم.' },
        { title: 'برای انسان طراحی کنید', description: 'هر تصمیم براساس کارپذیری، دسترس پذیری و رفتار واقعی کاربر گرفته می شود.' },
        { title: 'با اطمینان تحویل دهید', description: 'کیفیت و نظم در تحویل از روز اول در هر اسپرینت رعایت می شود.' },
      ],
    },
    ps: {
      heading: 'موږ څنګه کار کوو',
      subheading: 'زموږ بنسټیز اصول',
      defaultValues: [
        { title: 'په روڼتیا جوړول', description: 'موږ پېچلي اړتیاوې په عملي پړاوونو وېشو چې ښکاره مرحلې ولري.' },
        { title: 'د انسان لپاره ډیزاین', description: 'هره پرېکړه د کارېدنې، لاسرسي او حقیقي کاروونکي چلند پر بنسټ کېږي.' },
        { title: 'په ډاډه ډول سپارل', description: 'کیفیت او د سپارنې نظم له لومړۍ ورځې په هر سپرینټ کې شامل وي.' },
      ],
    },
  }[language] || {};

  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);

  const heading = pickText(
    hasField('valuesHeading') ? content.valuesHeading : undefined,
    copy.heading || 'How We Work'
  );
  const defaultValues = copy.defaultValues || [];
  const values = Array.isArray(content.values) && content.values.length
    ? content.values.map((value, index) => {
      const fallback = defaultValues[index % defaultValues.length] || {};
      return {
        ...fallback,
        ...value,
        title: pickText(value?.title, fallback.title || ''),
        description: pickText(value?.description, fallback.description || ''),
      };
    })
    : defaultValues;

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
          >
            {heading}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {pickText(content.valuesSubheading, copy.subheading || 'Our Core Principles')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.article
              key={`${value.title}-${index}`}
              className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{
                  background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))',
                }}
              />

              <div className="p-6 sm:p-8 pt-8 sm:pt-10">
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                  }}
                >
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug transition-colors duration-300 group-hover:text-[var(--theme-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
