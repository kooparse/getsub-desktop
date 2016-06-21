import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from './webpack.base.config'


config.watch = false
config.cache = true
config.devtool = '#inline-source-map'
config.target = 'electron-renderer'

config.entry = [
  ...config.entry,
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
]

config.output = {
  publicPath: 'http://localhost:8080/',
  filename: 'bundle.js',
}

config.module.loaders = [
  {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot'},
  ...config.module.loaders
]

config.plugins = [
  ...config.plugins,
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
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'renderer/index.html',
    inject: false
  })
]

config.devServer = {
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
  port: 3000,
}

export default config
