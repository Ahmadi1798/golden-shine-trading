'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import PageEditor from './PageEditor';

const localeByLanguage = {
  en: 'en-US',
  fa: 'fa-IR',
  ps: 'ps-AF',
};

const copyByLanguage = {
  en: {
    notFound: 'Page not found',
    backToPages: 'Back to pages',
    pageEditor: 'Page Editor',
    lastPublished: (value) => `Last published: ${value}`,
    draftOnly: 'Draft only',
  },
  fa: {
    notFound: 'صفحه پیدا نشد',
    backToPages: 'بازگشت به صفحه ها',
    pageEditor: 'ویرایشگر صفحه',
    lastPublished: (value) => `آخرین انتشار: ${value}`,
    draftOnly: 'فقط پیش نویس',
  },
  ps: {
    notFound: 'پاڼه ونه موندل شوه',
    backToPages: 'پاڼو ته بېرته',
    pageEditor: 'د پاڼې اېډېټر',
    lastPublished: (value) => `وروستۍ خپرونه: ${value}`,
    draftOnly: 'یوازې مسوده',
  },
};

const AdminPageEditContent = ({ page }) => {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;
  const locale = localeByLanguage[language] || localeByLanguage.en;

  if (!page) {
    return (
      <div className="space-y-5">
        <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
          <div className="relative text-center py-6">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{copy.notFound}</h2>
            <Link
              href="/admin/pages"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2"
              style={{ color: 'var(--theme-primary)' }}
            >
              <ArrowLeft size={14} />
              {copy.backToPages}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 90% 10%, color-mix(in srgb, var(--theme-primary) 8%, transparent), transparent 50%)',
          }}
        />
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/pages"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200"
                aria-label={copy.backToPages}
              >
                <ArrowLeft size={15} />
              </Link>
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {copy.pageEditor}
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{page.title}</h2>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span><span className="font-mono">/{page.slug}</span></span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
              <span>
                {page.publishedSnapshot?.publishedAt
                  ? copy.lastPublished(new Date(page.publishedSnapshot.publishedAt).toLocaleString(locale))
                  : copy.draftOnly}
              </span>
            </div>
          </div>
        </div>
      </section>

      <PageEditor key={page.id} page={page} />
    </div>
  );
};

export default AdminPageEditContent;
