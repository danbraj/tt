const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  entry: './src/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'tt.bundle.js'
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    hot: true,
    open: true
  }
};