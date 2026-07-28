const PROJECT_SECTION_TOKENS = new Set(['projectsgallery', 'projects', 'portfolio']);

const normalizeSectionToken = (value = '') =>
  String(value).toLowerCase().replace(/[^a-z0-9]+/g, '');

export const slugifyProjectTitle = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const DEFAULT_PROJECTS = [
  {
    title: 'TechNova Redesign',
    slug: 'technova-redesign',
    image: '/images/1.jpg',
    description: 'Full website redesign + SEO optimization. Increased engagement by 48%.',
    category: 'web',
    techs: ['React', 'Next.js', 'Tailwind CSS'],
    content: 'TechNova approached us with an outdated digital presence that no longer reflected their position as an industry leader in enterprise software. Their existing website suffered from poor performance, confusing navigation, and zero mobile optimization — resulting in a 60% bounce rate on mobile devices.\n\nOur team conducted a comprehensive audit of their brand identity, user flows, and competitor landscape before proposing a complete redesign strategy. We rebuilt their site from the ground up using Next.js for server-side rendering, ensuring lightning-fast load times and seamless SEO integration. Every page was optimized for Core Web Vitals, and we implemented a structured content hierarchy that guides visitors naturally through the sales funnel.\n\nThe results exceeded expectations: page load time dropped from 6.2s to 0.8s, organic traffic increased by 73% within three months, and the bounce rate fell to 32%. The new design also introduced a dynamic case study section that has become their top converting page, generating 48% more qualified leads in the first quarter post-launch.',
  },
  {
    title: 'GlowCare App UI',
    slug: 'glowcare-app-ui',
    image: '/images/2.jpg',
    description: 'Mobile app design for a wellness startup. Built with Figma + React Native.',
    category: 'web',
    techs: ['Figma', 'React Native', 'Firebase'],
    content: 'GlowCare came to us with a compelling vision: a wellness companion that feels more like a personal coach than another health tracking app. The challenge was translating their research-backed wellness methodology into an interface that feels warm, intuitive, and genuinely motivating — not clinical or overwhelming.\n\nWe started with extensive user research and competitive analysis, then moved through rapid prototyping cycles in Figma. Every screen was tested with real users, leading to three major iteration rounds before we arrived at the final design language. The visual system uses soft gradients, organic shapes, and a carefully curated color palette that adapts throughout the day — warm tones in the morning, cooler hues in the evening.\n\nThe React Native implementation preserves the buttery 60fps animations we designed in prototype. Firebase integration enables real-time progress syncing and personalized content delivery based on user behavior patterns. Since launch, GlowCare has maintained a 4.8-star rating with users praising the intuitive onboarding flow and the gentle nudge system that keeps them engaged without feeling spammy.',
  },
  {
    title: 'NovaFin Dashboard',
    slug: 'novafin-dashboard',
    image: '/images/3.jpg',
    description: 'Custom dashboard UI with Tailwind and chart integrations for a fintech product.',
    category: 'data',
    techs: ['D3.js', 'React', 'Node.js', 'PostgreSQL'],
    content: 'NovaFin needed a command center for their financial analytics platform — something that could surface actionable insights from millions of transactions without overwhelming users with data noise. The existing solution was a spreadsheet-like interface that required extensive training and still left analysts spending hours hunting for key metrics.\n\nOur approach centered on progressive disclosure: show the big picture first, then let users drill down layer by layer. We designed a modular dashboard system where each widget is independently configurable, allowing users to build their own views without needing developer support. D3.js powers the interactive charts with smooth transitions between data states, while PostgreSQL materialized views keep even the most complex aggregations running in under 200ms.\n\nThe new dashboard reduced the average time-to-insight from 14 minutes to under 90 seconds. Power users particularly love the custom alert system we built — it watches their key metrics and proactively surfaces anomalies before they become problems. The executive team now starts each morning with an auto-generated summary that highlights the three most important shifts from the previous trading day.',
  },
  {
    title: 'Brand Identity for Clover',
    slug: 'brand-identity-clover',
    image: '/images/4.jpg',
    description: 'Logo, typography, and print collateral for a sustainable clothing brand.',
    category: 'web',
    techs: ['Illustrator', 'Photoshop', 'Figma'],
    content: 'Clover is a sustainable fashion brand built on the philosophy that style and environmental responsibility should never be a trade-off. They needed a brand identity that communicates their values at every touchpoint — from the logo on their tags to the typography on their lookbook to the micro-interactions on their online store.\n\nWe developed a visual identity rooted in natural textures and earthy tones, with a custom wordmark that subtly incorporates a four-leaf clover into the lettering. The color palette draws from organic dyes and natural materials, with each seasonal collection introducing a fresh accent color while maintaining brand cohesion. We designed the full print collateral suite — hang tags, care labels, shopping bags, and a lookbook that uses recycled paper stocks and soy-based inks.\n\nThe identity extends seamlessly into their digital presence with a Figma-built component library that ensures every pixel matches the brand guidelines. Since the rebrand, Clover has seen a 40% increase in average order value, which the founders attribute to the premium perception created by the cohesive visual experience. The lookbook also won a design award in the sustainable packaging category.',
  },
  {
    title: 'Analytics Dashboard for InsightPro',
    slug: 'analytics-dashboard-insightpro',
    image: '/images/5.jpg',
    description: 'Custom admin panel with live data integration and KPIs for executives.',
    category: 'data',
    techs: ['React', 'D3.js', 'GraphQL', 'AWS'],
    content: 'InsightPro required a real-time analytics platform capable of processing millions of events per day while presenting executives with clear, actionable views of their business performance. The legacy system was slow, rigid, and required dedicated analysts just to generate basic reports.\n\nWe architected the solution around GraphQL subscriptions for live data streaming, ensuring the dashboard always reflects the current state without page refreshes. The React front end renders thousands of data points using virtualized lists and canvas-based charts from D3.js, maintaining smooth 60fps performance even during peak data loads. AWS Lambda handles the data pipeline, automatically scaling to process traffic spikes without any degradation in dashboard responsiveness.\n\nThe impact was immediate: report generation time dropped from hours to milliseconds, and the executive team gained the ability to explore data organically rather than submitting requests and waiting. The custom KPI tracking feature, which lets users define their own metrics and thresholds, has become the most-used feature — adopted by 90% of the leadership team within the first two weeks of rollout.',
  },
  {
    title: 'UX Collaboration Platform',
    slug: 'ux-collaboration-platform',
    image: '/images/6.jpg',
    description: 'Built a real-time interface for designers and PMs to co-edit mockups.',
    category: 'web',
    techs: ['WebSocket', 'React', 'Node.js', 'MongoDB'],
    content: 'Design teams often struggle with version chaos — multiple mockup files, scattered feedback threads, and the eternal question of which design is actually the latest. Our client wanted to build a collaboration platform that eliminates these pain points by bringing real-time co-editing directly into the browser.\n\nWe built the core editor on WebSocket connections with operational transformation (OT) for conflict-free concurrent editing — the same technology class that powers Google Docs. Multiple users can manipulate the same canvas simultaneously, seeing each others cursors and changes in real time. React drives the component-based UI, MongoDB stores the document states with full version history, and Node.js handles the WebSocket coordination layer with automatic reconnection and state reconciliation.\n\nThe platform has been adopted by over 200 design teams in its first year. Users report a 60% reduction in time spent on handoff meetings and a dramatic decrease in design rework caused by miscommunication. The integrated commenting system, where feedback is pinned directly to canvas elements rather than scattered across email threads, has been particularly praised for keeping review cycles focused and efficient.',
  },
];

