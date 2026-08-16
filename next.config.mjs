import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIA_PROXY_ENDPOINT = process.env.MEDIA_PROXY_ENDPOINT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    // Dev-only proxy for local S3 (MinIO). In production, media is served
    // directly from the S3-compatible provider (Cloudflare R2 public URL).
    if (!MEDIA_PROXY_ENDPOINT) return [];
    return [
      {
        source: '/media/:path*',
        destination: `${MEDIA_PROXY_ENDPOINT.replace(/\/$/, '')}/:path*`,
      },
    ];
  },
};

export default nextConfig;
