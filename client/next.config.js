/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "res.cloudinary.com",
    //   "randomuser.me",
    //   "raw.githubusercontent.com",
    // ],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
