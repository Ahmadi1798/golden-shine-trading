'use client';

import dynamic from 'next/dynamic';

const ClientSwiper = dynamic(() => import('./HeroSliderClient'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#080810]" />,
});

const fallbackSlides = [
  {
    eyebrow: "Malaysia's Trusted Distributor",
    heading: 'Premium Products,\nReliable Delivery',
    description: 'Golden Shine Trading connects quality manufacturers with businesses across Malaysia.',
    imageUrl: '/images/heroImage.webp',
    ctaLabel: 'Explore Products',
    ctaHref: '/services',
    secondaryCtaLabel: 'Contact Us',
    secondaryCtaHref: '/contact',
    stat1: '15+', stat1Label: 'Years',
    stat2: '500+', stat2Label: 'Products',
    stat3: '50+', stat3Label: 'Cities',
  },
];

const HeroSliderSection = ({ content = {} }) => {
  const autoplayDelay = Number(content.autoplayDelay) > 0 ? Number(content.autoplayDelay) : 6000;

  const slides = Array.isArray(content.slides) && content.slides.length
    ? content.slides.map((s) => ({
        ...s,
        stat1: s.statValue || '100+',
        stat1Label: s.statLabel || 'Metric',
        stat2: '500+',
        stat2Label: 'Products',
        stat3: '50+',
        stat3Label: 'Cities',
      }))
    : fallbackSlides;

  return (
    <header className="relative" aria-label="Hero">
      <ClientSwiper slides={slides} autoplayDelay={autoplayDelay} />
    </header>
  );
};

export default HeroSliderSection;
