import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_SLUG = 'golden-shine-default';

const pages = [
  { slug: 'home', title: 'Home', seoTitle: 'Golden Shine Trading | Premium Trading Solutions', seoDescription: 'Golden Shine Trading — your trusted partner for wholesale distribution and trading solutions across Malaysia.' },
  { slug: 'about', title: 'About', seoTitle: 'Golden Shine Trading | About Us', seoDescription: 'Learn about Golden Shine Trading — our mission, values, and commitment to quality trading services.' },
  { slug: 'portfolio', title: 'Products', seoTitle: 'Golden Shine Trading | Our Products', seoDescription: 'Explore Golden Shine Trading\'s diverse product portfolio — quality goods for every industry.' },
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

    // PRODUCTS (portfolio slug)
    { pageSlug: 'portfolio', sectionKey: 'projects-gallery', sectionType: 'Portfolio', orderIndex: 1, content: { heading: 'Our Product Range', description: 'Explore our comprehensive range of quality products across multiple categories.', projects: [{ title: 'Consumer Goods', description: 'Household essentials, personal care, and everyday consumables.' }, { title: 'Food & Beverage', description: 'Packaged foods, beverages, and specialty ingredients.' }, { title: 'Industrial Supplies', description: 'Raw materials, packaging, and operational supplies.' }, { title: 'Electronics', description: 'Consumer electronics and accessories at wholesale pricing.' }] } },

    // LATEST NEWS (blog slug)
    { pageSlug: 'blog', sectionKey: 'blog-posts', sectionType: 'BlogPosts', orderIndex: 1, content: { heading: 'Latest News & Updates', description: 'Stay informed with announcements, industry insights, and company updates.' } },
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
    { label: 'Products', href: '/portfolio', orderIndex: 3 },
    { label: 'Latest News', href: '/blog', orderIndex: 4 },
  ];
  for (const item of navItems) {
    await prisma.navigationItem.create({
      data: { tenantId: tenant.id, label: item.label, href: item.href, orderIndex: item.orderIndex, isVisible: true },
    });
  }

  // Footer
  await prisma.footerItem.deleteMany({ where: { tenantId: tenant.id } });
  const footerItems = [
    { columnKey: 'company', label: 'About', href: '/about', orderIndex: 1 },
    { columnKey: 'company', label: 'Products', href: '/services', orderIndex: 2 },
    { columnKey: 'company', label: 'Photos', href: '/portfolio', orderIndex: 3 },
    { columnKey: 'connect', label: 'Latest News', href: '/blog', orderIndex: 1 },
    { columnKey: 'connect', label: 'Contact', href: '/contact', orderIndex: 2 },
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
