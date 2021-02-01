const path = require("path");

exports.TestPackages = ["@cij-test/vanilla-style"].map(id => require(id));

// exports.RepeatMountTimes = 5;
exports.RepeatMountTimes = 1;

exports.RepeatUpdateTimes = 5;

exports.TableSizeList = ["10x10", "50x50", "100x100"];

exports.UpdateButtonId = "update-button";
