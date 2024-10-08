// next.config.js
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pages': path.resolve(__dirname, 'public')
    };
    return config;
  },
  pageExtensions: ['js'],
};
