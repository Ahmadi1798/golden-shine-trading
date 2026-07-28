import { NextResponse } from 'next/server';

export function proxy() {
  const response = NextResponse.next();

  const isProduction = globalThis.process?.env?.NODE_ENV === 'production';

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  response.headers.set('X-Content-Type-Options', 'nosniff');

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  if (isProduction) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
    "connect-src 'self' https:",
    "frame-src 'self' https://www.google.com https://maps.google.com https://maps.googleapis.com",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "base-uri 'self'",
  ];
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
