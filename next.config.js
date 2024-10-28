/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    cleanupIDs: false,
                  },
                },
              },
              // 移除命名空間
              'removeXMLNS',
              // 移除註釋
              'removeComments',
              // 移除編輯器資料
              'removeEditorsNSData',
              // 移除標題
              'removeTitle',
              // 移除描述
              'removeDesc',
              // 移除元數據
              'removeMetadata',
              // 將 fill="black" 改為 fill="currentColor"
              {
                name: 'removeAttributesBySelector',
                params: {
                  selector: 'path',
                  attributes: ['fill'],
                },
              },
              {
                name: 'addAttributesToSVGElement',
                params: {
                  attributes: [{ fill: 'currentColor' }],
                },
              },
            ],
          },
        },
      }],
    });

    return config;
  }
  // output: 'export', // don't use with `next start` or api route
  // distDir: 'dist',
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
}

module.exports = nextConfig
