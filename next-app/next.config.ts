/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // ✅ App Router 구조 사용 시 반드시 필요
  },
};

module.exports = nextConfig;
