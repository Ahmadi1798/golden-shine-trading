'use client';

import dynamic from 'next/dynamic';
import SectionContainer from '../ui/SectionContainer';
import { useLanguage } from '../../context/LanguageContext';

const ClientSwiper = dynamic(
  () => import('./HeroSliderClient'),
  { ssr: false }
);

const fallbackSlides = [
  {
    eyebrow: 'Creative Digital Studio',
    heading: 'Web Experiences That Look Bold and Convert Better',
    description:
      'We design and build modern websites with strong storytelling, clean UX, and measurable performance gains.',
    imageUrl: '/images/heroImage.webp',
    imageAlt: 'Creative team planning a digital campaign',
    ctaLabel: 'Explore Work',
    ctaHref: '/portfolio',
    secondaryCtaLabel: 'Start Project',
    secondaryCtaHref: '/contact',
    statLabel: 'Projects Delivered',
    statValue: '120+',
  },
  {
    eyebrow: 'Strategy + Design + Build',
    heading: 'From Discovery to Launch, We Build with Precision',
    description:
      'Every sprint combines brand thinking, interaction design, and robust engineering to move your business forward.',
    imageUrl: '/images/heroImage.webp',
    imageAlt: 'Design system wireframes and UI components on desk',
    ctaLabel: 'See Services',
    ctaHref: '/services',
    secondaryCtaLabel: 'Book a Call',
    secondaryCtaHref: '/contact',
    statLabel: 'Client Rating',
    statValue: '4.9/5',
  },
  {
    eyebrow: 'Built for Growth',
    heading: 'Launch Faster with a Team That Cares About Detail',
    description:
      'We help ambitious teams ship polished digital products without sacrificing accessibility, speed, or maintainability.',
    imageUrl: '/images/heroImage.webp',
    imageAlt: 'Laptop showing analytics dashboard with growth chart',
    ctaLabel: 'Read Insights',
    ctaHref: '/blog',
    secondaryCtaLabel: 'Contact Us',
    secondaryCtaHref: '/contact',
    statLabel: 'Years Building',
    statValue: '8+',
  },
];

const HeroSliderSection = ({ content = {} }) => {
  const { language, isRTL } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const copy = {
    en: {
      sectionEyebrow: 'Featured Highlights',
      heading: 'Build Your Next Digital Milestone',
      description: 'Purposeful product design and engineering for teams that want momentum.',
      imageAlt: 'Hero slide image',
      ctaLabel: 'Get Started',
      secondaryCtaLabel: 'Our Work',
      statLabel: 'Successful Launches',
      heroAria: 'Hero Slider Section',
      prev: 'Previous hero slide',
      next: 'Next hero slide',
    },
    fa: {
      sectionEyebrow: 'بخش های برجسته',
      heading: 'مرحله بعدی رشد دیجیتال خود را بسازید',
      description: 'طراحی محصول هدفمند و توسعه مهندسی شده برای تیم هایی که به دنبال پیشرفت هستند.',
      imageAlt: 'تصویر اسلاید قهرمان',
      ctaLabel: 'شروع کنید',
      secondaryCtaLabel: 'نمونه کارها',
      statLabel: 'راه اندازی های موفق',
      heroAria: 'بخش اسلایدر قهرمان',
      prev: 'اسلاید قبلی',
      next: 'اسلاید بعدی',
    },
    ps: {
      sectionEyebrow: 'ځانګړې څرګندونې',
      heading: 'خپل راتلونکی ډیجیټل پړاو جوړ کړئ',
      description: 'هغو ټیمونو لپاره هدفمند ډیزاین او انجنیرۍ چې مخ پر وړاندې تګ غواړي.',
      imageAlt: 'د هیرو سلایډ انځور',
      ctaLabel: 'پیل وکړئ',
      secondaryCtaLabel: 'زموږ کارونه',
      statLabel: 'بریالۍ خپرونې',
      heroAria: 'د هیرو سلایډر برخه',
      prev: 'مخکینی سلایډ',
      next: 'راتلونکی سلایډ',
    },
  }[language] || {
    sectionEyebrow: 'Featured Highlights',
    heading: 'Build Your Next Digital Milestone',
    description: 'Purposeful product design and engineering for teams that want momentum.',
    imageAlt: 'Hero slide image',
    ctaLabel: 'Get Started',
    secondaryCtaLabel: 'Our Work',
    statLabel: 'Successful Launches',
    heroAria: 'Hero Slider Section',
    prev: 'Previous hero slide',
    next: 'Next hero slide',
  };
  const autoplayDelay = Number(content.autoplayDelay) > 0 ? Number(content.autoplayDelay) : 5000;

  const slides = Array.isArray(content.slides) && content.slides.length
    ? content.slides.map((slide) => ({
        eyebrow: pickText(slide?.eyebrow, copy.sectionEyebrow),
        heading: pickText(slide?.heading, copy.heading),
        description: pickText(slide?.description, copy.description),
        imageUrl: slide?.imageUrl || '/images/heroImage.webp',
        imageAlt: pickText(slide?.imageAlt, copy.imageAlt),
        ctaLabel: pickText(slide?.ctaLabel, copy.ctaLabel),
        ctaHref: slide?.ctaHref || '/contact',
        secondaryCtaLabel: pickText(slide?.secondaryCtaLabel, copy.secondaryCtaLabel),
        secondaryCtaHref: slide?.secondaryCtaHref || '/portfolio',
        statLabel: pickText(slide?.statLabel, copy.statLabel),
        statValue: slide?.statValue || '100+',
      }))
    : fallbackSlides;

  return (
    <header className="relative isolate z-0 overflow-hidden pt-28 lg:pt-32 pb-16 dark:bg-[#0f172a]" aria-label={copy.heroAria}>
      <SectionContainer
        as="section"
        maxWidth="2xl"
        noPadding
        className="relative z-0 px-4 pb-6 lg:px-10 lg:pb-10"
        innerClassName="relative"
      >
        <div
          className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 20%, var(--surface)), transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-4 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--theme-secondary) 20%, var(--surface)), transparent 72%)',
          }}
        />

        <ClientSwiper slides={slides} autoplayDelay={autoplayDelay} copy={copy} isRTL={isRTL} />
      </SectionContainer>
    </header>
  );
};

export default HeroSliderSection;
