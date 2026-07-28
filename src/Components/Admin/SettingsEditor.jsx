'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const SettingsEditor = ({ siteSettings }) => {
  const { language } = useLanguage();

  const copyByLanguage = {
    en: {
      loadNavigationFailed: 'Failed to load navigation links.',
      loadFooterFailed: 'Failed to load footer links.',
      savingNavigation: 'Saving navigation links...',
      saveNavigationFailed: 'Failed to save navigation links.',
      saveNavigationSuccess: 'Navigation links saved.',
      savingFooter: 'Saving footer links...',
      saveFooterFailed: 'Failed to save footer links.',
      saveFooterSuccess: 'Footer links saved.',
      savingSettings: 'Saving settings...',
      saveSettingsFailed: 'Failed to save settings.',
      saveSettingsSuccess: 'Settings saved.',
      saveSocialLinks: 'Save Social Links',
      socialLinks: 'Social Links',
      socialLinksHint: 'Social media profile URLs for the footer.',
      facebookUrl: 'Facebook URL',
      facebookPlaceholder: 'https://facebook.com/your-page',
      instagramUrl: 'Instagram URL',
      instagramPlaceholder: 'https://instagram.com/your-profile',
      twitterUrl: 'Twitter / X URL',
      twitterPlaceholder: 'https://twitter.com/your-profile',
      whatsappUrl: 'WhatsApp URL',
      whatsappPlaceholder: 'https://wa.me/1234567890',
      sectionLabel: 'Configure',
      title: 'Site Settings',
      subtitle: 'Manage contact info, navigation, and footer links.',
      contactInfo: 'Contact Information',
      contactEmail: 'Contact Email',
      contactEmailPlaceholder: 'hello@agency.com',
      contactPhone: 'Contact Phone',
      contactPhonePlaceholder: '+1 (555) 123-4567',
      contactAddress: 'Contact Address',
      contactAddressPlaceholder: '703 Bartley-Chester Rd, Virginia, USA',
      saveSettings: 'Save Settings',
      navbarNavigation: 'Navbar Navigation',
      navbarHint: 'Links displayed in the header navigation bar.',
      addLink: 'Add Link',
      labelPlaceholder: 'Label (e.g. Services)',
      pathPlaceholder: 'Path (e.g. /services)',
      moveUp: 'Move up',
      moveDown: 'Move down',
      removeLink: 'Remove link',
      remove: 'Remove',
      saveNavigationLinks: 'Save Navigation Links',
      footerLinks: 'Footer Links',
      footerHint: 'Links displayed in the footer columns.',
      addFooterLink: 'Add Footer Link',
      company: 'Company',
      connect: 'Connect',
      footerLabelPlaceholder: 'Label',
      footerPathPlaceholder: 'Path (e.g. /privacy)',
      saveFooterLinks: 'Save Footer Links',
    },
    fa: {
      loadNavigationFailed: 'بارگذاری لینک های ناوبری ناموفق بود.',
      loadFooterFailed: 'بارگذاری لینک های فوتر ناموفق بود.',
      savingNavigation: 'در حال ذخیره لینک های ناوبری...',
      saveNavigationFailed: 'ذخیره لینک های ناوبری ناموفق بود.',
      saveNavigationSuccess: 'لینک های ناوبری ذخیره شد.',
      savingFooter: 'در حال ذخیره لینک های فوتر...',
      saveFooterFailed: 'ذخیره لینک های فوتر ناموفق بود.',
      saveFooterSuccess: 'لینک های فوتر ذخیره شد.',
      savingSettings: 'در حال ذخیره تنظیمات...',
      saveSettingsFailed: 'ذخیره تنظیمات ناموفق بود.',
      saveSettingsSuccess: 'تنظیمات ذخیره شد.',
      saveSocialLinks: 'ذخیره لینک‌های اجتماعی',
      socialLinks: 'لینک‌های اجتماعی',
      socialLinksHint: 'لینک‌های پروفایل شبکه‌های اجتماعی برای فوتر.',
      facebookUrl: 'لینک فیسبوک',
      facebookPlaceholder: 'https://facebook.com/your-page',
      instagramUrl: 'لینک اینستاگرام',
      instagramPlaceholder: 'https://instagram.com/your-profile',
      twitterUrl: 'لینک توییتر / X',
      twitterPlaceholder: 'https://twitter.com/your-profile',
      whatsappUrl: 'لینک واتساپ',
      whatsappPlaceholder: 'https://wa.me/1234567890',
      sectionLabel: 'پیکربندی',
      title: 'تنظیمات سایت',
      subtitle: 'اطلاعات تماس، ناوبری و لینک های فوتر را مدیریت کنید.',
      contactInfo: 'اطلاعات تماس',
      contactEmail: 'ایمیل تماس',
      contactEmailPlaceholder: 'hello@agency.com',
      contactPhone: 'تلفن تماس',
      contactPhonePlaceholder: '+1 (555) 123-4567',
      contactAddress: 'آدرس تماس',
      contactAddressPlaceholder: 'برجی فرهانگ، مزار شریف، افغانستان',
      saveSettings: 'ذخیره تنظیمات',
      navbarNavigation: 'ناوبری نوار بالا',
      navbarHint: 'لینک های نمایش داده شده در نوار ناوبری هدر.',
      addLink: 'افزودن لینک',
      labelPlaceholder: 'برچسب (مثال: خدمات)',
      pathPlaceholder: 'مسیر (مثال: /services)',
      moveUp: 'انتقال به بالا',
      moveDown: 'انتقال به پایین',
      removeLink: 'حذف لینک',
      remove: 'حذف',
      saveNavigationLinks: 'ذخیره لینک های ناوبری',
      footerLinks: 'لینک های فوتر',
      footerHint: 'لینک های نمایش داده شده در ستون های فوتر.',
      addFooterLink: 'افزودن لینک فوتر',
      company: 'شرکت',
      connect: 'ارتباط',
      footerLabelPlaceholder: 'برچسب',
      footerPathPlaceholder: 'مسیر (مثال: /privacy)',
      saveFooterLinks: 'ذخیره لینک های فوتر',
    },
    ps: {
      loadNavigationFailed: 'د ناوبرۍ لینکونو بارول ناکام شول.',
      loadFooterFailed: 'د فوټر لینکونو بارول ناکام شول.',
      savingNavigation: 'د ناوبرۍ لینکونه خوندي کېږي...',
      saveNavigationFailed: 'د ناوبرۍ لینکونه خوندي نه شول.',
      saveNavigationSuccess: 'د ناوبرۍ لینکونه خوندي شول.',
      savingFooter: 'د فوټر لینکونه خوندي کېږي...',
      saveFooterFailed: 'د فوټر لینکونه خوندي نه شول.',
      saveFooterSuccess: 'د فوټر لینکونه خوندي شول.',
      savingSettings: 'تنظیمات خوندي کېږي...',
      saveSettingsFailed: 'تنظیمات خوندي نه شول.',
      saveSettingsSuccess: 'تنظیمات خوندي شول.',
      saveSocialLinks: 'ټولنیزې اړیکې خوندي کړئ',
      socialLinks: 'ټولنیزې اړیکې',
      socialLinksHint: 'د فوټر لپاره د ټولنیزو رسنیو پروفایل لینکونه.',
      facebookUrl: 'فیسبوک لینک',
      facebookPlaceholder: 'https://facebook.com/your-page',
      instagramUrl: 'انسټګرام لینک',
      instagramPlaceholder: 'https://instagram.com/your-profile',
      twitterUrl: 'ټویټر / X لینک',
      twitterPlaceholder: 'https://twitter.com/your-profile',
      whatsappUrl: 'واټساپ لینک',
      whatsappPlaceholder: 'https://wa.me/1234567890',
      sectionLabel: 'ترتیبول',
      title: 'د سایټ تنظیمات',
      subtitle: 'د اړیکې معلومات، ناوبري او فوټر لینکونه مدیریت کړئ.',
      contactInfo: 'د اړیکې معلومات',
      contactEmail: 'د اړیکې برېښنالیک',
      contactEmailPlaceholder: 'hello@agency.com',
      contactPhone: 'د اړیکې شمېره',
      contactPhonePlaceholder: '+1 (555) 123-4567',
      contactAddress: 'د اړیکې پته',
      contactAddressPlaceholder: 'برجي فرهنگ، مزار شریف، افغانستان',
      saveSettings: 'تنظیمات خوندي کړئ',
      navbarNavigation: 'د سرلیک ناوبري',
      navbarHint: 'هغه لینکونه چې د هدر ناوبرۍ کې ښکاري.',
      addLink: 'لینک اضافه کړئ',
      labelPlaceholder: 'لېبل (لکه: خدمتونه)',
      pathPlaceholder: 'مسیر (لکه: /services)',
      moveUp: 'پورته وړل',
      moveDown: 'کښته وړل',
      removeLink: 'لینک لرې کول',
      remove: 'لرې کول',
      saveNavigationLinks: 'د ناوبرۍ لینکونه خوندي کړئ',
      footerLinks: 'د فوټر لینکونه',
      footerHint: 'هغه لینکونه چې د فوټر په کالمونو کې ښکاري.',
      addFooterLink: 'فوټر لینک اضافه کړئ',
      company: 'شرکت',
      connect: 'اړیکه',
      footerLabelPlaceholder: 'لېبل',
      footerPathPlaceholder: 'مسیر (لکه: /privacy)',
      saveFooterLinks: 'د فوټر لینکونه خوندي کړئ',
    },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;
  const [form, setForm] = useState({
    contactEmail: siteSettings?.contactEmail || '',
    contactPhone: siteSettings?.contactPhone || '',
    contactAddress: siteSettings?.contactAddress || '',
    facebookUrl: siteSettings?.facebookUrl || '',
    instagramUrl: siteSettings?.instagramUrl || '',
    twitterUrl: siteSettings?.twitterUrl || '',
    whatsappUrl: siteSettings?.whatsappUrl || '',
  });
  const [status, setStatus] = useState('');
  const [navStatus, setNavStatus] = useState('');
  const [navigationItems, setNavigationItems] = useState([]);
  const [footerStatus, setFooterStatus] = useState('');
  const [footerItems, setFooterItems] = useState([]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    let active = true;

    const loadNavigation = async () => {
      try {
        const response = await fetch('/api/navigation');
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data?.error || 'Failed to load navigation');

        if (active) {
          const items = Array.isArray(data?.navigationItems) ? data.navigationItems : [];
          setNavigationItems(
            items.map((item, index) => ({
              label: item.label || '',
              href: item.href || '',
              orderIndex: Number(item.orderIndex) || index + 1,
              isVisible: item.isVisible !== false,
            }))
          );
        }
      } catch {
        if (active) {
          setNavigationItems([]);
          setNavStatus(copy.loadNavigationFailed);
        }
      }
    };

    loadNavigation();

    return () => {
      active = false;
    };
  }, [copy.loadNavigationFailed]);

  useEffect(() => {
    let active = true;

    const loadFooter = async () => {
      try {
        const response = await fetch('/api/footer');
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data?.error || 'Failed to load footer');

        if (active) {
          const items = Array.isArray(data?.footerItems) ? data.footerItems : [];
          setFooterItems(
            items.map((item, index) => ({
              columnKey: item.columnKey || 'company',
              label: item.label || '',
              href: item.href || '',
              orderIndex: Number(item.orderIndex) || index + 1,
              isVisible: item.isVisible !== false,
            }))
          );
        }
      } catch {
        if (active) {
          setFooterItems([]);
          setFooterStatus(copy.loadFooterFailed);
        }
      }
    };

    loadFooter();

    return () => {
      active = false;
    };
  }, [copy.loadFooterFailed]);

  const updateNavItem = (index, key, value) => {
    setNavigationItems((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [key]: value } : item))
    );
  };

  const addNavItem = () => {
    setNavigationItems((current) => [
      ...current,
      {
        label: '',
        href: '',
        orderIndex: current.length + 1,
        isVisible: true,
      },
    ]);
  };

  const removeNavItem = (index) => {
    setNavigationItems((current) => current.filter((_, idx) => idx !== index));
  };

  const moveNavItem = (index, direction) => {
    setNavigationItems((current) => {
      const next = [...current];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const saveNavigation = async () => {
    setNavStatus(copy.savingNavigation);

    const payloadItems = navigationItems
      .map((item, index) => ({
        label: String(item.label || '').trim(),
        href: String(item.href || '').trim() || '/',
        orderIndex: index + 1,
        isVisible: item.isVisible !== false,
      }))
      .filter((item) => item.label);

    const response = await fetch('/api/navigation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: payloadItems }),
    });

    if (!response.ok) {
      setNavStatus(copy.saveNavigationFailed);
      return;
    }

    setNavigationItems(payloadItems);
    setNavStatus(copy.saveNavigationSuccess);
  };

  const updateFooterItem = (index, key, value) => {
    setFooterItems((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [key]: value } : item))
    );
  };

  const addFooterItem = () => {
    setFooterItems((current) => [
      ...current,
      {
        columnKey: 'company',
        label: '',
        href: '',
        orderIndex: current.length + 1,
        isVisible: true,
      },
    ]);
  };

  const removeFooterItem = (index) => {
    setFooterItems((current) => current.filter((_, idx) => idx !== index));
  };

  const moveFooterItem = (index, direction) => {
    setFooterItems((current) => {
      const next = [...current];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const saveFooter = async () => {
    setFooterStatus(copy.savingFooter);

    const payloadItems = footerItems
      .map((item, index) => ({
        columnKey: String(item.columnKey || 'company').trim() || 'company',
        label: String(item.label || '').trim(),
        href: String(item.href || '').trim() || '/',
        orderIndex: index + 1,
        isVisible: item.isVisible !== false,
      }))
      .filter((item) => item.label);

    const response = await fetch('/api/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: payloadItems }),
    });

    if (!response.ok) {
      setFooterStatus(copy.saveFooterFailed);
      return;
    }

    setFooterItems(payloadItems);
    setFooterStatus(copy.saveFooterSuccess);
  };

  const handleSave = async () => {
    setStatus(copy.savingSettings);

    const response = await fetch('/api/site-settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setStatus(copy.saveSettingsFailed);
      return;
    }

    setStatus(copy.saveSettingsSuccess);
  };

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
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
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.contactInfo}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.contactEmail}</span>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.contactEmail}
              onChange={(event) => updateField('contactEmail', event.target.value)}
              placeholder={copy.contactEmailPlaceholder}
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.contactPhone}</span>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.contactPhone}
              onChange={(event) => updateField('contactPhone', event.target.value)}
              placeholder={copy.contactPhonePlaceholder}
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium md:col-span-2">
            <span className="text-slate-700 dark:text-slate-300">{copy.contactAddress}</span>
            <textarea
              rows={2}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2 resize-none"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.contactAddress}
              onChange={(event) => updateField('contactAddress', event.target.value)}
              placeholder={copy.contactAddressPlaceholder}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            {copy.saveSettings}
          </button>
          {status ? (
            <p
              className={`text-sm font-medium ${
                /failed|error|ناموفق|ناکام/i.test(status)
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {status}
            </p>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.socialLinks}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{copy.socialLinksHint}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.facebookUrl}</span>
            <input
              type="url"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.facebookUrl}
              onChange={(event) => updateField('facebookUrl', event.target.value)}
              placeholder={copy.facebookPlaceholder}
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.instagramUrl}</span>
            <input
              type="url"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.instagramUrl}
              onChange={(event) => updateField('instagramUrl', event.target.value)}
              placeholder={copy.instagramPlaceholder}
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.twitterUrl}</span>
            <input
              type="url"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.twitterUrl}
              onChange={(event) => updateField('twitterUrl', event.target.value)}
              placeholder={copy.twitterPlaceholder}
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.whatsappUrl}</span>
            <input
              type="url"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.whatsappUrl}
              onChange={(event) => updateField('whatsappUrl', event.target.value)}
              placeholder={copy.whatsappPlaceholder}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            {copy.saveSocialLinks}
          </button>
          {status ? (
            <p
              className={`text-sm font-medium ${
                /failed|error|ناموفق|ناکام/i.test(status)
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {status}
            </p>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.navbarNavigation}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{copy.navbarHint}</p>
          </div>
          <button
            type="button"
            onClick={addNavItem}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 shrink-0"
          >
            {copy.addLink}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {navigationItems.map((item, index) => (
            <div
              key={`nav-item-${index}`}
              className="grid grid-cols-1 gap-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 md:grid-cols-[1.2fr_1.6fr_auto]"
            >
              <input
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={item.label}
                onChange={(event) => updateNavItem(index, 'label', event.target.value)}
                placeholder={copy.labelPlaceholder}
              />
              <input
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={item.href}
                onChange={(event) => updateNavItem(index, 'href', event.target.value)}
                placeholder={copy.pathPlaceholder}
              />
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => moveNavItem(index, 'up')}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  aria-label={copy.moveUp}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveNavItem(index, 'down')}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  aria-label={copy.moveDown}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeNavItem(index)}
                  className="rounded-lg border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-200"
                  aria-label={copy.removeLink}
                >
                  {copy.remove}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveNavigation}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            {copy.saveNavigationLinks}
          </button>
          {navStatus ? (
            <p
              className={`text-sm font-medium ${
                /failed|error|ناموفق|ناکام/i.test(navStatus)
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {navStatus}
            </p>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{copy.footerLinks}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{copy.footerHint}</p>
          </div>
          <button
            type="button"
            onClick={addFooterItem}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 shrink-0"
          >
            {copy.addFooterLink}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {footerItems.map((item, index) => (
            <div
              key={`footer-item-${index}`}
              className="grid grid-cols-1 gap-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 md:grid-cols-[0.8fr_1.2fr_1.6fr_auto]"
            >
              <select
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={item.columnKey}
                onChange={(event) => updateFooterItem(index, 'columnKey', event.target.value)}
              >
                <option value="company">{copy.company}</option>
                <option value="connect">{copy.connect}</option>
              </select>
              <input
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={item.label}
                onChange={(event) => updateFooterItem(index, 'label', event.target.value)}
                placeholder={copy.footerLabelPlaceholder}
              />
              <input
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                value={item.href}
                onChange={(event) => updateFooterItem(index, 'href', event.target.value)}
                placeholder={copy.footerPathPlaceholder}
              />
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => moveFooterItem(index, 'up')}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  aria-label={copy.moveUp}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveFooterItem(index, 'down')}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  aria-label={copy.moveDown}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeFooterItem(index)}
                  className="rounded-lg border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-gray-950 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-200"
                  aria-label={copy.removeLink}
                >
                  {copy.remove}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={saveFooter}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            {copy.saveFooterLinks}
          </button>
          {footerStatus ? (
            <p
              className={`text-sm font-medium ${
                /failed|error|ناموفق|ناکام/i.test(footerStatus)
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {footerStatus}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default SettingsEditor;
