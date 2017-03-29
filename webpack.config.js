const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    background: './js/background/background',
    options: './js/options',
    tab: './js/tab'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV == 'development' ? 'http://localhost:8080/' : ''
  },
  resolve: {
    modules: [
      __dirname,
      path.join(__dirname, 'node_modules'),
      'components'
    ],
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common',
      'store': path.join(__dirname, '/store'),
      'modules': path.join(__dirname, '/js/modules'),
      'img': path.join(__dirname, '/img'),
      'js': path.join(__dirname, '/js'),
      'css': path.join(__dirname, '/style/sass')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader',
              css: 'style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed'
          }
        }]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ico$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[path][name].[ext]'
          }
        }
      },
      {
        test: /\.woff$|\.eot$|\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[path][name].[ext]'
          }
        }
      },
    ]
  },
  devServer: {
    inline: true
  },
  devtool: JSON.stringify(process.env.NODE_ENV) === 'development' ? 'eval-source-map' : 'source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new UglifyJSPlugin()
  ]);
}
