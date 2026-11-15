import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal self-contained server (.next/standalone) so the Docker
  // image does not need the full node_modules tree. Ignored by Vercel.
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
