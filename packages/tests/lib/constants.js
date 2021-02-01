const path = require("path");

const pkg = require("../package.json");

exports.TestPackages = Object.keys(pkg.dependencies)
  .filter(dep => /\@cij-test\//.test(dep))
  .map(id => require(id));

exports.RepeatMountTimes = 5;

exports.RepeatUpdateTimes = 5;

exports.TableSizeList = ["10x10", "50x50", "100x100"];

exports.UpdateButtonId = "update-button";
