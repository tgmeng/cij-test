const path = require("path");
const { merge } = require("webpack-merge");

function buildWebpackCommonConfig(config) {
  return merge(
    {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },
    config
  );
}

module.exports = buildWebpackCommonConfig;
