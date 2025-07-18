/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:['res.cloudinary.com'],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  }
};

export default nextConfig;
