'use client';

import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const copyByLanguage = {
  en: {
    content: 'Content',
    title: 'Pages',
    subtitle: 'Manage page metadata, section content, and publishing from one place.',
    stats: { total: 'Total', published: 'Published', draft: 'Draft' },
    table: {
      title: 'Title',
      slug: 'Slug',
      lastPublished: 'Last Published',
      status: 'Status',
      action: 'Action',
      notPublishedYet: 'Not published yet',
      published: 'Published',
      draftOnly: 'Draft only',
      editPage: 'Edit Page',
      noPages: 'No pages found.',
    },
  },
  fa: {
    content: 'محتوا',
    title: 'صفحه ها',
    subtitle: 'فراداده صفحه، محتوای بخش ها و انتشار را از یکجا مدیریت کنید.',
    stats: { total: 'کل', published: 'منتشرشده', draft: 'پیش نویس' },
    table: {
      title: 'عنوان',
      slug: 'اسلاگ',
      lastPublished: 'آخرین انتشار',
      status: 'وضعیت',
      action: 'عملیات',
      notPublishedYet: 'هنوز منتشر نشده',
      published: 'منتشرشده',
      draftOnly: 'فقط پیش نویس',
      editPage: 'ویرایش صفحه',
      noPages: 'هیچ صفحه ای یافت نشد.',
    },
  },
  ps: {
    content: 'منځپانګه',
    title: 'پاڼې',
    subtitle: 'د پاڼې معلومات، د برخو محتوا او خپرونه له یوه ځایه اداره کړئ.',
    stats: { total: 'ټول', published: 'خپور شوي', draft: 'مسوده' },
    table: {
      title: 'سرلیک',
      slug: 'سلګ',
      lastPublished: 'وروستۍ خپرونه',
      status: 'حالت',
      action: 'عمل',
      notPublishedYet: 'لا نه دی خپور شوی',
      published: 'خپور شوی',
      draftOnly: 'یوازې مسوده',
      editPage: 'پاڼه سمول',
      noPages: 'هیڅ پاڼه ونه موندل شوه.',
    },
  },
};

const localeByLanguage = {
  en: 'en-US',
  fa: 'fa-IR',
  ps: 'ps-AF',
};

const AdminPagesListContent = ({ pages = [], publishedCount = 0 }) => {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 90% 10%, color-mix(in srgb, var(--theme-secondary) 10%, transparent), transparent 50%)',
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
              {copy.content}
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{copy.title}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{copy.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { label: copy.stats.total, count: pages.length },
              { label: copy.stats.published, count: publishedCount },
              { label: copy.stats.draft, count: pages.length - publishedCount },
            ].map((item, index) => (
              <span
                key={`${item.label}-${index}`}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 px-2.5 py-1 font-semibold text-slate-600 dark:text-slate-300 backdrop-blur-sm"
              >
                {item.label} {item.count}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-950 shadow-sm dark:shadow-black/30">
        <div
          className="h-0.5"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{copy.table.title}</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{copy.table.slug}</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{copy.table.lastPublished}</th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{copy.table.status}</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{copy.table.action}</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => {
                const isPublished = Boolean(page.publishedSnapshot?.publishedAt);

                return (
                  <tr key={page.id} className="border-b border-slate-100 dark:border-slate-800/50 last:border-b-0">
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">{page.title}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 font-mono text-xs">/{page.slug}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs">
                      {isPublished
                        ? new Date(page.publishedSnapshot.publishedAt).toLocaleString(localeByLanguage[language] || localeByLanguage.en)
                        : copy.table.notPublishedYet}
                    </td>
                    <td className="px-5 py-3.5">
                      {isPublished ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {copy.table.published}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/40 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          {copy.table.draftOnly}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/pages/${page.id}/edit`}
                        className="inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                        }}
                      >
                        {copy.table.editPage}
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {!pages.length ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    {copy.table.noPages}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPagesListContent;
