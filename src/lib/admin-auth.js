import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

export const ADMIN_SESSION_COOKIE = 'agency_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const RESET_TOKEN_TTL_SECONDS = 60 * 15;
const HASH_KEY_LEN = 64;
const HASH_SALT_LEN = 16;

const DEFAULT_TENANT_SLUG = 'karfamsoft-default';

function getAdminEmail() {
  return globalThis.process?.env?.ADMIN_EMAIL || 'admin@karfamsoft.local';
}

function getAdminPassword() {
  return globalThis.process?.env?.ADMIN_PASSWORD || 'admin1234';
}

function getRecoveryCode() {
  return globalThis.process?.env?.ADMIN_RECOVERY_CODE || '';
}

function getSessionSecret() {
  return (
    globalThis.process?.env?.ADMIN_SESSION_SECRET ||
    'dev-insecure-admin-secret-change-me'
  );
}

function base64urlEncode(input) {
  return globalThis.Buffer.from(input).toString('base64url');
}

function base64urlDecode(input) {
  return globalThis.Buffer.from(input, 'base64url').toString('utf8');
}

function sign(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function hashPassword(password) {
  const salt = crypto.randomBytes(HASH_SALT_LEN).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, HASH_KEY_LEN);
  return `${salt}:${derivedKey.toString('hex')}`;
}

function verifyHash(password, stored) {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, HASH_KEY_LEN);
  return derivedKey.toString('hex') === key;
}

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

async function getTenantSettings() {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { slug: DEFAULT_TENANT_SLUG },
      include: { siteSettings: true },
    });
    return tenant?.siteSettings || null;
  } catch {
    return null;
  }
}

export async function validateAdminCredentials(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedAdminEmail = String(getAdminEmail() || '').trim().toLowerCase();

  if (normalizedEmail !== normalizedAdminEmail) return false;

  // Check DB-stored hash first
  const settings = await getTenantSettings();
  if (settings?.adminPasswordHash) {
    return verifyHash(password, settings.adminPasswordHash);
  }

  // Fall back to env var (backward compat)
  const normalizedPassword = String(password || '');
  const normalizedAdminPassword = String(getAdminPassword() || '');
  return normalizedPassword === normalizedAdminPassword;
}

export async function changeAdminPassword(currentPassword, newPassword) {
  const settings = await getTenantSettings();
  if (!settings) return { ok: false, error: 'Site settings not found' };

  // Verify current password
  if (settings.adminPasswordHash) {
    if (!verifyHash(currentPassword, settings.adminPasswordHash)) {
      return { ok: false, error: 'Current password is incorrect' };
    }
  } else {
    const envPassword = String(getAdminPassword() || '');
    if (currentPassword !== envPassword) {
      return { ok: false, error: 'Current password is incorrect' };
    }
  }

  const hashed = hashPassword(newPassword);
  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: { adminPasswordHash: hashed },
  });

  return { ok: true };
}

export async function requestPasswordReset(email, recoveryCode) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedAdminEmail = String(getAdminEmail() || '').trim().toLowerCase();

  if (normalizedEmail !== normalizedAdminEmail) return { ok: false, error: 'Email not found' };

  const code = String(recoveryCode || '').trim();
  const expectedCode = String(getRecoveryCode() || '').trim();
  if (!expectedCode) return { ok: false, error: 'Recovery code not configured on this server' };
  if (code !== expectedCode) return { ok: false, error: 'Invalid recovery code' };

  const settings = await getTenantSettings();
  if (!settings) return { ok: false, error: 'Site settings not found' };

  const token = generateResetToken();
  const expires = new Date(Date.now() + RESET_TOKEN_TTL_SECONDS * 1000);

  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: {
      adminPasswordResetToken: token,
      adminPasswordResetExpires: expires,
    },
  });

  return { ok: true, token };
}

export async function resetPasswordWithToken(token, newPassword) {
  if (!token) return { ok: false, error: 'Reset token is required' };

  const settings = await getTenantSettings();
  if (!settings) return { ok: false, error: 'Site settings not found' };
  if (!settings.adminPasswordResetToken) return { ok: false, error: 'No reset requested' };
  if (settings.adminPasswordResetToken !== token) return { ok: false, error: 'Invalid reset token' };
  if (!settings.adminPasswordResetExpires || new Date() > settings.adminPasswordResetExpires) {
    return { ok: false, error: 'Reset token has expired' };
  }

  const hashed = hashPassword(newPassword);
  await prisma.siteSettings.update({
    where: { id: settings.id },
    data: {
      adminPasswordHash: hashed,
      adminPasswordResetToken: null,
      adminPasswordResetExpires: null,
    },
  });

  return { ok: true };
}

export function createAdminSessionToken(email) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    email,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };

  const payloadString = JSON.stringify(payload);
  const encoded = base64urlEncode(payloadString);
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionToken(token) {
  if (!token || !token.includes('.')) return null;

  const [encoded, signature] = token.split('.');
  const expected = sign(encoded);

  if (signature !== expected) return null;

  try {
    const payload = JSON.parse(base64urlDecode(encoded));
    const now = Math.floor(Date.now() / 1000);
    if (!payload?.exp || payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function getAdminSessionFromRequest(request) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: globalThis.process?.env?.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function getClearedAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: globalThis.process?.env?.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  };
}
