function getInitials(name) {
  const words = String(name || '').trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (words[0]?.[0] || '').toUpperCase();
}

export default function BrandMark({ logoUrl, brandName, size = 'sm' }) {
  const initials = getInitials(brandName);

  if (logoUrl) {
    const imgClasses = size === 'sm' ? 'h-7 sm:h-8 w-auto object-contain' : 'h-9 w-auto object-contain';
    return (
      <img
        src={logoUrl}
        alt={`${brandName} logo`}
        className={imgClasses}
      />
    );
  }

  const badgeDims = size === 'sm' ? 'h-7 w-7 text-[10px] sm:h-8 sm:w-8 sm:text-xs' : 'h-9 w-9 text-xs';
  const textClass = size === 'sm' ? 'text-sm font-semibold sm:text-base' : 'text-lg font-bold';

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`${badgeDims} flex shrink-0 items-center justify-center rounded-lg font-bold text-white`}
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
        }}
      >
        {initials}
      </span>
      <span
        className={`${textClass} tracking-tight`}
        style={{ color: 'color-mix(in srgb, var(--theme-primary) 85%, var(--text-base))' }}
      >
        {brandName}
      </span>
    </div>
  );
}
