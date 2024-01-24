/** @type {import('next').NextConfig} */

const mcStats = {
  protocol: 'https',
  hostname: 'skins.mcstats.com',
  port: '',
};
const images = {
  remotePatterns: [
    {...mcStats, pathname: '/bust/**'},
    {...mcStats, pathname: '/skull/**'},
  ],
};
const nextConfig = {
  output: 'standalone',
  // reactStrictMode: false,

  images: images,
}

module.exports = nextConfig