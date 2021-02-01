const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDev = require("@cij-test/shared/webpack/build-dev");

const pkg = require("./package.json");

module.exports = buildDev({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: pkg.name,
    }),
  ],
});
