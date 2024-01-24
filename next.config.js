/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skins.mcstats.com',
        port: '',
        pathname: '/bust/**',
      },
    ],
  },
}

module.exports = nextConfig