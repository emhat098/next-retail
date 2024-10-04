/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore the error in the build time.
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
};

export default nextConfig;
