const { defineTestPackage } = require("@cij-test/shared");

module.exports = defineTestPackage(require.resolve("../package.json"));
