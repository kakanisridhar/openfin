const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./dev.webpack.js');
const paths = require('./paths');

const app = express();
const port = 3000;

const devServerEnabled = true;

if (devServerEnabled) {
   
    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(paths.appBuild));

// add any server side API here


app.listen(port, () => {
    console.log('Server started on port:' + port);
});
