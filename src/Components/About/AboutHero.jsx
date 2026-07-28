import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const AboutHero = ({ content = {} }) => {
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
      heading: 'A Creative Partner for the Ambitious',
      description: 'At KarFamSoft Agency, we create digital experiences that help brands grow, adapt, and thrive in a changing world.',
      ctaLabel: 'Contact Us',
      ctaAria: 'Contact KarFamSoft Agency',
      videoUnsupported: 'Your browser does not support the video tag.',
    },
    fa: {
      heading: 'یک شریک خلاق برای برندهای بلندپرواز',
      description: 'در کارفم سافت، تجربه های دیجیتال می سازیم که به رشد، تطبیق و موفقیت پایدار برندها کمک می کند.',
      ctaLabel: 'تماس با ما',
      ctaAria: 'تماس با کارفم سافت',
      videoUnsupported: 'مرورگر شما از پخش ویدیو پشتیبانی نمی کند.',
    },
    ps: {
      heading: 'د لوړو موخو لپاره یو تخلیقي شریک',
      description: 'په KarFamSoft Agency کې موږ داسې ډیجیټل تجربې جوړوو چې برانډونو ته د ودې، بدلون او بریا ځواک ورکوي.',
      ctaLabel: 'موږ سره اړیکه',
      ctaAria: 'KarFamSoft Agency سره اړیکه',
      videoUnsupported: 'ستاسو براوزر د ویډیو ټګ ملاتړ نه کوي.',
    },
  }[language] || {};
  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);

  const heading = hasField('heading')
    ? pickText(content.heading, copy.heading || 'A Creative Partner for the Ambitious')
    : (copy.heading || 'A Creative Partner for the Ambitious');
  const description = hasField('description')
    ? pickText(content.description, copy.description || 'At KarFamSoft Agency, we create digital experiences that help brands grow, adapt, and thrive in a changing world.')
    : (copy.description || 'At KarFamSoft Agency, we create digital experiences that help brands grow, adapt, and thrive in a changing world.');
  const ctaLabel = hasField('ctaLabel') ? pickText(content.ctaLabel, copy.ctaLabel || 'Contact Us') : (copy.ctaLabel || 'Contact Us');
  const ctaHref = hasField('ctaHref') ? content.ctaHref : '/contact';
  const videoUrl = hasField('videoUrl') ? content.videoUrl : '/videos/agency.mp4';
  const videoPoster = hasField('videoPoster') ? content.videoPoster : '';

  return (
    <section
      className="relative h-[100vh] overflow-hidden flex items-center justify-center text-center px-4 bg-white dark:bg-[#0f172a] pb-20"
      role="banner"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover top-0 left-0 z-0"
        aria-hidden="true"
        poster={videoPoster || undefined}
      >
        <source src={videoUrl} type="video/mp4" />
        {copy.videoUnsupported || 'Your browser does not support the video tag.'}
      </video>

      {/* Darker overlay masks video quality loss from compression */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/10" />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-3xl text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {description}
        </motion.p>
        <motion.a
          href={ctaHref}
          className="inline-block text-white px-8 py-4 rounded-full font-semibold shadow-lg transition focus:outline-none focus:ring-2 text-lg"
          style={{
            background: 'linear-gradient(120deg, var(--theme-primary), var(--theme-secondary))',
            boxShadow: '0 12px 24px color-mix(in srgb, var(--theme-primary) 28%, transparent)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          aria-label={copy.ctaAria || 'Contact KarFamSoft Agency'}
        >
          {ctaLabel}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default AboutHero;
