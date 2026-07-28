import { cache } from 'react';
import { prisma } from './prisma';

export const DEFAULT_TENANT_SLUG = 'golden-shine-default';
const hasDatabaseUrl = Boolean(globalThis.process?.env?.DATABASE_URL);

const DEFAULT_TEAM_SECTIONS = [
  {
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

const ABOUT_SECTION_EXPECTATIONS = [
  {
    kind: 'abouthero',
    sectionKey: 'abouthero',
    sectionType: 'abouthero',
  },
  {
    kind: 'story',
    sectionKey: 'whoweare',
    sectionType: 'story',
  },
  {
    kind: 'values',
    sectionKey: 'corevalues',
    sectionType: 'values',
  },
  {
    kind: 'process',
    sectionKey: 'ourapproach',
    sectionType: 'process',
  },
  {
    kind: 'cta',
    sectionKey: 'aboutcta',
    sectionType: 'cta',
  },
];

const ABOUT_SECTION_ALIASES = {
  hero: 'abouthero',
  about: 'abouthero',
  abouthero: 'abouthero',
  whoweare: 'story',
  whowearesection: 'story',
  story: 'story',
  corevalues: 'values',
  values: 'values',
  ourapproach: 'process',
  process: 'process',
  aboutcta: 'cta',
  cta: 'cta',
};

const normalizeSectionToken = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const getAboutSectionKind = (sectionKey, sectionType) => {
  const key = normalizeSectionToken(sectionKey);
  const type = normalizeSectionToken(sectionType);
  return ABOUT_SECTION_ALIASES[key] || ABOUT_SECTION_ALIASES[type] || null;
};

async function ensureExpectedAboutSections(page) {
  if (globalThis.process?.env?.ENABLE_ABOUT_SECTION_AUTOFILL !== 'true') return false;
  if (!page || page.slug !== 'about') return false;

  const existingKinds = new Set(
    (page.sections || [])
      .map((section) => getAboutSectionKind(section.sectionKey, section.sectionType))
      .filter(Boolean)
  );

  const missing = ABOUT_SECTION_EXPECTATIONS.filter((item) => !existingKinds.has(item.kind));
  if (!missing.length) return false;

  let nextOrder =
    (page.sections || []).reduce(
      (max, section, index) => Math.max(max, Number(section.orderIndex) || index + 1),
      0
    ) + 1;

  await prisma.$transaction(async (tx) => {
    for (const item of missing) {
      await tx.pageSection.create({
        data: {
          pageId: page.id,
          sectionKey: item.sectionKey,
          sectionType: item.sectionType,
          orderIndex: nextOrder,
          isVisible: true,
          content: {
            create: {
              content: {},
            },
          },
        },
      });

      nextOrder += 1;
    }
  });

  return true;
}

function normalizeSectionsForSnapshot(sections = []) {
  return sections
    .map((section, index) => ({
      sectionKey: section.sectionKey,
      sectionType: section.sectionType,
      orderIndex: section.orderIndex ?? index + 1,
      isVisible: section.isVisible ?? true,
      content: section.content?.content || {},
    }))
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

function mapSnapshotSectionsToPageShape(sections = []) {
  return sections
    .filter((section) => section.isVisible !== false)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
    .map((section) => ({
      sectionKey: section.sectionKey,
      sectionType: section.sectionType,
      orderIndex: section.orderIndex,
      isVisible: section.isVisible,
      content: {
        content: section.content || {},
      },
    }));
}

function normalizeSectionsForDiff(sections = []) {
  return sections
    .map((section, index) => ({
      sectionKey: section.sectionKey || `section-${index + 1}`,
      sectionType: section.sectionType || 'Custom',
      orderIndex: Number(section.orderIndex) || index + 1,
      isVisible: section.isVisible !== false,
      content: section.content || {},
    }))
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

function buildSectionDiffSummary(draftSections, publishedSections) {
  const draftMap = new Map(draftSections.map((section) => [section.sectionKey, section]));
  const publishedMap = new Map(
    publishedSections.map((section) => [section.sectionKey, section])
  );

  const added = [];
  const removed = [];
  const changed = [];

  for (const [key, draft] of draftMap.entries()) {
    const live = publishedMap.get(key);
    if (!live) {
      added.push(key);
      continue;
    }

    const contentChanged =
      JSON.stringify(draft.content || {}) !== JSON.stringify(live.content || {});

    if (
      draft.orderIndex !== live.orderIndex ||
      draft.isVisible !== live.isVisible ||
      draft.sectionType !== live.sectionType ||
      contentChanged
    ) {
      changed.push(key);
    }
  }

  for (const [key] of publishedMap.entries()) {
    if (!draftMap.has(key)) {
      removed.push(key);
    }
  }

  return {
    added,
    removed,
    changed,
  };
}

function validatePageDraft(page) {
  const errors = [];

  if (!page?.title || !String(page.title).trim()) {
    errors.push('Page title is required.');
  }

  if (!Array.isArray(page?.sections) || !page.sections.length) {
    errors.push('At least one section is required.');
    return errors;
  }

  const visibleSections = page.sections.filter((section) => section.isVisible !== false);
  if (!visibleSections.length) {
    errors.push('At least one section must be visible for publishing.');
  }

  const seenSectionKeys = new Set();
  const seenOrderIndexes = new Set();

  page.sections.forEach((section, index) => {
    const row = index + 1;
    const sectionKey = String(section.sectionKey || '').trim();
    const sectionType = String(section.sectionType || '').trim();
    const orderIndex = Number(section.orderIndex);

    if (!sectionKey) {
      errors.push(`Section #${row}: sectionKey is required.`);
    }

    if (sectionKey && seenSectionKeys.has(sectionKey)) {
      errors.push(`Section key '${sectionKey}' is duplicated.`);
    }

    if (sectionKey) {
      seenSectionKeys.add(sectionKey);
    }

    if (!sectionType) {
      errors.push(`Section '${sectionKey || `#${row}`}': sectionType is required.`);
    }

    if (!Number.isInteger(orderIndex) || orderIndex < 1) {
      errors.push(`Section '${sectionKey || `#${row}`}': orderIndex must be a positive integer.`);
    }

    if (Number.isInteger(orderIndex) && seenOrderIndexes.has(orderIndex)) {
      errors.push(`Section order index '${orderIndex}' is duplicated.`);
    }

    if (Number.isInteger(orderIndex)) {
      seenOrderIndexes.add(orderIndex);
    }

    const content = section.content?.content;
    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      errors.push(`Section '${sectionKey || `#${row}`}': content must be a JSON object.`);
    }
  });

  return errors;
}

export async function getTenantBySlug(slug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return null;
  try {
    return await prisma.tenant.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export const getSiteData = cache(async (slug = DEFAULT_TENANT_SLUG) => {
  if (!hasDatabaseUrl) return null;
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      include: {
        siteSettings: true,
        navigationItems: {
          where: { isVisible: true },
          orderBy: { orderIndex: 'asc' },
        },
        footerItems: {
          where: { isVisible: true },
          orderBy: [{ columnKey: 'asc' }, { orderIndex: 'asc' }],
        },
      },
    });

    return tenant;
  } catch {
    return null;
  }
});

export async function getSiteContactSettings(slug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return null;

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      select: {
        siteSettings: {
          select: {
            contactEmail: true,
            contactPhone: true,
            contactAddress: true,
            facebookUrl: true,
            instagramUrl: true,
            twitterUrl: true,
            whatsappUrl: true,
          },
        },
      },
    });

    return tenant?.siteSettings || null;
  } catch {
    return null;
  }
}

export async function getPages(slug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return [];
  try {
    return await prisma.page.findMany({
      where: { tenant: { slug } },
      include: {
        publishedSnapshot: {
          select: {
            publishedAt: true,
          },
        },
      },
      orderBy: { slug: 'asc' },
    });
  } catch {
    return [];
  }
}

export const getPageSeo = cache(async (
  pageSlug,
  tenantSlug = DEFAULT_TENANT_SLUG,
  options = { preview: false }
) => {
  if (!hasDatabaseUrl) return null;
  try {
    if (options?.preview) {
      return await prisma.page.findFirst({
        where: {
          slug: pageSlug,
          tenant: {
            slug: tenantSlug,
          },
        },
        select: {
          title: true,
          seoTitle: true,
          seoDescription: true,
        },
      });
    }

    const page = await prisma.page.findFirst({
      where: {
        slug: pageSlug,
        tenant: {
          slug: tenantSlug,
        },
      },
      select: {
        title: true,
        seoTitle: true,
        seoDescription: true,
        publishedSnapshot: {
          select: {
            title: true,
            seoTitle: true,
            seoDescription: true,
          },
        },
      },
    });

    if (!page) return null;

    if (page.publishedSnapshot) {
      return {
        title: page.publishedSnapshot.title || page.title,
        seoTitle: page.publishedSnapshot.seoTitle || page.seoTitle,
        seoDescription: page.publishedSnapshot.seoDescription || page.seoDescription,
      };
    }

    return {
      title: page.title,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
    };
  } catch {
    return null;
  }
});

export async function getPageWithContent(pageSlug, tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return null;
  try {
    return await prisma.page.findFirst({
      where: {
        slug: pageSlug,
        tenant: {
          slug: tenantSlug,
        },
      },
      include: {
        sections: {
          where: { isVisible: true },
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export const getPublicPageWithContent = cache(async (
  pageSlug,
  tenantSlug = DEFAULT_TENANT_SLUG,
  options = { preview: false }
) => {
  if (!hasDatabaseUrl) return null;

  if (options?.preview) {
    return getPageWithContent(pageSlug, tenantSlug);
  }

  try {
    const page = await prisma.page.findFirst({
      where: {
        slug: pageSlug,
        tenant: {
          slug: tenantSlug,
        },
      },
      include: {
        publishedSnapshot: true,
      },
    });

    if (!page) return null;

    if (page.publishedSnapshot) {
      return {
        id: page.id,
        slug: page.slug,
        title: page.publishedSnapshot.title || page.title,
        seoTitle: page.publishedSnapshot.seoTitle || page.seoTitle,
        seoDescription: page.publishedSnapshot.seoDescription || page.seoDescription,
        sections: mapSnapshotSectionsToPageShape(page.publishedSnapshot.sections || []),
      };
    }

    return await getPageWithContent(pageSlug, tenantSlug);
  } catch {
    return null;
  }
});

export async function getPageByIdWithContent(pageId, tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return null;
  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: {
          slug: tenantSlug,
        },
      },
      include: {
        publishedSnapshot: true,
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });

    if (!page) return null;

    const hasInsertedSections = await ensureExpectedAboutSections(page);
    if (!hasInsertedSections) {
      return page;
    }

    return await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: {
          slug: tenantSlug,
        },
      },
      include: {
        publishedSnapshot: true,
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getPagePublishValidation(pageId, tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) {
    return {
      ok: false,
      errors: ['DATABASE_URL is not configured.'],
    };
  }

  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: { slug: tenantSlug },
      },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });

    if (!page) {
      return {
        ok: false,
        errors: ['Page not found.'],
      };
    }

    const errors = validatePageDraft(page);
    return {
      ok: errors.length === 0,
      errors,
    };
  } catch {
    return {
      ok: false,
      errors: ['Failed to validate page draft.'],
    };
  }
}

export async function getPagePublishDiff(pageId, tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return null;

  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: { slug: tenantSlug },
      },
      include: {
        publishedSnapshot: true,
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });

    if (!page) return null;

    const draft = {
    title: page.title,
    seoTitle: page.seoTitle || null,
    seoDescription: page.seoDescription || null,
    sections: normalizeSectionsForDiff(
      page.sections.map((section) => ({
        sectionKey: section.sectionKey,
        sectionType: section.sectionType,
        orderIndex: section.orderIndex,
        isVisible: section.isVisible,
        content: section.content?.content || {},
      }))
    ),
  };

  if (!page.publishedSnapshot) {
    return {
      hasChanges: true,
      metaChanges: ['No published version exists yet.'],
      sectionChanges: ['All current sections will be included in first publication.'],
      summary: {
        added: draft.sections.length,
        removed: 0,
        changed: 0,
      },
    };
  }

  const live = {
    title: page.publishedSnapshot.title || null,
    seoTitle: page.publishedSnapshot.seoTitle || null,
    seoDescription: page.publishedSnapshot.seoDescription || null,
    sections: normalizeSectionsForDiff(page.publishedSnapshot.sections || []),
  };

  const metaChanges = [];
  if (draft.title !== live.title) {
    metaChanges.push('Title changed');
  }
  if ((draft.seoTitle || null) !== (live.seoTitle || null)) {
    metaChanges.push('SEO title changed');
  }
  if ((draft.seoDescription || null) !== (live.seoDescription || null)) {
    metaChanges.push('SEO description changed');
  }

  const sectionSummary = buildSectionDiffSummary(draft.sections, live.sections);
  const sectionChanges = [
    ...sectionSummary.added.map((key) => `Section added: ${key}`),
    ...sectionSummary.removed.map((key) => `Section removed: ${key}`),
    ...sectionSummary.changed.map((key) => `Section updated: ${key}`),
  ];

  return {
    hasChanges: Boolean(metaChanges.length || sectionChanges.length),
    metaChanges,
    sectionChanges,
    summary: {
      added: sectionSummary.added.length,
      removed: sectionSummary.removed.length,
      changed: sectionSummary.changed.length,
    },
  };
  } catch {
    return null;
  }
}

