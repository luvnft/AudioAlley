/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ipfs.infura.io", "jersey.fm", "mixtape.atl5d.com"], // ✅ no extra comma
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/marketplace",
        destination: "/marketplace",
      },
    ];
  },
  experimental: {
    // Leave empty or add ONLY supported experimental flags
    // Example if you want (optional): appDir: true
  },
};

module.exports = nextConfig;
