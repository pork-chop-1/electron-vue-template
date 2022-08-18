/* eslint-disable */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}, {
  test: /\.(jpe?g|png|gif|svg)$/i, 
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]'
  }
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.vue'],
    alias: {
      '@': path.resolve('src')
    }
  },
  devtool: "inline-source-map",
};
