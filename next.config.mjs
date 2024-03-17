/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add HTML loader for nw-pre-gyp/index.html
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    // Fixes npm packages that depend on `fs` and `child_process` modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
      };
    }

    return config;
  },
};

export default nextConfig;
