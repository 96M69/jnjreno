/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 1080, 1920],
    imageSizes: [256, 640],
  },
};

module.exports = nextConfig;
