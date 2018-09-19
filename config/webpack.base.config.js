
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    module: {
      rules: [
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: './src/index.html', 
        filename: './index.html' 
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ],
    output : {
      publicPath: "/"
    }
  }