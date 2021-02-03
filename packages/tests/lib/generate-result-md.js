const path = require("path");
const fs = require("fs").promises;
const table = require("markdown-table");

const { calcAverageActualTime } = require("./common/utils");

if (!process.argv[2]) {
  throw new Error("Need input path!");
}

if (!process.argv[3]) {
  throw new Error("Need output path");
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

const profileMap = new Map(require(inputPath));

(async () => {
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
      `${tableSize}:`,
      table([["Name", "Mount Time (ms)", "Update Time (ms)"], ...rows]),
      "\n"
    );
  }

  await fs.writeFile(outputPath, resultContent.join("\n"));
})();
