const BLOG_POST_SECTION_TOKENS = new Set(['blogposts', 'posts', 'blog']);

const normalizeSectionToken = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

export const slugifyBlogTitle = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const getSlugFromLink = (value = '') => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';

  const withoutQuery = trimmed.split('?')[0].split('#')[0];
  const normalized = withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery;
  const blogPrefix = '/blog/';

  if (!normalized.startsWith(blogPrefix)) return '';

  return normalized.slice(blogPrefix.length).trim().toLowerCase();
};

export const DEFAULT_BLOG_POSTS = [
  {
    slug: 'new-shipment-of-japanese-engines-arrived',
    title: 'New Shipment of Japanese Engines Arrived',
    excerpt: 'A fresh container of low-mileage used Japanese engines has just arrived at our Klang warehouse.',
    content:
      'We are pleased to announce the arrival of a new shipment of low-mileage used Japanese engines. This batch includes popular Toyota and Honda petrol engines, all compression-tested and inspected by our trained technicians.\n\nEach engine comes with a start-up video upon request and is covered by our quality assurance process.',
    keyInsights:
      'Fresh stock of Toyota and Honda engines\nAll units compression-tested and inspected\nStart-up videos available on request',
    nextSteps:
      'Contact our sales team to check availability and reserve your engine today.',
    image: '/images/products/engine.jpg',
    datePublished: '2026-08-01',
    date: 'August 2026',
    link: '/blog/new-shipment-of-japanese-engines-arrived',
  },
  {
    slug: 'expanding-our-truck-engine-range',
    title: 'Expanding Our Truck Engine Range',
    excerpt: 'We have added more Isuzu and Hino truck engines to meet growing commercial demand.',
    content:
      'To better serve our commercial customers, we have expanded our range of used Japanese truck engines. The new stock includes Isuzu 4HK1 and Hino J08E engines, both known for their durability and fuel efficiency.\n\nAll truck engines are dyno-tested and come with a limited warranty for your peace of mind.',
    keyInsights:
      'New Isuzu and Hino truck engines in stock\nDyno-tested with limited warranty\nIdeal for fleet operators and heavy-duty use',
    nextSteps:
      'Reach out to discuss compatibility with your truck model and current availability.',
    image: '/images/products/truck-engine.jpg',
    datePublished: '2026-07-01',
    date: 'July 2026',
    link: '/blog/expanding-our-truck-engine-range',
  },
  {
    slug: 'now-exporting-to-30-plus-countries',
    title: 'Now Exporting to 30+ Countries',
    excerpt: 'Our international network keeps growing — now serving customers across five continents.',
    content:
      'Golden Shine Trading has reached a new milestone, now exporting to more than 30 countries across Asia, the Middle East, Africa, the USA, Australia, New Zealand, South America, and Europe.\n\nOur container loading facilities and worldwide shipping expertise allow us to prepare and dispatch orders efficiently.',
    keyInsights:
      'Exporting to 30+ countries worldwide\nCovering five continents\nFull container loading and shipping capabilities',
    nextSteps:
      'For international orders, contact our export team for a quotation.',
    image: '/images/products/spareparts.jpg',
    datePublished: '2026-06-01',
    date: 'June 2026',
    link: '/blog/now-exporting-to-30-plus-countries',
  },
  {
    slug: 'container-loading-facility-upgrade',
    title: 'Container Loading Facility Upgrade',
    excerpt: 'We have upgraded our container loading facilities for faster turnaround on bulk orders.',
    content:
      'We have completed an upgrade of our container loading facilities, reducing turnaround time for bulk export orders.\n\nThe improvements include better loading equipment and streamlined packing procedures to ensure secure and efficient shipment preparation.',
    keyInsights:
      'Faster turnaround on bulk orders\nUpgraded loading equipment\nSecure packing procedures',
    nextSteps:
      'Plan your next bulk order with us and experience the improved loading process.',
    image: '/images/products/halfcut.jpg',
    datePublished: '2026-05-01',
    date: 'May 2026',
    link: '/blog/container-loading-facility-upgrade',
  },
  {
    slug: 'quality-inspection-process-explained',
    title: 'Quality Inspection Process Explained',
    excerpt: 'A look at how every engine and part is inspected before it reaches our customers.',
    content:
      'Quality is at the heart of everything we do. Every engine and part goes through a rigorous inspection process before shipment.\n\nOur process includes compression testing, leak checks, and visual inspection. This ensures that only reliable, well-maintained parts reach our customers.',
    keyInsights:
      'Compression testing on all engines\nLeak and visual inspection\nOnly inspected parts are shipped',
    nextSteps:
      'Have questions about our process? Contact us for more details.',
    image: '/images/products/transmission.jpg',
    datePublished: '2026-04-01',
    date: 'April 2026',
    link: '/blog/quality-inspection-process-explained',
  },
  {
    slug: 'new-half-cuts-in-stock',
    title: 'New Half Cuts in Stock',
    excerpt: 'Fresh front and rear half cuts for popular Toyota and Honda models are now available.',
    content:
      'We have received a new batch of front and rear half cuts for popular Toyota and Honda models.\n\nEach half cut includes the complete engine, transmission, suspension, and wiring harness — everything you need for an engine conversion.',
    keyInsights:
      'Toyota and Honda half cuts available\nComplete engine, transmission, and suspension\nIdeal for engine conversions',
    nextSteps:
      'Browse our products page or contact us to check availability.',
    image: '/images/products/cabin.jpg',
    datePublished: '2026-03-01',
    date: 'March 2026',
    link: '/blog/new-half-cuts-in-stock',
  },
];

