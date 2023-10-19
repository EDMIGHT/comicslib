/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
    APP_URL: process.env.APP_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_REDIRECT_URL: process.env.GOOGLE_AUTH_REDIRECT_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  images: {
    domains: [
      'localhost',
      'mangadex.org',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
