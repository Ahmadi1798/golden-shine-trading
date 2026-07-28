'use client';

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import AdminLogoutButton from './AdminLogoutButton';

const navItems = [
  { href: '/admin', key: 'dashboard' },
  { href: '/admin/pages', key: 'pages' },
  { href: '/admin/theme', key: 'theme' },
  { href: '/admin/media', key: 'media' },
  { href: '/admin/settings', key: 'settings' },
];

const copyByLanguage = {
  en: {
    title: 'KarFamSoft Admin',
    signedInAs: 'Signed in as',
    nav: {
      dashboard: 'Dashboard',
      pages: 'Pages',
      theme: 'Theme',
      media: 'Media',
      settings: 'Settings',
    },
  },
  fa: {
    title: 'مدیریت کارفم سافت',
    signedInAs: 'ورود با',
    nav: {
      dashboard: 'داشبورد',
      pages: 'صفحه ها',
      theme: 'قالب',
      media: 'رسانه',
      settings: 'تنظیمات',
    },
  },
  ps: {
    title: 'د کارفم سافت اډمین',
    signedInAs: 'ورود شوی کارن',
    nav: {
      dashboard: 'ډشبورډ',
      pages: 'پاڼې',
      theme: 'تیم',
      media: 'میډیا',
      settings: 'تنظیمات',
    },
  },
};

const AdminProtectedHeader = ({ email = '' }) => {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">{copy.title}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {copy.signedInAs} {email}
          </p>
        </div>

        <AdminLogoutButton />
      </div>

      <nav className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 pb-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 px-3.5 py-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white hover:shadow-sm dark:hover:shadow-black/30"
          >
            {copy.nav[item.key] || copyByLanguage.en.nav[item.key]}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default AdminProtectedHeader;
