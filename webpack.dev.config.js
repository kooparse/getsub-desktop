var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = require('./webpack.base.config')

config.watch = false
config.cache = true
config.devtool = '#inline-source-map'
config.target = 'electron-renderer'

config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
].concat(config.entry)

config.output = {
  publicPath: '/',
  filename: 'bundle.js',
}

config.module.loaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'react-hot',
}].concat(config.module.loaders)

config.plugins = [
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 8080,
    proxy: 'localhost:3000',
    codeSync: false,
    open: false,
    tunnel: false,
    notify: false,
  }),
  new webpack.HotModuleReplacementPlugin(),
]
.concat(config.plugins)
.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'renderer/index.html',
    inject: false
  })
])

config.devServer = {
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
  port: 3000,
}

module.exports = config
