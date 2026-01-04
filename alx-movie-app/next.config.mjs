import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = withPWAInit({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,

  // Disable Turbopack, force Webpack build
  turbopack: false, 

  // Updated image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withPWA({
  ...nextConfig,
});
