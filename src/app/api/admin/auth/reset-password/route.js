import { NextResponse } from 'next/server';
import { resetPasswordWithToken } from '../../../../../lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const token = String(body?.token || '');
    const newPassword = String(body?.newPassword || '');

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const result = await resetPasswordWithToken(token, newPassword);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset password', details: String(error) },
      { status: 500 }
    );
  }
}
