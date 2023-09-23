/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['store-gg-server-production.up.railway.app', 'localhost'], // <== Domain name
  },
};

module.exports = nextConfig;
