/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
  },
  images: {
    domains: ['localhost', 'mangadex.org', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
