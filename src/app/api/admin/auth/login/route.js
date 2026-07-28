import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  validateAdminCredentials,
} from '../../../../../lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');

    if (!(await validateAdminCredentials(email, password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = createAdminSessionToken(email);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed', details: String(error) },
      { status: 500 }
    );
  }
}
