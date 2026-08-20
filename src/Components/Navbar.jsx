'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Menu, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { links } from '../../utils/Links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import BrandMark from './ui/BrandMark';

const Navbar = ({ navigationItems = [], brandName = 'Golden Shine', logoUrl = null, logoSize = 'md' }) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { language, languages, setLanguage, t, translateNavLabel } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const isHomePage = pathname === '/';
  const isAboutPage = pathname === '/about';
  const isProductsPage = pathname === '/products' || pathname?.startsWith('/products/');
  const isPhotosPage = pathname === '/photos';
  const isBlogPage = pathname === '/blog';

  const navItems = navigationItems.length
    ? navigationItems.map((item) => ({ text: translateNavLabel(item.label, item.href), path: item.href }))
    : links;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const h = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const atTop = !scrolled && (isHomePage || isAboutPage || isProductsPage || isPhotosPage || isBlogPage);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[140] w-full transition-all duration-300 ${
        atTop ? 'bg-transparent' : 'bg-white/90 shadow-sm backdrop-blur-xl dark:bg-[#0a0a14]/90'
      }`} aria-label="Main Navigation">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <BrandMark logoUrl={logoUrl} brandName={brandName} size={logoSize} light={atTop} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ text, path }) => {
              const isActive = pathname === path;
              return (
                <Link key={text} href={path}
                  className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors ${atTop ? 'text-white/80 hover:text-white' : 'text-gray-700 dark:text-gray-300 hover:text-[var(--theme-primary)]'}`}
                  style={!atTop && isActive ? { color: 'var(--theme-primary)' } : undefined}
                >
                  {text}
                  {isActive && <span className={`absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full ${atTop ? 'bg-white' : ''}`} style={!atTop ? { backgroundColor: 'var(--theme-primary)' } : undefined} />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangOpen((prev) => !prev)}
                className={`flex items-center gap-1 rounded-full p-1.5 transition ${atTop ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-[var(--theme-primary)] dark:text-gray-300'}`}>
                <Globe size={15} />
                <span className="text-[11px] font-semibold uppercase">{language}</span>
                <ChevronDown size={10} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1.5 min-w-[130px] rounded-xl border bg-white p-1.5 shadow-lg dark:bg-[#111]"
                  style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 18%, #e5e7eb)' }}>
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
                      style={{
                        color: language === lang.code ? 'var(--theme-primary)' : undefined,
                        backgroundColor: language === lang.code ? 'color-mix(in srgb, var(--theme-primary) 8%, transparent)' : undefined,
                      }}>
                      <span className="text-xs font-semibold uppercase">{lang.code}</span>
                      <span className="text-xs text-gray-400">{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleTheme}
              className={`rounded-full p-1.5 transition md:flex ${atTop ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-[var(--theme-primary)] dark:text-gray-300'}`}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link href="/contact" className="ml-1.5 hidden rounded-full px-5 py-2 text-xs font-semibold text-white shadow transition hover:brightness-110 md:inline-flex"
              style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
              {t('nav.contact', 'Contact')}
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`rounded-full p-1.5 md:hidden ${atTop ? 'text-white' : 'text-gray-700 hover:text-[var(--theme-primary)] dark:text-gray-200 dark:hover:text-white'}`}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t bg-white px-4 py-4 shadow-lg md:hidden dark:bg-[#0a0a14]" style={{ borderColor: 'color-mix(in srgb, var(--theme-primary) 14%, #e5e7eb)' }}>
            <div className="space-y-1">
              {navItems.map(({ text, path }) => {
                const isActive = pathname === path;
                return (
                  <Link key={text} href={path} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200"
                    style={isActive ? { color: 'var(--theme-primary)', backgroundColor: 'color-mix(in srgb, var(--theme-primary) 8%, transparent)' } : {}}>
                    {text}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-3">
              {languages.map((lang) => (
                <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold uppercase text-gray-600 dark:text-gray-300"
                  style={{ color: language === lang.code ? 'var(--theme-primary)' : undefined }}>
                  {lang.native}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
