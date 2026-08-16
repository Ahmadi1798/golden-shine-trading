'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useLanguage } from '../../context/LanguageContext';

const defaultBrands = [
  { name: 'Toyota', logo: '/images/brands/toyota.svg' },
  { name: 'Honda', logo: '/images/brands/honda.svg' },
  { name: 'Nissan', logo: '/images/brands/nissan.svg' },
  { name: 'Mitsubishi', logo: '/images/brands/mitsubishi.svg' },
  { name: 'Isuzu', logo: '/images/brands/isuzu.svg' },
  { name: 'Mazda', logo: '/images/brands/mazda.svg' },
  { name: 'Subaru', logo: '/images/brands/subaru.svg' },
  { name: 'Suzuki', logo: '/images/brands/suzuki.svg' },
  { name: 'Daihatsu', logo: '/images/brands/daihatsu.svg' },
  { name: 'Hino', logo: '/images/brands/hino.svg' },
  { name: 'UD Trucks', logo: '/images/brands/udtrucks.svg' },
  { name: 'Fuso', logo: '/images/brands/fuso.svg' },
];

const BrandShowcase = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const heading = pickText(content.heading, 'Our Brands');

  const brands = Array.isArray(content.brands) && content.brands.length
    ? content.brands.map((item, index) => {
        if (typeof item === 'string') {
          return { name: item, logo: `/images/brands/${item.toLowerCase().replace(/\s+/g, '')}.svg` };
        }
        return {
          name: item?.name || `Brand ${index + 1}`,
          logo: item?.logo || '/images/brands/placeholder.svg',
        };
      })
    : defaultBrands;

  if (!brands.length) return null;

  return (
    <motion.section
      className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Our Brands"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 20% 80%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--theme-primary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Trusted Worldwide
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              loop
              speed={2000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={32}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 3, spaceBetween: 40 },
                768: { slidesPerView: 4, spaceBetween: 48 },
                1024: { slidesPerView: 5, spaceBetween: 56 },
                1280: { slidesPerView: 6, spaceBetween: 64 },
              }}
              className="!overflow-visible"
            >
              {brands.map((brand, i) => (
                <SwiperSlide key={`${brand.name}-${i}`}>
                  <div className="group flex flex-col items-center justify-center py-4 cursor-default">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-10 md:h-11 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      loading="lazy"
                    />
                    <span className="mt-3 text-[11px] md:text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-accent)] dark:group-hover:text-[var(--theme-accent)] transition-colors duration-300">
                      {brand.name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BrandShowcase;
