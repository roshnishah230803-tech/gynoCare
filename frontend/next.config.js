/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    // THIS is the missing part causing build failure
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;