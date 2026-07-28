'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const emptyForm = {
  name: '',
  url: '',
  type: 'image',
  mimeType: '',
  altText: '',
};

const MediaManager = ({ initialMediaAssets = [] }) => {
  const { language } = useLanguage();
  const [mediaAssets, setMediaAssets] = useState(initialMediaAssets);
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('');

  const copyByLanguage = {
    en: {
      chooseFileFirst: 'Choose a file first.',
      uploadingFile: 'Uploading file...',
      uploadFailed: 'Upload failed. Check S3 env config.',
      uploadSuccess: 'Upload successful. Review fields and click Add Asset.',
      creatingAsset: 'Creating media asset...',
      createAssetFailed: 'Failed to create media asset.',
      createAssetSuccess: 'Media asset created.',
      deletingAsset: 'Deleting media asset...',
      deleteAssetFailed: 'Failed to delete media asset.',
      deleteAssetSuccess: 'Media asset deleted.',
      copySuccess: 'Asset URL copied.',
      copyFailed: 'Could not copy URL.',
      sectionLabel: 'Manage Assets',
      title: 'Media Library',
      subtitle: 'Upload and manage reusable media entries for sections.',
      stats: { total: 'Total', images: 'Images', videos: 'Videos', files: 'Files' },
      uploadFile: 'Upload File',
      uploadHint: 'Choose an image or video file to upload.',
      selectedPrefix: 'Selected:',
      name: 'Name',
      namePlaceholder: 'Asset name',
      url: 'URL',
      urlPlaceholder: 'https://...',
      type: 'Type',
      typeImage: 'image',
      typeVideo: 'video',
      typeFile: 'file',
      mimeType: 'MIME Type',
      mimeTypePlaceholder: 'image/png',
      altText: 'Alt Text',
      altTextPlaceholder: 'Describe the image for accessibility',
      uploading: 'Uploading...',
      addAsset: 'Add Asset',
      existingAssets: 'Existing Assets',
      noAssets: 'No media assets yet.',
      fileAsset: 'File Asset',
      copyUrl: 'Copy URL',
      delete: 'Delete',
    },
    fa: {
      chooseFileFirst: 'ابتدا یک فایل انتخاب کنید.',
      uploadingFile: 'در حال آپلود فایل...',
      uploadFailed: 'آپلود ناموفق بود. تنظیمات S3 را بررسی کنید.',
      uploadSuccess: 'آپلود موفق بود. فیلدها را بررسی کنید و روی افزودن رسانه بزنید.',
      creatingAsset: 'در حال ایجاد رسانه...',
      createAssetFailed: 'ایجاد رسانه ناموفق بود.',
      createAssetSuccess: 'رسانه ایجاد شد.',
      deletingAsset: 'در حال حذف رسانه...',
      deleteAssetFailed: 'حذف رسانه ناموفق بود.',
      deleteAssetSuccess: 'رسانه حذف شد.',
      copySuccess: 'آدرس رسانه کپی شد.',
      copyFailed: 'کپی آدرس ممکن نبود.',
      sectionLabel: 'مدیریت دارایی ها',
      title: 'کتابخانه رسانه',
      subtitle: 'رسانه های قابل استفاده مجدد برای بخش ها را آپلود و مدیریت کنید.',
      stats: { total: 'کل', images: 'تصاویر', videos: 'ویدیوها', files: 'فایل ها' },
      uploadFile: 'آپلود فایل',
      uploadHint: 'یک فایل تصویر یا ویدیو برای آپلود انتخاب کنید.',
      selectedPrefix: 'انتخاب شده:',
      name: 'نام',
      namePlaceholder: 'نام رسانه',
      url: 'آدرس',
      urlPlaceholder: 'https://...',
      type: 'نوع',
      typeImage: 'تصویر',
      typeVideo: 'ویدیو',
      typeFile: 'فایل',
      mimeType: 'نوع MIME',
      mimeTypePlaceholder: 'image/png',
      altText: 'متن جایگزین',
      altTextPlaceholder: 'تصویر را برای دسترس پذیری توصیف کنید',
      uploading: 'در حال آپلود...',
      addAsset: 'افزودن رسانه',
      existingAssets: 'رسانه های موجود',
      noAssets: 'هنوز رسانه ای وجود ندارد.',
      fileAsset: 'فایل',
      copyUrl: 'کپی آدرس',
      delete: 'حذف',
    },
    ps: {
      chooseFileFirst: 'لومړی یو فایل وټاکئ.',
      uploadingFile: 'فایل پورته کېږي...',
      uploadFailed: 'پورته کول ناکام شول. د S3 تنظیمات وګورئ.',
      uploadSuccess: 'پورته کول بریالي شول. فیلډونه وګورئ او بیا د میډیا زیاتولو تڼۍ ووهئ.',
      creatingAsset: 'میډیا جوړېږي...',
      createAssetFailed: 'د میډیا جوړول ناکام شول.',
      createAssetSuccess: 'میډیا جوړه شوه.',
      deletingAsset: 'میډیا حذفېږي...',
      deleteAssetFailed: 'د میډیا حذف ناکام شو.',
      deleteAssetSuccess: 'میډیا حذف شوه.',
      copySuccess: 'د میډیا URL کاپي شو.',
      copyFailed: 'د URL کاپي ممکنه نه وه.',
      sectionLabel: 'د شتمنیو اداره',
      title: 'د میډیا کتابتون',
      subtitle: 'د برخو لپاره بیا کارېدونکې میډیا ثبتونه پورته او اداره کړئ.',
      stats: { total: 'ټول', images: 'انځورونه', videos: 'وېډیوګانې', files: 'فایلونه' },
      uploadFile: 'فایل پورته کړئ',
      uploadHint: 'د پورته کولو لپاره د انځور یا وېډیو فایل وټاکئ.',
      selectedPrefix: 'ټاکل شوی:',
      name: 'نوم',
      namePlaceholder: 'د شتمنۍ نوم',
      url: 'URL',
      urlPlaceholder: 'https://...',
      type: 'ډول',
      typeImage: 'انځور',
      typeVideo: 'وېډیو',
      typeFile: 'فایل',
      mimeType: 'MIME ډول',
      mimeTypePlaceholder: 'image/png',
      altText: 'بدیل متن',
      altTextPlaceholder: 'د لاسرسي لپاره انځور تشریح کړئ',
      uploading: 'پورته کېږي...',
      addAsset: 'شتمني اضافه کړئ',
      existingAssets: 'شتون لرونکې شتمنۍ',
      noAssets: 'تر اوسه هیڅ میډیا نشته.',
      fileAsset: 'فایل',
      copyUrl: 'URL کاپي',
      delete: 'حذف',
    },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;

  const sortedAssets = useMemo(
    () => [...mediaAssets].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [mediaAssets]
  );

  const mediaCounts = useMemo(
    () => ({
      all: sortedAssets.length,
      images: sortedAssets.filter((item) => item.type === 'image').length,
      videos: sortedAssets.filter((item) => item.type === 'video').length,
      files: sortedAssets.filter((item) => item.type === 'file').length,
    }),
    [sortedAssets]
  );

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const inferAssetType = (mimeType = '') => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    return 'file';
  };

  const uploadSelectedFile = async () => {
    if (!selectedFile) {
      setStatus(copy.chooseFileFirst);
      return;
    }

    setIsUploading(true);
    setStatus(copy.uploadingFile);

    const payload = new FormData();
    payload.append('file', selectedFile);

    const response = await fetch('/api/media/upload', {
      method: 'POST',
      body: payload,
    });

    setIsUploading(false);

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      setStatus(error?.error || copy.uploadFailed);
      return;
    }

    const data = await response.json();
    const uploaded = data?.file;

    setForm((current) => ({
      ...current,
      name: current.name || uploaded?.name || '',
      url: uploaded?.url || current.url,
      mimeType: uploaded?.type || current.mimeType,
      type: inferAssetType(uploaded?.type || ''),
    }));

    setStatus(copy.uploadSuccess);
  };

  const createAsset = async () => {
    setStatus(copy.creatingAsset);

    const response = await fetch('/api/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setStatus(copy.createAssetFailed);
      return;
    }

    const data = await response.json();
    setMediaAssets((current) => [data.mediaAsset, ...current]);
    setForm(emptyForm);
    setStatus(copy.createAssetSuccess);
  };

  const deleteAsset = async (id) => {
    setStatus(copy.deletingAsset);

    const response = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setStatus(copy.deleteAssetFailed);
      return;
    }

    setMediaAssets((current) => current.filter((item) => item.id !== id));
    setStatus(copy.deleteAssetSuccess);
  };

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus(copy.copySuccess);
    } catch {
      setStatus(copy.copyFailed);
    }
  };

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 90% 10%, color-mix(in srgb, var(--theme-primary) 10%, transparent), transparent 50%)',
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
              {copy.sectionLabel}
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{copy.title}</h1>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {copy.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { label: copy.stats.total, count: mediaCounts.all },
              { label: copy.stats.images, count: mediaCounts.images },
              { label: copy.stats.videos, count: mediaCounts.videos },
              { label: copy.stats.files, count: mediaCounts.files },
            ].map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 px-2.5 py-1 font-semibold text-slate-600 dark:text-slate-300 backdrop-blur-sm"
              >
                {item.label} {item.count}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium md:col-span-2">
            <span className="text-slate-700 dark:text-slate-300">{copy.uploadFile}</span>
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 p-4">
              <input
                type="file"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 dark:file:bg-slate-800 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-slate-700 dark:file:text-slate-300"
                style={{ '--tw-ring-color': 'var(--theme-primary)' }}
                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {selectedFile ? `${copy.selectedPrefix} ${selectedFile.name}` : copy.uploadHint}
              </p>
            </div>
          </label>

          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.name}</span>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.name}
              onChange={(event) => updateForm('name', event.target.value)}
              placeholder={copy.namePlaceholder}
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.url}</span>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.url}
              onChange={(event) => updateForm('url', event.target.value)}
              placeholder={copy.urlPlaceholder}
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.type}</span>
            <select
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.type}
              onChange={(event) => updateForm('type', event.target.value)}
            >
              <option value="image">{copy.typeImage}</option>
              <option value="video">{copy.typeVideo}</option>
              <option value="file">{copy.typeFile}</option>
            </select>
          </label>

          <label className="space-y-1.5 text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">{copy.mimeType}</span>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.mimeType}
              onChange={(event) => updateForm('mimeType', event.target.value)}
              placeholder={copy.mimeTypePlaceholder}
            />
          </label>

          <label className="space-y-1.5 text-sm font-medium md:col-span-2">
            <span className="text-slate-700 dark:text-slate-300">{copy.altText}</span>
            <input
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-slate-900 dark:text-white outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-transparent focus:ring-2"
              style={{ '--tw-ring-color': 'var(--theme-primary)' }}
              value={form.altText}
              onChange={(event) => updateForm('altText', event.target.value)}
              placeholder={copy.altTextPlaceholder}
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={uploadSelectedFile}
            disabled={isUploading}
            className="rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
          >
            {isUploading ? copy.uploading : copy.uploadFile}
          </button>

          <button
            type="button"
            onClick={createAsset}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            {copy.addAsset}
          </button>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
        <div
          className="absolute top-0 left-8 right-8 h-0.5 rounded-full opacity-40"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
        />
        <h2 className="relative text-base font-extrabold text-slate-900 dark:text-white">{copy.existingAssets}</h2>

        {!sortedAssets.length ? (
          <p className="relative mt-3 text-sm text-slate-500 dark:text-slate-400">{copy.noAssets}</p>
        ) : null}

        <div className="relative mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sortedAssets.map((asset) => (
            <article
              key={asset.id}
              className="overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all duration-200 hover:shadow-sm dark:hover:shadow-black/30"
            >
              <div className="flex h-36 items-center justify-center bg-slate-100 dark:bg-slate-800/50">
                {asset.type === 'image' ? (
                  <img src={asset.url} alt={asset.altText || asset.name} className="h-full w-full object-cover" />
                ) : asset.type === 'video' ? (
                  <video src={asset.url} className="h-full w-full object-cover" muted playsInline />
                ) : (
                  <div className="px-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {copy.fileAsset}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 p-3.5 text-sm">
                <p className="line-clamp-1 font-semibold text-slate-900 dark:text-white">{asset.name}</p>
                <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400 break-all">{asset.url}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{asset.type}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copyUrl(asset.url)}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    {copy.copyUrl}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAsset(asset.id)}
                    className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-700 transition-all duration-200"
                  >
                    {copy.delete}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {status ? (
        <p
          className={`rounded-lg border px-3 py-2 text-sm font-medium backdrop-blur-sm ${
            /failed|error|could not|ناموفق|ناکام|ممکن نبود/i.test(status)
              ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400'
              : 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {status}
        </p>
      ) : null}
    </div>
  );
};

export default MediaManager;
