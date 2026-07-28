'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import BrandMark from './ui/BrandMark';

const fallbackFooterItems = [
  { columnKey: 'company', label: 'About', href: '/about' },
  { columnKey: 'company', label: 'Services', href: '/services' },
  { columnKey: 'company', label: 'Portfolio', href: '/portfolio' },
  { columnKey: 'company', label: 'Team', href: '/team' },
  { columnKey: 'connect', label: 'Blog', href: '/blog' },
  { columnKey: 'connect', label: 'Contact', href: '/contact' },
];

const columnTitles = {
  company: 'Company',
  connect: 'Connect',
};

const Footer = ({
  footerItems = [],
  brandName = 'KarFamSoft',
  logoUrl = null,
  contactEmail = '',
  contactPhone = '',
  facebookUrl = '',
  instagramUrl = '',
  twitterUrl = '',
  whatsappUrl = '',
}) => {
  const { t, isRTL, translateNavLabel } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const items = (footerItems.length ? footerItems : fallbackFooterItems).map((item) => ({
    ...item,
    label: translateNavLabel(item.label, item.href),
  }));
  const groups = items.reduce((acc, item) => {
    if (!acc[item.columnKey]) acc[item.columnKey] = [];
    acc[item.columnKey].push(item);
    return acc;
  }, {});

  const socialLinks = [
    { href: facebookUrl, label: 'Facebook', icon: FaFacebookF },
    { href: instagramUrl, label: 'Instagram', icon: FaInstagram },
    { href: twitterUrl, label: 'Twitter', icon: FaXTwitter },
    { href: whatsappUrl, label: 'WhatsApp', icon: FaWhatsapp },
  ].filter((s) => s.href);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      setStatus(data.message || data.error || t('footer.newsletterError', 'Something went wrong.'));
      if (res.ok) setEmail('');
    } catch {
      setStatus(t('footer.newsletterError', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden border-t"
      style={{
        borderColor: 'color-mix(in srgb, var(--theme-primary) 12%, transparent)',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--theme-primary) 4%, var(--surface)), color-mix(in srgb, var(--theme-secondary) 5%, var(--surface)))',
      }}
      aria-label="Site Footer"
    >
      <div
        className="pointer-events-none absolute -top-24 left-0 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-primary) 20%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 16%, transparent)' }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className={`space-y-5 lg:col-span-3 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            <Link
              href="/"
              aria-label={`${brandName} Home`}
              className={`inline-flex items-center gap-3 justify-center ${
                isRTL ? 'sm:justify-end' : 'sm:justify-start'
              }`}
            >
              <BrandMark logoUrl={logoUrl} brandName={brandName} size="md" />
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0"
              style={{ color: 'color-mix(in srgb, var(--theme-primary) 38%, var(--text-base))' }}
            >
              {t(
                'footer.footerSummary',
                'We craft scalable, user-focused digital experiences that help brands grow and connect with their audience.',
              )}
            </p>

            {socialLinks.length > 0 && (
            <nav aria-label="Social Media">
              <ul dir="ltr" className={`flex items-center gap-2 justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:brightness-90"
                      style={{
                        color: 'color-mix(in srgb, var(--theme-primary) 56%, var(--text-base))',
                        backgroundColor: 'color-mix(in srgb, var(--theme-primary) 10%, var(--surface))',
                      }}
                      aria-label={label}
                    >
                      <Icon size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            )}
          </div>

          {['company', 'connect'].map((columnKey, idx) => (
            <div key={columnKey} className={`${idx === 0 ? 'lg:col-span-2' : 'lg:col-span-3'} text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
              <h4
                className="mb-4 text-xs font-bold uppercase tracking-[0.1em]"
                style={{ color: 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))' }}
              >
                {t(`footer.${columnKey}`, columnTitles[columnKey])}
              </h4>
              <ul className="space-y-3">
                {(groups[columnKey] || []).map((item) => (
                  <li key={`${columnKey}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors duration-200 hover:underline"
                      style={{
                        color: 'color-mix(in srgb, var(--theme-primary) 40%, var(--text-base))',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {columnKey === 'connect' && (contactEmail || contactPhone) && (
                <div className="mt-5 space-y-2.5">
                  {contactEmail && (
                    <a
                      href={`mailto:${contactEmail}`}
                      dir="ltr"
                      className={`flex items-center gap-2 text-sm transition-colors duration-200 hover:underline justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}
                      style={{ color: 'color-mix(in srgb, var(--theme-primary) 40%, var(--text-base))' }}
                    >
                      <Mail size={13} strokeWidth={1.5} />
                      {contactEmail}
                    </a>
                  )}
                  {contactPhone && (
                    <a
                      href={`tel:${contactPhone}`}
                      dir="ltr"
                      className={`flex items-center gap-2 text-sm transition-colors duration-200 hover:underline justify-center ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}
                      style={{ color: 'color-mix(in srgb, var(--theme-primary) 40%, var(--text-base))' }}
                    >
                      <Phone size={13} strokeWidth={1.5} />
                      {contactPhone}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className={`lg:col-span-4 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            <h4
              className="mb-4 text-xs font-bold uppercase tracking-[0.1em]"
              style={{ color: 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))' }}
            >
              {t('footer.newsletter', 'Newsletter')}
            </h4>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: 'color-mix(in srgb, var(--theme-primary) 38%, var(--text-base))' }}
            >
              {t('footer.newsletterSummary', 'Get updates on our latest work and insights.')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.yourEmail', 'Your email')}
                  required
                  className={`w-full min-w-0 border px-3 py-2.5 text-sm focus:outline-none ${
                    isRTL ? 'rounded-r-lg' : 'rounded-l-lg'
                  }`}
                  style={{
                    borderColor: 'color-mix(in srgb, var(--theme-primary) 18%, var(--surface))',
                    color: 'color-mix(in srgb, var(--theme-primary) 48%, var(--text-base))',
                  }}
                  aria-label={t('footer.yourEmail', 'Email address')}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60 shrink-0 ${
                    isRTL ? 'rounded-l-lg' : 'rounded-r-lg'
                  }`}
                  style={{
                    background:
                      'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                  }}
                  aria-label={t('footer.subscribe', 'Subscribe')}
                >
                  {loading ? '...' : t('footer.subscribe', 'Subscribe')}
                </button>
              </div>
              {status && (
                <p
                  className="text-xs"
                  style={{
                    color: status.includes('already') || status.includes('Thank you')
                      ? 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))'
                      : '#dc2626',
                  }}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>

        <div
          className="mx-auto mt-12 w-full max-w-xs h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--theme-primary) 20%, transparent), transparent)',
          }}
        />

        <p
          className="mt-6 text-center text-xs"
          style={{ color: 'color-mix(in srgb, var(--theme-primary) 24%, var(--text-base))' }}
        >
          &copy; {new Date().getFullYear()} {brandName}. {t('footer.rightsReserved', 'All rights reserved.')}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
