// webpack-common-config.js

// This file will contain configuration data that
// is shared between development and production builds.

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
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
const entryScreens = getFilesFromDir(PAGE_DIR, ['.js']).reduce(
  (obj, filePath) => {
    const entryChunkName = filePath
      .replace(path.extname(filePath), '')
      .replace(PAGE_DIR, '');

    // eslint-disable-next-line no-param-reassign
    obj[entryChunkName] = `./${filePath}`;
    return obj;
  },
  {},
);

module.exports = {
  entry: entryScreens,
  output: {
    path: paths.appBuild,
    filename: '[name].[hash:4].js',
  },
  plugins: [
    ...htmlPlugins,
    new CopyPlugin([{ from: paths.appAssets, to: paths.appBuild }]),
  ],
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    // Aliases help with shortening relative paths
    // 'Components/button' === '../../../components/button'
    alias: {
      Components: path.resolve(paths.appSrc, 'components'),
      Containers: path.resolve(paths.appSrc, 'containers'),
      Utils: path.resolve(paths.appSrc, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        use: ['file-loader'],
      },
      {
        // look for .js or .jsx files
        test: /\.(js|jsx)$/,
        // in the `src` directory
        include: path.resolve(paths.appSrc),
        exclude: /(node_modules)/,
        use: {
          // use babel for transpiling JavaScript files
          loader: 'babel-loader',
        },
      },
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        include: [path.resolve(paths.appSrc)],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              discardDuplicates: true,
              importLoaders: 1,
              // This enables local scoped CSS based in CSS Modules spec
              modules: true,
              // generates a unique name for each class (e.g. app__app___2x3cr)
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          // Add additional loaders here. (e.g. sass-loader)
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
