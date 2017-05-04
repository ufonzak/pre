const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: ['babel-polyfill', './index.jsx'],
  context: path.join(__dirname, '../src/client'),
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
  ],
  devServer: {
    proxy: {
      '/api/*': 'http://localhost:5000',
    },
  },
};