export async function publishPageById(
  tenantSlug,
  pageId,
  options = { actorEmail: null, note: null }
) {
  if (!hasDatabaseUrl) return null;

  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: { slug: tenantSlug },
      },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            content: true,
          },
        },
      },
    });

    if (!page) return null;

    const serializedSections = normalizeSectionsForSnapshot(page.sections);

    const snapshot = await prisma.publishedPageSnapshot.upsert({
      where: { pageId: page.id },
      update: {
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        sections: serializedSections,
        publishedAt: new Date(),
      },
      create: {
        pageId: page.id,
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        sections: serializedSections,
      },
    });

    await prisma.page.update({
      where: { id: page.id },
      data: {
        lastPublishedAt: snapshot.publishedAt,
      },
    });

    await prisma.publishedPageRevision.create({
      data: {
        pageId: page.id,
        actionType: 'publish',
        actorEmail: options?.actorEmail || null,
        note: options?.note || null,
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        sections: serializedSections,
        publishedAt: snapshot.publishedAt,
      },
    });

    return {
      ...snapshot,
      pageSlug: page.slug,
    };
  } catch {
    return null;
  }
}

export async function getPagePublishHistory(pageId, tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return [];

  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: { slug: tenantSlug },
      },
      select: { id: true },
    });

    if (!page) return [];

    return await prisma.publishedPageRevision.findMany({
      where: { pageId: page.id },
      orderBy: { publishedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        actionType: true,
        actorEmail: true,
        note: true,
        sourceRevisionId: true,
        publishedAt: true,
        createdAt: true,
        title: true,
      },
    });
  } catch {
    return [];
  }
}

