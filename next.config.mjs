/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "uhdtv.io",
      },
      {
        hostname: "download.blender.org",
      },
      {
        hostname: "mango.blender.org",
      },
    ],
  },
};

export default nextConfig;
