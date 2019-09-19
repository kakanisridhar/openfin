const fg = require('fast-glob');
const path = require('path');
const paths = require('./paths');
const getFilesFromDir = require('./files');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PAGE_DIR = 'src/screens';

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

const entryScreens = jsFiles.reduce((obj, S) => {
  // eslint-disable-next-line no-param-reassign
  obj[S] = `${PAGE_DIR}/${S}`;
  return obj;
},
{},
);

const htmlPlugins = htmlFiles.map(filePath => {
    const fileName = filePath.replace(PAGE_DIR, '');
    return new HtmlWebpackPlugin({
      chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'],
      template: `${PAGE_DIR}/${filePath}`,
      filename: fileName,
    });
  });
