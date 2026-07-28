import MediaManager from '../../../../Components/Admin/MediaManager';
import { getMediaAssets } from '../../../../lib/content';

export default async function AdminMediaPage() {
  const mediaAssets = await getMediaAssets();

  return <MediaManager initialMediaAssets={mediaAssets} />;
}
