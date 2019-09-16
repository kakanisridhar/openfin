// webpack-prod-config.js

// contains configuration data related to prod build

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack-common-config.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // Uglify to minify your JavaScript
    new UglifyJSPlugin(),
    // Set process.env.NODE_ENV to production
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
});