export async function rollbackPageToRevision(
  tenantSlug,
  pageId,
  revisionId,
  options = { actorEmail: null, note: null }
) {
  if (!hasDatabaseUrl) return null;

  try {
    const page = await prisma.page.findFirst({
      where: {
        id: pageId,
        tenant: { slug: tenantSlug },
      },
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });

    if (!page) return null;

    const revision = await prisma.publishedPageRevision.findFirst({
      where: {
        id: revisionId,
        pageId: page.id,
      },
    });

    if (!revision) return null;

    const revisionSections = Array.isArray(revision.sections) ? revision.sections : [];
    const normalized = revisionSections
      .map((section, index) => ({
        sectionKey: section.sectionKey || `section-${index + 1}`,
        sectionType: section.sectionType || 'Custom',
        orderIndex: Number(section.orderIndex) || index + 1,
        isVisible: section.isVisible !== false,
        content: section.content || {},
      }))
      .sort((a, b) => a.orderIndex - b.orderIndex);

    const now = new Date();

    await prisma.$transaction(async (tx) => {
      await tx.page.update({
        where: { id: page.id },
        data: {
          title: revision.title,
          seoTitle: revision.seoTitle,
          seoDescription: revision.seoDescription,
          lastPublishedAt: now,
        },
      });

      await tx.pageSection.deleteMany({
        where: { pageId: page.id },
      });

      for (const section of normalized) {
        const created = await tx.pageSection.create({
          data: {
            pageId: page.id,
            sectionKey: section.sectionKey,
            sectionType: section.sectionType,
            orderIndex: section.orderIndex,
            isVisible: section.isVisible,
          },
        });

        await tx.sectionContent.create({
          data: {
            pageSectionId: created.id,
            content: section.content,
          },
        });
      }

      await tx.publishedPageSnapshot.upsert({
        where: { pageId: page.id },
        update: {
          title: revision.title,
          seoTitle: revision.seoTitle,
          seoDescription: revision.seoDescription,
          sections: normalized,
          publishedAt: now,
        },
        create: {
          pageId: page.id,
          title: revision.title,
          seoTitle: revision.seoTitle,
          seoDescription: revision.seoDescription,
          sections: normalized,
          publishedAt: now,
        },
      });

      await tx.publishedPageRevision.create({
        data: {
          pageId: page.id,
          actionType: 'rollback',
          actorEmail: options?.actorEmail || null,
          note: options?.note || `Rollback to revision ${revision.id}`,
          sourceRevisionId: revision.id,
          title: revision.title,
          seoTitle: revision.seoTitle,
          seoDescription: revision.seoDescription,
          sections: normalized,
          publishedAt: now,
        },
      });
    });

    return {
      ok: true,
      publishedAt: now,
      pageSlug: page.slug,
    };
  } catch {
    return null;
  }
}

