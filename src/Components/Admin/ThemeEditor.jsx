'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FONT_OPTIONS = [
  'Poppins, sans-serif',
  'Inter, sans-serif',
  'Manrope, sans-serif',
  'Montserrat, sans-serif',
  'DM Sans, sans-serif',
  'Lora, serif',
  'Vazirmatn, sans-serif',
  'Noto Sans Arabic, sans-serif',
  'Almarai, sans-serif',
  'Lalezar, sans-serif',
  'Cairo, sans-serif',
  'Alexandria, sans-serif',
];

const normalizeFontStack = (value, fallback = 'sans-serif') => {
  const cleaned = String(value || '').trim();
  if (!cleaned) return `Poppins, ${fallback}`;
  if (cleaned.includes('serif') || cleaned.includes('sans') || cleaned.includes('monospace')) {
    return cleaned;
  }
  return `${cleaned}, ${fallback}`;
};

const ThemeEditor = ({ siteSettings }) => {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    brandName: siteSettings?.brandName || '',
    logoUrl: siteSettings?.logoUrl || '',
    primaryColor: siteSettings?.primaryColor || '#4F46E5',
    secondaryColor: siteSettings?.secondaryColor || '#7C3AED',
    accentColor: siteSettings?.accentColor || '#EC4899',
    fontHeading: siteSettings?.fontHeading || 'Poppins, sans-serif',
    fontBody: siteSettings?.fontBody || 'Poppins, sans-serif',
  });
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const copyByLanguage = {
    en: {
      failedLoadAssets: 'Failed to load media assets',
      savingTheme: 'Saving theme...',
      saveFailed: 'Failed to save theme.',
      saveSuccess: 'Theme saved. Refresh public pages to see changes.',
      sectionLabel: 'Customize',
      title: 'Theme Studio',
      subtitle: 'Configure brand identity once and apply it across the entire website.',
      saveTheme: 'Save Theme',
      saving: 'Saving...',
      brandName: 'Brand Name',
      brandNamePlaceholder: 'Your Agency Name',
      logo: 'Logo',
      noLogo: 'No logo (show brand text)',
      brandColors: 'Brand Colors',
      appliesGlobally: 'Applies globally',
      primary: 'Primary',
      secondary: 'Secondary',
      accent: 'Accent',
      headingFont: 'Heading Font',
      bodyFont: 'Body Font',
      loadingAssets: 'Loading media assets...',
      noImageAsset: 'No image found in media library. Upload one in Admin Media, then return here to select it.',
      livePreview: 'Live Preview',
      previewHint: 'Reflects your selections before saving.',
      previewBrand: 'Your Brand',
      previewTitle: 'Modern Theme System',
      previewDescription: 'This preview reflects your selected logo, colors, and fonts before saving.',
      previewAction: 'Primary Action',
    },
    fa: {
      failedLoadAssets: 'بارگذاری رسانه ها ناموفق بود',
      savingTheme: 'در حال ذخیره قالب...',
      saveFailed: 'ذخیره قالب ناموفق بود.',
      saveSuccess: 'قالب ذخیره شد. برای مشاهده تغییرات، صفحات عمومی را تازه سازی کنید.',
      sectionLabel: 'شخصی سازی',
      title: 'استودیوی قالب',
      subtitle: 'هویت برند را یک بار تنظیم کنید و در کل وب سایت اعمال کنید.',
      saveTheme: 'ذخیره قالب',
      saving: 'در حال ذخیره...',
      brandName: 'نام برند',
      brandNamePlaceholder: 'نام آژانس شما',
      logo: 'لوگو',
      noLogo: 'بدون لوگو (نمایش نام برند)',
      brandColors: 'رنگ های برند',
      appliesGlobally: 'اعمال در کل سایت',
      primary: 'اصلی',
      secondary: 'ثانویه',
      accent: 'تاکیدی',
      headingFont: 'فونت عنوان',
      bodyFont: 'فونت متن',
      loadingAssets: 'در حال بارگذاری رسانه ها...',
      noImageAsset: 'هیچ تصویری در کتابخانه رسانه یافت نشد. ابتدا از بخش رسانه یک تصویر آپلود کنید.',
      livePreview: 'پیش نمایش زنده',
      previewHint: 'انتخاب های شما را قبل از ذخیره نمایش می دهد.',
      previewBrand: 'برند شما',
      previewTitle: 'سیستم قالب مدرن',
      previewDescription: 'این پیش نمایش لوگو، رنگ ها و فونت های انتخابی شما را قبل از ذخیره نشان می دهد.',
      previewAction: 'اقدام اصلی',
    },
    ps: {
      failedLoadAssets: 'د میډیا فایلونو بارول ناکام شول',
      savingTheme: 'تیم خوندي کېږي...',
      saveFailed: 'د تیم خوندي کول ناکام شول.',
      saveSuccess: 'تیم خوندي شو. د بدلونونو لیدلو لپاره عامه پاڼې بیا تازه کړئ.',
      sectionLabel: 'تنظیمول',
      title: 'د تیم سټوډیو',
      subtitle: 'د برانډ هویت یو ځل تنظیم کړئ او ټولې وېبپاڼې ته یې پلي کړئ.',
      saveTheme: 'تیم خوندي کړئ',
      saving: 'خوندي کېږي...',
      brandName: 'د برانډ نوم',
      brandNamePlaceholder: 'ستاسې د اژانس نوم',
      logo: 'لوګو',
      noLogo: 'لوګو نشته (د برانډ نوم ښکاره شي)',
      brandColors: 'د برانډ رنګونه',
      appliesGlobally: 'په ټول سایټ پلي کېږي',
      primary: 'اصلي',
      secondary: 'ثانوي',
      accent: 'ټینګار',
      headingFont: 'د سرلیک فونټ',
      bodyFont: 'د متن فونټ',
      loadingAssets: 'میډیا فایلونه بارېږي...',
      noImageAsset: 'د میډیا کتابتون کې انځور ونه موندل شو. لومړی له میډیا برخې انځور پورته کړئ.',
      livePreview: 'ژوندۍ مخکتنه',
      previewHint: 'له خوندي کولو مخکې ستاسو ټاکنې ښيي.',
      previewBrand: 'ستاسې برانډ',
      previewTitle: 'عصري تیم سیستم',
      previewDescription: 'دا مخکتنه له خوندي کولو مخکې ستاسو ټاکل شوی لوګو، رنګونه او فونټونه ښيي.',
      previewAction: 'اصلي عمل',
    },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    let active = true;

    const loadAssets = async () => {
      setLoadingAssets(true);
      try {
        const response = await fetch('/api/media');
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.error || copy.failedLoadAssets);
        }
        if (active) {
          setMediaAssets(Array.isArray(data?.mediaAssets) ? data.mediaAssets : []);
        }
      } catch {
        if (active) {
          setMediaAssets([]);
        }
      } finally {
        if (active) {
          setLoadingAssets(false);
        }
      }
    };

    loadAssets();

    return () => {
      active = false;
    };
  }, [copy.failedLoadAssets]);

  const imageAssets = useMemo(
    () => mediaAssets.filter((asset) => String(asset?.type || '').toLowerCase() === 'image'),
    [mediaAssets]
  );

  const selectedLogoAsset = useMemo(
    () => imageAssets.find((asset) => asset.url === form.logoUrl) || null,
    [imageAssets, form.logoUrl]
  );

  const headingFont = normalizeFontStack(form.fontHeading, 'sans-serif');
  const bodyFont = normalizeFontStack(form.fontBody, 'sans-serif');

  const setLogoFromAsset = (value) => {
    updateField('logoUrl', value);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(copy.savingTheme);

    const response = await fetch('/api/site-settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        fontHeading: headingFont,
        fontBody: bodyFont,
      }),
    });

    setSaving(false);

    if (!response.ok) {
      setStatus(copy.saveFailed);
      return;
    }

    setStatus(copy.saveSuccess);
  };

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
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--theme-primary)' }}
            >
              {copy.sectionLabel}
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{copy.title}</h1>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {copy.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, ${form.primaryColor}, ${form.secondaryColor})`,
            }}
          >
            {saving ? copy.saving : copy.saveTheme}
          </button>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
          <div
            className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
            style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{copy.brandName}</span>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={form.brandName}
                onChange={(event) => updateField('brandName', event.target.value)}
                placeholder={copy.brandNamePlaceholder}
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{copy.logo}</span>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={form.logoUrl}
                onChange={(event) => setLogoFromAsset(event.target.value)}
              >
                <option value="">{copy.noLogo}</option>
                {imageAssets.map((asset) => (
                  <option key={asset.id} value={asset.url}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-300">{copy.brandColors}</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">{copy.appliesGlobally}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: copy.primary, key: 'primaryColor', value: form.primaryColor },
                { label: copy.secondary, key: 'secondaryColor', value: form.secondaryColor },
                { label: copy.accent, key: 'accentColor', value: form.accentColor },
              ].map((color) => (
                <label key={color.key} className="space-y-1.5 text-sm font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{color.label}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-9 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 cursor-pointer"
                      value={color.value}
                      onChange={(event) => updateField(color.key, event.target.value)}
                    />
                    <input
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 font-mono"
                      style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                      value={color.value}
                      onChange={(event) => updateField(color.key, event.target.value)}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{copy.headingFont}</span>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={form.fontHeading}
                onChange={(event) => updateField('fontHeading', event.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={`heading-${font}`} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium">
              <span className="text-slate-700 dark:text-slate-300">{copy.bodyFont}</span>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={form.fontBody}
                onChange={(event) => updateField('fontBody', event.target.value)}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={`body-${font}`} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {loadingAssets ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{copy.loadingAssets}</p>
          ) : !imageAssets.length ? (
            <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
              {copy.noImageAsset}
            </p>
          ) : null}

          {status ? (
            <p className={`mt-3 text-sm font-medium ${
              /failed|error|ناموفق|ناکام/i.test(status)
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {status}
            </p>
          ) : null}
        </section>

        <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
          <div
            className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
            style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
          />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.livePreview}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{copy.previewHint}</p>

          <article className="mt-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: `linear-gradient(135deg, ${form.primaryColor}, ${form.secondaryColor})`,
                color: '#ffffff',
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {selectedLogoAsset?.url ? (
                  <img
                    src={selectedLogoAsset.url}
                    alt={selectedLogoAsset.altText || `${form.brandName || 'Brand'} logo`}
                    className="h-7 w-7 rounded-md bg-white/20 object-cover shrink-0"
                  />
                ) : null}
                <span style={{ fontFamily: headingFont }} className="text-sm font-extrabold truncate">
                  {form.brandName || copy.previewBrand}
                </span>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ backgroundColor: form.accentColor }}
              >
                Accent
              </span>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4" style={{ fontFamily: bodyFont }}>
              <h3 style={{ fontFamily: headingFont }} className="text-lg font-extrabold text-slate-900 dark:text-white">
                {copy.previewTitle}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {copy.previewDescription}
              </p>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${form.primaryColor}, ${form.secondaryColor})`,
                }}
              >
                {copy.previewAction}
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ThemeEditor;
