'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slideData = [
  {
    eyebrow: "Malaysia's Trusted Distributor",
    heading: 'Premium Products,\nReliable Delivery',
    description: 'Golden Shine Trading connects quality manufacturers with businesses across Malaysia through efficient wholesale distribution and supply chain management.',
    ctaLabel: 'Explore Products',
    ctaHref: '/services',
    secondaryCtaLabel: 'Contact Us',
    secondaryCtaHref: '/contact',
    stat1: '15+', stat1Label: 'Years',
    stat2: '500+', stat2Label: 'Products',
    stat3: '50+', stat3Label: 'Cities',
  },
  {
    eyebrow: 'Comprehensive Range',
    heading: 'Everything Your Business\nNeeds in One Place',
    description: 'From consumer goods to industrial supplies, we source and deliver complete product ranges tailored to your market demands.',
    ctaLabel: 'View Categories',
    ctaHref: '/services',
    secondaryCtaLabel: 'Request Quote',
    secondaryCtaHref: '/contact',
    stat1: '24/7', stat1Label: 'Support',
    stat2: '98%', stat2Label: 'On-Time',
    stat3: '200+', stat3Label: 'Partners',
  },
  {
    eyebrow: 'Nationwide Reach',
    heading: 'Delivering Across\nPeninsular & East Malaysia',
    description: 'With reliable logistics and strong supplier partnerships, your orders arrive on time — every time, anywhere.',
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
    secondaryCtaLabel: 'About Us',
    secondaryCtaHref: '/about',
    stat1: 'East MY', stat1Label: 'Coverage',
    stat2: '99%', stat2Label: 'Satisfaction',
    stat3: '15+', stat3Label: 'Industries',
  },
];

function StatBadge({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--theme-accent)' }}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/50">{label}</div>
    </div>
  );
}

export default function HeroSliderClient({ slides: customSlides, autoplayDelay = 6000 }) {
  const slides = Array.isArray(customSlides) && customSlides.length ? customSlides : slideData;

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={slides.length > 1}
        speed={900}
        effect="fade"
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.heading}-${index}`}>
            <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#080810]">
              <img
                src={slide.imageUrl || '/images/heroImage.webp'}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #080810 0%, #08081080 40%, #080810e0 85%, #080810 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  background: 'radial-gradient(ellipse 50% 60% at 20% 40%, var(--theme-primary) 0%, transparent 70%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  background: 'radial-gradient(ellipse 40% 50% at 80% 60%, var(--theme-accent) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-8 lg:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-w-3xl"
                >
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: 'var(--theme-accent)' }}
                  >
                    {slide.eyebrow}
                  </span>

                  <h1 className="mt-4 text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl whitespace-pre-line">
                    {slide.heading}
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.ctaHref || '/services'}
                      className="rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                      style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                    >
                      {slide.ctaLabel || 'Explore'}
                    </Link>
                    <Link
                      href={slide.secondaryCtaHref || '/contact'}
                      className="rounded-full border px-7 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5 hover:text-white"
                      style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 35%, white)' }}
                    >
                      {slide.secondaryCtaLabel || 'Contact'}
                    </Link>
                  </div>

                  <div className="mt-12 flex items-center gap-0 divide-x divide-white/10">
                    <StatBadge value={slide.stat1} label={slide.stat1Label} />
                    <div className="mx-5 h-10 w-px bg-white/10" />
                    <StatBadge value={slide.stat2} label={slide.stat2Label} />
                    <div className="mx-5 h-10 w-px bg-white/10" />
                    <StatBadge value={slide.stat3} label={slide.stat3Label} />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-8 right-4 z-20 flex items-center gap-3 sm:right-8 lg:right-12">
        <button
          type="button"
          className="hero-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="hero-pagination flex items-center gap-2" />
        <button
          type="button"
          className="hero-next inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-white/30 hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 6px; height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.25);
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: var(--theme-accent);
        }
      `}</style>
    </>
  );
}
