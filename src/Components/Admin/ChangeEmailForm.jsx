'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, AlertCircle, CheckCircle, Loader2, Lock, Eye, EyeOff } from 'lucide-react';

const copyByLanguage = {
  en: {
    label: 'Change Login Email',
    description: 'Update the email address you use to sign in to the admin panel.',
    currentPassword: 'Current Password',
    newEmail: 'New Email Address',
    change: 'Change Email',
    changing: 'Saving...',
    success: 'Login email changed successfully.',
    error: 'Failed to change email.',
  },
  es: {
    label: 'Cambiar Correo de Acceso',
    description: 'Actualice el correo electrónico que utiliza para iniciar sesión en el panel de administración.',
    currentPassword: 'Contraseña Actual',
    newEmail: 'Nuevo Correo Electrónico',
    change: 'Cambiar Correo',
    changing: 'Guardando...',
    success: 'Correo de acceso cambiado correctamente.',
    error: 'Error al cambiar el correo electrónico.',
  },
};

export default function ChangeEmailForm() {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');

    setSaving(true);
    const response = await fetch('/api/admin/auth/change-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newEmail }),
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
    setNewEmail('');
  };

  return (
    <section className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-950 p-5 shadow-sm dark:shadow-black/30">
      <div
        className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
      />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={18} style={{ color: 'var(--theme-primary)' }} />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{copy.label}</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{copy.description}</p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label htmlFor="ce-current" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.currentPassword}</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input type={showPassword ? 'text' : 'password'} id="ce-current" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} placeholder={copy.currentPassword} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="ce-email" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.newEmail}</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input type="email" id="ce-email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} placeholder="admin@example.com" autoComplete="email" />
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
