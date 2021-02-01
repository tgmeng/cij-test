const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDev = require("@cij-test/shared/webpack/build-dev");

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
      title: "vanilla-style",
    }),
  ],
});
