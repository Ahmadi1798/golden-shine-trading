import '../index.css';
import NextLayoutShell from '../Components/NextLayoutShell';
import { getSiteData } from '../lib/content';

export const metadata = {
  title: 'KarFamSoft Agency',
  description: 'KarFamSoft crafts scalable, user-focused digital experiences.',
};

function normalizeFontStack(value, fallback = 'sans-serif') {
  const cleaned = String(value || '').trim();
  if (!cleaned) return `Poppins, ${fallback}`;
  if (cleaned.includes('serif') || cleaned.includes('sans') || cleaned.includes('monospace')) {
    return cleaned;
  }
  return `${cleaned}, ${fallback}`;
}

export default async function RootLayout({ children }) {
  let siteData = null;

  try {
    siteData = await getSiteData();
  } catch {
    siteData = null;
  }

  const siteSettings = siteData?.siteSettings || null;
  const headingFont = normalizeFontStack(siteSettings?.fontHeading, 'sans-serif');
  const bodyFont = normalizeFontStack(siteSettings?.fontBody, 'sans-serif');
  const bodyStyle = {
    '--theme-primary': siteSettings?.primaryColor || '#4F46E5',
    '--theme-secondary': siteSettings?.secondaryColor || '#7C3AED',
    '--theme-accent': siteSettings?.accentColor || '#EC4899',
    '--theme-font-heading': headingFont,
    '--theme-font-body': bodyFont,
    '--font-sans': bodyFont,
    '--font-serif': headingFont,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={bodyStyle} className="bg-white dark:bg-[#0f172a]">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <NextLayoutShell
          navigationItems={siteData?.navigationItems || []}
          footerItems={siteData?.footerItems || []}
          brandName={siteData?.siteSettings?.brandName || siteData?.name || 'KarFamSoft'}
          logoUrl={siteSettings?.logoUrl || null}
          contactEmail={siteSettings?.contactEmail || ''}
          contactPhone={siteSettings?.contactPhone || ''}
          facebookUrl={siteSettings?.facebookUrl || ''}
          instagramUrl={siteSettings?.instagramUrl || ''}
          twitterUrl={siteSettings?.twitterUrl || ''}
          whatsappUrl={siteSettings?.whatsappUrl || ''}
        >
          {children}
        </NextLayoutShell>
      </body>
    </html>
  );
}
