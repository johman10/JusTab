const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const Jarvis = require('webpack-jarvis');
const htmlMinifyOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  html5: true,
  processConditionalComments: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeTagWhitespace: true,
  sortAttributes: true,
  trimCustomFragments: true,
  useShortDoctype: true
};

module.exports = {
  entry: {
    background: './js/background/background',
    options: './js/options',
    tab: './js/tab'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV == 'development' ? 'http://localhost:8080/' : '',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm',
      'store': path.join(__dirname, '/store'),
      'modules': path.join(__dirname, '/js/modules'),
      'img': path.join(__dirname, '/img'),
      'js': path.join(__dirname, '/js'),
      'css': path.join(__dirname, '/style/sass'),
      'components': path.join(__dirname, '/components'),
      'test': path.join(__dirname, '/test')
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
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ico$|\.webp$/,
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
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new htmlWebpackPlugin({
      filename: 'options.html',
      template: './options.html',
      minify: htmlMinifyOptions,
      chunks: ['commons', 'options'],
      prefetch: ['commons.bundle.js', 'options.bundle.js'],
      preload: ['commons.bundle.js', 'options.bundle.js']
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: htmlMinifyOptions,
      chunks: ['commons', 'tab'],
      prefetch: ['commons.bundle.js', 'tab.bundle.js'],
      preload: ['commons.bundle.js', 'tab.bundle.js']
    }),
    new ScriptExtHtmlWebpackPlugin({
      preload: {
        test: /(\d)*\.bundle\.js$/,
        chunks: 'async'
      }
    }),
    new htmlWebpackPlugin({
      filename: 'background.html',
      template: './background.html',
      minify: htmlMinifyOptions,
      chunks: ['commons', 'background'],
      prefetch: ['commons.bundle.js', 'background.bundle.js'],
      preload: ['commons.bundle.js', 'background.bundle.js']
    }),
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'img/app_icons', to: 'img/app_icons'}
    ])
  ]
};

if (process.env.NODE_ENV !== 'test') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({
      async: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    })
  ]);
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new UglifyJSPlugin({
      cache: true,
      parallel: 2
    })
  ]);
}
