import { Search, PenTool, Code2, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const OurApproach = ({ content = {} }) => {
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
      heading: 'Our Approach',
      description: 'We combine strategy, design, and technology in a collaborative process that drives clarity, speed, and results.',
      sectionLabel: 'Our Approach',
      eyebrow: 'How We Work',
      nextStep: 'Next Step',
    },
    fa: {
      heading: 'رویکرد ما',
      description: 'ما استراتژی، طراحی و فناوری را در یک فرآیند مشارکتی ترکیب می کنیم تا شفافیت، سرعت و نتیجه ایجاد شود.',
      sectionLabel: 'رویکرد ما',
      eyebrow: 'شیوه همکاری ما',
      nextStep: 'مرحله بعد',
    },
    ps: {
      heading: 'زموږ تګلاره',
      description: 'موږ ستراتیژي، ډیزاین او ټېکنالوژي په ګډ بهیر کې یوځای کوو څو روڼتیا، چټکتیا او پایله رامنځته شي.',
      sectionLabel: 'زموږ تګلاره',
      eyebrow: 'موږ څنګه کار کوو',
      nextStep: 'بل پړاو',
    },
  }[language] || {};

  const defaults = {
    en: [
      {
        icon: Search,
        title: 'Discover',
        description:
          'We listen deeply and define what success looks like — grounded in user needs and business goals.',
      },
      {
        icon: PenTool,
        title: 'Design',
        description:
          'We translate ideas into visual systems and intuitive experiences that elevate your brand.',
      },
      {
        icon: Code2,
        title: 'Develop',
        description:
          'We build scalable, clean, and responsive systems using modern, maintainable technologies.',
      },
      {
        icon: RefreshCw,
        title: 'Deliver & Evolve',
        description:
          'We launch, optimize, and support continuous growth — because good digital never stops.',
      },
    ],
    fa: [
      {
        icon: Search,
        title: 'کشف',
        description:
          'عمیق گوش می دهیم و تعریف می کنیم موفقیت چه شکلی دارد؛ بر اساس نیاز کاربر و اهداف کسب و کار.',
      },
      {
        icon: PenTool,
        title: 'طراحی',
        description:
          'ایده ها را به سیستم های بصری و تجربه های شهودی تبدیل می کنیم که برند شما را ارتقا می دهد.',
      },
      {
        icon: Code2,
        title: 'توسعه',
        description:
          'سیستم های مقیاس پذیر، تمیز و واکنش گرا با فناوری های مدرن و قابل نگهداری می سازیم.',
      },
      {
        icon: RefreshCw,
        title: 'تحویل و تکامل',
        description:
          'راه اندازی می کنیم، بهینه می کنیم و از رشد مستمر پشتیبانی می کنیم؛ چون دنیای دیجیتال متوقف نمی شود.',
      },
    ],
    ps: [
      {
        icon: Search,
        title: 'موندنه',
        description:
          'موږ ژور اورو او ټاکو چې بریا څنګه ښکاري؛ د کاروونکي اړتیاوو او سوداګریزو موخو پر بنسټ.',
      },
      {
        icon: PenTool,
        title: 'ډیزاین',
        description:
          'نظرونه د بصري سیسټمونو او هوښیار تجربو په بڼه بدل کړو چې ستاسې برانډ لوړ کړي.',
      },
      {
        icon: Code2,
        title: 'پراختیا',
        description:
          'مقیاس کېدونکي، پاک او ځواب ویونکي سیستمونه د عصري او ساتنې وړ ټېکنالوژۍ سره جوړوو.',
      },
      {
        icon: RefreshCw,
        title: 'سپارل او وده',
        description:
          'پیل کوو، اصلاح کوو او پرله پسې وده ملاتړ کوو، ځکه ډیجیټل کار هېڅکله نه درېږي.',
      },
    ],
  };

  const fallbackSteps = defaults[language] || defaults.en;

  const heading = pickText(content.heading, copy.heading || 'Our Approach');
  const description =
    pickText(content.description, copy.description || 'We combine strategy, design, and technology in a collaborative process that drives clarity, speed, and results.');
  const sectionSteps = Array.isArray(content.steps) && content.steps.length
    ? content.steps.map((step, index) => ({
        title: pickText(typeof step === 'string' ? step : step.title, fallbackSteps[index % fallbackSteps.length].title),
        description: pickText(typeof step === 'string' ? '' : step.description, fallbackSteps[index % fallbackSteps.length].description),
        icon: fallbackSteps[index % fallbackSteps.length].icon,
      }))
    : fallbackSteps;

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'Our Approach'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 20%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 80% 80%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {copy.eyebrow || 'How We Work'}
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sectionSteps.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-950 shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300">
                {/* Step number + connecting line */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-sm font-bold tracking-[0.15em]"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'color-mix(in srgb, var(--theme-primary) 14%, transparent)' }} />
                </div>

                <div className="flex flex-col items-start text-left">
                  <div
                    className="p-3 rounded-xl mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
                    }}
                  >
                    <Icon className="text-white" size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2.5">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {description}
                  </p>

                  {/* Arrow indicator on hover */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--theme-primary)' }}>
                    {copy.nextStep || 'Next Step'}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Connector arrow between cards (desktop) */}
              {i < sectionSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 z-10 opacity-20 group-hover:opacity-40 transition-opacity">
                  <ArrowRight size={20} style={{ color: 'var(--theme-primary)' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
