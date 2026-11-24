import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  devIndicators: false,
  images: { qualities: [70, 85] },
};

export default config;
