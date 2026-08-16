'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const defaultPhotos = [
  { image: '/images/products/engine.jpg', caption: 'Used Japanese engines in stock' },
  { image: '/images/products/truck-engine.jpg', caption: 'Truck engines ready for shipment' },
  { image: '/images/products/cabin.jpg', caption: 'Complete cabin assemblies' },
  { image: '/images/products/halfcut.jpg', caption: 'Front and rear half cuts' },
  { image: '/images/products/transmission.jpg', caption: 'Tested automatic transmissions' },
  { image: '/images/products/spareparts.jpg', caption: 'Wide range of spare parts' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const PhotoGallery = ({ content = {} }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const heading = pickText(content.heading, 'Gallery');
  const description = pickText(content.description, 'Explore our facilities and products through photos.');

  const photos = Array.isArray(content.images) && content.images.length
    ? content.images.map((item, index) => ({
        image: item?.image || item?.imageUrl || defaultPhotos[index % defaultPhotos.length].image,
        caption: pickText(item?.caption || item?.alt, defaultPhotos[index % defaultPhotos.length].caption),
      }))
    : defaultPhotos;

  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % photos.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <motion.section
      className="relative py-16 md:py-24 px-4 overflow-hidden bg-white dark:bg-[#0f172a]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      aria-label="Photo Gallery"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--theme-primary) 4%, transparent) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, color-mix(in srgb, var(--theme-accent) 4%, transparent) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {heading}
          </motion.h2>
          <motion.p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {description}
          </motion.p>
        </div>

        {photos.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, i) => (
              <motion.button
                key={i}
                type="button"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2"
                style={{ ['--tw-ring-color']: 'var(--theme-primary)' }}
              >
                <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--theme-primary) 70%, transparent), transparent 60%)' }} />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-sm font-semibold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{photo.caption}</p>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-16">No photos uploaded yet.</p>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full" aria-label="Close">
              <X size={28} />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white/70 hover:text-white text-3xl px-3 py-2 rounded-full" aria-label="Previous">‹</button>
            <motion.img
              key={lightboxIndex}
              src={photos[lightboxIndex].image}
              alt={photos[lightboxIndex].caption}
              className="max-h-[85vh] max-w-full object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white/70 hover:text-white text-3xl px-3 py-2 rounded-full" aria-label="Next">›</button>
            {photos[lightboxIndex].caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center px-4">{photos[lightboxIndex].caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default PhotoGallery;
