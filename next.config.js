/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ['store-gg-server-production.up.railway.app', 'localhost'], // <== Domain name
  },
  nextConfig,
};
