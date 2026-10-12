import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 75, 80, 85],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://www.staylayday.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
