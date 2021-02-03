const http = require("http");
const path = require("path");
const fs = require("fs").promises;

const puppeteer = require("puppeteer");
const ora = require("ora");
const handler = require("serve-handler");
const table = require("markdown-table");

const { getTestPackages, createNewPage, createLog } = require("./utils");
const {
  RepeatMountTimes,
  RepeatUpdateTimes,
  TableSizeList,
  UpdateButtonId,
} = require("./common/constants");

if (!process.argv[2]) {
  throw new Error("Need output path");
}

const outputPath = path.resolve(process.argv[2]);

const spinner = ora();

const log = createLog({ spinner });

(async () => {
  const profileMap = new Map();

  const browser = await puppeteer.launch();

  let port = 3000;

  for (const pkg of getTestPackages()) {
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

        spinner.text = "Closing Page";
        await page.close();

        count++;
      }

      log("DONE", baseInfoStr);
    }

    spinner.text = "Closing Server";
    await new Promise(resolve => server.close(resolve));
    port++;

    spinner.stop();
  }

  await fs.writeFile(
    outputPath,
    `module.exports = ${JSON.stringify([...profileMap.entries()], null, 4)}`
  );

  await browser.close();
  spinner.stop();
})();
