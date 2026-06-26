import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  projectPhotos: f({
    'image/jpeg': { maxFileSize: '8MB', maxFileCount: 6 },
    'image/png':  { maxFileSize: '8MB', maxFileCount: 6 },
    'image/webp': { maxFileSize: '8MB', maxFileCount: 6 },
    'image/heic': { maxFileSize: '8MB', maxFileCount: 6 },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl })),
};
