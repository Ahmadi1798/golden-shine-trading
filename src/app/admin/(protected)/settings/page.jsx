import SettingsEditor from '../../../../Components/Admin/SettingsEditor';
import ChangePasswordForm from '../../../../Components/Admin/ChangePasswordForm';
import ChangeEmailForm from '../../../../Components/Admin/ChangeEmailForm';
import SmtpSettingsForm from '../../../../Components/Admin/SmtpSettingsForm';
import { getSiteData } from '../../../../lib/content';

export default async function AdminSettingsPage() {
  const data = await getSiteData();

  return (
    <>
      <SettingsEditor siteSettings={data?.siteSettings || null} />
      <div className="mt-5">
        <SmtpSettingsForm siteSettings={data?.siteSettings || null} />
      </div>
      <div className="mt-5">
        <ChangeEmailForm />
      </div>
      <div className="mt-5">
        <ChangePasswordForm />
      </div>
    </>
  );
}
