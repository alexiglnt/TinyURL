/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ssr: false
}

// module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path',
        destination: '/api/:path',
      },
    ]
  },
}
