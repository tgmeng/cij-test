const http = require("http");
const path = require("path");
const fs = require("fs").promises;

const puppeteer = require("puppeteer");
const ora = require("ora");
const handler = require("serve-handler");
const table = require("markdown-table");

const { createNewPage, createLog, calcAverageActualTime } = require("./utils");
const {
  TestPackages,
  RepeatMountTimes,
  RepeatUpdateTimes,
  TableSizeList,
  UpdateButtonId,
} = require("./constants");

const spinner = ora();

const log = createLog({ spinner });

(async () => {
  const profileMap = new Map();

  const browser = await puppeteer.launch();

  let port = 3000;

  for (const pkg of TestPackages) {
    spinner.prefixText = pkg.name;
    spinner.text = "Building";
    spinner.start();

    await pkg.build();

    spinner.text = "Starting Server";

    const url = `http://127.0.0.1:${port}`;
    const server = http
      .createServer((request, response) =>
        // https://github.com/vercel/serve-handler#options
        handler(request, response, {
          public: pkg.publicPath,
        })
      )
      .listen(port, () => {
        log(`Running at ${url}`);
      });

    for (const tableSize of TableSizeList) {
      let baseInfo = {
        name: pkg.name,
        url,
        tableSize,
      };

      let baseInfoStr = JSON.stringify(baseInfo);

      let count = 1;
      while (count <= RepeatMountTimes) {
        spinner.text = `${count}/${RepeatMountTimes} ${baseInfoStr}`;

        const page = await createNewPage(browser);

        const newURL = new URL(url);
        newURL.searchParams.set("table-size", tableSize);

        await page.evaluateOnNewDocument(
          ({ UpdateButtonId, RepeatUpdateTimes }) => {
            window.__profileDataList = [];
            window.updateButtonId = UpdateButtonId;
            window.pushProfile = data => {
              window.__profileDataList.push(data);
              if (window.__profileDataList.length <= RepeatUpdateTimes) {
                setTimeout(() => {
                  document.getElementById(UpdateButtonId).click();
                }, 1);
              }
            };
          },
          {
            RepeatUpdateTimes,
            UpdateButtonId,
          }
        );

        await page.goto(newURL, {
          waitUntil: "networkidle0",
        });

        const profileDataJSHandler = await page.waitForFunction(
          ({ RepeatUpdateTimes }) => {
            return window.__profileDataList &&
              window.__profileDataList.length >= 1 + RepeatUpdateTimes
              ? window.__profileDataList
              : false;
          },
          {},
          { RepeatUpdateTimes }
        );

        const profileDataList = await profileDataJSHandler.evaluate(
          value => value
        );

        let data = profileMap.get(baseInfo) || [];
        data.push(...profileDataList);
        profileMap.set(baseInfo, data);

        spinner.text = "Closing";
        await page.close();

        count++;
      }

      log("DONE", baseInfoStr);
    }

    await new Promise(resolve => server.close(resolve));
    port++;

    spinner.stop();
  }

  const tableSizeGroupMap = new Map();
  for (let [baseInfo, dataList] of profileMap.entries()) {
    if (!tableSizeGroupMap.has(baseInfo.tableSize)) {
      tableSizeGroupMap.set(baseInfo.tableSize, []);
    }
    tableSizeGroupMap
      .get(baseInfo.tableSize)
      .push([
        baseInfo.name,
        calcAverageActualTime(
          dataList
            .filter(data => data.phase === "mount")
            .map(data => data.actualTime)
        ),
        calcAverageActualTime(
          dataList
            .filter(data => data.phase === "update")
            .map(data => data.actualTime)
        ),
      ]);
  }

  const resultContent = [];
  for (let [tableSize, rows] of tableSizeGroupMap.entries()) {
    resultContent.push(
      tableSize,
      table([["Name", "Mount Time (ms)", "Update Time (ms)"], ...rows])
    );
  }

  await fs.writeFile(
    path.join(__dirname, "../RESULT.md"),
    resultContent.join("\n\n")
  );

  await browser.close();
  spinner.stop();
})();
