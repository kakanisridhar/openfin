// webpack-common-config.js

// This file will contain configuration data that
// is shared between development and production builds.

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const getFilesFromDir = require('./files');

const PAGE_DIR = paths.appScreens;

const htmlPlugins = getFilesFromDir(PAGE_DIR, ['.html']).map(filePath => {
  const fileName = filePath.replace(PAGE_DIR, '');
  return new HtmlWebpackPlugin({
    chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'],
    template: filePath,
    filename: fileName,
  });
});

// { contact: "./src/pages/contact.js" }
const entry = getFilesFromDir(PAGE_DIR, ['.js']).reduce((obj, filePath) => {
  const entryChunkName = filePath
    .replace(path.extname(filePath), '')
    .replace(PAGE_DIR, '');

  // eslint-disable-next-line no-param-reassign
  obj[entryChunkName] = `./${filePath}`;
  return obj;
}, {});

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
  ],
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    // Aliases help with shortening relative paths
    // 'Components/button' === '../../../components/button'
    alias: {
      Components: path.resolve(paths.appSrc, 'components'),
      Utils: path.resolve(paths.appSrc, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        use: ['file-loader'],
      },
    ],
  },
};
