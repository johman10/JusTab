var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    background: "./js/background/background",
    options: "./js/options",
    tab: "./js/tab"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
    publicPath: process.env.NODE_ENV == 'development' ? 'http://localhost:8080/' : ''
  },
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, 'node_modules')
    ],
    modulesDirectories: ['components'],
    extensions: ['', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue',
      'store': __dirname + '/store',
      'modules': __dirname + '/js/modules',
      'img': __dirname + '/img',
      'js': __dirname + '/js',
      'css': __dirname + '/style/sass'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ico$/,
        loader: 'url-loader',
        query: {
          name: 'assets/[path][name].[ext]'
        }
      },
      {
        test: /\.woff$|\.eot$|\.ttf$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[path][name].[ext]'
        }
      },
    ]
  },
  devServer: {
    inline: true
  },
  vue: {
    loaders: {
      js: 'babel',
      css: ['style', 'css', 'sass']
    }
  },
  sassLoader: {
    outputStyle: 'compressed'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //   }
    // }),
    new webpack.DefinePlugin({
      environment: JSON.stringify(process.env.NODE_ENV)
    }),
    new htmlWebpackPlugin({
      filename: 'options.html',
      template: './options.html',
      chunks: ['options']
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['tab']
    }),
    new htmlWebpackPlugin({
      filename: 'background.html',
      template: './background.html',
      chunks: ['background']
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'img/app_icons', to: 'img/app_icons'}
    ])
  ]
  // eslint: {
  //   configFile: __dirname + '/.eslintrc'
  // }
};
