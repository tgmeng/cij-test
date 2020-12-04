"use strict";

const webpack = {
  buildCommon: require("./webpack/build-common"),
  buildDev: require("./webpack/build-dev"),
};

module.exports = {
  webpack,
};