const RTL_PROJECT_FALLBACKS = {
  fa: {
    'technova-redesign': {
      title: 'بازطراحی تک نوا',
      description: 'بازطراحی کامل وب سایت همراه با بهینه سازی سئو و افزایش ۴۸ درصدی تعامل.',
      content: 'شرکت تک نوا برای نوسازی حضور دیجیتال خود با ما همکاری کرد. ما ساختار صفحات، تجربه کاربری و سرعت سایت را بازطراحی کردیم تا مسیر کاربر ساده تر و نرخ تبدیل بهتر شود. در نتیجه، زمان بارگذاری کاهش یافت، تعامل کاربران بیشتر شد و کیفیت لیدهای ورودی به شکل محسوسی ارتقا پیدا کرد.',
    },
    'glowcare-app-ui': {
      title: 'رابط اپلیکیشن گلوکر',
      description: 'طراحی اپ موبایل برای استارتاپ حوزه سلامت با فیگما و ری اکت نیتیو.',
      content: 'در پروژه گلوکر هدف ما ساخت تجربه ای گرم، ساده و انگیزشی برای کاربران حوزه سلامت بود. طراحی رابط بر اساس پژوهش کاربر انجام شد و سپس با ری اکت نیتیو پیاده سازی شد تا عملکرد روان و یکپارچه روی موبایل حفظ شود. خروجی نهایی باعث بهبود نرخ تکمیل فرایند ورود اولیه و افزایش ماندگاری کاربران در اپلیکیشن شد.',
    },
    'novafin-dashboard': {
      title: 'داشبورد نوا فین',
      description: 'داشبورد سفارشی با تیلویند و نمودارهای تحلیلی برای محصول فین تک.',
      content: 'برای نوا فین یک داشبورد تحلیلی ماژولار طراحی شد تا شاخص های کلیدی به صورت واضح و سریع در دسترس تیم قرار بگیرد. با بازطراحی جریان داده و نمایش مرحله ای اطلاعات، زمان رسیدن به بینش کاهش پیدا کرد. تیم عملیاتی اکنون می تواند بدون پیچیدگی اضافه، تصمیم های روزانه را دقیق تر و سریع تر انجام دهد.',
    },
    'brand-identity-clover': {
      title: 'هویت برند برای کلاور',
      description: 'لوگو، تایپوگرافی و اقلام چاپی برای یک برند پوشاک پایدار.',
      content: 'در این پروژه، هویت بصری کلاور از پایه بازتعریف شد تا ارزش های پایداری و کیفیت برند در تمام نقاط تماس دیده شود. از لوگو و تایپوگرافی تا اقلام چاپی و قالب های دیجیتال، همه اجزا به صورت یکپارچه طراحی شدند. نتیجه این بازطراحی، افزایش اعتماد مخاطب و بهبود درک ارزش برند در کمپین های فروش بود.',
    },
    'analytics-dashboard-insightpro': {
      title: 'داشبورد تحلیلی اینسایت پرو',
      description: 'پنل مدیریتی با یکپارچه سازی داده زنده و KPI برای مدیران.',
      content: 'اینسایت پرو به یک داشبورد زنده برای پایش لحظه ای عملکرد نیاز داشت. ما رابط کاربری را برای نمایش سریع شاخص های قابل اقدام طراحی کردیم و مسیر بررسی داده را برای مدیران ساده تر کردیم. پس از استقرار، زمان تهیه گزارش کاهش یافت و تیم مدیریت توانست تصمیم گیری مبتنی بر داده را با سرعت بیشتری انجام دهد.',
    },
    'ux-collaboration-platform': {
      title: 'پلتفرم همکاری UX',
      description: 'رابط بلادرنگ برای همکاری طراحان و مدیران محصول در ویرایش نمونه ها.',
      content: 'این پلتفرم برای حل مشکل ناهماهنگی نسخه ها و بازخوردهای پراکنده در تیم های طراحی ساخته شد. کاربران می توانند به صورت همزمان روی یک بوم مشترک کار کنند و تغییرات را لحظه ای ببینند. نتیجه پروژه کاهش جلسات اضافی، کوتاه شدن چرخه بازخورد و افزایش سرعت تحویل طراحی بود.',
    },
  },
  ps: {
    'technova-redesign': {
      title: 'د ټېکنوا بیا ډیزاین',
      description: 'د وېبپاڼې بشپړ بیا ډیزاین او SEO ښه والی چې ۴۸ سلنه تعامل یې زیات کړ.',
      content: 'ټېکنوا غوښتل خپله ډیجیټل مخکښي نوې او اغېزمنه کړي. موږ د پاڼو جوړښت، د کاروونکي تجربه او د سایټ چټکتیا له سره طرحه کړه تر څو د کاروونکي تګلاره ساده او د بدلون کچه لوړه شي. د پروژې له پلي کېدو وروسته د پاڼې بار وخت کم شو او د کاروونکو تعامل په روښانه ډول زیات شو.',
    },
    'glowcare-app-ui': {
      title: 'د ګلوکېر اپ UI',
      description: 'د روغتیايي سټارټ اپ لپاره د موبایل اپ ډیزاین د Figma او React Native سره.',
      content: 'په ګلوکېر پروژه کې زموږ تمرکز دا و چې کاروونکو ته ساده، روښانه او هڅوونکې تجربه برابر کړو. د انٹرفېس طرحه د کاروونکو د اړتیاوو له څېړنې وروسته جوړه شوه او بیا په React Native کې پلي شوه تر څو په موبایل کې نرم او چټک کار وکړي. پایله یې دا وه چې د کاروونکو ساتنه او د اپ کارونه ښه شول.',
    },
    'novafin-dashboard': {
      title: 'د نوا فین ډشبورډ',
      description: 'د فین ټېک محصول لپاره سفارشي ډشبورډ د Tailwind او چارټونو سره.',
      content: 'د نوا فین لپاره مو داسې تحلیلي ډشبورډ جوړ کړ چې مهم شاخصونه په چټک او روښانه ډول وړاندې کړي. د ډیټا جریان مو ساده او طبقه بندي کړ تر څو ټیم ژر تر ژره عملي پرېکړو ته ورسېږي. د دې بدلون له امله د معلوماتو تحلیل اسانه او د ورځني تصمیم نیولو سرعت لوړ شو.',
    },
    'brand-identity-clover': {
      title: 'د کلاور لپاره د برانډ هویت',
      description: 'لوګو، ټایپوګرافي او چاپي مواد د دوامدار کالیو برانډ لپاره.',
      content: 'په دې پروژه کې مو د کلاور برانډ هویت له بنسټه جوړ او یو موټی کړ. له لوګو او ټایپوګرافۍ نیولې تر چاپي او ډیجیټل توکو پورې ټول عناصر د یو ثابت بصري سیستم له مخې برابر شول. پایله کې د برانډ باور زیات شو او د بازار په کمپاینونو کې یې اغېز ښه څرګند شو.',
    },
    'analytics-dashboard-insightpro': {
      title: 'د InsightPro تحلیلي ډشبورډ',
      description: 'د مدیرانو لپاره ژوندۍ ډیټا او KPI سره سفارشي اډمین پینل.',
      content: 'InsightPro داسې ډشبورډ ته اړتیا لرله چې ژوندۍ ډیټا ژر او روښانه وښيي. موږ د مدیرانو لپاره د شاخصونو لید ساده کړ او د معلوماتو ارزونې لاره مو چټکه کړه. له پلي کېدو وروسته د راپور جوړولو وخت کم شو او د ډیټا پر بنسټ پرېکړې ګړندۍ شوې.',
    },
    'ux-collaboration-platform': {
      title: 'د UX همکارۍ پلاتفورم',
      description: 'د ډیزاینرانو او PM ګانو لپاره ریښتیني وخت ګډ کار انٹرفېس.',
      content: 'دا پلاتفورم د ډیزاین ټیمونو د نسخو ګډوډۍ او خپرو نظرونو د حل لپاره جوړ شو. کاروونکي کولی شي په یوه ګډ کینوس کې په ریښتیني وخت کار وکړي او بدلونونه سمدستي وویني. د پروژې نتیجه دا وه چې د بیاکتنې دورې لنډې شوې او د ډیزاین سپارلو سرعت زیات شو.',
    },
  },
};

