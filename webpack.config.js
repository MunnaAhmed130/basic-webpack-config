const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

const devMode = mode === "development";

module.exports = {
  entry: "./src/index.js",

  // mode: "development",
  mode: mode,

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
    open: true,
    port: 9000,
  },

  // devtool: false,

  output: {
    filename: devMode ? "[name].js" : "[name][contenthash].js",
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
          // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name][contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || "disabled",
    }),
  ],

  optimization: {
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
};
