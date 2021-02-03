import { calcAverageActualTime } from "../lib/common/utils";

export function buildEChartConfig({
  title,
  xAxisData,
  seriesData,
  legendData,
}) {
  return {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 30,
      data: legendData,
    },
    grid: {
      right: 300,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };
}

export function generatePhaseActualTimeSeriesMap({ phase, data, xAxisData }) {
  return data.reduce((map, [info, dataList]) => {
    if (!map.has(info.name)) {
      map.set(info.name, {
        name: info.name,
        type: "line",
        data: Array(xAxisData.length),
      });
    }

    const seriesItem = map.get(info.name);
    const index = xAxisData.findIndex(
      xAxisValue => xAxisValue === info.tableSize
    );
    if (index !== -1) {
      seriesItem.data[index] = calcAverageActualTime(
        dataList
          .filter(data => data.phase === phase)
          .map(data => data.actualTime)
      );
    }
    return map;
  }, new Map());
}