const hasArabicScript = (value = '') => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);

const shouldUseRtlFallback = (value, locale) => {
  if (locale !== 'fa' && locale !== 'ps') return false;
  if (typeof value !== 'string' || !value.trim()) return true;
  return !hasArabicScript(value);
};

export const applyLocalizedProjectFallback = (project = {}, locale = 'en') => {
  if (!project || typeof project !== 'object') return project;

  const localizedBySlug = RTL_PROJECT_FALLBACKS[locale] || null;
  if (!localizedBySlug) return project;

  const fallback = localizedBySlug[project.slug];
  if (!fallback) return project;

  return {
    ...project,
    title: shouldUseRtlFallback(project.title, locale) ? fallback.title : project.title,
    description: shouldUseRtlFallback(project.description, locale) ? fallback.description : project.description,
    content: shouldUseRtlFallback(project.content, locale) ? fallback.content : project.content,
  };
};

export const applyLocalizedProjectFallbackList = (projects = [], locale = 'en') => {
  if (!Array.isArray(projects)) return [];
  return projects.map((project) => applyLocalizedProjectFallback(project, locale));
};

export const extractProjectsFromSections = (sections = []) => {
  if (!Array.isArray(sections)) return DEFAULT_PROJECTS;

  for (const section of sections) {
    const key = normalizeSectionToken(section.sectionKey);
    const type = normalizeSectionToken(section.sectionType);
    if (!PROJECT_SECTION_TOKENS.has(key) && !PROJECT_SECTION_TOKENS.has(type)) continue;

    const raw = section.content?.content?.projects;
    if (!Array.isArray(raw) || raw.length === 0) continue;

    return raw.map((item, index) => {
      if (typeof item === 'string') {
        const fallback = DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length];
        return {
          ...fallback,
          title: item,
          slug: slugifyProjectTitle(item) || fallback.slug,
          content: fallback.content || '',
        };
      }
      const fallback = DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length];
      const resolvedTitle = item.title || fallback.title;
      const sanitizedItemSlug = slugifyProjectTitle(item.slug || '');
      return {
        title: resolvedTitle,
        slug: sanitizedItemSlug || slugifyProjectTitle(resolvedTitle) || fallback.slug,
        image: item.image || fallback.image,
        description: item.description || '',
        category: item.category || fallback.category || '',
        techs: Array.isArray(item.techs) ? item.techs : fallback.techs,
        content: item.content || fallback.content || '',
      };
    });
  }

  return DEFAULT_PROJECTS;
};

export const findProjectBySlug = (sections = [], slug = '') => {
  const projects = extractProjectsFromSections(sections);
  return projects.find((p) => p.slug === slug) || null;
};

export const resolveProjectHref = (project) => {
  if (project.link && project.link !== '#' && project.link !== '/portfolio' && project.link !== '/portfolios') {
    return project.link;
  }
  const slug = slugifyProjectTitle(project.slug || '') || slugifyProjectTitle(project.title) || 'project';
  return `/portfolio/${slug}`;
};
