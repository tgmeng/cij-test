const HtmlWebpackPlugin = require("html-webpack-plugin");

const { webpack } = require("@cij-test/config");

module.exports = webpack.buildDev({
  entry: "./src/index",
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
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
      title: "emotion-10",
    }),
  ],
});
