/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'netflix-clone-keeshigan-images.s3.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
