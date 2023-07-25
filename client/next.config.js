/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
  images: {
    domains: ['localhost', 'w3'],
  },
};

module.exports = nextConfig;
