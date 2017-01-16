const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const dir_js = path.resolve(__dirname, 'js');
const dir_css = path.resolve(__dirname, 'css');
const dir_output = path.resolve(__dirname, 'public');


module.exports = {
  entry: path.resolve(dir_js, 'main.js'),
  output: {
    path: dir_output,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./public/",
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: dir_js,
      query: {
        presets: ['es2015']
      }
    }, {
      test: dir_css,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=10000'
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  postcss: [
    autoprefixer()
  ],
  // devtool: 'source-map',
};
