/* global process */
require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry:  path.resolve(paths.appSrc, 'index.jsx'),
  output: {
    path: paths.appBuild,
    filename: '[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@Components': path.resolve(paths.appSrc, 'components'),
      '@Services': path.resolve(paths.appSrc, 'services')
    },
  },
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.(js|ts|jsx|tsx)$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.svg$/,
      use: ['svgo-loader']
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
        'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: ['file-loader?name=fonts/[name].[ext]']
    }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: paths.appAssets,
      to: '.'
    }]),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: path.resolve(paths.appSrc, 'index.html')
    }),    
    new webpack.NamedModulesPlugin()
  ],
};