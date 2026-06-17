import createMDX from '@next/mdx';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ['mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

// Plugins are declared by string name (not imported function) so they work
// under Turbopack, which runs both `next dev --turbopack` and `next build`.
const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-frontmatter']],
  },
});

export default withMDX(nextConfig);
