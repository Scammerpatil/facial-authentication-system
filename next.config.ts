import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "www.pngmart.com",
      },
    ],
  },
};

export default nextConfig;
