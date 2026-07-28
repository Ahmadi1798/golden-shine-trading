import ThemeEditor from '../../../../Components/Admin/ThemeEditor';
import { getSiteData } from '../../../../lib/content';

export default async function AdminThemePage() {
  const data = await getSiteData();

  return <ThemeEditor siteSettings={data?.siteSettings || null} />;
}
