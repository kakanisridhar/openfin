/* global process */
require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const fg = require('fast-glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./paths');
//const getFilesFromDir = require('./files');

const PAGE_DIR = paths.appScreens;

const jsFiles = fg.sync(['*.jsx', '*.tsx', '**/index.jsx', '**/index.tsx'], {
  cwd: PAGE_DIR,
  onlyFiles: true,
  deep: 2
});

const htmlFiles = fg.sync(['*.html', '**/index.html'], {
  cwd: PAGE_DIR,
  onlyFiles: true,
  deep: 2
});

function getScreenName(fn) {
  let S = fn;
  S = S.replace(path.extname(S), '');
  if (S.includes('/'))
    S = S.substr(0, S.indexOf('/'));
  return S;
}

const entryScreens = jsFiles.reduce((obj, fn) => {
  let S = getScreenName(fn);
  obj[S] = path.resolve(`${PAGE_DIR}/${fn}`);
  return obj;
}, {}, );

let htmlPlugins = htmlFiles.map(fileName => {
  let S = getScreenName(fileName);
  if (fileName !== 'index.html') {
    return new HtmlWebpackPlugin({
      chunks: [S, 'vendor'],
      template: path.resolve(`${PAGE_DIR}/${fileName}`),
      filename: S + '.html'
    });
  } else {
    return new HtmlWebpackPlugin({
      chunks: [S, 'vendor'],
      template: path.resolve(`${PAGE_DIR}/${fileName}`),
      filename: S + '.html',
      screens: JSON.stringify(htmlFiles.map(getScreenName).filter(s => s !== 'index'))
    });
  }
});



module.exports = {
  mode: 'development',
  entry: entryScreens,
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
    ...htmlPlugins,
    new webpack.NamedModulesPlugin()
  ],  
};