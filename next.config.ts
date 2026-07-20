import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(wordpressHostname
        ? [
            {
              protocol: "https" as const,
              hostname: wordpressHostname,
              port: "",
              pathname: "/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "www.sf6relations.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.sf6relations.com",
        port: "",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "h2gassolution.com",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
  async redirects() {
    if (!wordpressUrl) {
      return [];
    }
    return [
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
