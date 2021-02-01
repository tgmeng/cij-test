const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

exports.defineTestPackage = pkgPath => {
  const rootPath = path.dirname(pkgPath);
  const pkg = require(pkgPath);
  return {
    name: pkg.name,
    rootPath,
    publicPath: path.join(rootPath, "dist"),
    build: ({ isProductionMode = false } = {}) =>
      execAsync(
        [
          "yarn",
          pkg.scripts.build,
          isProductionMode ? "--mode=production" : "",
        ].join(" "),
        {
          cwd: rootPath,
        }
      ),
  };
};
