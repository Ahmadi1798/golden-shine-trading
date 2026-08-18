import { NextResponse } from 'next/server';
import {
  getAdminSessionFromRequest,
  changeAdminEmail,
} from '../../../../../lib/admin-auth';

export async function POST(request) {
  try {
    const session = getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = String(body?.currentPassword || '');
    const newEmail = String(body?.newEmail || '');

    if (!currentPassword || !newEmail) {
      return NextResponse.json({ error: 'Current password and new email are required' }, { status: 400 });
    }

    const result = await changeAdminEmail(currentPassword, newEmail);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to change email', details: String(error) },
      { status: 500 }
    );
  }
}
