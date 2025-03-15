/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-af8be0bea17b4d2c8b04929ebf16bac7.r2.dev",
        pathname: "/travel-memo/**",
      },
    ],
    minimumCacheTTL: 3600, // Cache images for 1 hour (optional)
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Ubah batas sesuai kebutuhan (misalnya 10MB)
    },
  },
};
export default nextConfig;
