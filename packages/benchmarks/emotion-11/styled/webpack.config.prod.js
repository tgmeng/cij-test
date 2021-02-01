const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildProd = require("@cij-test/shared/webpack/build-prod");

const pkg = require("./package.json");

module.exports = buildProd({
  plugins: [
    new HtmlWebpackPlugin({
      title: pkg.name,
    }),
  ],
});
