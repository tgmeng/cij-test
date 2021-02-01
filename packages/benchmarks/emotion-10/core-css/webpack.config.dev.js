const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDev = require("@cij-test/shared/webpack/build-dev");

const pkg = require("./package.json");

module.exports = buildDev({
  plugins: [
    new HtmlWebpackPlugin({
      title: pkg.name,
    }),
  ],
});
