const paths = require('./paths');
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
  mode: 'development',
  devServer: {
    contentBase: paths.appBuild,
    compress: true,
    port: 3000,
    historyApiFallback: true
  }
  
});
