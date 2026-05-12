import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {

    remotePatterns: [
      {
        protocol: "https",

        hostname:
          "res.cloudinary.com",
      },
    ],

  },

  async redirects() {

    return [

      {
        source: "/index.html",

        destination: "/",

        permanent: true,
      },

      {
        source:
          "/portfolio-collections/:path*",

        destination: "/",

        permanent: true,
      },

    ];

  },

};

export default nextConfig;