const path = require('path');
const webpack = require('webpack');
const SplitByPathPlugin = require('webpack-split-by-path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: [
    new SplitByPathPlugin([
      {name: 'vendor', path: [__dirname + '/node_modules/']}
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: false
    })
  ],

  devServer: {
    historyApiFallback: {index: '/'}
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'raw',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'to-string!css',
      exclude: /node_modules/
    }],
    noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/]
  }
};
