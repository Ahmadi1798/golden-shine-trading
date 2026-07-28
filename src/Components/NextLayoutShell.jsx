'use client';

import { usePathname } from 'next/navigation';
import BackToTop from './BackToTop';
import Footer from './Footer';
import Navbar from './Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

const NextLayoutShell = ({
  children,
  navigationItems = [],
  footerItems = [],
  brandName = 'KarFamSoft',
  logoUrl = null,
  contactEmail = '',
  contactPhone = '',
  facebookUrl = '',
  instagramUrl = '',
  twitterUrl = '',
  whatsappUrl = '',
}) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider>
      <LanguageProvider>
        {!isAdminRoute ? <BackToTop /> : null}
        {!isAdminRoute ? (
          <Navbar navigationItems={navigationItems} brandName={brandName} logoUrl={logoUrl} />
        ) : null}
        {children}
        {!isAdminRoute ? <Footer footerItems={footerItems} brandName={brandName} logoUrl={logoUrl} contactEmail={contactEmail} contactPhone={contactPhone} facebookUrl={facebookUrl} instagramUrl={instagramUrl} twitterUrl={twitterUrl} whatsappUrl={whatsappUrl} /> : null}
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default NextLayoutShell;
