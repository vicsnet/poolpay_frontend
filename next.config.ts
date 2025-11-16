// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... your existing nextConfig settings ...

  webpack: (config, { isServer }) => {
    // Only apply this change for server-side/Node.js builds.
    if (isServer) {
      config.externals = config.externals || {};

      // Mark pino and thread-stream as external to skip bundling their test/dev dependencies.
      config.externals['pino'] = 'commonjs pino';
      config.externals['thread-stream'] = 'commonjs thread-stream';
    }

    return config;
  },
};

export default nextConfig;