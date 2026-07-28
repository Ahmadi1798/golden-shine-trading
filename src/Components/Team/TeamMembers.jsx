'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TfiFacebook, TfiLinkedin } from 'react-icons/tfi';
import { RiTwitterXLine } from 'react-icons/ri';
import { LuInstagram } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';

const defaultMembers = [
  {
    name: 'Rafiullah Ahmadi',
    role: 'Founder & Product Strategist',
    imageUrl: '/images/heroImage.webp',
    bio: 'Leads product vision, discovery workshops, and roadmap planning for client projects.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    name: 'Ariana Wells',
    role: 'Lead UI Engineer',
    imageUrl: '/images/heroImage.webp',
    bio: 'Builds polished, high-performance interfaces with a strong focus on accessibility and UX.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    name: 'Omar Rahimi',
    role: 'Backend Architect',
    imageUrl: '/images/heroImage.webp',
    bio: 'Designs secure APIs, scalable systems, and reliable integrations that power business workflows.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    name: 'Mina Carter',
    role: 'Brand & Content Designer',
    imageUrl: '/images/heroImage.webp',
    bio: 'Shapes visual language, storytelling, and conversion-focused brand assets across touchpoints.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    name: 'Jonas Beck',
    role: 'Delivery Manager',
    imageUrl: '/images/heroImage.webp',
    bio: 'Keeps execution aligned, timelines clear, and communication transparent from kickoff to launch.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
  {
    name: 'Sara Kim',
    role: 'Quality Engineer',
    imageUrl: '/images/heroImage.webp',
    bio: 'Ensures quality through thoughtful testing, edge-case coverage, and release confidence checks.',
    facebookUrl: 'https://facebook.com',
    xUrl: 'https://twitter.com',
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
  },
];

const localizedDefaultMembers = {
  fa: [
    {
      ...defaultMembers[0],
      role: 'بنیان گذار و استراتژیست محصول',
      bio: 'هدایت چشم انداز محصول، کارگاه های کشف و برنامه ریزی نقشه راه پروژه های مشتری را بر عهده دارد.',
    },
    {
      ...defaultMembers[1],
      role: 'مهندس ارشد رابط کاربری',
      bio: 'رابط های سریع و حرفه ای را با تمرکز ویژه بر دسترس پذیری و تجربه کاربری پیاده سازی می کند.',
    },
    {
      ...defaultMembers[2],
      role: 'معمار بک اند',
      bio: 'APIهای امن، سیستم های مقیاس پذیر و یکپارچه سازی های قابل اعتماد را برای جریان های کاری کسب وکار طراحی می کند.',
    },
    {
      ...defaultMembers[3],
      role: 'طراح برند و محتوا',
      bio: 'زبان بصری، روایت برند و دارایی های محتوایی متمرکز بر تبدیل را در تمام نقاط تماس شکل می دهد.',
    },
    {
      ...defaultMembers[4],
      role: 'مدیر تحویل',
      bio: 'اجرای پروژه، زمان بندی و ارتباطات شفاف را از شروع تا انتشار هماهنگ نگه می دارد.',
    },
    {
      ...defaultMembers[5],
      role: 'مهندس کیفیت',
      bio: 'با تست هدفمند، پوشش سناریوهای لبه ای و بررسی های انتشار، کیفیت خروجی را تضمین می کند.',
    },
  ],
  ps: [
    {
      ...defaultMembers[0],
      role: 'بنسټ ايښودونکی او د محصول ستراتیژیست',
      bio: 'د محصول لید، د کشف ورکشاپونه او د مراجعینو پروژو د نقشې پلان رهبري کوي.',
    },
    {
      ...defaultMembers[1],
      role: 'د UI مخکښ انجنیر',
      bio: 'چټک او ښکلي انٹرفېسونه د لاسرسي او کاروونکي تجربې پر قوي تمرکز سره جوړوي.',
    },
    {
      ...defaultMembers[2],
      role: 'د بیک اینډ معمار',
      bio: 'خوندي API ګانې، پراخېدونکي سیستمونه او باوري یوځای کول د کاري جریانونو لپاره ډیزاینوي.',
    },
    {
      ...defaultMembers[3],
      role: 'د برانډ او منځپانګې ډیزاینره',
      bio: 'د برانډ بصري ژبه، کیسه ویل او د بدلون-محور دارايي ګانې په ټولو تماس ټکو کې برابروي.',
    },
    {
      ...defaultMembers[4],
      role: 'د سپارنې مدیر',
      bio: 'له پیل څخه تر لانچ پورې پلي کېدل، مهالویش او روڼې اړیکې همغږي ساتي.',
    },
    {
      ...defaultMembers[5],
      role: 'د کیفیت انجنیره',
      bio: 'د فکري ازموینو، سرحدي حالتونو پوښښ او د خپرونې ارزونې له لارې کیفیت یقیني کوي.',
    },
  ],
};

function SocialButton({ url, icon: Icon, label, memberName, hoverColor }) {
  const [hovered, setHovered] = useState(false);
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${memberName} ${label}`}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 ${
        hovered ? '' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
      }`}
      style={hovered ? { color: '#ffffff', backgroundColor: hoverColor } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
}

const TeamMembers = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };
  const copy = {
    en: {
      heading: 'Meet Our Team',
      subheading: 'Get to Know Us',
      fallbackAlt: 'Team member',
      fallbackInitials: 'TM',
      facebook: 'Facebook',
      x: 'X',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
    },
    fa: {
      heading: 'با تیم ما آشنا شوید',
      subheading: 'ما را بهتر بشناسید',
      fallbackAlt: 'عضو تیم',
      fallbackInitials: 'ت',
      facebook: 'فیسبوک',
      x: 'ایکس',
      instagram: 'اینستاگرام',
      linkedin: 'لینکدین',
    },
    ps: {
      heading: 'له زموږ ټیم سره آشنا شئ',
      subheading: 'موږ ښه وپېژنئ',
      fallbackAlt: 'د ټیم غړی',
      fallbackInitials: 'ټ',
      facebook: 'فېسبوک',
      x: 'X',
      instagram: 'انسټاګرام',
      linkedin: 'لینکډاین',
    },
  }[language] || {};

  const hasField = (key) => Object.prototype.hasOwnProperty.call(content, key);

  const heading = pickText(
    hasField('membersHeading') ? content.membersHeading : undefined,
    copy.heading || 'Meet Our Team'
  );
  const defaultMembersByLanguage = localizedDefaultMembers[language] || defaultMembers;
  const members = Array.isArray(content.members) && content.members.length
    ? content.members.map((member, index) => {
        const fallback = defaultMembersByLanguage[index % defaultMembersByLanguage.length] || {};
        return {
          ...fallback,
          ...member,
          name: pickText(member?.name, fallback.name || ''),
          role: pickText(member?.role, fallback.role || ''),
          bio: pickText(member?.bio, fallback.bio || ''),
          imageUrl: member?.imageUrl || fallback.imageUrl,
        };
      })
    : defaultMembersByLanguage;

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white dark:bg-[#0f172a]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 70% 30%, color-mix(in srgb, var(--theme-accent) 3%, transparent) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 30% 70%, color-mix(in srgb, var(--theme-primary) 2%, transparent) 0%, transparent 50%)
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
            {heading}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            {pickText(content.membersSubheading, copy.subheading || 'Get to Know Us')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member, index) => {
            const initials = String(member.name || '')
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join('')
              .toUpperCase();

            return (
              <motion.article
                key={`${member.name}-${index}`}
                className="group relative bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/30 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{
                    background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-accent))',
                  }}
                />

                <div className="p-6 sm:p-8">
                  <div className="relative mx-auto mb-5 h-40 w-40 sm:h-44 sm:w-44 overflow-hidden rounded-2xl shadow-md">
                    {member.imageUrl ? (
                      <>
                        <img
                          src={member.imageUrl}
                          alt={member.name || copy.fallbackAlt || 'Team member'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 15%, transparent), transparent 60%)',
                          }}
                        />
                      </>
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-xl font-bold text-white"
                        style={{
                          background: 'linear-gradient(140deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
                        }}
                      >
                        {initials || copy.fallbackInitials || 'TM'}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 leading-snug transition-colors duration-300 group-hover:text-[var(--theme-primary)]">
                    {member.name}
                  </h3>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'color-mix(in srgb, var(--theme-primary) 60%, var(--text-base))' }}
                  >
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-1.5">
                    <SocialButton url={member.facebookUrl} icon={TfiFacebook} label={copy.facebook || 'Facebook'} memberName={member.name} hoverColor="#1877F2" />
                    <SocialButton url={member.xUrl} icon={RiTwitterXLine} label={copy.x || 'X'} memberName={member.name} hoverColor="#000000" />
                    <SocialButton url={member.instagramUrl} icon={LuInstagram} label={copy.instagram || 'Instagram'} memberName={member.name} hoverColor="#E4405F" />
                    <SocialButton url={member.linkedinUrl} icon={TfiLinkedin} label={copy.linkedin || 'LinkedIn'} memberName={member.name} hoverColor="#0A66C2" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
