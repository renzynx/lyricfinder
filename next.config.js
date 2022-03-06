/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s.mxmcdn.net", "api.lorem.space"],
  },
};

module.exports = nextConfig;
