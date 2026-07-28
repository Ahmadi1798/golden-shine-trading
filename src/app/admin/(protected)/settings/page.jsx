import SettingsEditor from '../../../../Components/Admin/SettingsEditor';
import ChangePasswordForm from '../../../../Components/Admin/ChangePasswordForm';
import { getSiteData } from '../../../../lib/content';

export default async function AdminSettingsPage() {
  const data = await getSiteData();

  return (
    <>
      <SettingsEditor siteSettings={data?.siteSettings || null} />
      <div className="mt-5">
        <ChangePasswordForm />
      </div>
    </>
  );
}
