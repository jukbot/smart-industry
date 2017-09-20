"use strict";
/* global __dirname module require*/
/* eslint comma-dangle: ['error', 'never'] */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/view-app.html",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "build/"
  },
  resolve: {
    modules: ["node_modules", "bower_components"],
    descriptionFiles: ["package.json"]
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: ["syntax-dynamic-import"]
            }
          },
          {
            loader: "polymer-webpack-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: [require("babel-plugin-transform-object-rest-spread")]
            }
          }
        ]
      }
    ]
  }
};
