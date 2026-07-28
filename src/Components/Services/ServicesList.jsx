import {
  Code,
  Brush,
  BarChart3,
  Smartphone,
  Globe2,
  Layers3,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ServicesList = ({ content = {} }) => {
  const { language } = useLanguage();
  const copy = {
    en: {
      sectionLabel: 'KarFamSoft Services',
      learnMore: 'Learn More',
      services: [
        { title: 'Web Development', icon: Code, description: 'Modern, responsive websites built for performance, scalability, and user experience.' },
        { title: 'UI/UX Design', icon: Brush, description: 'Human-centered design systems that deliver beauty, usability, and consistency.' },
        { title: 'Digital Strategy', icon: BarChart3, description: 'We help define goals and roadmap digital success aligned to your business needs.' },
        { title: 'Mobile App Design', icon: Smartphone, description: 'Designing sleek mobile-first experiences your users will love across all devices.' },
        { title: 'SEO & Web Optimization', icon: Globe2, description: 'Optimized for discoverability and speed to drive organic traffic and user retention.' },
        { title: 'Brand Identity', icon: Layers3, description: 'Logo, typography, color systems and brand collateral built to resonate and scale.' },
      ],
    },
    fa: {
      sectionLabel: 'خدمات کارفم سافت',
      learnMore: 'بیشتر بدانید',
      services: [
        { title: 'توسعه وب', icon: Code, description: 'وب سایت های مدرن و واکنش گرا با تمرکز بر عملکرد، مقیاس پذیری و تجربه کاربری.' },
        { title: 'طراحی UI/UX', icon: Brush, description: 'سیستم های طراحی انسان محور که زیبایی، کارایی و یکپارچگی را ارائه می دهند.' },
        { title: 'استراتژی دیجیتال', icon: BarChart3, description: 'ما اهداف و مسیر موفقیت دیجیتال را متناسب با نیاز کسب و کار شما مشخص می کنیم.' },
        { title: 'طراحی اپلیکیشن موبایل', icon: Smartphone, description: 'طراحی تجربه های موبایل-اول که کاربران شما در همه دستگاه ها دوست خواهند داشت.' },
        { title: 'سئو و بهینه سازی وب', icon: Globe2, description: 'بهینه سازی برای دیده شدن و سرعت، جهت افزایش ترافیک ارگانیک و ماندگاری کاربر.' },
        { title: 'هویت برند', icon: Layers3, description: 'لوگو، تایپوگرافی، رنگ و دارایی های برند برای اثرگذاری و رشد پایدار.' },
      ],
    },
    ps: {
      sectionLabel: 'د KarFamSoft خدمتونه',
      learnMore: 'نور معلومات',
      services: [
        { title: 'وېب پراختیا', icon: Code, description: 'عصري او ځواب ویونکې وېبپاڼې چې د فعالیت، پراخېدو او UX لپاره جوړېږي.' },
        { title: 'UI/UX ډیزاین', icon: Brush, description: 'انساني-محور ډیزاین سیسټمونه چې ښکلا، کارېدنه او ثبات برابروي.' },
        { title: 'ډیجیټل ستراتیژي', icon: BarChart3, description: 'موږ ستاسې د سوداګرۍ اړتیاوو سره سم د ډیجیټل بریا نقشه جوړه وو.' },
        { title: 'د موبایل اپ ډیزاین', icon: Smartphone, description: 'موبایل-اول تجربې چې کاروونکي یې په هر وسیله خوښوي.' },
        { title: 'SEO او وېب اصلاح', icon: Globe2, description: 'د لید او چټکتیا لپاره اصلاح چې عضوي ترافیک او ساتنه زیاته کړي.' },
        { title: 'د برانډ هویت', icon: Layers3, description: 'لوګو، ټایپوګرافي، رنګ او برانډ شتمنۍ چې اغېز او وده رامنځته کړي.' },
      ],
    },
  }[language] || {};

  const services = copy.services || [];
  const sectionServices = Array.isArray(content.services) && content.services.length
    ? content.services.map((item, index) => ({
        title: typeof item === 'string' ? item : item.title,
        description: typeof item === 'string' ? '' : item.description,
        icon: services[index % services.length].icon,
      }))
    : services;

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]" aria-label={copy.sectionLabel || 'KarFamSoft Services'}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% 60%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 80% 40%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 70%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {sectionServices.map((service, index) => (
          <motion.article
            key={index}
            className="group relative p-8 rounded-2xl bg-white dark:bg-gray-950 shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))', transformOrigin: 'center' }}
            />

            <div className="flex flex-col items-start">
              <div
                className="p-3.5 rounded-xl mb-5 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
                }}
              >
                <service.icon className="text-white" size={26} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: 'var(--theme-primary)' }}>
                {copy.learnMore || 'Learn More'}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
