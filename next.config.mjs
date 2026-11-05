/** @type {import('next').NextConfig} */
const nextConfig = {
  // All imagery is now self-hosted in /public/images. No remote patterns needed.
  async headers() {
    // The hero films loop for as long as a visitor stays: keep them in the browser rather than fetch them again.
    return [{ source: '/video/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] }];
  },
  async redirects() {
    // One address per house; the older division routes point at their house.
    return [
      { source: '/lifestyle', destination: '/furnishings', permanent: true },
      { source: '/leadership', destination: '/institute', permanent: true },
      { source: '/publishing', destination: '/press', permanent: true },
      { source: '/broadcasting', destination: '/manor', permanent: true },
    ];
  },
};

export default nextConfig;
