const path = require("path");
const http = require("http");
const handler = require("serve-handler");

const pkg = require("../package.json");

exports.getTestPackages = () =>
  Object.keys(pkg.dependencies)
    .filter(dep => /\@cij-test\//.test(dep))
    .map(id => require(id));

exports.createNewPage = async browser => {
  const page = await browser.newPage();
  if (process.env.NODE_ENV === "development") {
    page.on("console", msg => console.log(msg.text()));
  }
  return page;
};

exports.createLog = ({ spinner }) =>
  function log(...args) {
    const isSpinning = spinner;
    if (isSpinning) {
      spinner.stop();
    }
    console.log(...args);
    if (isSpinning) {
      spinner.start();
    }
  };
