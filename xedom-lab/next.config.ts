import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
