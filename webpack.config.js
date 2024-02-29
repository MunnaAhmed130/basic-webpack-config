const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: "./src/index.js",

  // // code splitting
  // entry: {
  //     foo: "foo.js",
  //     bar: "bar.js",
  // },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      // directory: path.join(__dirname, "public"),
    },
    compress: true,
    hot: true,
    port: 9000,
  },

  // devtool: "source-map",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  // plugins: [new BundleAnalyzerPlugin()],
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),
  ],

  // mode: "development",
  mode: mode,
};
