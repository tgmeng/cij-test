const fs = require("fs").promises;
const path = require("path");

const ora = require("ora");

const { TestPackages } = require("./constants");
const { createLog } = require("./utils");

const spinner = ora().start();
const log = createLog({ spinner });

(async () => {
  const bundleSizeMap = new Map();

  for (const pkg of TestPackages) {
    spinner.prefixText = pkg.name;
    spinner.text = "Building";

    await pkg.build({
      isProductionMode: true,
    });

    const files = await fs.readdir(pkg.publicPath);
    const filteredFiles = files.filter(
      file => !/\.map$|\.txt$|\.html$|vendors(?:\.[A-z0-9]+)\.js$/.test(file)
    );
    const fileStats = await Promise.all(
      filteredFiles.map(async file => {
        const stat = await fs.stat(path.join(pkg.publicPath, file));
        return {
          basename: path.basename(file),
          size: stat.size,
        };
      })
    );
    log(pkg.name);
    log(fileStats);
  }

  spinner.stop();
})();
