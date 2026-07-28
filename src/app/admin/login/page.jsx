'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight, AlertCircle, Loader2, Home, Info, X, Key, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password flow
  const [mode, setMode] = useState('login');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState('code');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  const copyByLanguage = {
    en: {
      home: 'Home',
      backToHome: 'Back to home page',
      adminPortal: 'Admin Portal',
      panelTitle: 'Manage Your Agency Website',
      panelDescription: 'Update pages, media assets, and brand settings from one secure control center.',
      panelFootnote: 'Secure session authentication enabled for all admin routes.',
      welcome: 'Welcome Back',
      subtitle: 'Sign in to manage content and theme settings.',
      email: 'Email',
      emailPlaceholder: 'admin@agency.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      invalidCredentials: 'Invalid credentials.',
      forgotPassword: 'Forgot password?',
      forgotTitle: 'Reset Password',
      forgotDesc: 'Enter your admin email and the recovery code from your server configuration.',
      recoveryCode: 'Recovery Code',
      recoveryCodePlaceholder: 'Enter your recovery code',
      submitCode: 'Verify Recovery Code',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Enter new password',
      confirmPassword: 'Confirm New Password',
      confirmPasswordPlaceholder: 'Re-enter new password',
      resetPassword: 'Set New Password',
      passwordMismatch: 'New passwords do not match.',
      passwordWeak: 'Password must be at least 6 characters.',
      resetSuccess: 'Password reset successfully. You can now sign in with your new password.',
      backToLogin: 'Back to sign in',
      codeError: 'Invalid email or recovery code.',
      resetError: 'Failed to reset password. Token may have expired.',
    },
    fa: {
      home: 'خانه',
      backToHome: 'بازگشت به صفحه اصلی',
      adminPortal: 'پنل مدیریت',
      panelTitle: 'وب سایت آژانس خود را مدیریت کنید',
      panelDescription: 'صفحه ها، رسانه ها و تنظیمات برند را از یک مرکز امن مدیریت کنید.',
      panelFootnote: 'احراز هویت نشست امن برای همه مسیرهای مدیریت فعال است.',
      welcome: 'خوش آمدید',
      subtitle: 'برای مدیریت محتوا و تنظیمات قالب وارد شوید.',
      email: 'ایمیل',
      emailPlaceholder: 'admin@agency.com',
      password: 'رمز عبور',
      passwordPlaceholder: 'رمز عبور خود را وارد کنید',
      signIn: 'ورود',
      signingIn: 'در حال ورود...',
      invalidCredentials: 'ایمیل یا رمز عبور نامعتبر است.',
      forgotPassword: 'رمز عبور را فراموش کرده اید؟',
      forgotTitle: 'بازنشانی رمز عبور',
      forgotDesc: 'ایمیل ادمین و کد بازیابی را از تنظیمات سرور وارد کنید.',
      recoveryCode: 'کد بازیابی',
      recoveryCodePlaceholder: 'کد بازیابی را وارد کنید',
      submitCode: 'تأیید کد بازیابی',
      newPassword: 'رمز عبور جدید',
      newPasswordPlaceholder: 'رمز عبور جدید را وارد کنید',
      confirmPassword: 'تکرار رمز عبور جدید',
      confirmPasswordPlaceholder: 'رمز عبور را دوباره وارد کنید',
      resetPassword: 'تنظیم رمز عبور جدید',
      passwordMismatch: 'رمزهای عبور جدید مطابقت ندارند.',
      passwordWeak: 'رمز عبور باید حداقل ۶ کاراکتر باشد.',
      resetSuccess: 'رمز عبور با موفقیت بازنشانی شد. اکنون می‌توانید با رمز جدید وارد شوید.',
      backToLogin: 'بازگشت به ورود',
      codeError: 'ایمیل یا کد بازیابی نامعتبر است.',
      resetError: 'بازنشانی رمز عبور ناموفق بود. ممکن است توکن منقضی شده باشد.',
    },
    ps: {
      home: 'کور',
      backToHome: 'اصلي پاڼې ته ستنېدل',
      adminPortal: 'اډمین پورټل',
      panelTitle: 'د خپلې اژانس وېبپاڼه مدیریت کړئ',
      panelDescription: 'پاڼې، میډیا فایلونه او د برانډ تنظیمات له یوه خوندي مرکز څخه تازه کړئ.',
      panelFootnote: 'د ټولو اډمین لارو لپاره خوندي ناستې تایید فعال دی.',
      welcome: 'بېرته ښه راغلاست',
      subtitle: 'د محتوا او تیم تنظیماتو د مدیریت لپاره ننوځئ.',
      email: 'برېښنالیک',
      emailPlaceholder: 'admin@agency.com',
      password: 'پاسورډ',
      passwordPlaceholder: 'خپل پاسورډ دننه کړئ',
      signIn: 'ننوتل',
      signingIn: 'ننوتل روان دي...',
      invalidCredentials: 'برېښنالیک یا پاسورډ ناسم دی.',
      forgotPassword: 'پاسورډ هېر شو؟',
      forgotTitle: 'پاسورډ بیا تنظیم کړئ',
      forgotDesc: 'خپل اډمین برېښنالیک او د سرور د تنظیماتو څخه د بیاګټې اخستنې کوډ دننه کړئ.',
      recoveryCode: 'د بیاګټې اخستنې کوډ',
      recoveryCodePlaceholder: 'کوډ دننه کړئ',
      submitCode: 'کوډ تایید کړئ',
      newPassword: 'نوی پاسورډ',
      newPasswordPlaceholder: 'نوی پاسورډ دننه کړئ',
      confirmPassword: 'د نوي پاسورډ تایید',
      confirmPasswordPlaceholder: 'پاسورډ بیا دننه کړئ',
      resetPassword: 'نوی پاسورډ تنظیم کړئ',
      passwordMismatch: 'نوي پاسورډونه سره سمون نه لري.',
      passwordWeak: 'پاسورډ باید لږترلږه ۶ حروف ولري.',
      resetSuccess: 'پاسورډ په بریالیتوب سره بیا تنظیم شو. اوس کولی شئ د نوي پاسورډ سره ننوځئ.',
      backToLogin: 'ننوتلو ته ستنېدل',
      codeError: 'برېښنالیک یا کوډ ناسم دی.',
      resetError: 'د پاسورډ بیا تنظیمول ناکام شول. ممکن ټوکن پای ته رسیدلی وي.',
    },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setError(copy.invalidCredentials);
      return;
    }

    router.replace('/admin');
    router.refresh();
  };

  const handleForgotCode = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const response = await fetch('/api/admin/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, recoveryCode }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.error || copy.codeError);
      return;
    }

    const data = await response.json();
    setResetToken(data.token);
    setForgotStep('reset');
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError(copy.passwordMismatch);
      return;
    }
    if (newPassword.length < 6) {
      setError(copy.passwordWeak);
      return;
    }

    setIsLoading(true);

    const response = await fetch('/api/admin/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: resetToken, newPassword }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.error || copy.resetError);
      return;
    }

    setResetSuccess(true);
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 py-8 overflow-hidden bg-white dark:bg-[#0f172a]"
    >
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
        aria-label={copy.backToHome}
      >
        <Home size={16} />
        <span className="hidden sm:inline">{copy.home}</span>
      </Link>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 15% 25%, color-mix(in srgb, var(--theme-primary) 7%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 65% 50% at 85% 75%, color-mix(in srgb, var(--theme-secondary) 6%, transparent) 0%, transparent 65%)
          `,
        }}
      />

      <motion.div
        dir="ltr"
        className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-3xl shadow-lg dark:shadow-black/40 lg:grid-cols-2"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backgroundColor: 'var(--surface, white)' }}
      >
        <section
          className="relative hidden p-10 lg:flex lg:flex-col lg:justify-between"
          style={{
            background: 'linear-gradient(145deg, var(--theme-primary), var(--theme-secondary))',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {copy.adminPortal}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white">
              {copy.panelTitle}
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/80 leading-relaxed">
              {copy.panelDescription}
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ShieldCheck size={20} className="shrink-0 text-white/70" />
            <span>{copy.panelFootnote}</span>
          </motion.div>
        </section>

        <section className="relative p-8 sm:p-10">
          <div
            className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))' }}
          />

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {copy.welcome}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {copy.subtitle}
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <motion.div
                    className="space-y-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <label htmlFor="login-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {copy.email}
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      <input id="login-email" type="email" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder={copy.emailPlaceholder} />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                  >
                    <label htmlFor="login-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {copy.password}
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      <input id="login-password" type={showPassword ? 'text' : 'password'} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" placeholder={copy.passwordPlaceholder} />
                      <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="flex items-center justify-end">
                      <button type="button" onClick={() => { setMode('forgot'); setForgotStep('code'); setError(''); }} className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                        {copy.forgotPassword}
                      </button>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="relative w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      {isLoading ? <><Loader2 size={16} className="animate-spin" /> {copy.signingIn}</> : <>{copy.signIn} <ArrowRight size={16} /></>}
                    </span>
                  </motion.button>

                  {error ? (
                    <motion.p className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-4 py-2.5 text-sm font-medium text-rose-700 dark:text-rose-400" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} className="shrink-0" />{error}
                    </motion.p>
                  ) : null}
                </form>
              </motion.div>
            ) : resetSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">{copy.resetSuccess}</p>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setResetSuccess(false); setError(''); setNewPassword(''); setConfirmPassword(''); setResetToken(''); setRecoveryCode(''); }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  <ArrowLeft size={16} /> {copy.backToLogin}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); setForgotStep('code'); }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-4"
                >
                  <ArrowLeft size={14} /> {copy.backToLogin}
                </button>

                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{copy.forgotTitle}</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{copy.forgotDesc}</p>

                <div className="mt-6">
                  {forgotStep === 'code' ? (
                    <form onSubmit={handleForgotCode} className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="forgot-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">{copy.email}</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          <input id="forgot-email" type="email" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder={copy.emailPlaceholder} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="recovery-code" className="text-sm font-medium text-gray-700 dark:text-gray-300">{copy.recoveryCode}</label>
                        <div className="relative">
                          <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          <input id="recovery-code" type="text" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)} required placeholder={copy.recoveryCodePlaceholder} />
                        </div>
                      </div>
                      <button type="submit" disabled={isLoading} className="relative w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
                        <span className="inline-flex items-center justify-center gap-2">
                          {isLoading ? <><Loader2 size={16} className="animate-spin" /> {copy.submitCode}</> : <>{copy.submitCode} <ArrowRight size={16} /></>}
                        </span>
                      </button>
                      {error ? (
                        <motion.p className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-4 py-2.5 text-sm font-medium text-rose-700 dark:text-rose-400" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle size={16} className="shrink-0" />{error}
                        </motion.p>
                      ) : null}
                    </form>
                  ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="reset-new" className="text-sm font-medium text-gray-700 dark:text-gray-300">{copy.newPassword}</label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          <input id="reset-new" type={showNewPw ? 'text' : 'password'} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-10 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength={6} placeholder={copy.newPasswordPlaceholder} />
                          <button type="button" onClick={() => setShowNewPw((p) => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" tabIndex={-1}>
                            {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="reset-confirm" className="text-sm font-medium text-gray-700 dark:text-gray-300">{copy.confirmPassword}</label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                          <input id="reset-confirm" type="password" className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-10 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-transparent focus:ring-2" style={{ '--tw-ring-color': 'var(--theme-primary)' }} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={6} placeholder={copy.confirmPasswordPlaceholder} />
                        </div>
                      </div>
                      <button type="submit" disabled={isLoading} className="relative w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
                        <span className="inline-flex items-center justify-center gap-2">
                          {isLoading ? <><Loader2 size={16} className="animate-spin" /> {copy.resetPassword}</> : <>{copy.resetPassword} <ArrowRight size={16} /></>}
                        </span>
                      </button>
                      {error ? (
                        <motion.p className="flex items-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-4 py-2.5 text-sm font-medium text-rose-700 dark:text-rose-400" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle size={16} className="shrink-0" />{error}
                        </motion.p>
                      ) : null}
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </motion.div>
    </main>
  );
}
