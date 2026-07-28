import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TENANT_SLUG = 'karfamsoft-default';

const pages = [
  { slug: 'home', title: 'Home', seoTitle: 'KarFamSoft | Home', seoDescription: 'Digital agency home page.' },
  { slug: 'about', title: 'About', seoTitle: 'KarFamSoft | About', seoDescription: 'About KarFamSoft agency.' },
  { slug: 'services', title: 'Services', seoTitle: 'KarFamSoft | Services', seoDescription: 'Agency services list.' },
  { slug: 'portfolio', title: 'Portfolio', seoTitle: 'KarFamSoft | Portfolio', seoDescription: 'Recent client projects.' },
  { slug: 'blog', title: 'Blog', seoTitle: 'KarFamSoft | Blog', seoDescription: 'Insights and updates.' },
  { slug: 'contact', title: 'Contact', seoTitle: 'KarFamSoft | Contact', seoDescription: 'Get in touch.' },
  {
    slug: 'team',
    title: 'Team',
    seoTitle: 'KarFamSoft | Team',
    seoDescription: 'Meet the KarFamSoft team of strategists, designers, and engineers.',
  },
];

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: TENANT_SLUG },
    update: { name: 'KarFamSoft Agency' },
    create: { slug: TENANT_SLUG, name: 'KarFamSoft Agency' },
  });

  await prisma.siteSettings.upsert({
    where: { tenantId: tenant.id },
    update: {
      brandName: 'KarFamSoft Agency',
      primaryColor: '#4F46E5',
      secondaryColor: '#7C3AED',
      accentColor: '#EC4899',
      fontHeading: 'Poppins',
      fontBody: 'Poppins',
      contactEmail: 'support@karfamsoft.com',
      contactPhone: '+1 (555) 123-4567',
      contactAddress: '703 Bartley-Chester Rd, Virginia, USA',
    },
    create: {
      tenantId: tenant.id,
      brandName: 'KarFamSoft Agency',
      primaryColor: '#4F46E5',
      secondaryColor: '#7C3AED',
      accentColor: '#EC4899',
      fontHeading: 'Poppins',
      fontBody: 'Poppins',
      contactEmail: 'support@karfamsoft.com',
      contactPhone: '+1 (555) 123-4567',
      contactAddress: '703 Bartley-Chester Rd, Virginia, USA',
    },
  });

  const pageMap = new Map();

  for (const page of pages) {
    const row = await prisma.page.upsert({
      where: {
        tenantId_slug: {
          tenantId: tenant.id,
          slug: page.slug,
        },
      },
      update: {
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
      },
      create: {
        tenantId: tenant.id,
        slug: page.slug,
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
      },
    });

    pageMap.set(page.slug, row.id);
  }

  const sectionRows = [
    { pageSlug: 'home', sectionKey: 'hero', sectionType: 'Hero', orderIndex: 1, content: { heading: 'Elevate Your Brand with Exceptional Digital Experiences', ctaPrimary: { label: 'View Portfolio', href: '/portfolio' } } },
    { pageSlug: 'home', sectionKey: 'services', sectionType: 'Services', orderIndex: 2, content: { heading: 'Our Services' } },
    { pageSlug: 'home', sectionKey: 'testimonials', sectionType: 'Testimonials', orderIndex: 3, content: { heading: 'Why Choose Us' } },
    { pageSlug: 'home', sectionKey: 'process', sectionType: 'OurProcess', orderIndex: 4, content: { heading: 'Our Process' } },
    { pageSlug: 'home', sectionKey: 'portfolio', sectionType: 'Portfolio', orderIndex: 5, content: { heading: 'Featured Projects' } },
    { pageSlug: 'home', sectionKey: 'blog', sectionType: 'BlogTeaser', orderIndex: 6, content: { heading: 'Latest Insights' } },
    { pageSlug: 'home', sectionKey: 'cta', sectionType: 'CTA', orderIndex: 7, content: { heading: 'Let us build your next digital product.' } },
    { pageSlug: 'about', sectionKey: 'abouthero', sectionType: 'abouthero', orderIndex: 1, content: { heading: 'A Creative Partner for the Ambitious', description: 'We craft powerful digital experiences that help brands grow, connect, and stand out in today\'s competitive landscape.' } },
    { pageSlug: 'about', sectionKey: 'whoweare', sectionType: 'story', orderIndex: 2, content: { heading: 'Who We Are', description: 'KarFamSoft is a forward-thinking agency that blends creativity with technology. We partner with startups and enterprises to design, build, and scale digital products that make a real impact.', imageUrl: '/images/heroImage.webp' } },
    { pageSlug: 'about', sectionKey: 'corevalues', sectionType: 'values', orderIndex: 3, content: { heading: 'Our Core Values', values: [{ title: 'Integrity', description: 'We build trust through transparency, honesty, and delivering on every promise.' }, { title: 'Innovation', description: 'We push boundaries with cutting-edge technology and creative problem-solving.' }, { title: 'Collaboration', description: 'We believe the best work happens when teams and clients work as one.' }, { title: 'Excellence', description: 'Every pixel, every line of code, every interaction reflects our commitment to quality.' }] } },
    { pageSlug: 'about', sectionKey: 'ourapproach', sectionType: 'process', orderIndex: 4, content: { heading: 'Our Approach', steps: [{ title: 'Discover', description: 'We dive deep into your business goals, target audience, and competitive landscape.' }, { title: 'Design', description: 'Our designers craft intuitive, pixel-perfect interfaces that delight your users.' }, { title: 'Develop', description: 'We build robust, scalable solutions using modern technologies and best practices.' }, { title: 'Deliver', description: 'We launch, monitor, and iterate — supporting you long after the initial release.' }] } },
    { pageSlug: 'about', sectionKey: 'aboutcta', sectionType: 'cta', orderIndex: 5, content: { heading: 'Ready to Build Something Great?', ctaPrimary: { label: 'Start a Project', href: '/contact' }, ctaSecondary: { label: 'View Our Work', href: '/portfolio' } } },
    { pageSlug: 'services', sectionKey: 'services-list', sectionType: 'Services', orderIndex: 1, content: { heading: 'What We Offer' } },
    { pageSlug: 'portfolio', sectionKey: 'projects-gallery', sectionType: 'Portfolio', orderIndex: 1, content: { heading: 'Our Work' } },
    { pageSlug: 'blog', sectionKey: 'blog-posts', sectionType: 'BlogPosts', orderIndex: 1, content: { heading: 'Insights and Ideas' } },
    { pageSlug: 'contact', sectionKey: 'contact-form', sectionType: 'Contact', orderIndex: 1, content: { heading: 'Let\'s Connect' } },
    {
      pageSlug: 'team',
      sectionKey: 'teamhero',
      sectionType: 'teamhero',
      orderIndex: 1,
      content: {
        eyebrow: 'Our Team',
        heading: 'Meet the People Behind the Work',
        description:
          'We are a focused team of strategists, designers, and engineers building modern digital products that feel effortless and perform reliably.',
      },
    },
    {
      pageSlug: 'team',
      sectionKey: 'teamstats',
      sectionType: 'teamstats',
      orderIndex: 2,
      content: {
        projectsDelivered: '120+',
        clientRating: '4.9/5',
        yearsBuilding: '8+',
      },
    },
    {
      pageSlug: 'team',
      sectionKey: 'teammembers',
      sectionType: 'teammembers',
      orderIndex: 3,
      content: {
        membersHeading: 'Meet Our Team',
        members: [
          {
            name: 'Rafi Ullah Ahmadi',
            role: 'Founder & Product Strategist',
            imageUrl: '/images/heroImage.webp',
            bio: 'Leads product vision, discovery workshops, and roadmap planning for client projects.',
            facebookUrl: 'https://facebook.com',
            xUrl: 'https://twitter.com',
            instagramUrl: 'https://instagram.com',
          },
          {
            name: 'Ariana Wells',
            role: 'Lead UI Engineer',
            imageUrl: '/images/heroImage.webp',
            bio: 'Builds polished, high-performance interfaces with a strong focus on accessibility and UX.',
            facebookUrl: 'https://facebook.com',
            xUrl: 'https://twitter.com',
            instagramUrl: 'https://instagram.com',
          },
          {
            name: 'Omar Rahimi',
            role: 'Backend Architect',
            imageUrl: '/images/heroImage.webp',
            bio: 'Designs secure APIs, scalable systems, and reliable integrations that power business workflows.',
            facebookUrl: 'https://facebook.com',
            xUrl: 'https://twitter.com',
            instagramUrl: 'https://instagram.com',
          },
        ],
      },
    },
    {
      pageSlug: 'team',
      sectionKey: 'teamvalues',
      sectionType: 'teamvalues',
      orderIndex: 4,
      content: {
        valuesHeading: 'How We Work',
        values: [
          {
            title: 'Build With Clarity',
            description: 'We simplify complex requirements into practical phases with visible milestones.',
          },
          {
            title: 'Design For Humans',
            description: 'Every decision is made around usability, accessibility, and real user behavior.',
          },
          {
            title: 'Ship With Confidence',
            description: 'Quality and delivery discipline are built into every sprint from day one.',
          },
        ],
      },
    },
  ];

  // Clean up old about page sections before seeding new ones
  const aboutPageId = pageMap.get('about');
  if (aboutPageId) {
    await prisma.pageSection.deleteMany({ where: { pageId: aboutPageId } });
    await prisma.publishedPageSnapshot.deleteMany({ where: { pageId: aboutPageId } });
    await prisma.publishedPageRevision.deleteMany({ where: { pageId: aboutPageId } });
  }

  for (const row of sectionRows) {
    const pageId = pageMap.get(row.pageSlug);
    if (!pageId) continue;

    const section = await prisma.pageSection.upsert({
      where: {
        pageId_sectionKey: {
          pageId,
          sectionKey: row.sectionKey,
        },
      },
      update: {
        sectionType: row.sectionType,
        orderIndex: row.orderIndex,
        isVisible: true,
      },
      create: {
        pageId,
        sectionKey: row.sectionKey,
        sectionType: row.sectionType,
        orderIndex: row.orderIndex,
        isVisible: true,
      },
    });

    await prisma.sectionContent.upsert({
      where: { pageSectionId: section.id },
      update: { content: row.content },
      create: {
        pageSectionId: section.id,
        content: row.content,
      },
    });
  }

  for (const page of pages) {
    const pageId = pageMap.get(page.slug);
    if (!pageId) continue;

    const pageSections = await prisma.pageSection.findMany({
      where: { pageId },
      orderBy: { orderIndex: 'asc' },
      include: { content: true },
    });

    const sections = pageSections.map((section, index) => ({
      sectionKey: section.sectionKey,
      sectionType: section.sectionType,
      orderIndex: section.orderIndex ?? index + 1,
      isVisible: section.isVisible,
      content: section.content?.content || {},
    }));

    await prisma.publishedPageSnapshot.upsert({
      where: { pageId },
      update: {
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        sections,
        publishedAt: new Date(),
      },
      create: {
        pageId,
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        sections,
      },
    });

    await prisma.page.update({
      where: { id: pageId },
      data: { lastPublishedAt: new Date() },
    });
  }

  await prisma.navigationItem.deleteMany({ where: { tenantId: tenant.id } });
  await prisma.footerItem.deleteMany({ where: { tenantId: tenant.id } });

  await prisma.navigationItem.createMany({
    data: [
      { tenantId: tenant.id, label: 'Home', href: '/', orderIndex: 1 },
      { tenantId: tenant.id, label: 'About', href: '/about', orderIndex: 2 },
      { tenantId: tenant.id, label: 'Services', href: '/services', orderIndex: 3 },
      { tenantId: tenant.id, label: 'Portfolio', href: '/portfolio', orderIndex: 4 },
      { tenantId: tenant.id, label: 'Blog', href: '/blog', orderIndex: 5 },
      { tenantId: tenant.id, label: 'Team', href: '/team', orderIndex: 6 },
    ],
  });

  await prisma.footerItem.createMany({
    data: [
      { tenantId: tenant.id, columnKey: 'company', label: 'About', href: '/about', orderIndex: 1 },
      { tenantId: tenant.id, columnKey: 'company', label: 'Services', href: '/services', orderIndex: 2 },
      { tenantId: tenant.id, columnKey: 'company', label: 'Portfolio', href: '/portfolio', orderIndex: 3 },
      { tenantId: tenant.id, columnKey: 'company', label: 'Meet the Team', href: '/team', orderIndex: 4 },
      { tenantId: tenant.id, columnKey: 'connect', label: 'Blog', href: '/blog', orderIndex: 1 },
      { tenantId: tenant.id, columnKey: 'connect', label: 'Contact', href: '/contact', orderIndex: 2 },
    ],
  });

  await prisma.mediaAsset.deleteMany({ where: { tenantId: tenant.id } });

  await prisma.mediaAsset.createMany({
    data: [
      {
        tenantId: tenant.id,
        name: 'Hero Image',
        url: '/images/heroImage.webp',
        type: 'image',
        mimeType: 'image/webp',
        altText: 'Creative agency team collaborating on digital project',
      },
      {
        tenantId: tenant.id,
        name: 'Agency Background Video',
        url: '/videos/agency.mp4',
        type: 'video',
        mimeType: 'video/mp4',
        altText: 'Agency showcase reel',
      },
    ],
  });

  console.log('Seed completed for tenant:', TENANT_SLUG);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
