var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer-core')

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dev',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /src.*\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  postcss: function () {
    return [autoprefixer()]
  }
}
