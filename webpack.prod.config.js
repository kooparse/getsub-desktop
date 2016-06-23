import webpack from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from './webpack.base.config'

config.target = 'electron-renderer'

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: 'bundle.js',
}

config.plugins = [
  ...config.plugins,
  new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false}
  }),
  new HtmlWebpackPlugin({
    template: 'renderer/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: false
  })
]

export default config
