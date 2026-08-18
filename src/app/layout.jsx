import '../index.css';
import NextLayoutShell from '../Components/NextLayoutShell';
import { getSiteData } from '../lib/content';

export async function generateMetadata() {
  let logoUrl = null;
  try {
    const siteData = await getSiteData();
    logoUrl = siteData?.siteSettings?.logoUrl || null;
  } catch {
    logoUrl = null;
  }

  return {
    title: 'Golden Shine Trading | Premium Trading Solutions',
    description: 'Golden Shine Trading — your trusted partner for wholesale distribution and trading solutions across Korea.',
    ...(logoUrl
      ? {
          icons: {
            icon: logoUrl,
            shortcut: logoUrl,
            apple: logoUrl,
          },
        }
      : {}),
  };
}

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
    '--theme-primary': '#1E3A8A',
    '--theme-secondary': '#2563EB',
    '--theme-accent': '#EAB308',
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
          brandName={siteData?.siteSettings?.brandName || siteData?.name || 'Golden Shine'}
          logoUrl={siteSettings?.logoUrl || null}
          logoSize={siteSettings?.logoSize || 'md'}
          contactEmail={siteSettings?.contactEmail || ''}
          contactPhone={siteSettings?.contactPhone || ''}
          contactAddress={siteSettings?.contactAddress || ''}
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
