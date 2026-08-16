import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function getRequiredEnv(key) {
  const value = globalThis.process?.env?.[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

function getUploadConfig() {
  return {
    bucket: getRequiredEnv('S3_BUCKET_NAME'),
    region: globalThis.process?.env?.S3_REGION || 'auto',
    endpoint: globalThis.process?.env?.S3_ENDPOINT || undefined,
    accessKeyId: getRequiredEnv('S3_ACCESS_KEY_ID'),
    secretAccessKey: getRequiredEnv('S3_SECRET_ACCESS_KEY'),
    publicBaseUrl: globalThis.process?.env?.S3_PUBLIC_BASE_URL || undefined,
    keyPrefix: globalThis.process?.env?.S3_UPLOAD_PREFIX || 'media',
  };
}

function sanitizeFilename(name) {
  return String(name || 'file')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildObjectUrl({ bucket, region, endpoint, publicBaseUrl, key }) {
  if (publicBaseUrl) {
    return `${publicBaseUrl.replace(/\/$/, '')}/${key}`;
  }

  if (endpoint) {
    return `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function uploadFileToS3(file) {
  const config = getUploadConfig();
  const filename = sanitizeFilename(file?.name || 'file');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const randomPart = Math.random().toString(36).slice(2, 10);
  const key = `${config.keyPrefix}/${stamp}-${randomPart}-${filename}`;

  const client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: Boolean(config.endpoint),
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  const bytes = new Uint8Array(await file.arrayBuffer());

  // Cloudflare R2 doesn't support object-level ACLs by default. Make the
  // object public either via a public bucket / custom domain (S3_PUBLIC_BASE_URL)
  // or by enabling ACLs and setting S3_ACL="public-read".
  const acl = globalThis.process?.env?.S3_ACL || undefined;

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type || 'application/octet-stream',
      ...(acl ? { ACL: acl } : {}),
    })
  );

  return {
    key,
    bucket: config.bucket,
    url: buildObjectUrl({
      bucket: config.bucket,
      region: config.region,
      endpoint: config.endpoint,
      publicBaseUrl: config.publicBaseUrl,
      key,
    }),
  };
}
