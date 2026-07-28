'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TfiEmail, TfiLocationPin, TfiMobile, TfiCheck, TfiAlert } from 'react-icons/tfi';
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext';

function SocialIcon({ url, icon: Icon, label, hoverColor }) {
  const [hovered, setHovered] = useState(false);
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 ${
        hovered ? '' : 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800'
      }`}
      style={hovered ? { color: '#ffffff', backgroundColor: hoverColor } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

const ContactForm = ({ content = {}, siteSettings = null }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);

  const copy = {
    en: {
      badge: 'Contact Us',
      heading: "Let's Connect",
      description: "Got a project in mind? Fill out the form or reach out via email - we'd love to hear from you.",
      formHeading: 'Start a Project Conversation',
      formDescription: 'Share a few details and our team will respond with a clear next step.',
      submitLabel: 'Send Message',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'David Wonder',
      emailLabel: 'Email Address',
      emailPlaceholder: 'example@company.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+1 (555) 123-4567',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Tell us what you need',
      messageLabel: 'Project Details',
      messagePlaceholder: 'Share your goals, timeline, and any links that can help us understand your project.',
      linkedin: 'LinkedIn',
      facebook: 'Facebook',
      instagram: 'Instagram',
      x: 'X',
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone',
      office: 'Office',
      followUs: 'Follow Us',
      findUs: 'Find Us',
      officeLocation: 'Office Location',
      sending: 'Sending...',
      sendSuccess: 'Message sent! We will get back to you soon.',
      sendError: 'Something went wrong. Please try again.',
    },
    fa: {
      badge: 'تماس با ما',
      heading: '  با ما بپیوندید',
      description: 'پروژه ای در ذهن دارید؟ فرم را پر کنید یا از طریق ایمیل با ما در ارتباط باشید.',
      formHeading: 'شروع گفتگوی پروژه',
      formDescription: 'چند جزئیات را ارسال کنید تا تیم ما با گام بعدی شفاف پاسخ دهد.',
      submitLabel: 'ارسال پیام',
      fullNameLabel: 'نام کامل',
      fullNamePlaceholder: 'نام شما',
      emailLabel: 'ایمیل',
      emailPlaceholder: 'example@company.com',
      phoneLabel: 'شماره تماس',
      phonePlaceholder: '+93 700 000 000',
      subjectLabel: 'موضوع',
      subjectPlaceholder: 'نیاز خود را بنویسید',
      messageLabel: 'جزئیات پروژه',
      messagePlaceholder: 'هدف ها، زمان بندی و لینک های مرتبط پروژه را با ما به اشتراک بگذارید.',
      linkedin: 'لینکدین',
      facebook: 'فیسبوک',
      instagram: 'اینستاگرام',
      x: 'ایکس',
      whatsapp: 'واتساپ',
      email: 'ایمیل',
      phone: 'تلفن',
      office: 'دفتر',
      followUs: 'ما را دنبال کنید',
      findUs: 'آدرس ما',
      officeLocation: 'موقعیت دفتر',
      sending: 'در حال ارسال...',
      sendSuccess: 'پیام ارسال شد! به زودی با شما تماس خواهیم گرفت.',
      sendError: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
    },
    ps: {
      badge: 'اړیکه ونیسئ',
      heading: 'راځئ وصل شو',
      description: 'پروژه لرئ؟ فورمه ډکه کړئ یا د ایمیل له لارې اړیکه ونیسئ - موږ ستاسو د پیغام هرکلی کوو.',
      formHeading: 'د پروژې خبرې پیل کړئ',
      formDescription: 'ځینې جزییات شریک کړئ، زموږ ټیم به له روښانه بل ګام سره ځواب درکړي.',
      submitLabel: 'پیغام ولېږئ',
      fullNameLabel: 'بشپړ نوم',
      fullNamePlaceholder: 'ستاسو نوم',
      emailLabel: 'بریښنالیک',
      emailPlaceholder: 'example@company.com',
      phoneLabel: 'د تلیفون شمېره',
      phonePlaceholder: '+93 700 000 000',
      subjectLabel: 'موضوع',
      subjectPlaceholder: 'خپله اړتیا ولیکئ',
      messageLabel: 'د پروژې جزییات',
      messagePlaceholder: 'خپل هدفونه، مهالوېش او اړوند لینکونه شریک کړئ څو پروژه ښه درک کړو.',
      linkedin: 'لینکډاین',
      facebook: 'فېسبوک',
      instagram: 'انسټګرام',
      x: 'X',
      whatsapp: 'واټساپ',
      email: 'بریښنالیک',
      phone: 'تلیفون',
      office: 'دفتر',
      followUs: 'موږ تعقیب کړئ',
      findUs: 'موږ ومومئ',
      officeLocation: 'د دفتر موقعیت',
      sending: 'لېږل کېږي...',
      sendSuccess: 'پیغام ولېږل شو! ژر به مو سره اړیکه ونیسو.',
      sendError: 'یوه ستونزه رامنځته شوه. بیا هڅه وکړئ.',
    },
  }[language] || {};

  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const updateField = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const badge = pickText(content.badge, copy.badge || 'Contact Us');
  const heading = pickText(content.heading, copy.heading || "Let's Connect");
  const description =
    pickText(content.description, copy.description || "Got a project in mind? Fill out the form or reach out via email - we'd love to hear from you.");
  const formHeading = pickText(content.formHeading, copy.formHeading || 'Start a Project Conversation');
  const formDescription =
    pickText(content.formDescription, copy.formDescription || 'Share a few details and our team will respond with a clear next step.');
  const submitLabel = pickText(content.submitLabel, copy.submitLabel || 'Send Message');

  const fullNameLabel = pickText(content.fullNameLabel, copy.fullNameLabel || 'Full Name');
  const fullNamePlaceholder = pickText(content.fullNamePlaceholder, copy.fullNamePlaceholder || 'David Wonder');
  const emailLabel = pickText(content.emailLabel, copy.emailLabel || 'Email Address');
  const emailPlaceholder = pickText(content.emailPlaceholder, copy.emailPlaceholder || 'example@company.com');
  const phoneLabel = pickText(content.phoneLabel, copy.phoneLabel || 'Phone Number');
  const phonePlaceholder = pickText(content.phonePlaceholder, copy.phonePlaceholder || '+1 (555) 123-4567');
  const subjectLabel = pickText(content.subjectLabel, copy.subjectLabel || 'Subject');
  const subjectPlaceholder = pickText(content.subjectPlaceholder, copy.subjectPlaceholder || 'Tell us what you need');
  const messageLabel = pickText(content.messageLabel, copy.messageLabel || 'Project Details');
  const messagePlaceholder =
    pickText(content.messagePlaceholder, copy.messagePlaceholder || 'Share your goals, timeline, and any links that can help us understand your project.');

  const googleMapsUrl = content.googleMapsUrl || '';
  const email =
    siteSettings?.contactEmail || content.email || 'support@karfamsoft.com';
  const address =
    siteSettings?.contactAddress || content.address || '703 Bartley-Chester Rd, Virginia, USA';
  const phoneDisplay =
    siteSettings?.contactPhone || content.phone || '+1 (555) 123-4567';
  const phoneHref = content.phoneHref || `tel:${String(phoneDisplay).replace(/[^\d+]/g, '')}`;

  const socialLinks = [
    { key: 'facebook', label: copy.facebook || 'Facebook', href: siteSettings?.facebookUrl || '', icon: FaFacebookF, hoverColor: '#1877F2' },
    { key: 'instagram', label: copy.instagram || 'Instagram', href: siteSettings?.instagramUrl || '', icon: FaInstagram, hoverColor: '#E4405F' },
    { key: 'twitter', label: copy.x || 'X', href: siteSettings?.twitterUrl || '', icon: FaXTwitter, hoverColor: '#000000' },
    { key: 'whatsapp', label: copy.whatsapp || 'WhatsApp', href: siteSettings?.whatsappUrl || '', icon: FaWhatsapp, hoverColor: '#25D366' },
  ].filter((item) => Boolean(item.href));

  const contactInfo = [
    { icon: TfiEmail, label: copy.email || 'Email', value: email, href: `mailto:${email}` },
    { icon: TfiMobile, label: copy.phone || 'Phone', value: phoneDisplay, href: phoneHref },
    { icon: TfiLocationPin, label: copy.office || 'Office', value: address },
  ];

  return (
    <section className="relative bg-white dark:bg-[#0f172a] overflow-hidden px-4 pt-32 sm:pt-40 pb-24 sm:pb-28">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 25% 35%, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, transparent 70%),
          radial-gradient(ellipse 60% 60% at 75% 65%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%)
        `,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
          >
            {badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            {heading}
          </h1>
          <motion.div
            className="w-16 h-1 rounded-full mx-auto mb-6"
            style={{
              background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left — Contact Info */}
          <motion.div
            className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-black/30 p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {formHeading}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {formDescription}
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? 'a' : 'div';
                const wrapperProps = item.href
                  ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                      }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      <Wrapper
                        {...wrapperProps}
                        className={`text-sm font-medium text-gray-900 dark:text-white ${
                          item.href ? 'hover:text-[var(--theme-primary)] transition-colors' : ''
                        }`}
                      >
                        {item.value}
                      </Wrapper>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="my-8 border-gray-100 dark:border-gray-800" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                {copy.followUs || 'Follow Us'}
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((item) => (
                  <SocialIcon key={item.key} url={item.href} icon={item.icon} label={item.label} hoverColor={item.hoverColor} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-black/30 p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
             onSubmit={handleSubmit}
            itemScope
            itemType="http://schema.org/ContactPage"
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="fullName">
                    {fullNameLabel}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder={fullNamePlaceholder}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                    {emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={emailPlaceholder}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                    {phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={phonePlaceholder}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="subject">
                    {subjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    placeholder={subjectPlaceholder}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
                  {messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder={messagePlaceholder}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent resize-none"
                  required
                ></textarea>
              </div>

              <div className="pt-1 space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))',
                    boxShadow: '0 8px 24px color-mix(in srgb, var(--theme-primary) 30%, transparent)',
                  }}
                >
                  {submitting ? copy.sending || 'Sending...' : submitLabel}
                </button>
                {submitStatus === 'success' ? (
                  <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <TfiCheck className="shrink-0" />
                    {copy.sendSuccess || 'Message sent! We will get back to you soon.'}
                  </p>
                ) : submitStatus === 'error' ? (
                  <p className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
                    <TfiAlert className="shrink-0" />
                    {copy.sendError || 'Something went wrong. Please try again.'}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.form>
        </div>

        {/* Map */}
        <motion.div
          className="mt-10 bg-white dark:bg-gray-950 rounded-2xl shadow-lg dark:shadow-black/30 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="p-4 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              {copy.findUs || 'Find Us'}
            </p>
            <div className="rounded-xl overflow-hidden">
              <iframe
                title={copy.officeLocation || 'Office Location'}
                src={googleMapsUrl || `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0, filter: 'invert(0)' }}
                className="dark:opacity-85 dark:brightness-90"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
