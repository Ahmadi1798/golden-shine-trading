import AdminProtectedHeader from '../../../Components/Admin/AdminProtectedHeader';
import { requireAdminPageSession } from '../../../lib/admin-guard';

export default async function AdminProtectedLayout({ children }) {
  const session = await requireAdminPageSession();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0b1121]">
      <AdminProtectedHeader email={session.email} />

      <section className="mx-auto max-w-7xl px-4 py-8">{children}</section>
    </main>
  );
}
