/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://digitalapi.auspost.com.au/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;