/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  // basePath: '/github-pages',
trailingSlash: true,
  // output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
