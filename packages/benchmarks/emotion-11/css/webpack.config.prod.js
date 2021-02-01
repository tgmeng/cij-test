const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildProd = require("@cij-test/shared/webpack/build-prod");

module.exports = buildProd({
  plugins: [
    new HtmlWebpackPlugin({
      title: "emotion-11",
    }),
  ],
});
