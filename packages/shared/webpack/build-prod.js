const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const buildCommon = require("./build-common");

function buildWebpackProdConfig(config) {
  return buildCommon(
    merge(
      {
        devtool: "source-map",
        cache: {
          type: "filesystem",
        },
        output: {
          filename: "[name].[contenthash].js",
          chunkFilename: "[id].[contenthash].js",
          path: path.resolve(process.cwd(), "dist"),
        },
        resolve: {
          alias: {
            "react-dom$": "react-dom/profiling",
            "scheduler/tracing": "scheduler/tracing-profiling",
          },
        },
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]|@cij-test\/shared/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        },
        plugins: [new CleanWebpackPlugin()],
      },
      config
    )
  );
}

module.exports = buildWebpackProdConfig;
