import { NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '../../../../lib/admin-auth';
import { uploadFileToS3 } from '../../../../lib/s3-upload';

export async function POST(request) {
  if (!getAdminSessionFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file.arrayBuffer !== 'function') {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const uploaded = await uploadFileToS3(file);

    return NextResponse.json({
      file: {
        name: file.name,
        type: file.type || 'application/octet-stream',
        sizeBytes: file.size || 0,
        url: uploaded.url,
        key: uploaded.key,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', details: String(error) },
      { status: 500 }
    );
  }
}
