import { NextResponse } from 'next/server';
import { requestPasswordReset } from '../../../../../lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();
    const recoveryCode = String(body?.recoveryCode || '').trim();

    if (!email || !recoveryCode) {
      return NextResponse.json({ error: 'Email and recovery code are required' }, { status: 400 });
    }

    const result = await requestPasswordReset(email, recoveryCode);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true, token: result.token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    );
  }
}
