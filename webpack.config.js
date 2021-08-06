const path = require("path");
const autoprefixer = require("autoprefixer");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      { test: /\.svg$/, use: "svg-inline-loader" },
      { 
        test: /\.s[ac]ss$/i, 
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            /*options: {
              sourceMap: true
            }*/
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ],
                // sourceMap: true
              }
            }
        },
          {
            loader: "sass-loader",
            /*options: {
              sourceMap: true
            }*/
          }
        ] 
      },
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      template: "./src/index.html", 
      minify: {
        collapseWhitespace: true
      } 
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
      }),
    ],
  },

  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
