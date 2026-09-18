import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/resources',
        destination: '/news',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
