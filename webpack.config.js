"use strict";
/* global __dirname module require*/
/* eslint comma-dangle: ['error', 'never'] */
const path = require("path");

const workboxPlugin = require("workbox-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIST_DIR = "/build/default";

module.exports = {
  entry: "./src/view-app.html",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "build/"
  },
  plugins: [
    /* Call the plugin. */
    new workboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ["**/*.{html,js,css}"],
      swDest: path.join(DIST_DIR, "sw.js")
    })
  ],
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
