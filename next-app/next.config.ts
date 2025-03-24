import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://46bemqujkp.us-east-1.awsapprunner.com/api/:path*', // Nest.js
        // destination: "https://your-app-runner-url.com/api/:path*", // App Runner의 API URL로 연결
      },
    ];
  },
};


export default nextConfig;
