/* global process */

const webpack = require('webpack');
const { resolve } = require('path');
const merge = require('webpack-merge');

const commonClientConfig = require('./common.webpack');

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'module.rules') {
      const testList = b.map(item => item.test.toString());
      return a
        .filter(item => !testList.includes(item.test.toString()))
        .concat(b);
    }
  }
})(commonClientConfig, {
  mode: 'production',
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      Components: path.resolve(paths.appSrc, 'components'),
      Containers: path.resolve(paths.appSrc, 'containers'),
    },
  }
});
