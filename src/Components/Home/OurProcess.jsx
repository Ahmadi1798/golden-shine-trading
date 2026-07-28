import { Search, PenTool, Code2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLanguage } from '../../context/LanguageContext';

const OurProcess = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const defaultsByLanguage = {
    en: {
      heading: 'How We Work',
      description: 'Our process merges strategy, design, and development into one seamless journey.',
      sectionLabel: 'Our Process',
      prev: 'Previous step',
      next: 'Next step',
      steps: [
        {
          title: 'Discover',
          icon: Search,
          description: 'We listen, align on goals, and explore opportunities.',
        },
        {
          title: 'Design',
          icon: PenTool,
          description: 'We craft intuitive, elegant, and user-focused visuals.',
        },
        {
          title: 'Develop',
          icon: Code2,
          description: 'We build clean, scalable, and responsive digital products.',
        },
        {
          title: 'Deliver & Evolve',
          icon: RefreshCw,
          description: 'We launch, measure, and improve continuously.',
        },
      ],
    },
    fa: {
      heading: 'چگونه کار می کنیم',
      description: 'فرآیند ما استراتژی، طراحی و توسعه را در یک مسیر منسجم ترکیب می کند.',
      sectionLabel: 'فرآیند ما',
      prev: 'مرحله قبلی',
      next: 'مرحله بعدی',
      steps: [
        {
          title: 'کشف',
          icon: Search,
          description: 'گوش می دهیم، اهداف را همسو می کنیم و فرصت ها را بررسی می کنیم.',
        },
        {
          title: 'طراحی',
          icon: PenTool,
          description: 'رابط ها و تجربه های کاربری روان، زیبا و کاربردی خلق می کنیم.',
        },
        {
          title: 'توسعه',
          icon: Code2,
          description: 'محصولات دیجیتال تمیز، مقیاس پذیر و واکنش گرا می سازیم.',
        },
        {
          title: 'تحویل و بهبود',
          icon: RefreshCw,
          description: 'راه اندازی می کنیم، می سنجیم و به شکل مداوم بهبود می دهیم.',
        },
      ],
    },
    ps: {
      heading: 'موږ څنګه کار کوو',
      description: 'زموږ بهیر ستراتیژي، ډیزاین او پراختیا په یوه منظم سفر کې سره یوځای کوي.',
      sectionLabel: 'زموږ بهیر',
      prev: 'مخکینی پړاو',
      next: 'راتلونکی پړاو',
      steps: [
        {
          title: 'موندنه',
          icon: Search,
          description: 'موږ اورو، موخې همغږې کوو او فرصتونه ارزونه کوو.',
        },
        {
          title: 'ډیزاین',
          icon: PenTool,
          description: 'ساده، ښکلي او کارونکي-محور لیدیز حلونه جوړوو.',
        },
        {
          title: 'پراختیا',
          icon: Code2,
          description: 'پاک، غځېدونکي او ځواب ویونکي ډیجیټل محصولات جوړوو.',
        },
        {
          title: 'سپارل او وده',
          icon: RefreshCw,
          description: 'محصول خپروو، پایلې سنجوو او پرله پسې یې ښه کوو.',
        },
      ],
    },
  };

  const defaults = defaultsByLanguage[language] || defaultsByLanguage.en;
  const heading = pickText(content.heading, defaults.heading);
  const description = pickText(content.description, defaults.description);
  const sectionSteps = Array.isArray(content.steps) && content.steps.length
    ? content.steps.map((step, index) => ({
        title: pickText(typeof step === 'string' ? step : step.title, defaults.steps[index % defaults.steps.length].title),
        description: pickText(typeof step === 'string' ? '' : step.description, defaults.steps[index % defaults.steps.length].description),
        icon: defaults.steps[index % defaults.steps.length].icon,
      }))
    : defaults.steps;

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label={defaults.sectionLabel}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 80%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {defaults.sectionLabel}
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

        <div className="relative">
          <button
            className="process-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:-translate-x-0.5"
            aria-label={defaults.prev}
          >
            <ChevronLeft size={16} strokeWidth={2} />
          </button>

          <button
            className="process-next absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:translate-x-0.5"
            aria-label={defaults.next}
          >
            <ChevronRight size={16} strokeWidth={2} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: '.process-prev',
              nextEl: '.process-next',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-process',
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {sectionSteps.map((step, i) => (
              <SwiperSlide key={i}>
                <div className="group relative bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 h-full">
                  <div
                    className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
                  />

                  <div className="flex flex-col items-start">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, transparent)',
                        color: 'var(--theme-primary)',
                      }}
                    >
                      <step.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="swiper-pagination-process flex justify-center gap-2 mt-2"></div>

        <style>{`
          .swiper-pagination-process .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: color-mix(in srgb, var(--theme-primary) 30%, transparent);
            opacity: 0.5;
            transition: all 0.3s ease;
            border-radius: 9999px;
          }
          .swiper-pagination-process .swiper-pagination-bullet:hover {
            opacity: 0.8;
          }
          .swiper-pagination-process .swiper-pagination-bullet-active {
            background: var(--theme-primary);
            opacity: 1;
            width: 24px;
            border-radius: 9999px;
          }
        `}</style>
      </div>
    </motion.section>
  );
};

export default OurProcess;
