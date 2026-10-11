import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Procurement requests carry one reference image per item (4MB each,
    // 9MB in total). The 1MB default would reject them.
    serverActions: { bodySizeLimit: "10mb" },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Browsers must not guess a file's type from its contents.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // The site cannot be embedded in another site's frame (clickjacking).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          // Other sites see only the domain a visitor came from, not the page.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site uses none of these device features, so no script may.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/products", destination: "/shop", permanent: true }];
  },
};

export default nextConfig;
