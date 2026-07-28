import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ServicesCTA = ({ content = {} }) => {
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
      heading: 'Let\'s Bring Your Vision to Life',
      description: 'Whether you need a complete digital overhaul or a small strategic shift, KarFamSoft Agency is ready to collaborate.',
      ctaLabel: 'Contact Us',
      sectionLabel: 'Services Call to Action',
      ctaAria: 'Contact KarFamSoft Agency',
    },
    fa: {
      heading: 'بیایید چشم انداز شما را واقعی کنیم',
      description: 'چه به تحول کامل دیجیتال نیاز داشته باشید و چه یک تغییر استراتژیک کوچک، کارفم سافت آماده همکاری است.',
      ctaLabel: 'تماس با ما',
      sectionLabel: 'دعوت به اقدام خدمات',
      ctaAria: 'تماس با کارفم سافت',
    },
    ps: {
      heading: 'راځئ ستاسې لید عملي کړو',
      description: 'که بشپړ ډیجیټل بدلون ته اړتیا لرئ او که کوچني ستراتیژیک بدلون ته، KarFamSoft Agency د همکارۍ لپاره چمتو ده.',
      ctaLabel: 'موږ سره اړیکه',
      sectionLabel: 'د خدمتونو بلنه د اقدام لپاره',
      ctaAria: 'KarFamSoft Agency سره اړیکه',
    },
  }[language] || {};

  const heading = pickText(content.heading, copy.heading || 'Let\'s Bring Your Vision to Life');
  const description =
    pickText(content.description, copy.description || 'Whether you need a complete digital overhaul or a small strategic shift, KarFamSoft Agency is ready to collaborate.');
  const ctaLabel = pickText(content.ctaLabel, copy.ctaLabel || 'Contact Us');
  const ctaHref = content.ctaHref || '/contact';

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Services Call to Action'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 40% at 50% 30%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 80% 80%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-4xl mx-auto">
        <div className="rounded-2xl p-[1px]" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))' }}>
          <div className="rounded-2xl bg-white dark:bg-gray-950 px-6 py-10 sm:px-10 sm:py-12">
            <div className="max-w-xl mx-auto text-center">
              <motion.div
                className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>

              <motion.h2
                className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {heading}
              </motion.h2>

              <motion.p
                className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed"
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
                  className="group inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 text-sm text-white"
                  style={{
                    background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                  }}
                  aria-label={copy.ctaAria || 'Contact KarFamSoft Agency'}
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
