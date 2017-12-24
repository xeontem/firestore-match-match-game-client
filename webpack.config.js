var webpack = require('webpack');

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
      app: './src/index.js',
      // wrapper: './src/components/wrapper/wrapper.component.js',
      // card: './src/components/card/card.component.js'
    },
    devtool: 'source-map',
    // watch: true,
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      port: 9000
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //resolve-url-loader may be chained before sass-loader if necessary
              use: ['css-loader', 'sass-loader']
            })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(['dist']),
      new webpack.optimize.CommonsChunkPlugin({name: 'common'}),
      new HtmlWebpackPlugin({
        title: 'match-match-game',
        // favicon: './src/assets/favicon.png',
        template: path.resolve(__dirname, 'index.html')
      }),
      new ExtractTextPlugin("styles.css"),
    ]
  };
