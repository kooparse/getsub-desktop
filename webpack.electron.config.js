import webpack from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from './webpack.base.config'

config.target = 'electron-main'

config.node = {
  __dirname: false,
  __filename: false
}

config.entry = [
  'babel-polyfill',
  path.join(__dirname, 'main')
]

config.resolve = {
  modulesDirectories: ['main', 'node_modules'],
  extensions: ['', '.js'],
}

config.output = {
  path: path.join(__dirname, 'dist'),
  publicPath: '',
  filename: 'main.js'
}

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false}
  })
]

export default config
