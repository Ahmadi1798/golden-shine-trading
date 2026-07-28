const PreviewModeBanner = ({ enabled = false }) => {
  if (!enabled) return null;

  return (
    <div className="sticky top-0 z-50 border-b border-amber-300 bg-amber-100/95 px-4 py-2 text-center text-xs font-semibold tracking-wide text-amber-900 backdrop-blur dark:border-amber-700 dark:bg-amber-900/90 dark:text-amber-100">
      Preview Mode: You are viewing draft content visible only to admins.
    </div>
  );
};

export default PreviewModeBanner;