export async function updateSiteSettings(tenantSlug, payload) {
  if (!hasDatabaseUrl) return null;
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return null;

  return prisma.siteSettings.upsert({
    where: { tenantId: tenant.id },
    update: payload,
    create: {
      tenantId: tenant.id,
      brandName: payload.brandName || tenant.name,
      ...payload,
    },
  });
}

export async function createPage(tenantSlug, payload) {
  if (!hasDatabaseUrl) return null;
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return null;

  return prisma.page.create({
    data: {
      tenantId: tenant.id,
      slug: payload.slug,
      title: payload.title,
      seoTitle: payload.seoTitle || payload.title,
      seoDescription: payload.seoDescription || null,
    },
  });
}

export async function updatePage(tenantSlug, pageSlug, payload) {
  if (!hasDatabaseUrl) return null;
  const page = await prisma.page.findFirst({
    where: {
      slug: pageSlug,
      tenant: { slug: tenantSlug },
    },
  });

  if (!page) return null;

  return prisma.page.update({
    where: { id: page.id },
    data: payload,
  });
}

export async function upsertPageSections(tenantSlug, pageSlug, sections) {
  if (!hasDatabaseUrl) return null;
  const page = await prisma.page.findFirst({
    where: {
      slug: pageSlug,
      tenant: { slug: tenantSlug },
    },
  });

  if (!page) return null;

  return prisma.$transaction(async (tx) => {
    const orderedSections = sections
      .filter((section) => section?.sectionKey)
      .map((section, index) => ({
        section,
        parsedOrderIndex: Number(section.orderIndex) || index + 1,
        originalIndex: index,
      }))
      .sort((a, b) => {
        if (a.parsedOrderIndex !== b.parsedOrderIndex) {
          return a.parsedOrderIndex - b.parsedOrderIndex;
        }
        return a.originalIndex - b.originalIndex;
      });

    // Normalize to guaranteed-unique sequential order indexes.
    const normalized = orderedSections.map((item, index) => ({
      sectionKey: item.section.sectionKey,
      sectionType: item.section.sectionType,
      orderIndex: index + 1,
      isVisible: item.section.isVisible ?? true,
      content: item.section.content,
    }));

    const incomingKeys = normalized.map((section) => section.sectionKey);

    if (incomingKeys.length) {
      await tx.pageSection.deleteMany({
        where: {
          pageId: page.id,
          sectionKey: { notIn: incomingKeys },
        },
      });
    } else {
      await tx.pageSection.deleteMany({ where: { pageId: page.id } });
      return [];
    }

    // Move existing order indexes out of the way first so upserts do not
    // temporarily collide with the unique (pageId, orderIndex) constraint.
    await tx.pageSection.updateMany({
      where: { pageId: page.id },
      data: {
        orderIndex: {
          increment: 1000,
        },
      },
    });

    const results = [];

    for (const section of normalized) {
      const upserted = await tx.pageSection.upsert({
        where: {
          pageId_sectionKey: {
            pageId: page.id,
            sectionKey: section.sectionKey,
          },
        },
        update: {
          sectionType: section.sectionType,
          orderIndex: section.orderIndex,
          isVisible: section.isVisible,
        },
        create: {
          pageId: page.id,
          sectionKey: section.sectionKey,
          sectionType: section.sectionType,
          orderIndex: section.orderIndex,
          isVisible: section.isVisible,
        },
      });

      if (section.content !== undefined) {
        await tx.sectionContent.upsert({
          where: { pageSectionId: upserted.id },
          update: { content: section.content },
          create: {
            pageSectionId: upserted.id,
            content: section.content,
          },
        });
      }

      results.push(upserted);
    }

    return results;
  }, { timeout: 30000, maxWait: 10000 });
}

