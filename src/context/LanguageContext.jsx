import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'site-language';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'fa', label: 'Farsi', native: 'فارسی', dir: 'rtl' },
  { code: 'ps', label: 'Pashto', native: 'پښتو', dir: 'rtl' },
];

const DICTIONARY = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      blog: 'Blog',
      team: 'Team',
      contact: 'Contact',
      selectLanguage: 'Select language',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    },
    footer: {
      company: 'Company',
      connect: 'Connect',
      newsletter: 'Newsletter',
      footerSummary:
        'We craft scalable, user-focused digital experiences that help brands grow and connect with their audience.',
      newsletterSummary: 'Get updates on our latest work and insights.',
      yourEmail: 'Your email',
      subscribe: 'Subscribe',
      rightsReserved: 'All rights reserved.',
      newsletterError: 'Something went wrong. Please try again.',
    },
    home: {
      heroEyebrow: 'Award-winning Agency',
      heroHeading: 'Elevate Your Brand with Exceptional Digital Experiences',
      heroDescription:
        "KarFamSoft crafts scalable, user-focused websites and digital products that help businesses thrive. Let's turn your vision into reality with creativity and technology.",
      heroImageAlt: 'Creative agency team collaborating on digital project',
      viewPortfolio: 'View Portfolio',
      contactUs: 'Contact Us',
      callToAction: 'Call to Action',
      ctaHeading: 'Ready to bring your vision to life?', 
      ctaDescription: "Let's collaborate on something impactful and innovative.",
      startProject: 'Start a Project',
      faqLabel: 'FAQ',
      faqHeading: 'Frequently Asked Questions',
      faqDescription: 'Quick answers to common questions about working with us.',
      faqAria: 'Frequently Asked Questions',
      faqQ1: 'What services does KarFamSoft offer?',
      faqA1:
        'We provide web development, UI/UX design, digital strategy, mobile app design, SEO optimization, and brand identity services.',
      faqQ2: 'How long does a typical project take?',
      faqA2:
        'Timelines vary depending on scope, but most projects range from 4 to 12 weeks from discovery to launch.',
      faqQ3: 'Do you work with startups and small businesses?',
      faqA3:
        'Yes. We work with businesses of all sizes - from early-stage startups to established brands looking to refresh their digital presence.',
      faqQ4: 'What is your design process like?',
      faqA4:
        'We follow a structured process: discover, design, develop, and deliver. Every phase includes collaboration and feedback loops to ensure alignment.',
      whyLabel: 'Why us',
      whyHeading: 'Why Choose KarFamSoft?',
      whyDescription:
        'We bring clarity, design, and code together to help you build experiences that matter.',
      whyAria: 'Why Choose Us',
      whyFeature1: 'Proven experience with modern tech stacks',
      whyFeature2: 'Human-centered, design-first thinking',
      whyFeature3: 'Speed, responsiveness, and clean code',
      whyFeature4: 'Collaborative and transparent communication',
      learnMoreAboutUs: 'Learn more about us',
    },
    team: {
      eyebrow: 'Our Team',
      heading: 'Meet the People Behind the Work',
      description:
        'We are a focused team of strategists, designers, and engineers building modern digital products that feel effortless and perform reliably.',
      projectsDelivered: 'Projects Delivered',
      avgClientRating: 'Avg Client Rating',
      yearsBuilding: 'Years Building',
    },
  },
  fa: {
    nav: {
      home: 'خانه',
      about: 'درباره ما',
      services: 'خدمات',
      portfolio: 'نمونه کارها',
      blog: 'وبلاگ',
      team: 'تیم',
      contact: 'تماس',
      selectLanguage: 'انتخاب زبان',
      openMenu: 'باز کردن منو',
      closeMenu: 'بستن منو',
      switchToLight: 'تغییر به حالت روشن',
      switchToDark: 'تغییر به حالت تاریک',
    },
    footer: {
      company: 'شرکت',
      connect: 'ارتباط',
      newsletter: 'خبرنامه',
      footerSummary:
        'ما تجربه های دیجیتال مقیاس پذیر و کاربرمحور طراحی می کنیم تا برندها رشد کنند و ارتباط بهتری با مخاطبان خود داشته باشند.',
      newsletterSummary: 'از جدیدترین پروژه ها و بینش های ما باخبر شوید.',
      yourEmail: 'ایمیل شما',
      subscribe: 'عضویت',
      rightsReserved: 'تمام حقوق محفوظ است.',
      newsletterError: 'مشکلی پیش آمد. لطفا دوباره تلاش کنید.',
    },
    home: {
      heroEyebrow: 'آژانس برنده جایزه',
      heroHeading: 'برند خود را با تجربه های دیجیتال استثنایی ارتقا دهید',
      heroDescription:
        'کارفم سافت وب سایت ها و محصولات دیجیتال مقیاس پذیر و کاربرمحور می سازد تا کسب وکارها رشد کنند. بیایید چشم انداز شما را با خلاقیت و فناوری به واقعیت تبدیل کنیم.',
      heroImageAlt: 'تیم خلاق آژانس در حال همکاری روی پروژه دیجیتال',
      viewPortfolio: 'مشاهده نمونه کارها',
      contactUs: 'تماس با ما',
      callToAction: 'دعوت به اقدام',
      ctaHeading: 'آماده اید ایده خود را به واقعیت تبدیل کنید؟',
      ctaDescription: 'بیایید روی یک پروژه تاثیرگذار و نوآورانه با هم همکاری کنیم.',
      startProject: 'شروع پروژه',
      faqLabel: 'پرسش های متداول',
      faqHeading: 'پرسش های متداول',
      faqDescription: 'پاسخ های سریع به سوالات رایج درباره همکاری با ما.',
      faqAria: 'پرسش های متداول',
      faqQ1: 'کارفم سافت چه خدماتی ارائه می دهد؟',
      faqA1:
        'ما خدمات توسعه وب، طراحی رابط و تجربه کاربری، استراتژی دیجیتال، طراحی اپ موبایل، بهینه سازی سئو و هویت برند ارائه می دهیم.',
      faqQ2: 'یک پروژه معمولی چقدر زمان می برد؟',
      faqA2:
        'زمان بندی بسته به دامنه پروژه متفاوت است، اما بیشتر پروژه ها از کشف تا انتشار بین ۴ تا ۱۲ هفته طول می کشند.',
      faqQ3: 'آیا با استارتاپ ها و کسب وکارهای کوچک هم کار می کنید؟',
      faqA3:
        'بله. ما با کسب وکارها در همه اندازه ها کار می کنیم؛ از استارتاپ های اولیه تا برندهای تثبیت شده که می خواهند حضور دیجیتال خود را به روز کنند.',
      faqQ4: 'فرآیند طراحی شما چگونه است؟',
      faqA4:
        'ما یک فرآیند ساختاریافته را دنبال می کنیم: کشف، طراحی، توسعه و تحویل. در هر مرحله همکاری و بازخورد وجود دارد تا همسویی کامل حفظ شود.',
      whyLabel: 'چرا ما',
      whyHeading: 'چرا کارفم سافت؟',
      whyDescription:
        'ما شفافیت، طراحی و کدنویسی را کنار هم می آوریم تا تجربه هایی بسازید که واقعا اثرگذار باشند.',
      whyAria: 'چرا ما را انتخاب کنید',
      whyFeature1: 'تجربه اثبات شده با فناوری های مدرن',
      whyFeature2: 'نگرش انسان محور و طراحی در اولویت',
      whyFeature3: 'سرعت، پاسخگویی و کدنویسی تمیز',
      whyFeature4: 'همکاری شفاف و ارتباط موثر',
      learnMoreAboutUs: 'بیشتر درباره ما بدانید',
    },
    team: {
      eyebrow: 'تیم ما',
      heading: 'با افرادی آشنا شوید که پشت این کار هستند',
      description:
        'ما تیمی متمرکز از استراتژیست ها، طراحان و مهندسان هستیم که محصولات دیجیتال مدرن، روان و قابل اعتماد می سازیم.',
      projectsDelivered: 'پروژه های تحویل شده',
      avgClientRating: 'میانگین امتیاز مشتریان',
      yearsBuilding: 'سال های تجربه ساخت',
    },
  },
  ps: {
    nav: {
      home: 'کور',
      about: 'زموږ په اړه',
      services: 'خدمتونه',
      portfolio: 'نمونې',
      blog: 'بلاګ',
      team: 'ټیم',
      contact: 'اړیکه',
      selectLanguage: 'ژبه وټاکئ',
      openMenu: 'مینو پرانیزئ',
      closeMenu: 'مینو وتړئ',
      switchToLight: 'روښانه بڼې ته واړوئ',
      switchToDark: 'تیاره بڼې ته واړوئ',
    },
    footer: {
      company: 'شرکت',
      connect: 'اړیکه',
      newsletter: 'خبرپاڼه',
      footerSummary:
        'موږ پراخېدونکې او کارن-محوره ډیجیټل تجربې جوړوو چې برانډونو سره د ودې او د خپلو مخاطبینو سره د اړیکې په پیاوړي کولو کې مرسته کوي.',
      newsletterSummary: 'زموږ د وروستیو کارونو او لیدلورو تازه معلومات ترلاسه کړئ.',
      yourEmail: 'ستاسو برېښنالیک',
      subscribe: 'ګډون',
      rightsReserved: 'ټول حقوق خوندي دي.',
      newsletterError: 'یوه ستونزه رامنځته شوه. مهرباني وکړئ بیا هڅه وکړئ.',
    },
    home: {
      heroEyebrow: 'جایزه ګټونکې اداره',
      heroHeading: 'خپل برانډ د غوره ډیجیټل تجربو سره لوړ کړئ',
      heroDescription:
        'کارفم سافټ د پراخېدونکو او کارن-محوره وېب پاڼو او ډیجیټل محصولاتو په جوړولو کې مرسته کوي څو کاروبارونه وده وکړي. راځئ ستاسو لید له خلاقیت او ټکنالوژۍ سره حقیقت کړو.',
      heroImageAlt: 'د ډیجیټل پروژې پر سر د خلاق ټیم همکاري',
      viewPortfolio: 'نمونې وګورئ',
      contactUs: 'موږ سره اړیکه',
      callToAction: 'د اقدام بلنه',
      ctaHeading: 'ایا چمتو یاست خپل لید ژوندی کړئ؟',
      ctaDescription: 'راځئ په یو اغېزناک او نوښتګر کار کې یوځای کار وکړو.',
      startProject: 'پروژه پیل کړئ',
      faqLabel: 'پرله پسې پوښتنې',
      faqHeading: 'پرله پسې پوښتنې',
      faqDescription: 'له موږ سره د کار په اړه د عامو پوښتنو لنډ ځوابونه.',
      faqAria: 'پرله پسې پوښتنې',
      faqQ1: 'کارفم سافټ کوم خدمات وړاندې کوي؟',
      faqA1:
        'موږ د وېب پراختیا، UI/UX ډیزاین، ډیجیټل ستراتیژۍ، د موبایل اپ ډیزاین، SEO ښه والي او د برانډ هویت خدمات وړاندې کوو.',
      faqQ2: 'یو عادي پروژه څومره وخت نیسي؟',
      faqA2:
        'مهال وېش د پروژې له کچې سره بدلېږي، خو ډېری پروژې له کشف څخه تر خپرېدو پورې ۴ تر ۱۲ اونیو وخت نیسي.',
      faqQ3: 'ایا تاسو له سټارټ اپونو او کوچنیو کاروبارونو سره هم کار کوئ؟',
      faqA3:
        'هو. موږ د هرې کچې کاروبارونو سره کار کوو - له پیلنیو سټارټ اپونو تر هغو برانډونو پورې چې غواړي خپل ډیجیټل حضور نوی کړي.',
      faqQ4: 'ستاسو د ډیزاین بهیر څنګه دی؟',
      faqA4:
        'موږ یو منظم بهیر تعقیبوو: کشف، ډیزاین، پراختیا او سپارنه. په هر پړاو کې همکاري او فیډبک شامل وي تر څو بشپړ همغږي وساتل شي.',
      whyLabel: 'ولې موږ',
      whyHeading: 'ولې کارفم سافټ غوره کړئ؟',
      whyDescription:
        'موږ روښانتیا، ډیزاین او کوډ سره یوځای کوو څو تاسو داسې تجربې جوړې کړئ چې ارزښت ولري.',
      whyAria: 'ولې موږ غوره کړئ',
      whyFeature1: 'د عصري ټکنالوژیو ثابت عملي تجربه',
      whyFeature2: 'انساني-محوره او ډیزاین-لومړی فکر',
      whyFeature3: 'چټکتیا، ځواب ویونه او پاک کوډ',
      whyFeature4: 'همکاري او روڼ اړیکه',
      learnMoreAboutUs: 'زموږ په اړه نور معلومات',
    },
    team: {
      eyebrow: 'زموږ ټیم',
      heading: 'له هغه خلکو سره اشنا شئ چې دا کار پر مخ وړي',
      description:
        'موږ د ستراتیژۍ، ډیزاین او انجینرۍ یو متمرکز ټیم یو چې داسې عصري ډیجیټل محصولات جوړوي چې روان او باوري وي.',
      projectsDelivered: 'سپارل شوې پروژې',
      avgClientRating: 'د مشتریانو اوسط درجه',
      yearsBuilding: 'د جوړونې کلونه',
    },
  },
};

