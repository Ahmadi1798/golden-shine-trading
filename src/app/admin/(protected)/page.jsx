import AdminDashboardContent from '../../../Components/Admin/AdminDashboardContent';
import { getMediaAssets, getPages, getSiteData } from '../../../lib/content';

export default async function AdminDashboardPage() {
  const [siteData, pages, mediaAssets] = await Promise.all([
    getSiteData(),
    getPages(),
    getMediaAssets(),
  ]);

  return (
    <AdminDashboardContent
      siteName={siteData?.name}
      pagesCount={pages.length}
      navCount={siteData?.navigationItems?.length || 0}
      footerCount={siteData?.footerItems?.length || 0}
      mediaCount={mediaAssets.length}
    />
  );
}
