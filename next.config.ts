import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error - eslint is valid but missing from NextConfig type in this version
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
