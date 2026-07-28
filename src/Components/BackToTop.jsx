import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full border p-3 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2"
      style={{
        borderColor: 'color-mix(in srgb, var(--theme-primary) 28%, white)',
        background:
          'linear-gradient(145deg, var(--theme-primary), var(--theme-secondary), var(--theme-accent))',
        boxShadow: '0 16px 32px color-mix(in srgb, var(--theme-primary) 38%, transparent)',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="14" fill="currentColor" opacity="0.15" />
        <path
          d="M14 20V8M14 8L8 14M14 8L20 14"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
