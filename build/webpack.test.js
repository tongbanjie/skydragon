var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.styl'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules'
    ]
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
      options: {
        presets: [['es2015', {
          modules: false
        }]],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        limit: 1500,
        name: 'images/[name].[ext]?[hash]'
      }
    }, {
      test: /\.(woff|ttf)$/,
      loader: 'url-loader',
      options: {
        limit: 1500,
        name: 'fonts/[name].[ext]?[hash]'
      }
    }, {
      test: /\.css$/,
      loader: 'css-loader',
      options: {
        minimize: true
      }
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }, 'stylus-loader']
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval-source-map',
  // devServer: {
  //   compress: true,
  //   historyApiFallback: true,
  //   hot: true,
  //   https: false,
  //   port: 5001,
  //   inline: true // 实时刷新
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // 热加载插件
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
    // new ExtractTextPlugin('[name].css')
  ]
}