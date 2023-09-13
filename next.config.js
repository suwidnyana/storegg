/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ['sangw.in', 'localhost', 'picsum.photos'], // <== Domain name
  },
  nextConfig,
};
