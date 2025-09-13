import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/THE-LOVEREIGN-BIBLE-CHURCH/logo/main/**",
      },
    ],
  },
  // output: "export",
  assetPrefix: "", // Use relative paths for assets
  basePath: "", // Empty string for root path
};

export default nextConfig;