const RTL_BLOG_POST_FALLBACKS = {
  fa: {
    'the-power-of-purposeful-design': {
      title: 'قدرت طراحی هدفمند',
      excerpt: 'چگونه تصمیم های طراحی آگاهانه تعامل کاربر و اعتماد به برند را افزایش می دهد.',
      content: 'طراحی هدفمند یعنی هر تصمیم بصری و تجربه ای باید به یک نتیجه مشخص کسب وکار وصل باشد. وقتی مسیر کاربر واضح و بدون اصطکاک طراحی شود، نرخ تکمیل اقدام ها بالا می رود و اعتماد به برند تقویت می شود. این رویکرد باعث می شود محصول هم زیبا باشد و هم عملکرد واقعی بهتری ارائه دهد.',
      keyInsights: 'طراحی را با هدف کسب وکار همسو کنید\nقبل از زیباسازی، وضوح مسیر کاربر را تضمین کنید\nبا آزمایش مداوم، تصمیم های طراحی را بهینه کنید',
      nextSteps: 'مسیرهای کلیدی کاربر را ممیزی کنید، گلوگاه ها را حذف کنید و تغییرات را با شاخص های قابل اندازه گیری ارزیابی کنید.',
      date: 'می ۲۰۲۵',
    },
    'top-5-tools-we-use-to-build-scalable-websites': {
      title: '۵ ابزار اصلی ما برای ساخت وب سایت های مقیاس پذیر',
      excerpt: 'از طراحی تا استقرار، این ها ابزارهای اصلی ما در ۲۰۲۵ هستند.',
      content: 'مقیاس پذیری نتیجه ترکیب ابزار درست و فرآیند مهندسی منظم است. ما برای طراحی، توسعه، کنترل کیفیت و استقرار، زنجیره ای از ابزارهای مکمل انتخاب می کنیم تا تیم سریع تر و با خطای کمتر خروجی بدهد. هدف این است که رشد محصول بدون افت کیفیت اتفاق بیفتد.',
      keyInsights: 'ابزار را متناسب با توان تیم انتخاب کنید\nکنترل کیفیت را از ابتدای مسیر خودکار کنید\nالگوهای معماری را در تیم یکدست نگه دارید',
      nextSteps: 'فهرست ابزارهای فعلی را بازبینی کنید، نقاط کندی را شناسایی کنید و از اتوماسیون کارهای تکراری شروع کنید.',
      date: 'آوریل ۲۰۲۵',
    },
    'why-every-brand-needs-a-design-system': {
      title: 'چرا هر برند به سیستم طراحی نیاز دارد',
      excerpt: 'سیستم طراحی فقط ظاهر نیست؛ راهنمای عملیاتی برند شماست.',
      content: 'سیستم طراحی، زبان مشترک بین طراحی، محصول و توسعه ایجاد می کند. با داشتن اجزای قابل استفاده مجدد و قوانین روشن، سرعت تحویل بالا می رود و کیفیت تجربه کاربر یکدست می ماند. این ساختار به تیم کمک می کند در مقیاس بزرگ هم هماهنگ بماند.',
      keyInsights: 'یکپارچگی ظاهری اعتماد می سازد\nاجزای قابل استفاده مجدد زمان تحویل را کم می کند\nاستاندارد مشترک، همکاری بین تیمی را بهتر می کند',
      nextSteps: 'از توکن های اصلی و کامپوننت های پرکاربرد شروع کنید و برای استفاده از آن ها مستندات عملی بنویسید.',
      date: 'مارس ۲۰۲۵',
    },
    'dark-mode-design-tips-for-better-ux': {
      title: 'طراحی حالت تاریک: نکته هایی برای UX بهتر',
      excerpt: 'چگونه رابط های تاریک فراگیر، خوانا و زیبا طراحی کنیم.',
      content: 'طراحی حالت تاریک فقط تغییر رنگ پس زمینه نیست. برای خوانایی پایدار باید نسبت کنتراست، نقش رنگ ها و رفتار تایپوگرافی دقیق تنظیم شود. وقتی این اصول رعایت شود، تجربه کاربر در محیط های مختلف نوری بهتر و خستگی چشم کمتر می شود.',
      keyInsights: 'برای رنگ ها نقش معنایی تعریف کنید\nکنتراست دسترس پذیری را همیشه بررسی کنید\nنمایش را روی دستگاه ها و روشنایی های مختلف تست کنید',
      nextSteps: 'تمام صفحات کلیدی را در حالت روشن و تاریک بررسی کنید و الگوهای کم کنتراست را در اولویت اصلاح قرار دهید.',
      date: 'فوریه ۲۰۲۵',
    },
    'how-we-approach-mobile-first-design': {
      title: 'رویکرد ما به طراحی موبایل-اول',
      excerpt: 'ببینید چرا شروع از موبایل، شیوه ساخت برای وب را تغییر می دهد.',
      content: 'طراحی موبایل-اول تیم را مجبور می کند روی مهم ترین نیاز کاربر تمرکز کند. این روش سلسله مراتب محتوا را شفاف تر می کند و از شلوغی رابط جلوگیری می کند. در بسیاری از پروژه ها، همین سادگی اولیه کیفیت نسخه دسکتاپ را هم بهتر کرده است.',
      keyInsights: 'اقدام های اصلی را در اولویت قرار دهید\nرابط را با ارگونومی لمس طراحی کنید\nبرای نمایشگرهای بزرگ تر تدریجی توسعه دهید',
      nextSteps: 'مسیر حیاتی موبایل را مشخص کنید و عناصر کم ارزش را از صفحه های اولیه حذف کنید.',
      date: 'ژانویه ۲۰۲۵',
    },
    'web-performance-in-2025-what-actually-matters': {
      title: 'عملکرد وب در ۲۰۲۵: چه چیز واقعاً مهم است',
      excerpt: 'سرعت، دسترس پذیری و جریان کاربر؛ چک لیست جدید عملکرد.',
      content: 'عملکرد وب امروز فقط امتیاز ابزارها نیست، بلکه تجربه واقعی کاربر در مسیر کامل استفاده از محصول است. رندر سریع، پایداری چیدمان و پاسخ دهی روان تعامل، مستقیما روی نرخ تبدیل و نگهداشت اثر می گذارد. تمرکز باید روی معیارهایی باشد که کاربر واقعا حس می کند.',
      keyInsights: 'معیارهای واقعی کاربران را پایش کنید\nمسیر رندر اولیه را بهینه کنید\nلرزش چیدمان و تاخیر تعامل را حذف کنید',
      nextSteps: 'Core Web Vitals را در محیط واقعی اندازه گیری کنید و اصلاحات را بر اساس اثر کسب وکار اولویت بندی کنید.',
      date: 'دسامبر ۲۰۲۴',
    },
  },
  ps: {
    'the-power-of-purposeful-design': {
      title: 'د هدفمند ډیزاین ځواک',
      excerpt: 'قصدي ډیزاین څنګه د کاروونکي تعامل او د برانډ باور زیاتوي.',
      content: 'هدفمند ډیزاین دا معنا لري چې هر بصري او تجربوي تصمیم باید د سوداګرۍ له واضح هدف سره تړلی وي. کله چې د کاروونکي مسیر ساده او روښانه وي، کاروونکي ژر اقدام کوي او پر برانډ باور زیاتېږي. دا چلند محصول هم ښکلی او هم اغېزمن کوي.',
      keyInsights: 'ډیزاین د سوداګریز هدف سره همغږی کړئ\nله ښکلا مخکې د کاروونکي وضاحت یقیني کړئ\nپرله پسې ازموینې د تصمیم کیفیت لوړوي',
      nextSteps: 'د کاروونکي مهم مسیرونه وارزوی، خنډونه کم کړئ او بدلونونه د اندازه کېدونکو شاخصونو له مخې تعقیب کړئ.',
      date: 'مې ۲۰۲۵',
    },
    'top-5-tools-we-use-to-build-scalable-websites': {
      title: 'د پراخېدونکو وېبپاڼو لپاره زموږ ۵ مهم ابزار',
      excerpt: 'له ډیزاین تر ډیپلویمنت پورې، دا زموږ د ۲۰۲۵ مهم ټېک سټاک دی.',
      content: 'پراخېدنه یوازې په یوه وسیله نه تر لاسه کېږي؛ مهمه ده چې سم ابزارونه له منظم انجنیرۍ بهیر سره یو ځای شي. موږ د ډیزاین، پراختیا، کیفیت او خپرونې لپاره همغږی ټوول چین کاروو تر څو ټیم چټک او باوري پایله ورکړي. هدف دا دی چې د ودې پر مهال کیفیت ثابت پاتې شي.',
      keyInsights: 'وسیلې د ټیم د وړتیا له مخې وټاکئ\nکیفیتي کنټرول له لومړي پړاو څخه اتومات کړئ\nد معمارۍ الګوګانې په ټیم کې یو شان وساتئ',
      nextSteps: 'اوسنی ټېک سټاک وارزوی، د ځنډ نقاط وپېژنئ او د تکراري کارونو له اتومات کولو پیل وکړئ.',
      date: 'اپریل ۲۰۲۵',
    },
    'why-every-brand-needs-a-design-system': {
      title: 'ولې هر برانډ د ډیزاین سیسټم ته اړتیا لري',
      excerpt: 'ډیزاین سیسټم یوازې لیدیز نه دی؛ دا د برانډ کاري لارښود دی.',
      content: 'ډیزاین سیسټم د ډیزاین، محصول او پراختیا ترمنځ ګډه ژبه رامنځته کوي. د بیا کارېدونکو اجزاوو او روښانه قواعدو له لارې د کار سرعت لوړېږي او د کاروونکي تجربه یو شان پاتې کېږي. دا چوکاټ ټیم ته اجازه ورکوي چې په پراخېدو کې هم منظم او همغږی پاتې شي.',
      keyInsights: 'یو شان تجربه باور جوړوي\nبیا کارېدونکي الګوګانې د سپارلو وخت کموي\nګډ معیار د ټیمونو همکاري ښه کوي',
      nextSteps: 'له بنسټیزو UI توکنونو او عامو کامپوننټونو پیل وکړئ او د کارونې واضح مستندات جوړ کړئ.',
      date: 'مارچ ۲۰۲۵',
    },
    'dark-mode-design-tips-for-better-ux': {
      title: 'ډارک موډ ډیزاین: د غوره UX لپاره لارښوونې',
      excerpt: 'څنګه ټول-شمول، لوستلو وړ او ښکلي تیاره انٹرفېسونه ډیزاین کړو.',
      content: 'ډارک موډ یوازې د شالید رنګ بدلول نه دي. د لوستلو وړتیا لپاره د رنګ کنتراست، د رنګونو معنوي رولونه او تایپوګرافي باید په دقت تنظیم شي. د دې اصولو په مراعت سره تجربه په بېلابېلو رڼا چاپېریالونو کې هم راحته او اغېزمنه پاتې کېږي.',
      keyInsights: 'رنګونو ته معنوي رولونه وټاکئ\nد لاسرسي کنتراست تل تایید کړئ\nپه مختلفو وسیلو او رڼا کچو کې ازموینه وکړئ',
      nextSteps: 'کلیدي پاڼې په روښانه او تیاره حالت کې وازمویئ او ټیټ کنتراست الګوګانې لومړی اصلاح کړئ.',
      date: 'فبروري ۲۰۲۵',
    },
    'how-we-approach-mobile-first-design': {
      title: 'موږ موبایل-اول ډیزاین څنګه ترسره کوو',
      excerpt: 'وګورئ چې له موبایل څخه پیل کول څنګه د وېب جوړولو طریقه بدلوي.',
      content: 'موبایل-اول چلند ټیم اړ کوي چې د کاروونکي پر اساسي اړتیاوو تمرکز وکړي. دا طریقه د محتوا سلسله روښانه کوي او غیر ضروري ګډوډي کموي. په ډېرو پروژو کې همدا ساده پیل د ډسکټاپ نسخې کیفیت هم لوړ کړی دی.',
      keyInsights: 'اصلي اقدامات لومړیتوب کړئ\nانٹرفېس د لمس کارونې له مخې طرحه کړئ\nد لویو سکرینونو لپاره تدریجي پرمختګ وکړئ',
      nextSteps: 'د موبایل حیاتي مسیر وټاکئ او له لومړیو سکرینونو څخه کم ارزښت عناصر لرې کړئ.',
      date: 'جنوري ۲۰۲۵',
    },
    'web-performance-in-2025-what-actually-matters': {
      title: 'په ۲۰۲۵ کې د وېب فعالیت: څه واقعاً مهم دي',
      excerpt: 'چټکتیا، لاسرسی او د کاروونکي جریان - نوی چک لېسټ.',
      content: 'نننی وېب فعالیت یوازې د لابراتواري نمرې موضوع نه ده، بلکې د کاروونکي واقعي تجربه ده. چټک رینډر، ثابت لې اوټ او روان تعامل د بدلون او ساتنې پر کچې مستقیم اغېز لري. تمرکز باید پر هغو شاخصونو وي چې کاروونکي یې په عمل کې احساسوي.',
      keyInsights: 'د حقیقي کاروونکو معیارونه تعقیب کړئ\nد لومړني رینډر مسیر ښه کړئ\nد لې اوټ لړزېدنه او تعامل ځنډ له منځه یوسئ',
      nextSteps: 'Core Web Vitals په تولید چاپېریال کې اندازه کړئ او اصلاحات د سوداګریز اثر له مخې لومړیتوب کړئ.',
      date: 'دسمبر ۲۰۲۴',
    },
  },
};

