/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'usta-jobs-backend.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
};

module.exports = nextConfig;