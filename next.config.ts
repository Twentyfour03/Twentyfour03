import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Procurement requests carry one reference image per item (4MB each,
    // 9MB in total). The 1MB default would reject them.
    serverActions: { bodySizeLimit: "10mb" },
  },
  async redirects() {
    return [{ source: "/products", destination: "/shop", permanent: true }];
  },
};

export default nextConfig;
