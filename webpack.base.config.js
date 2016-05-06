var path = require('path')
var webpack = require('webpack')
var cssnext = require('cssnext-loader')

module.exports = {

  entry: [
    'babel-polyfill',
    path.join(__dirname, 'renderer'),
  ],

  resolve: {
    modulesDirectories: ['renderer', 'node_modules'],
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'transform-class-properties',
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style?sourceMap', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!cssnext']
      },
    ],
  },

  cssnext: {
    browsers: ['ff >= 20', 'ie >= 11', 'safari >= 7', 'opera >= 12', 'chrome >=20'],
    compress: true,
    messages: { console: true },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      CSSModules: 'react-css-modules'
    }),
  ],

}