const hasArabicScript = (value = '') => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);

const shouldUseRtlFallback = (value, locale) => {
  if (locale !== 'fa' && locale !== 'ps') return false;
  if (typeof value !== 'string' || !value.trim()) return true;
  return !hasArabicScript(value);
};

export const applyLocalizedBlogPostFallback = (post = {}, locale = 'en') => {
  if (!post || typeof post !== 'object') return post;

  const localizedBySlug = RTL_BLOG_POST_FALLBACKS[locale] || null;
  if (!localizedBySlug) return post;

  const fallback = localizedBySlug[post.slug];
  if (!fallback) return post;

  return {
    ...post,
    title: shouldUseRtlFallback(post.title, locale) ? fallback.title : post.title,
    excerpt: shouldUseRtlFallback(post.excerpt, locale) ? fallback.excerpt : post.excerpt,
    description: shouldUseRtlFallback(post.description, locale) ? fallback.excerpt : post.description,
    content: shouldUseRtlFallback(post.content, locale) ? fallback.content : post.content,
    keyInsights: shouldUseRtlFallback(post.keyInsights, locale) ? fallback.keyInsights : post.keyInsights,
    nextSteps: shouldUseRtlFallback(post.nextSteps, locale) ? fallback.nextSteps : post.nextSteps,
    date: shouldUseRtlFallback(post.date, locale) ? fallback.date : post.date,
  };
};

