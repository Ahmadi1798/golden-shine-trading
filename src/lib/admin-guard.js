import { redirect } from 'next/navigation';
import { getAdminSessionFromCookies } from './admin-auth';

export async function requireAdminPageSession() {
  const session = await getAdminSessionFromCookies();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}
