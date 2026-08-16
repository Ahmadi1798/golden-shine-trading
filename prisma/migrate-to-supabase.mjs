import { PrismaClient } from '@prisma/client';

// Local development database (source). Set LOCAL_DATABASE_URL to your local Postgres URL.
const LOCAL_DATABASE_URL = process.env.LOCAL_DATABASE_URL;

// Supabase session-mode pooler (target) — read from .env DIRECT_URL.
const SUPABASE_DIRECT_URL = process.env.DIRECT_URL;

if (!LOCAL_DATABASE_URL) {
  console.error('ERROR: LOCAL_DATABASE_URL is not set. Set it to your local Postgres connection string.');
  process.exit(1);
}

if (!SUPABASE_DIRECT_URL || SUPABASE_DIRECT_URL.includes('[YOUR-PASSWORD]')) {
  console.error(
    'ERROR: DIRECT_URL is not set or still contains [YOUR-PASSWORD].\n' +
      'Replace [YOUR-PASSWORD] in .env with your real Supabase password, then re-run.'
  );
  process.exit(1);
}

const source = new PrismaClient({
  datasources: { db: { url: LOCAL_DATABASE_URL } },
});

const target = new PrismaClient({
  datasources: { db: { url: SUPABASE_DIRECT_URL } },
});

const log = (table, count) => console.log(`  ✓ ${table}: ${count} rows`);

async function main() {
  console.log('Connecting to local PostgreSQL…');
  await source.$connect();
  console.log('Connecting to Supabase…');
  await target.$connect();

  console.log('\nClearing existing Supabase data (tenant cascade)…');
  await target.tenant.deleteMany({});

  console.log('\nCopying data…');

  const tenants = await source.tenant.findMany();
  if (tenants.length) await target.tenant.createMany({ data: tenants });
  log('Tenant', tenants.length);

  const siteSettings = await source.siteSettings.findMany();
  if (siteSettings.length) await target.siteSettings.createMany({ data: siteSettings });
  log('SiteSettings', siteSettings.length);

  const pages = await source.page.findMany();
  if (pages.length) await target.page.createMany({ data: pages });
  log('Page', pages.length);

  const sections = await source.pageSection.findMany();
  if (sections.length) await target.pageSection.createMany({ data: sections });
  log('PageSection', sections.length);

  const sectionContents = await source.sectionContent.findMany();
  if (sectionContents.length) await target.sectionContent.createMany({ data: sectionContents });
  log('SectionContent', sectionContents.length);

  const snapshots = await source.publishedPageSnapshot.findMany();
  if (snapshots.length) await target.publishedPageSnapshot.createMany({ data: snapshots });
  log('PublishedPageSnapshot', snapshots.length);

  const revisions = await source.publishedPageRevision.findMany();
  if (revisions.length) await target.publishedPageRevision.createMany({ data: revisions });
  log('PublishedPageRevision', revisions.length);

  const mediaAssets = await source.mediaAsset.findMany();
  if (mediaAssets.length) await target.mediaAsset.createMany({ data: mediaAssets });
  log('MediaAsset', mediaAssets.length);

  const navItems = await source.navigationItem.findMany();
  if (navItems.length) await target.navigationItem.createMany({ data: navItems });
  log('NavigationItem', navItems.length);

  const footerItems = await source.footerItem.findMany();
  if (footerItems.length) await target.footerItem.createMany({ data: footerItems });
  log('FooterItem', footerItems.length);

  const subscribers = await source.newsletterSubscriber.findMany();
  if (subscribers.length) await target.newsletterSubscriber.createMany({ data: subscribers });
  log('NewsletterSubscriber', subscribers.length);

  console.log('\n✅ Migration complete. All local data copied to Supabase.');
}

main()
  .catch((error) => {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await source.$disconnect();
    await target.$disconnect();
  });
