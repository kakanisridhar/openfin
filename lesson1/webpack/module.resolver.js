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
  }
);

const entryScreens = jsFiles.reduce((obj, fn) => {
  // eslint-disable-next-line no-param-reassign
  let S = fn;
  S = S.replace(path.extname(S), '');
  if(S.includes('/'))
    S = S.substr(0,S.indexOf('/'));
    
  obj[S] = path.resolve(`${PAGE_DIR}/${fn}`);
  return obj;
},
{},
);

const htmlPlugins = htmlFiles.map(fileName => {
    let S = fileName;
    S = S.replace(path.extname(S), '');
    if(S.includes('/'))
      S = S.substr(0,S.indexOf('/'));

    return new HtmlWebpackPlugin({
      chunks: [S, 'vendor'],
      template: path.resolve(`${PAGE_DIR}/${fileName}`),
      filename: S + '.html'
    });
  });

 
  console.log(entryScreens);
  
  htmlPlugins.forEach( P => {
    console.log(P.chunks);
  });
  