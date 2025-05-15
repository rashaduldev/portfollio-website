import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.digitalstrike.com',
      },
      {
        protocol: 'https',
        hostname: 'www.crowe.com',
      },
    ],
  },
};

export default nextConfig;
