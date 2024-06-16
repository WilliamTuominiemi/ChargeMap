/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    MAP_ID: process.env.GOOGLE_MAPS_MAP_ID,
  },
};

export default nextConfig;
