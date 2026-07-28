'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const HomeFAQ = ({ content = {} }) => {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const defaultFaqs = [
    {
      question: t('home.faqQ1', 'What services does KarFamSoft offer?'),
      answer: t(
        'home.faqA1',
        'We provide web development, UI/UX design, digital strategy, mobile app design, SEO optimization, and brand identity services.',
      ),
    },
    {
      question: t('home.faqQ2', 'How long does a typical project take?'),
      answer: t(
        'home.faqA2',
        'Timelines vary depending on scope, but most projects range from 4 to 12 weeks from discovery to launch.',
      ),
    },
    {
      question: t('home.faqQ3', 'Do you work with startups and small businesses?'),
      answer: t(
        'home.faqA3',
        'Yes. We work with businesses of all sizes - from early-stage startups to established brands looking to refresh their digital presence.',
      ),
    },
    {
      question: t('home.faqQ4', 'What is your design process like?'),
      answer: t(
        'home.faqA4',
        'We follow a structured process: discover, design, develop, and deliver. Every phase includes collaboration and feedback loops to ensure alignment.',
      ),
    },
  ];

  const heading = content.heading || t('home.faqHeading', 'Frequently Asked Questions');
  const description =
    content.description || t('home.faqDescription', 'Quick answers to common questions about working with us.');
  const faqs = Array.isArray(content.faqs) && content.faqs.length
    ? content.faqs.map((item) => ({
        question: item?.question || '',
        answer: item?.answer || '',
      }))
    : defaultFaqs;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={t('home.faqAria', 'Frequently Asked Questions')}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 80% 30%, color-mix(in srgb, var(--theme-secondary) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 20% 70%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {t('home.faqLabel', 'FAQ')}
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

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className={`flex items-center justify-between w-full p-5 md:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:rounded-2xl ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                  style={{ focusVisibleRingColor: 'var(--theme-primary)' }}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base md:text-lg font-semibold text-gray-900 dark:text-white leading-snug ${
                      isRTL ? 'pl-4' : 'pr-4'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: 'color-mix(in srgb, var(--theme-primary) 60%, transparent)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6">
                        <div
                          className="w-full h-px mb-4"
                          style={{
                            background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))',
                          }}
                        />
                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeFAQ;
