'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { resolveProductHref, localizeProduct } from '../utils/products';

const ProductDetailPage = ({ product, relatedProducts = [] }) => {
  const { language } = useLanguage();
  const isRTLContentLanguage = language === 'fa' || language === 'ps';
  const hasArabicScript = (value) => typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
  const pickText = (value, fallback) => {
    if (!isRTLContentLanguage) return value || fallback;
    if (typeof value !== 'string' || !value.trim()) return fallback;
    return hasArabicScript(value) ? value : fallback;
  };

  const displayProduct = localizeProduct(product, language);
  const title = pickText(displayProduct?.title, 'Product');
  const category = displayProduct?.category || '';
  const image = displayProduct?.image || '/images/products/placeholder.jpg';
  const description = pickText(displayProduct?.description, '');
  const content = pickText(displayProduct?.content, '');
  const contentParagraphs = content ? String(content).split('\n\n').filter(Boolean) : [];

  return (
    <div className="home-page-theme-bg">
      <section className="relative bg-[#080810] pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]" style={{ background: 'radial-gradient(ellipse 50% 50% at 30% 40%, var(--theme-primary) 0%, transparent 70%)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Products
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <img src={image} alt={title} className="rounded-2xl w-full object-cover aspect-[4/3]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              {category && (
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 18%, transparent)', color: 'var(--theme-accent)' }}>
                  {category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">{title}</h1>
              {description && <p className="text-base md:text-lg text-white/60 leading-relaxed">{description}</p>}
            </motion.div>
          </div>
        </div>
      </section>

      {contentParagraphs.length > 0 && (
        <section className="relative py-16 md:py-20 px-4 bg-white dark:bg-[#0f172a]">
          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Details</h2>
            <div className="space-y-5">
              {contentParagraphs.map((paragraph, i) => (
                <p key={i} className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="relative py-16 md:py-20 px-4 bg-white dark:bg-[#0f172a]">
          <div className="relative max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item, i) => {
                const displayItem = localizeProduct(item, language);
                return (
                  <Link key={i} href={resolveProductHref(item)} className="group block bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/30 hover:shadow-lg dark:hover:shadow-black/60 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={displayItem.image} alt={displayItem.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[var(--theme-primary)] transition-colors">{displayItem.title}</h3>
                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[var(--theme-primary)]">
                        View
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
