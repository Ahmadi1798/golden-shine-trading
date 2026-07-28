'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';

const AdminLogoutButton = () => {
  const router = useRouter();
  const { language } = useLanguage();

  const copyByLanguage = {
    en: { logout: 'Logout' },
    fa: { logout: 'خروج' },
    ps: { logout: 'وتل' },
  };

  const copy = copyByLanguage[language] || copyByLanguage.en;

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', {
      method: 'POST',
    });
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
    >
      {copy.logout}
    </button>
  );
};

export default AdminLogoutButton;
