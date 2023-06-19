/** @type {import('next').NextConfig} */

// Configurations for development
/** @type {import('next').NextConfig} */
const devNextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    mongodb_username: "joel",
    mongodb_password: "joel",
    mongodb_clustername: "cluster0",
    google_email: "joelojerinde@gmail.com",
    google_password: "ptmf qttz xprg pqhk",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "P5jLCK7jgs9CXb02vlO6uoCJjbcvIUanV25SUPrZcQ=",
    GOOGLE_ID:
      "462298827465-a0fv8ekm6gkrhrcvohbr8tg3cj9972g1.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
};

module.exports = () => {
  return devNextConfig;
};
