/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*' // Assuming your NestJS backend runs on port 3000
      }
    ]
  }
}

module.exports = nextConfig
