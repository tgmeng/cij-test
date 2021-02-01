const path = require("path");
const http = require("http");
const handler = require("serve-handler");

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

exports.calcAverageActualTime = timeList =>
  timeList.reduce((result, time) => result + time, 0) / timeList.length;
