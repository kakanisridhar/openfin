/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// webpack-dev-server.js

// dev-server is responsible for running your project locally

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const chokidar = require('chokidar');
const paths = require('./paths');
var _ = require('underscore');


// Change port to suit your preference
const Port = 3000;
const Host = 'localhost';

const WP_DEV_CONFIG = './common.webpack.js';

let server;
let lastKnownConfig;

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
  lastKnownConfig = config;
  WebpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  server = new WebpackDevServer(compiler, options);

  server.listen(Port, Host, () => {});
}

startDevServer(require(WP_DEV_CONFIG));

chokidar
  .watch(paths.appScreens, { ignoreInitial: true })
  .on('add', (path) => {
    // bust config from cache so we get fresh configuration to load
    delete require.cache[require.resolve(WP_DEV_CONFIG)];
    const config = require(WP_DEV_CONFIG);
    let entriesEqual = _.isEqual(_.keys(config.entry),_.keys(lastKnownConfig.entry));
    if(entriesEqual) {
      console.log('New screens detected restarting webpack server');
      if(server != undefined && !entriesEqual) {
        server.close(() => {
          
          server = startDevServer(config);
        });
      }
    }
    
  });