export async function replaceNavigationItems(tenantSlug, items) {
  if (!hasDatabaseUrl) return null;
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return null;

  await prisma.navigationItem.deleteMany({ where: { tenantId: tenant.id } });

  if (items.length) {
    await prisma.navigationItem.createMany({
      data: items.map((item, index) => ({
        tenantId: tenant.id,
        label: item.label,
        href: item.href,
        orderIndex: item.orderIndex ?? index + 1,
        isVisible: item.isVisible ?? true,
      })),
    });
  }

  return prisma.navigationItem.findMany({
    where: { tenantId: tenant.id, isVisible: true },
    orderBy: { orderIndex: 'asc' },
  });
}

export async function replaceFooterItems(tenantSlug, items) {
  if (!hasDatabaseUrl) return null;
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return null;

  await prisma.footerItem.deleteMany({ where: { tenantId: tenant.id } });

  if (items.length) {
    await prisma.footerItem.createMany({
      data: items.map((item, index) => ({
        tenantId: tenant.id,
        columnKey: item.columnKey,
        label: item.label,
        href: item.href,
        orderIndex: item.orderIndex ?? index + 1,
        isVisible: item.isVisible ?? true,
      })),
    });
  }

  return prisma.footerItem.findMany({
    where: { tenantId: tenant.id, isVisible: true },
    orderBy: [{ columnKey: 'asc' }, { orderIndex: 'asc' }],
  });
}

