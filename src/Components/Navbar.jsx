'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Menu, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { links } from '../../utils/Links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import BrandMark from './ui/BrandMark';

const Navbar = ({ navigationItems = [], brandName = 'KarFamSoft', logoUrl = null }) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { language, languages, setLanguage, isRTL, t, translateNavLabel } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const isAboutPage = pathname.startsWith('/about');

  const navItems = navigationItems.length
    ? navigationItems.map((item) => ({
        text: translateNavLabel(item.label, item.href),
        path: item.href,
      }))
    : links.map((item) => ({
        ...item,
        text: translateNavLabel(item.text, item.path),
      }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const atHero = isAboutPage && !scrolled;
  const textColor = atHero
    ? 'color-mix(in srgb, white 85%, transparent)'
    : 'color-mix(in srgb, var(--theme-primary) 54%, var(--text-base))';
  const subtleBg = atHero
    ? 'color-mix(in srgb, white 8%, transparent)'
    : 'color-mix(in srgb, var(--theme-primary) 6%, var(--surface))';
  const borderColor = atHero
    ? 'transparent'
    : 'color-mix(in srgb, var(--theme-primary) 14%, var(--surface))';
  const panelBg = atHero
    ? 'color-mix(in srgb, #000 88%, var(--theme-primary) 4%)'
    : 'color-mix(in srgb, var(--surface) 94%, var(--theme-primary) 2%)';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[140] w-full transition-colors duration-300 ${
        scrolled ? 'dark:bg-[#0f172a]/60' : ''
      }`}
      aria-label="Main Navigation"
    >
      <nav className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8" role="navigation">
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-2 backdrop-blur-xl transition-all duration-300 ${
            atHero ? 'bg-transparent shadow-none backdrop-blur-none' : ''
          } ${scrolled && !atHero ? 'shadow-lg' : 'shadow-sm'}`}
          style={
            atHero
              ? { backgroundColor: 'transparent' }
              : { backgroundColor: 'color-mix(in srgb, var(--surface, #fff) 78%, transparent)' }
          }
        >
          <Link href="/" aria-label={`${brandName} Home`} className="flex shrink-0 items-center">
            <BrandMark logoUrl={logoUrl} brandName={brandName} size="sm" />
          </Link>

          <ul
            className="hidden items-center gap-0.5 rounded-full border px-1.5 py-1 md:flex"
            style={{ borderColor }}
          >
            {navItems.map(({ text, path }) => {
              const isActive = pathname === path;
              return (
                <li key={text}>
                  <Link
                    href={path}
                    className="inline-flex rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 sm:text-sm"
                    style={
                      isActive
                        ? { color: atHero ? '#000' : 'white', backgroundColor: atHero ? 'white' : 'var(--theme-primary)' }
                        : { color: textColor }
                    }
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            {/* Language */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((prev) => !prev)}
                className="hidden rounded-full p-1.5 transition md:flex items-center gap-1"
                style={{ color: textColor }}
                aria-label={t('nav.selectLanguage', 'Select language')}
              >
                <Globe size={14} />
                <span className="text-[11px] font-semibold uppercase">{language}</span>
                <ChevronDown size={10} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div
                  className={`absolute top-full mt-1.5 min-w-[140px] rounded-xl border p-1.5 shadow-lg backdrop-blur-xl ${isRTL ? 'left-0' : 'right-0'}`}
                  style={{ backgroundColor: panelBg, borderColor }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ${isRTL ? 'text-right' : 'text-left'}`}
                      style={{
                        color: language === lang.code ? (atHero ? 'white' : 'var(--theme-primary)') : textColor,
                        backgroundColor: language === lang.code ? subtleBg : 'transparent',
                      }}
                    >
                      <span className="text-xs font-semibold uppercase">{lang.code}</span>
                      <span className="text-xs" style={{ opacity: 0.6 }}>{lang.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="hidden rounded-full p-1.5 transition md:inline-flex"
              style={{ color: atHero ? 'white' : isDark ? 'color-mix(in srgb, var(--theme-accent) 84%, var(--text-base))' : textColor }}
              aria-label={isDark ? t('nav.switchToLight', 'Switch to light mode') : t('nav.switchToDark', 'Switch to dark mode')}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Contact */}
            <Link
              href="/contact"
              className="hidden rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:brightness-105 sm:text-sm md:inline-flex"
              style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }}
            >
              {t('nav.contact', 'Contact')}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-1.5 md:hidden"
              style={{ color: textColor }}
              aria-label={isMenuOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className="mx-auto mt-2 w-full max-w-screen-2xl rounded-xl border p-3 shadow-lg backdrop-blur-xl md:hidden"
            style={{ backgroundColor: panelBg, borderColor }}
          >
            <div className="space-y-1">
              {navItems.map(({ text, path }) => {
                const isActive = pathname === path;
                return (
                  <Link
                    key={text}
                    href={path}
                    className="block rounded-lg px-3 py-2 text-sm font-medium transition"
                    style={
                      isActive
                        ? { color: atHero ? '#000' : 'white', backgroundColor: atHero ? 'white' : 'var(--theme-primary)' }
                        : { color: textColor }
                    }
                  >
                    {text}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/contact"
                className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }}
              >
                {t('nav.contact', 'Contact')}
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-lg p-2"
                style={{ color: textColor, backgroundColor: subtleBg }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setIsMenuOpen(false); }}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                  style={{
                    color: language === lang.code ? (atHero ? 'white' : 'var(--theme-primary)') : textColor,
                    backgroundColor: language === lang.code ? subtleBg : 'transparent',
                  }}
                >
                  <Globe size={10} />
                  <span className="uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
