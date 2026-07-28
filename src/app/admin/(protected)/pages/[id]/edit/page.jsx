import AdminPageEditContent from '../../../../../../Components/Admin/AdminPageEditContent';
import { getPageByIdWithContent } from '../../../../../../lib/content';

export default async function AdminPageEditPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const page = await getPageByIdWithContent(resolvedParams?.id);

  return <AdminPageEditContent page={page} />;
}
