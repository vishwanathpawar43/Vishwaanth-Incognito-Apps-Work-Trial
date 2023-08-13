/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  eslint: {
    dirs: ['animations', 'components', 'mocks', 'pages', 'types', 'tests', 'helpers', '@constants', 'configs', 'assets'],
  },
  env: {},
  images: {
    domains: []
  }
}

module.exports = nextConfig