export async function getMediaAssets(tenantSlug = DEFAULT_TENANT_SLUG) {
  if (!hasDatabaseUrl) return [];
  try {
    return await prisma.mediaAsset.findMany({
      where: {
        tenant: { slug: tenantSlug },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export async function createMediaAsset(tenantSlug, payload) {
  if (!hasDatabaseUrl) return null;
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return null;

  return prisma.mediaAsset.create({
    data: {
      tenantId: tenant.id,
      name: payload.name,
      url: payload.url,
      type: payload.type,
      mimeType: payload.mimeType || null,
      sizeBytes: payload.sizeBytes || null,
      altText: payload.altText || null,
    },
  });
}

export async function updateMediaAsset(tenantSlug, mediaId, payload) {
  if (!hasDatabaseUrl) return null;
  const media = await prisma.mediaAsset.findFirst({
    where: {
      id: mediaId,
      tenant: { slug: tenantSlug },
    },
  });

  if (!media) return null;

  return prisma.mediaAsset.update({
    where: { id: media.id },
    data: payload,
  });
}

export async function deleteMediaAsset(tenantSlug, mediaId) {
  if (!hasDatabaseUrl) return null;
  const media = await prisma.mediaAsset.findFirst({
    where: {
      id: mediaId,
      tenant: { slug: tenantSlug },
    },
  });

  if (!media) return null;

  await prisma.mediaAsset.delete({ where: { id: media.id } });
  return { id: media.id };
}
