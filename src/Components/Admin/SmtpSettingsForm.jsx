'use client';

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, AlertCircle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const copyByLanguage = {
  en: {
    label: 'SMTP Settings (Contact Form)',
    description: 'Configure the mail server credentials used to send contact form messages.',
    smtpHost: 'SMTP Host',
    smtpHostPlaceholder: 'smtp.gmail.com',
    smtpPort: 'SMTP Port',
    smtpPortPlaceholder: '587',
    smtpUser: 'SMTP Username (Email)',
    smtpUserPlaceholder: 'your-email@gmail.com',
    smtpPass: 'SMTP Password',
    smtpPassPlaceholder: 'Your app password',
    save: 'Save SMTP Settings',
    saving: 'Saving...',
    success: 'SMTP settings saved successfully.',
    error: 'Failed to save SMTP settings.',
    note: 'For Gmail, use an "App Password" (not your regular password) and port 587. Remove any spaces from the app password — it should be 16 characters without spaces.',
  },
  es: {
    label: 'Configuración de SMTP (Formulario de Contacto)',
    description: 'Configure las credenciales del servidor de correo utilizadas para enviar los mensajes del formulario de contacto.',
    smtpHost: 'Servidor SMTP',
    smtpHostPlaceholder: 'smtp.gmail.com',
    smtpPort: 'Puerto SMTP',
    smtpPortPlaceholder: '587',
    smtpUser: 'Usuario SMTP (Correo)',
    smtpUserPlaceholder: 'su-correo@gmail.com',
    smtpPass: 'Contraseña SMTP',
    smtpPassPlaceholder: 'Su contraseña de aplicación',
    save: 'Guardar Configuración SMTP',
    saving: 'Guardando...',
    success: 'Configuración SMTP guardada correctamente.',
    error: 'Error al guardar la configuración SMTP.',
    note: 'Para Gmail, utilice una "Contraseña de aplicación" (no su contraseña normal) y el puerto 587.',
  },
};

export default function SmtpSettingsForm({ siteSettings = null }) {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || copyByLanguage.en;
  const [host, setHost] = useState(siteSettings?.smtpHost || 'smtp.gmail.com');
  const [port, setPort] = useState(siteSettings?.smtpPort ? String(siteSettings.smtpPort) : '587');
  const [user, setUser] = useState(siteSettings?.smtpUser || '');
  const [pass, setPass] = useState(siteSettings?.smtpPass || '');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setSaving(true);

    const response = await fetch('/api/site-settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        smtpHost: host.trim(),
        smtpPort: port ? Number(port) : null,
        smtpUser: user.trim(),
        smtpPass: pass.replace(/\s+/g, ''),
      }),
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
            <label htmlFor="smtp-host" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.smtpHost}</label>
            <input type="text" id="smtp-host" value={host} onChange={(e) => setHost(e.target.value)} required placeholder={copy.smtpHostPlaceholder} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="smtp-port" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.smtpPort}</label>
            <input type="number" id="smtp-port" value={port} onChange={(e) => setPort(e.target.value)} required placeholder={copy.smtpPortPlaceholder} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="smtp-user" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.smtpUser}</label>
            <input type="email" id="smtp-user" value={user} onChange={(e) => setUser(e.target.value)} required placeholder={copy.smtpUserPlaceholder} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} autoComplete="off" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="smtp-pass" className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{copy.smtpPass}</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} id="smtp-pass" value={pass} onChange={(e) => setPass(e.target.value)} required placeholder={copy.smtpPassPlaceholder} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-3.5 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500">{copy.note}</p>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
          >
            <span className="inline-flex items-center gap-2">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              {saving ? copy.saving : copy.save}
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
