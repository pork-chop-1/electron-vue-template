/* eslint-disable */
const path = require('path')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    
    alias: {
      '@': path.resolve('src')
    }

  },
  devServer: {
    proxy: {
      '/api/**': {
        target: 'http://[::1]:4000',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true
      },
    },
  },
};
