import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();

// Read all S3/R2 credentials from environment (set in .env).
const {
  S3_ENDPOINT,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_PUBLIC_BASE_URL,
  S3_BUCKET_NAME,
} = process.env;

// Local source of the original media files (MinIO or any HTTP endpoint).
const MINIO_BASE_URL = process.env.MINIO_BASE_URL || 'http://127.0.0.1:9000/golden-shine-media';

const OLD_URL_PREFIX = process.env.MEDIA_OLD_URL_PREFIX || 'http://localhost:3000/media/';

if (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY || !S3_PUBLIC_BASE_URL || !S3_BUCKET_NAME) {
  console.error(
    'Missing S3/R2 env vars. Required: S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_PUBLIC_BASE_URL, S3_BUCKET_NAME.'
  );
  process.exit(1);
}

const R2_PUBLIC_BASE = S3_PUBLIC_BASE_URL.replace(/\/$/, '');

const r2 = new S3Client({
  region: 'auto',
  endpoint: S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
});

function replaceUrl(value) {
  if (typeof value === 'string') {
    return value.startsWith(OLD_URL_PREFIX)
      ? `${R2_PUBLIC_BASE}/${value.slice(OLD_URL_PREFIX.length)}`
      : value;
  }
  if (Array.isArray(value)) return value.map(replaceUrl);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = replaceUrl(v);
    return out;
  }
  return value;
}

async function main() {
  const media = await prisma.mediaAsset.findMany();
  console.log(`Migrating ${media.length} media files…`);

  for (const asset of media) {
    const url = asset.url || '';
    if (!url.startsWith(OLD_URL_PREFIX)) continue;
    const key = url.slice(OLD_URL_PREFIX.length);

    const res = await fetch(`${MINIO_BASE_URL}/${key}`);
    if (!res.ok) {
      console.log(`  ✗ ${asset.name}: source fetch failed (${res.status})`);
      continue;
    }
    const bytes = new Uint8Array(await res.arrayBuffer());

    await r2.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: bytes,
        ContentType: asset.mimeType || 'application/octet-stream',
      })
    );

    const newUrl = `${R2_PUBLIC_BASE}/${key}`;
    await prisma.mediaAsset.update({ where: { id: asset.id }, data: { url: newUrl } });
    console.log(`  ✓ ${asset.name}`);
  }

  const sectionContents = await prisma.sectionContent.findMany();
  for (const sc of sectionContents) {
    if (!sc.content) continue;
    const updated = replaceUrl(sc.content);
    if (JSON.stringify(updated) !== JSON.stringify(sc.content)) {
      await prisma.sectionContent.update({ where: { id: sc.id }, data: { content: updated } });
    }
  }

  const snapshots = await prisma.publishedPageSnapshot.findMany();
  for (const s of snapshots) {
    if (!s.sections) continue;
    const updated = replaceUrl(s.sections);
    if (JSON.stringify(updated) !== JSON.stringify(s.sections)) {
      await prisma.publishedPageSnapshot.update({ where: { id: s.id }, data: { sections: updated } });
    }
  }

  const revisions = await prisma.publishedPageRevision.findMany();
  for (const r of revisions) {
    if (!r.sections) continue;
    const updated = replaceUrl(r.sections);
    if (JSON.stringify(updated) !== JSON.stringify(r.sections)) {
      await prisma.publishedPageRevision.update({ where: { id: r.id }, data: { sections: updated } });
    }
  }

  const settings = await prisma.siteSettings.findMany();
  for (const s of settings) {
    if (s.logoUrl && s.logoUrl.startsWith(OLD_URL_PREFIX)) {
      const key = s.logoUrl.slice(OLD_URL_PREFIX.length);
      await prisma.siteSettings.update({ where: { id: s.id }, data: { logoUrl: `${R2_PUBLIC_BASE}/${key}` } });
    }
  }

  console.log('\n✅ Media migration complete.');
}

main()
  .catch((e) => {
    console.error('❌', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
