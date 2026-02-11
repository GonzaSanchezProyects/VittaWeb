import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Autorizamos a Unsplash
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