const NAV_PATH_KEYS = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/portfolio': 'portfolio',
  '/blog': 'blog',
  '/blogs': 'blog',
  '/team': 'team',
  '/contact': 'contact',
};

const LanguageContext = createContext(null);

function getLanguageMeta(code) {
  return SUPPORTED_LANGUAGES.find((item) => item.code === code) || SUPPORTED_LANGUAGES[0];
}

function toPathKey(path = '') {
  if (!path) return '';
  const lower = String(path).toLowerCase();
  return NAV_PATH_KEYS[lower] || '';
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((item) => item.code === saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const languageMeta = getLanguageMeta(language);
    html.setAttribute('lang', languageMeta.code);
    html.setAttribute('dir', languageMeta.dir);
    localStorage.setItem(STORAGE_KEY, languageMeta.code);
  }, [language]);

  const value = useMemo(() => {
    const languageMeta = getLanguageMeta(language);
    const dictionary = DICTIONARY[languageMeta.code] || DICTIONARY.en;

    const t = (key, fallback = '') => {
      const segments = String(key || '').split('.').filter(Boolean);
      if (!segments.length) return fallback;

      let current = dictionary;
      for (const segment of segments) {
        if (current && typeof current === 'object' && segment in current) {
          current = current[segment];
        } else {
          return fallback;
        }
      }

      return typeof current === 'string' ? current : fallback;
    };

    const translateNavLabel = (label, path = '') => {
      const key = toPathKey(path);
      if (!key) return label;
      return t(`nav.${key}`, label);
    };

    return {
      language: languageMeta.code,
      languages: SUPPORTED_LANGUAGES,
      setLanguage,
      dir: languageMeta.dir,
      isRTL: languageMeta.dir === 'rtl',
      t,
      translateNavLabel,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
