// paths.js

// Paths will export some path variables that we'll
// use in other Webpack config and server files

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appAssets: resolveApp('src/assets'), // For images and other assets
  appBuild: resolveApp('build'), // Prod built files end up here
  appConfig: resolveApp('config'), // App config files
  appScreens: 'src/screens',
  appSrc: resolveApp('src'), // App source
};