export const applyLocalizedBlogPostFallbackList = (posts = [], locale = 'en') => {
  if (!Array.isArray(posts)) return [];
  return posts.map((post) => applyLocalizedBlogPostFallback(post, locale));
};

const normalizePostItem = (item, index) => {
  const fallbackSlug = DEFAULT_BLOG_POSTS[index % DEFAULT_BLOG_POSTS.length]?.slug || `post-${index + 1}`;
  if (typeof item === 'string') {
    const title = item;
    return {
      title,
      excerpt: '',
      description: '',
      content: '',
      keyInsights: '',
      nextSteps: '',
      image: '',
      date: '',
      datePublished: '',
      link: '',
      slug: fallbackSlug || slugifyBlogTitle(title),
    };
  }

  const title = item?.title || `Post ${index + 1}`;
  const providedSlug = slugifyBlogTitle(item?.slug || '');
  const linkSlug = getSlugFromLink(item?.link || '');
  const slug = providedSlug || linkSlug || fallbackSlug || slugifyBlogTitle(title);

  return {
    title,
    excerpt: item?.excerpt || item?.description || '',
    description: item?.description || item?.excerpt || '',
    content: item?.content || '',
    keyInsights: item?.keyInsights || item?.insights || '',
    nextSteps: item?.nextSteps || '',
    image: item?.image || '',
    date: item?.date || '',
    datePublished: item?.datePublished || '',
    link: item?.link || '',
    slug,
  };
};

