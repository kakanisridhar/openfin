/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// webpack-dev-server.js

// dev-server is responsible for running your project locally

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const chokidar = require('chokidar');
const paths = require('./paths');

// Change port to suit your preference
const Port = 3000;
const Host = 'localhost';

const WP_COMMON_CONFIG = './webpack-common-config.js';
const WP_DEV_CONFIG = './webpack-dev-config.js';

let server;

const options = {
  host: Host,
  // Enable webpack's Hot Module Replacement feature
  hot: true,
  inline : true,
  // full-screen overlay in the browser for compiler errors or warnings
  overlay: {
    warnings: false,
    errors: true,
  },
  // Show errors and warnings in console
  quiet: false,
  // Hide the build info
  noInfo: false,
  // Tell the server where to serve static files from.
  // Set this is the `paths.js` file.
  contentBase: paths.appAssets,
  // If static content changes, reload the page.
  // In other words, editing a photo within the assets
  // directory will force the page to reload.
  watchContentBase: true,
  after() {
    process.stdout.write(`dev server is running: http://${Host}:${Port}\n`);
  },
};

function startDevServer(config) {
  WebpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  server = new WebpackDevServer(compiler, options);

  server.listen(Port, Host, () => {});
}

startDevServer(require(WP_DEV_CONFIG));

chokidar
  .watch(paths.appScreens, { ignoreInitial: true, ignored: '*.html' })
  .on('all', () => {
    server.close();

    // bust config from cache so we get fresh configuration to load
    delete require.cache[require.resolve(WP_DEV_CONFIG)];
    delete require.cache[require.resolve(WP_COMMON_CONFIG)];
    server = startDevServer(require(WP_DEV_CONFIG));
  });
