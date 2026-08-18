function getInitials(name) {
  const words = String(name || '').trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0]?.[0] || '').toUpperCase();
}

const LOGO_SIZES = {
  sm: { image: 'h-8 w-auto object-contain', badge: 'h-8 w-8 text-[11px]', text: 'text-sm font-semibold' },
  md: { image: 'h-12 sm:h-14 w-auto object-contain', badge: 'h-12 w-12 text-base', text: 'text-lg sm:text-xl font-bold' },
  lg: { image: 'h-16 sm:h-20 w-auto object-contain', badge: 'h-16 w-16 text-lg', text: 'text-xl sm:text-2xl font-bold' },
  xl: { image: 'h-20 sm:h-24 w-auto object-contain', badge: 'h-20 w-20 text-xl', text: 'text-2xl sm:text-3xl font-extrabold' },
};

export default function BrandMark({ logoUrl, brandName, size = 'md', light = false }) {
  const initials = getInitials(brandName);
  const sizes = LOGO_SIZES[size] || LOGO_SIZES.md;

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${brandName} logo`}
        className={`${sizes.image} shrink-0`}
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span
        className={`${sizes.badge} flex shrink-0 items-center justify-center rounded-xl font-bold text-white`}
        style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
      >
        {initials}
      </span>
      <span className={`${sizes.text} tracking-tight ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {brandName}
      </span>
    </div>
  );
}
