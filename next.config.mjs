/** @type {import('next').NextConfig} */
const nextConfig = {
  // All imagery is now self-hosted in /public/images. No remote patterns needed.
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
