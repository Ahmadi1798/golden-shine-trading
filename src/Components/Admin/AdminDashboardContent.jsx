'use client';

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const copyByLanguage = {
  en: {
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    subtitle: 'Manage all editable parts of your website.',
    agencySite: 'Agency Website',
    stats: {
      pages: 'Pages',
      navItems: 'Navigation Items',
      footerItems: 'Footer Items',
      mediaAssets: 'Media Assets',
    },
    quickActions: 'Quick Actions',
    actions: {
      pagesTitle: 'Manage Pages',
      pagesDescription: 'Edit section order, visibility, SEO metadata, and publishing workflow.',
      pagesCta: 'Open Page Editor',
      mediaTitle: 'Media Library',
      mediaDescription: 'Upload and organize images/videos for page sections and branding.',
      mediaCta: 'Open Media',
      themeTitle: 'Theme Studio',
      themeDescription: 'Update global colors, fonts, and logo with live visual preview.',
      themeCta: 'Open Theme',
      settingsTitle: 'Site Settings',
      settingsDescription: 'Configure site-wide navigation and footer links for all pages.',
      settingsCta: 'Open Settings',
    },
    snapshot: 'System Snapshot',
    snapshotItems: {
      publishedPages: 'Published pages',
      mediaItems: 'Media items',
      navigationLinks: 'Navigation links',
      footerLinks: 'Footer links',
    },
  },
  fa: {
    welcome: 'خوش آمدید',
    dashboard: 'داشبورد',
    subtitle: 'همه بخش های قابل ویرایش وب سایت خود را مدیریت کنید.',
    agencySite: 'وب سایت آژانس',
    stats: {
      pages: 'صفحه ها',
      navItems: 'آیتم های ناوبری',
      footerItems: 'آیتم های فوتر',
      mediaAssets: 'رسانه ها',
    },
    quickActions: 'اقدام های سریع',
    actions: {
      pagesTitle: 'مدیریت صفحه ها',
      pagesDescription: 'ترتیب بخش ها، نمایش، سئو و روند انتشار را ویرایش کنید.',
      pagesCta: 'باز کردن ویرایشگر صفحه',
      mediaTitle: 'کتابخانه رسانه',
      mediaDescription: 'تصاویر و ویدیوها را برای بخش های صفحه و برندگذاری آپلود و مدیریت کنید.',
      mediaCta: 'باز کردن رسانه',
      themeTitle: 'استودیوی قالب',
      themeDescription: 'رنگ ها، فونت ها و لوگو را با پیش نمایش زنده به روز کنید.',
      themeCta: 'باز کردن قالب',
      settingsTitle: 'تنظیمات سایت',
      settingsDescription: 'ناوبری سراسری و لینک های فوتر را برای همه صفحه ها تنظیم کنید.',
      settingsCta: 'باز کردن تنظیمات',
    },
    snapshot: 'نمای کلی سیستم',
    snapshotItems: {
      publishedPages: 'صفحه های منتشرشده',
      mediaItems: 'رسانه ها',
      navigationLinks: 'لینک های ناوبری',
      footerLinks: 'لینک های فوتر',
    },
  },
  ps: {
    welcome: 'ښه راغلاست',
    dashboard: 'ډشبورډ',
    subtitle: 'د خپلې وېبپاڼې ټول د سمون وړ برخې مدیریت کړئ.',
    agencySite: 'د اژانس وېبپاڼه',
    stats: {
      pages: 'پاڼې',
      navItems: 'د ناوبرۍ توکي',
      footerItems: 'د فوټر توکي',
      mediaAssets: 'میډیا فایلونه',
    },
    quickActions: 'چټک عملونه',
    actions: {
      pagesTitle: 'د پاڼو مدیریت',
      pagesDescription: 'د برخو ترتیب، لید، SEO معلومات او د خپرولو بهیر سم کړئ.',
      pagesCta: 'د پاڼې اېډیټر پرانیزئ',
      mediaTitle: 'د میډیا کتابتون',
      mediaDescription: 'انځورونه او ویډیوګانې د پاڼې برخو او برانډ لپاره اپلوډ او تنظیم کړئ.',
      mediaCta: 'میډیا پرانیزئ',
      themeTitle: 'د تیم سټوډیو',
      themeDescription: 'عمومي رنګونه، فونټونه او لوګو د ژوندۍ مخکتنې سره نوي کړئ.',
      themeCta: 'تیم پرانیزئ',
      settingsTitle: 'د سایټ تنظیمات',
      settingsDescription: 'د ټولو پاڼو لپاره عمومي ناوبري او فوټر لینکونه تنظیم کړئ.',
      settingsCta: 'تنظیمات پرانیزئ',
    },
    snapshot: 'د سیسټم لنډیز',
    snapshotItems: {
      publishedPages: 'خپرې شوې پاڼې',
      mediaItems: 'میډیا توکي',
      navigationLinks: 'د ناوبرۍ لینکونه',
      footerLinks: 'د فوټر لینکونه',
    },
  },
};

const AdminDashboardContent = ({ siteName, pagesCount, navCount, footerCount, mediaCount }) => {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;

  const stats = [
    { label: copy.stats.pages, value: pagesCount },
    { label: copy.stats.navItems, value: navCount },
    { label: copy.stats.footerItems, value: footerCount },
    { label: copy.stats.mediaAssets, value: mediaCount },
  ];

  const quickActions = [
    {
      title: copy.actions.pagesTitle,
      description: copy.actions.pagesDescription,
      href: '/admin/pages',
      cta: copy.actions.pagesCta,
    },
    {
      title: copy.actions.mediaTitle,
      description: copy.actions.mediaDescription,
      href: '/admin/media',
      cta: copy.actions.mediaCta,
    },
    {
      title: copy.actions.themeTitle,
      description: copy.actions.themeDescription,
      href: '/admin/theme',
      cta: copy.actions.themeCta,
    },
    {
      title: copy.actions.settingsTitle,
      description: copy.actions.settingsDescription,
      href: '/admin/settings',
      cta: copy.actions.settingsCta,
    },
  ];

  const snapshotItems = [
    { label: copy.snapshotItems.publishedPages, value: pagesCount },
    { label: copy.snapshotItems.mediaItems, value: mediaCount },
    { label: copy.snapshotItems.navigationLinks, value: navCount },
    { label: copy.snapshotItems.footerLinks, value: footerCount },
  ];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 90% 10%, color-mix(in srgb, var(--theme-accent) 10%, transparent), transparent 50%)',
          }}
        />
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {copy.welcome}
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{copy.dashboard}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {copy.subtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 backdrop-blur-sm shrink-0">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            />
            {siteName || copy.agencySite}
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <article
            key={`${item.label}-${index}`}
            className="overflow-hidden rounded-xl bg-white dark:bg-gray-950 shadow-sm dark:shadow-black/30 transition-all duration-200 hover:shadow-md dark:hover:shadow-black/50"
          >
            <div
              className="h-0.5"
              style={{
                background:
                  index % 2 === 0
                    ? 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))'
                    : 'linear-gradient(90deg, var(--theme-secondary), var(--theme-accent))',
              }}
            />
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-1.5 text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {item.value}
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{copy.quickActions}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {quickActions.map((action, index) => (
            <Link
              key={`${action.href}-${index}`}
              href={action.href}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/50"
            >
              <div
                className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
              />
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                {action.title}
              </h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-snug">
                {action.description}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-1.5"
                style={{ color: 'var(--theme-primary)' }}
              >
                {action.cta}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.snapshot}</h3>
        <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-2">
          {snapshotItems.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3.5 py-2.5"
            >
              <span>{item.label}</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardContent;
