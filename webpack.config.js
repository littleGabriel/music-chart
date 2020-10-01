const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    entry:{
        index: './src/index.js',
        impStyle: './src/style.js',
        myStyle: './src/material.scss'
    },
    output:{
        filename:'[name].[chunkhash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    // mode:'development',
    mode:'production',
    // devtool: 'inline-source-map',
    devServer:{contentBase: './',},
    // cache: true,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module:{
      rules:[
      {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }
      },
      {
          test:/\.css$/,
          use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
          test:/\.(png|jpg|svg|jpeg|gif|woff|woff2|eot|ttf|otf|mp3)$/,
          use:['url-loader']
      },
      {
          test: /\.scss$/,
          use: [
              // {loader: "style-loader" },
              MiniCssExtractPlugin.loader,
              { loader: "css-loader" },
              { loader: 'postcss-loader' },
              {
                  loader: 'sass-loader',
                  options: {
                      implementation: require('sass'),
                      webpackImporter: false,
                      sassOptions: {
                          includePaths: ['./node_modules']
                      },
                  }
              }
          ]
      }
      ]
    },
    plugins:[
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify:false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
            chunkFilename: '[id].[chunkhash:8].css'
        })
    ]
};

