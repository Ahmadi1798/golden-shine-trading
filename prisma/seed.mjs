import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_SLUG = 'golden-shine-default';

const pages = [
  { slug: 'home', title: 'Home', seoTitle: 'Golden Shine Trading | Premium Trading Solutions', seoDescription: 'Golden Shine Trading — your trusted partner for wholesale distribution and trading solutions across Malaysia.' },
  { slug: 'about', title: 'About', seoTitle: 'Golden Shine Trading | About Us', seoDescription: 'Learn about Golden Shine Trading — our mission, values, and commitment to quality trading services.' },
  { slug: 'products', title: 'Products', seoTitle: 'Golden Shine Trading | Our Products', seoDescription: 'Explore Golden Shine Trading\'s range of Japanese used automobile parts — engines, transmissions, cabins, and spare parts.' },
  { slug: 'photos', title: 'Photos', seoTitle: 'Golden Shine Trading | Photo Gallery', seoDescription: 'Browse our photo gallery — warehouse, products, and operations at Golden Shine Trading.' },
  { slug: 'blog', title: 'Latest News', seoTitle: 'Golden Shine Trading | Latest News', seoDescription: 'Stay updated with the latest news, announcements, and industry insights from Golden Shine Trading.' },
  { slug: 'contact', title: 'Contact', seoTitle: 'Golden Shine Trading | Contact Us', seoDescription: 'Get in touch with Golden Shine Trading for inquiries, partnerships, and quotations.' },
];

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: TENANT_SLUG },
    update: { name: 'Golden Shine Trading' },
    create: { slug: TENANT_SLUG, name: 'Golden Shine Trading' },
  });

  await prisma.siteSettings.upsert({
    where: { tenantId: tenant.id },
    update: {},
    create: {
      tenantId: tenant.id,
      brandName: 'Golden Shine Trading',
      primaryColor: '#D4A017',
      secondaryColor: '#1A1A2E',
      accentColor: '#C7920E',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      contactEmail: 'info@goldenshine.com',
      contactPhone: '+60 12-345 6789',
      contactAddress: 'Kuala Lumpur, Malaysia',
    },
  });

  // Create pages
  const pageMap = new Map();
  for (const pageDef of pages) {
    const row = await prisma.page.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: pageDef.slug } },
      update: { title: pageDef.title, seoTitle: pageDef.seoTitle, seoDescription: pageDef.seoDescription },
      create: { tenantId: tenant.id, slug: pageDef.slug, title: pageDef.title, seoTitle: pageDef.seoTitle, seoDescription: pageDef.seoDescription },
    });
    pageMap.set(pageDef.slug, row.id);
  }

  // Clean up any old sections before seeding
  for (const pageSlug of pages.map(p => p.slug)) {
    const pageId = pageMap.get(pageSlug);
    if (pageId) {
      await prisma.pageSection.deleteMany({ where: { pageId } });
      await prisma.publishedPageSnapshot.deleteMany({ where: { pageId } });
      await prisma.publishedPageRevision.deleteMany({ where: { pageId } });
    }
  }

  // Section definitions
  const sectionRows = [
    // HOME
    { pageSlug: 'home', sectionKey: 'heroSlider', sectionType: 'heroSlider', orderIndex: 1, content: { autoplayDelay: 6000, slides: [{ eyebrow: 'Malaysia\'s Trusted Distributor', heading: 'Premium Products, Reliable Delivery', description: 'Golden Shine Trading connects quality manufacturers with businesses across Malaysia through efficient wholesale distribution and supply chain management.', imageUrl: '/images/heroImage.webp', ctaLabel: 'Explore Products', ctaHref: '/services', secondaryCtaLabel: 'Contact Us', secondaryCtaHref: '/contact', statLabel: 'Years in Business', statValue: '15+' }, { eyebrow: 'Wide Product Range', heading: 'Everything Your Business Needs Under One Roof', description: 'From consumer goods to industrial supplies, we source and deliver comprehensive product ranges tailored to your market.', imageUrl: '/images/heroImage.webp', ctaLabel: 'View Categories', ctaHref: '/services', secondaryCtaLabel: 'Request Quote', secondaryCtaHref: '/contact', statLabel: 'Product Lines', statValue: '500+' }, { eyebrow: 'Nationwide Coverage', heading: 'Serving Businesses Across All of Malaysia', description: 'With reliable logistics and strong supplier partnerships, we ensure your orders arrive on time — from Penang to Johor, Sabah to Sarawak.', imageUrl: '/images/heroImage.webp', ctaLabel: 'Get Started', ctaHref: '/contact', secondaryCtaLabel: 'About Us', secondaryCtaHref: '/about', statLabel: 'Cities Served', statValue: '50+' }] } },
    { pageSlug: 'home', sectionKey: 'whychooseus', sectionType: 'Testimonials', orderIndex: 2, content: { heading: 'Why Choose Golden Shine', description: 'We bring reliability, quality, and competitive pricing to every partnership.', features: ['Consistent on-time deliveries across Malaysia', 'Direct sourcing keeps your costs competitive', 'Rigorous quality checks on every shipment', 'Dedicated account support for every client'] } },
    { pageSlug: 'home', sectionKey: 'cta', sectionType: 'CTA', orderIndex: 3, content: { heading: 'Ready to Partner with Golden Shine?', ctaPrimary: { label: 'Contact Us', href: '/contact' }, ctaSecondary: { label: 'View Products', href: '/services' } } },

    // ABOUT
    { pageSlug: 'about', sectionKey: 'abouthero', sectionType: 'abouthero', orderIndex: 1, content: { heading: 'A Legacy of Trust in Trading', description: 'Golden Shine Trading was founded with a simple goal — to bridge quality products with businesses that need them most.' } },
    { pageSlug: 'about', sectionKey: 'whoweare', sectionType: 'story', orderIndex: 2, content: { heading: 'Who We Are', description: 'We are a Malaysian-based trading company specializing in wholesale distribution of high-quality goods. Our deep network of suppliers and logistics partners enables us to serve clients across diverse industries with speed and reliability.', imageUrl: '/images/heroImage.webp' } },
    { pageSlug: 'about', sectionKey: 'corevalues', sectionType: 'values', orderIndex: 3, content: { heading: 'Our Values', values: [{ title: 'Integrity', description: 'We operate with transparency and honesty in every transaction.' }, { title: 'Excellence', description: 'We hold ourselves to the highest standards in product quality and service.' }, { title: 'Partnership', description: 'Your success is our success — we invest in long-term relationships.' }, { title: 'Innovation', description: 'We constantly improve our sourcing, logistics, and customer experience.' }] } },
    { pageSlug: 'about', sectionKey: 'ourapproach', sectionType: 'process', orderIndex: 4, content: { heading: 'How We Work', steps: [{ title: 'Source', description: 'We identify and vet premium suppliers to ensure consistent quality.' }, { title: 'Quality Check', description: 'Every shipment is inspected and verified before dispatch.' }, { title: 'Distribute', description: 'Efficient logistics deliver your orders on time, every time.' }, { title: 'Support', description: 'Ongoing after-sales support and account management.' }] } },
    { pageSlug: 'about', sectionKey: 'aboutcta', sectionType: 'cta', orderIndex: 5, content: { heading: 'Let\'s Build Something Together', ctaPrimary: { label: 'Get in Touch', href: '/contact' } } },

    // PRODUCTS
    { pageSlug: 'products', sectionKey: 'productshero', sectionType: 'productshero', orderIndex: 1, content: { heading: 'Our Products', description: 'Explore our comprehensive range of Japanese used automobile parts — engines, transmissions, cabins, half cuts, and spare parts.' } },
    { pageSlug: 'products', sectionKey: 'productcategories', sectionType: 'productcategories', orderIndex: 2, content: { heading: 'Product Categories', description: 'Browse our full range of Japanese used automobile parts.', categories: [{ title: 'Used Japanese Car Engines', subtitle: 'Diesel & Gasoline', description: 'High-quality used car engines imported directly from Japan.', image: '/images/products/engine.jpg' }, { title: 'Used Japanese Truck Engines', subtitle: '', description: 'Durable truck engines built to handle heavy loads.', image: '/images/products/truck-engine.jpg' }, { title: 'Used Cabin', subtitle: '', description: 'Complete cabins in excellent condition.', image: '/images/products/cabin.jpg' }, { title: 'Used Half Cuts', subtitle: 'Front cut / Rear cut', description: 'Front and rear half cuts containing major components.', image: '/images/products/halfcut.jpg' }, { title: 'Used Transmissions', subtitle: '', description: 'Automatic and manual transmissions tested for reliability.', image: '/images/products/transmission.jpg' }, { title: 'Used Spare Parts', subtitle: '', description: 'Wide range of spare parts.', image: '/images/products/spareparts.jpg' }] } },
    { pageSlug: 'products', sectionKey: 'productscta', sectionType: 'productscta', orderIndex: 3, content: { heading: "Can't Find What You Need?", description: 'Contact our team for availability, pricing, and bulk order inquiries.', ctaLabel: 'Contact Us', ctaHref: '/contact' } },

    // PHOTOS
    { pageSlug: 'photos', sectionKey: 'photoshero', sectionType: 'photoshero', orderIndex: 1, content: { heading: 'Photo Gallery', description: 'A look inside our warehouse, products, and day-to-day operations at Golden Shine Trading.' } },
    { pageSlug: 'photos', sectionKey: 'photogallery', sectionType: 'photogallery', orderIndex: 2, content: { heading: 'Gallery', description: 'Explore our facilities and products through photos.', images: [{ image: '/images/products/engine.jpg', caption: 'Used Japanese engines in stock' }, { image: '/images/products/truck-engine.jpg', caption: 'Truck engines ready for shipment' }, { image: '/images/products/cabin.jpg', caption: 'Complete cabin assemblies' }, { image: '/images/products/halfcut.jpg', caption: 'Front and rear half cuts' }, { image: '/images/products/transmission.jpg', caption: 'Tested automatic transmissions' }, { image: '/images/products/spareparts.jpg', caption: 'Wide range of spare parts' }] } },

    // LATEST NEWS (blog slug)
    { pageSlug: 'blog', sectionKey: 'bloghero', sectionType: 'bloghero', orderIndex: 1, content: { heading: 'Latest News', description: 'Company announcements, new arrivals, and industry updates from Golden Shine Trading.' } },
    { pageSlug: 'blog', sectionKey: 'blogposts', sectionType: 'blogposts', orderIndex: 2, content: { posts: [{ title: 'New Shipment of Japanese Engines Arrived', image: '/images/products/engine.jpg', date: 'August 2026', link: '/blog/new-shipment-of-japanese-engines-arrived', excerpt: 'A fresh container of low-mileage used Japanese engines has just arrived.', content: 'We are pleased to announce the arrival of a new shipment of low-mileage used Japanese engines.', keyInsights: 'Fresh stock of Toyota and Honda engines\nAll units inspected', nextSteps: 'Contact our sales team to reserve your engine today.' }, { title: 'Expanding Our Truck Engine Range', image: '/images/products/truck-engine.jpg', date: 'July 2026', link: '/blog/expanding-our-truck-engine-range', excerpt: 'We have added more Isuzu and Hino truck engines.', content: 'To better serve our commercial customers, we have expanded our range of used Japanese truck engines.', keyInsights: 'New Isuzu and Hino engines in stock\nDyno-tested', nextSteps: 'Reach out to discuss compatibility with your truck model.' }, { title: 'Now Exporting to 30+ Countries', image: '/images/products/spareparts.jpg', date: 'June 2026', link: '/blog/now-exporting-to-30-plus-countries', excerpt: 'Our international network keeps growing.', content: 'Golden Shine Trading has reached a new milestone, now exporting to more than 30 countries.', keyInsights: 'Exporting to 30+ countries\nCovering five continents', nextSteps: 'For international orders, contact our export team.' }] } },
    { pageSlug: 'blog', sectionKey: 'blogcta', sectionType: 'cta', orderIndex: 3, content: { heading: 'Need Auto Parts?', description: 'Contact our team for availability, pricing, and bulk order inquiries.', ctaLabel: 'Contact Us', ctaHref: '/contact' } },
  ];

  for (const row of sectionRows) {
    const pageId = pageMap.get(row.pageSlug);
    if (!pageId) continue;

    const section = await prisma.pageSection.upsert({
      where: { pageId_sectionKey: { pageId, sectionKey: row.sectionKey } },
      update: { sectionType: row.sectionType, orderIndex: row.orderIndex, isVisible: true },
      create: { pageId, sectionKey: row.sectionKey, sectionType: row.sectionType, orderIndex: row.orderIndex, isVisible: true },
    });

    await prisma.sectionContent.upsert({
      where: { pageSectionId: section.id },
      update: { content: row.content },
      create: { pageSectionId: section.id, content: row.content },
    });
  }

  // Create published snapshots for all pages
  for (const pageDef of pages) {
    const pageId = pageMap.get(pageDef.slug);
    if (!pageId) continue;

    const sections = await prisma.pageSection.findMany({
      where: { pageId, isVisible: true },
      orderBy: { orderIndex: 'asc' },
      include: { content: true },
    });

    const serialized = sections.map((s, i) => ({
      sectionKey: s.sectionKey,
      sectionType: s.sectionType,
      orderIndex: s.orderIndex ?? i + 1,
      isVisible: s.isVisible ?? true,
      content: s.content?.content || {},
    }));

    const snapshot = await prisma.publishedPageSnapshot.upsert({
      where: { pageId },
      update: { title: pageDef.title, seoTitle: pageDef.seoTitle, seoDescription: pageDef.seoDescription, sections: serialized, publishedAt: new Date() },
      create: { pageId, title: pageDef.title, seoTitle: pageDef.seoTitle, seoDescription: pageDef.seoDescription, sections: serialized },
    });

    await prisma.page.update({
      where: { id: pageId },
      data: { lastPublishedAt: snapshot.publishedAt },
    });
  }

  // Navigation
  await prisma.navigationItem.deleteMany({ where: { tenantId: tenant.id } });
  const navItems = [
    { label: 'Home', href: '/', orderIndex: 1 },
    { label: 'About', href: '/about', orderIndex: 2 },
    { label: 'Products', href: '/products', orderIndex: 3 },
    { label: 'Photos', href: '/photos', orderIndex: 4 },
    { label: 'Latest News', href: '/blog', orderIndex: 5 },
  ];
  for (const item of navItems) {
    await prisma.navigationItem.create({
      data: { tenantId: tenant.id, label: item.label, href: item.href, orderIndex: item.orderIndex, isVisible: true },
    });
  }

  // Footer
  await prisma.footerItem.deleteMany({ where: { tenantId: tenant.id } });
  const footerItems = [
    { columnKey: 'discover', label: 'Home', href: '/', orderIndex: 1 },
    { columnKey: 'discover', label: 'About', href: '/about', orderIndex: 2 },
    { columnKey: 'discover', label: 'Products', href: '/products', orderIndex: 3 },
    { columnKey: 'discover', label: 'Photos', href: '/photos', orderIndex: 4 },
    { columnKey: 'discover', label: 'Contact', href: '/contact', orderIndex: 5 },
    { columnKey: 'information', label: 'Used Engines', href: '/products', orderIndex: 1 },
    { columnKey: 'information', label: 'Used Half Cuts', href: '/products', orderIndex: 2 },
    { columnKey: 'information', label: 'Used Transmissions', href: '/products', orderIndex: 3 },
    { columnKey: 'information', label: 'Used Spare Parts', href: '/products', orderIndex: 4 },
  ];
  for (const item of footerItems) {
    await prisma.footerItem.create({
      data: { tenantId: tenant.id, columnKey: item.columnKey, label: item.label, href: item.href, orderIndex: item.orderIndex, isVisible: true },
    });
  }

  console.log('Seed completed for tenant:', TENANT_SLUG);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
