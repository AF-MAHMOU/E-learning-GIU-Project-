/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbopack: false, // Disable Turbopack
  },
};

module.exports = nextConfig;
