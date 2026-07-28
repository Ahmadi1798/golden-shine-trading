'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Lock, AlertCircle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const copyByLanguage = {
  en: {
    label: 'Change Password',
    description: 'Update your admin password. Once changed, the new password will be stored securely in the database.',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    change: 'Change Password',
    changing: 'Saving...',
    success: 'Password changed successfully.',
    mismatch: 'New passwords do not match.',
    weak: 'Password must be at least 6 characters.',
    error: 'Failed to change password.',
  },
  fa: {
    label: 'تغییر رمز عبور',
    description: 'رمز عبور ادمین خود را به‌روز کنید. پس از تغییر، رمز جدید به صورت امن در پایگاه داده ذخیره می‌شود.',
    currentPassword: 'رمز عبور فعلی',
    newPassword: 'رمز عبور جدید',
    confirmPassword: 'تکرار رمز عبور جدید',
    change: 'تغییر رمز عبور',
    changing: 'در حال ذخیره...',
    success: 'رمز عبور با موفقیت تغییر کرد.',
    mismatch: 'رمزهای عبور جدید مطابقت ندارند.',
    weak: 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
    error: 'تغییر رمز عبور ناموفق بود.',
  },
  ps: {
    label: 'پاسورډ بدل کړئ',
    description: 'خپل اډمین پاسورډ تازه کړئ. د بدلون وروسته، نوی پاسورډ به په خوندي ډول په ډیټابیس کې ذخیره شي.',
    currentPassword: 'اوسنی پاسورډ',
    newPassword: 'نوی پاسورډ',
    confirmPassword: 'د نوي پاسورډ تایید',
    change: 'پاسورډ بدل کړئ',
    changing: 'خوندي کېږي...',
    success: 'پاسورډ په بریالیتوب سره بدل شو.',
    mismatch: 'نوي پاسورډونه سره سمون نه لري.',
    weak: 'پاسورډ باید لږترلږه ۶ حروف ولري.',
    error: 'د پاسورډ بدلول ناکام شول.',
  },
};

export default function ChangePasswordForm() {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');

    if (newPassword !== confirmPassword) {
      setStatus(copy.mismatch);
      setStatusType('error');
      return;
    }
    if (newPassword.length < 6) {
      setStatus(copy.weak);
      setStatusType('error');
      return;
    }

    setSaving(true);
    const response = await fetch('/api/admin/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus(data?.error || copy.error);
      setStatusType('error');
      return;
    }

    setStatus(copy.success);
    setStatusType('success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
      <div
        className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
      />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} style={{ color: 'var(--theme-primary)' }} />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{copy.label}</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{copy.description}</p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label htmlFor="cp-current" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.currentPassword}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input type={showCurrent ? 'text' : 'password'} id="cp-current" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} placeholder={copy.currentPassword} autoComplete="current-password" />
              <button type="button" onClick={() => setShowCurrent((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cp-new" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.newPassword}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input type={showNew ? 'text' : 'password'} id="cp-new" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} placeholder={copy.newPassword} autoComplete="new-password" />
              <button type="button" onClick={() => setShowNew((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cp-confirm" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.confirmPassword}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input type="password" id="cp-confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} placeholder={copy.confirmPassword} autoComplete="new-password" />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            <span className="inline-flex items-center gap-2">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              {saving ? copy.changing : copy.change}
            </span>
          </button>

          {status ? (
            <p className={`flex items-center gap-2 text-sm font-medium ${statusType === 'error' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {statusType === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
