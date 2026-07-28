import AdminPagesListContent from '../../../../Components/Admin/AdminPagesListContent';
import { getPages } from '../../../../lib/content';

export default async function AdminPagesListPage() {
  const pages = await getPages();
  const publishedCount = pages.filter((page) => page.publishedSnapshot?.publishedAt).length;

  return <AdminPagesListContent pages={pages} publishedCount={publishedCount} />;
}