export const extractBlogPostsFromSections = (sections = []) => {
  if (!Array.isArray(sections)) return [];

  let sectionWithPosts = null;

  for (const section of sections) {
    const key = normalizeSectionToken(section?.sectionKey || '');
    const type = normalizeSectionToken(section?.sectionType || '');
    const isBlogPostsSection =
      BLOG_POST_SECTION_TOKENS.has(key) || BLOG_POST_SECTION_TOKENS.has(type);

    if (!isBlogPostsSection) continue;

    const posts = section?.content?.content?.posts;
    if (Array.isArray(posts) && posts.length) {
      sectionWithPosts = posts;
      break;
    }
  }

  if (!sectionWithPosts) {
    sectionWithPosts = DEFAULT_BLOG_POSTS;
  }

  const usedSlugs = new Set();
  return sectionWithPosts.map((item, index) => {
    const normalized = normalizePostItem(item, index);
    let uniqueSlug = normalized.slug;

    if (usedSlugs.has(uniqueSlug)) {
      let suffix = 2;
      while (usedSlugs.has(`${uniqueSlug}-${suffix}`)) suffix += 1;
      uniqueSlug = `${uniqueSlug}-${suffix}`;
    }

    usedSlugs.add(uniqueSlug);

    return {
      ...normalized,
      slug: uniqueSlug,
    };
  });
};

export const resolveBlogPostHref = (post) => {
  const rawLink = String(post?.link || '').trim();
  if (rawLink === '/blogs') return '/blog';
  if (rawLink && rawLink !== '#' && rawLink !== '/blog') {
    return rawLink;
  }

  const slug = String(post?.slug || slugifyBlogTitle(post?.title || '')).trim();
  return slug ? `/blog/${slug}` : '/blog';
};

export const findBlogPostBySlug = (sections = [], slug = '') => {
  const normalizedSlug = String(slug || '').trim().toLowerCase();
  if (!normalizedSlug) return null;

  const posts = extractBlogPostsFromSections(sections);
  return (
    posts.find((post) => post.slug === normalizedSlug || getSlugFromLink(post.link) === normalizedSlug) ||
    null
  );
};
