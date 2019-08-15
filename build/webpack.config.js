var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var vpsPath = path.resolve(__dirname, '../');

// package.json
var pg = fs.readFileSync(vpsPath + '/package.json');
var pjInfo = JSON.parse(pg);

var paths = {
  src: vpsPath + '/src/',
  dist: vpsPath + '/dist/' + pjInfo.version + '/'
};

var publicPath = '/dist/' + pjInfo.version + '/business/';

module.exports = {
  entry: {
    'index': paths.src + 'index.js'
  },
  output: {
    path: paths.dist + 'business',
    // publicPath: publicPath,
    filename: '[name].js'
  },
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
          loose: true
        }]],
        plugins: ['transform-vue-jsx']
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
      test: /\.styl$/,
      use: ExtractTextPlugin.extract([{
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }, 'stylus-loader'])
    }]
  },
  // devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval-source-map',
  // devServer: {
  //   compress: true,
  //   historyApiFallback: true,
  //   hot: true,
  //   https: false,
  //   port: 5001,
  //   inline: true // 实时刷新
  // },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    // new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new ExtractTextPlugin('[name].css')
  ]
}