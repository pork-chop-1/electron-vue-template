/* eslint-disable */

module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [{
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', 'env'],
        plugins: ['@vue/babel-plugin-jsx']
      }
    },{
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    }],
  },
  {
    test: /\.vue$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'vue-loader',
    },
  },
  // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
];
