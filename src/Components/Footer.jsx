'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import BrandMark from './ui/BrandMark';

const fallbackFooterItems = [
  { columnKey: 'discover', label: 'Home', href: '/' },
  { columnKey: 'discover', label: 'About', href: '/about' },
  { columnKey: 'discover', label: 'Products', href: '/products' },
  { columnKey: 'discover', label: 'Contact', href: '/contact' },
  { columnKey: 'information', label: 'Used Engines', href: '/products' },
  { columnKey: 'information', label: 'Used Half Cuts', href: '/products' },
  { columnKey: 'information', label: 'Used Transmissions', href: '/products' },
  { columnKey: 'information', label: 'Used Spare Parts', href: '/products' },
];

const columnTitles = {
  discover: 'Discover',
  information: 'Information',
};

const Footer = ({
  footerItems = [],
  brandName = 'Golden Shine',
  logoUrl = null,
  logoSize = 'md',
  contactEmail = '',
  contactPhone = '',
  contactAddress = '',
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
      className="relative overflow-hidden border-t bg-gray-950 dark:bg-[#080810]"
      style={{
        borderColor: 'color-mix(in srgb, var(--theme-primary) 18%, #1e1e2e)',
      }}
      aria-label="Site Footer"
    >
      <div
        className="pointer-events-none absolute -top-24 left-0 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 6%, transparent)' }}
      />

      <div className="relative mx-auto max-w-screen-2xl px-4 py-14 md:py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className={`space-y-5 lg:col-span-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link href="/" aria-label={`${brandName} Home`} className="inline-flex items-center gap-3">
              <BrandMark logoUrl={logoUrl} brandName={brandName} size={logoSize} />
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              {t(
                'footer.footerSummary',
                'Golden Shine Trading specializes in import, export, and wholesale of Japanese used automobile engines and spare parts, serving customers across Malaysia and worldwide.',
              )}
            </p>

            <div className="space-y-2.5 pt-1">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone}`}
                  dir="ltr"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Phone size={14} strokeWidth={1.5} className="shrink-0" style={{ color: 'var(--theme-primary)' }} />
                  {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  dir="ltr"
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Mail size={14} strokeWidth={1.5} className="shrink-0" style={{ color: 'var(--theme-primary)' }} />
                  {contactEmail}
                </a>
              )}
              {contactAddress && (
                <p className="flex items-start gap-2.5 text-sm text-gray-400" dir="ltr">
                  <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-0.5" style={{ color: 'var(--theme-primary)' }} />
                  {contactAddress}
                </p>
              )}
            </div>

            {socialLinks.length > 0 && (
              <nav aria-label="Social Media">
                <ul dir="ltr" className="flex items-center gap-2">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10"
                        style={{ color: 'color-mix(in srgb, var(--theme-primary) 70%, #9ca3af)' }}
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

          {['discover', 'information'].map((columnKey) => (
            <div key={columnKey} className={`${columnKey === 'discover' ? 'lg:col-span-2' : 'lg:col-span-2'} ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-gray-300">
                {t(`footer.${columnKey}`, columnTitles[columnKey])}
              </h4>
              <ul className="space-y-3">
                {(groups[columnKey] || []).map((item) => (
                  <li key={`${columnKey}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={`lg:col-span-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-gray-300">
              {t('footer.newsletter', 'Subscribe News')}
            </h4>
            <p className="mb-4 text-sm text-gray-400">
              {t('footer.newsletterSummary', 'Please enter your email address to receive updates.')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.yourEmail', 'Your email')}
                  required
                  className="w-full min-w-0 bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-white/20 rounded-l-lg"
                  aria-label={t('footer.yourEmail', 'Email address')}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 shrink-0 rounded-r-lg"
                  style={{
                    background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                  }}
                  aria-label={t('footer.subscribe', 'Subscribe')}
                >
                  {loading ? '...' : t('footer.subscribe', 'Subscribe')}
                </button>
              </div>
              {status && (
                <p className="text-xs text-gray-400">{status}</p>
              )}
            </form>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full h-px bg-white/5" />

        <p className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {brandName}. {t('footer.rightsReserved', 'All rights reserved.')}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
