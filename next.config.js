/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PERMANENT_AUTH_TOKEN: process.env.PERMANENT_AUTH_TOKEN,
    URI_GRAPHQL: process.env.URI_GRAPHQL,
  },
};

module.exports = nextConfig;
