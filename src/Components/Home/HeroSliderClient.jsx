'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Button from '../ui/Button';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSliderClient({ slides, autoplayDelay, copy, isRTL }) {
  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={slides.length > 1}
        speed={760}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: '.home-hero-slider-pagination',
          clickable: true,
          bulletClass: 'home-hero-slider-bullet',
          bulletActiveClass: 'home-hero-slider-bullet-active',
        }}
        navigation={{
          prevEl: '.home-hero-slider-prev',
          nextEl: '.home-hero-slider-next',
        }}
        className="overflow-visible"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.heading}-${index}`}>
            <article
              className="relative overflow-hidden rounded-[2rem] border shadow-xl"
              style={{
                borderColor: 'color-mix(in srgb, var(--theme-primary) 18%, var(--surface))',
                backgroundColor: 'color-mix(in srgb, var(--surface) 72%, var(--theme-primary) 5%)',
              }}
            >
              <div className="absolute inset-0">
                <img
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(96deg, color-mix(in srgb, #020617 78%, var(--theme-primary) 18%) 0%, color-mix(in srgb, #020617 56%, transparent) 48%, color-mix(in srgb, #020617 12%, transparent) 100%)',
                  }}
                />
              </div>

              <div className="relative z-10 grid min-h-[min(78vh,680px)] grid-cols-1 items-end gap-6 px-5 py-7 sm:px-7 sm:py-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:px-10 lg:py-10">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.56 }}
                  className="max-w-2xl"
                >
                  <span
                    className="inline-flex rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      borderColor: 'color-mix(in srgb, var(--surface) 56%, var(--theme-primary) 24%)',
                      backgroundColor: 'color-mix(in srgb, var(--theme-primary) 22%, transparent)',
                      color: 'white',
                    }}
                  >
                    {slide.eyebrow}
                  </span>

                  <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.heading}
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-100 sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href={slide.ctaHref || '/contact'}>
                      <Button variant="primary" size="md" className="!rounded-full px-7">
                        {slide.ctaLabel}
                      </Button>
                    </Link>
                    <Link href={slide.secondaryCtaHref || '/portfolio'}>
                      <Button
                        variant="outline"
                        size="md"
                        className="!rounded-full border-white/65 bg-white/10 px-7 !text-white backdrop-blur"
                        style={{ '--tw-ring-color': 'white' }}
                      >
                        {slide.secondaryCtaLabel}
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                <div className={`self-end justify-self-end rounded-2xl border border-white/35 bg-white/12 px-5 py-4 text-white backdrop-blur md:px-6 md:py-5 ${isRTL ? 'text-left' : 'text-right'}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/80">{slide.statLabel}</p>
                  <p className="mt-2 text-3xl font-bold md:text-4xl">{slide.statValue}</p>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="home-hero-slider-pagination flex items-center gap-2" />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="home-hero-slider-prev inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-x-0.5"
            style={{
              borderColor: 'color-mix(in srgb, var(--theme-primary) 24%, var(--surface))',
              backgroundColor: 'color-mix(in srgb, var(--surface) 86%, var(--theme-primary) 6%)',
              color: 'color-mix(in srgb, var(--theme-primary) 70%, var(--text-base))',
            }}
            aria-label={copy.prev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="home-hero-slider-next inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:translate-x-0.5"
            style={{
              borderColor: 'color-mix(in srgb, var(--theme-primary) 24%, var(--surface))',
              backgroundColor: 'color-mix(in srgb, var(--surface) 86%, var(--theme-primary) 6%)',
              color: 'color-mix(in srgb, var(--theme-primary) 70%, var(--text-base))',
            }}
            aria-label={copy.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .home-hero-slider-bullet {
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          border: 1px solid color-mix(in srgb, var(--theme-primary) 45%, var(--surface));
          background: color-mix(in srgb, var(--theme-primary) 22%, var(--surface));
          opacity: 0.55;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .home-hero-slider-bullet:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .home-hero-slider-bullet-active {
          width: 26px;
          opacity: 1;
          background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary));
          border-color: transparent;
        }
      `}</style>
    </>
  );
}
