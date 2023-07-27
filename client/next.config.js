/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
