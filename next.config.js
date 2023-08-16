/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "recruitment.warpdevelopment.co.za",
        port: "",
        pathname: "/vehicles/**",
      },
    ],
  },
};

module.exports = nextConfig;
