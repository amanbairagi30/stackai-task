import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stack-us-east-1.onrender.com",
        port: "",
        pathname: "*",
        search: "",
      },
    ],
  },
};

export default nextConfig;
