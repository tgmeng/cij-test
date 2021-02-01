const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDev = require("@cij-test/shared/webpack/build-dev");

module.exports = buildDev({
  plugins: [
    new HtmlWebpackPlugin({
      title: "emotion-11",
    }),
  ],
});
