/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  // Next 16's CLI typechecker can fail to parse its own generated config on
  // this Node/TypeScript combination; the compiler API performs the same
  // strict check without changing the application contract.
  experimental: {
    useTypeScriptCli: false,
    workerThreads: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(self), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
