const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './docs'),
    publicPath: '/',
    filename: process.env.NODE_ENV === 'production' ? 'bundle.[hash:7].js' : 'bundle.js',
    chunkFilename: process.env.NODE_ENV === 'production' ? 'bundle.[hash:7].js' : 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.js$/,
        use: [
          "babel-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: process.env.NODE_ENV === 'production' ? '[name].[hash:7].[ext]' : '[name].[ext]'
        }
      },
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: process.env.NODE_ENV === 'production' ? '[name].[hash:7].[ext]' : '[name].[ext]'
          }
        },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(process.env.NODE_ENV === 'production' ? "styles.[hash:7].css" : "styles.css"),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({ template: './__index.html' }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
