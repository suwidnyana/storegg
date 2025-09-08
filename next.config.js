/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store-gg-server-production.up.railway.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost', // biasanya pakai http untuk lokal
      },
    ],
  },
};

module.exports = nextConfig;
