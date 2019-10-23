const paths = require('./paths');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

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
  mode: 'development' ,
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:3000',// bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    path.resolve(paths.appSrc, 'index.tsx')
  ],
  plugins: [ new webpack.HotModuleReplacementPlugin()]
});
