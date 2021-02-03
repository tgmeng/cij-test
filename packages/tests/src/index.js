import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import { TableSizeList } from "../lib/common/constants";
import { buildEChartConfig, generatePhaseActualTimeSeriesMap } from "./utils";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

const mountChartDOM = document.createElement("div");
mountChartDOM.style.width = "100%";
mountChartDOM.style.height = "800px";
document.body.appendChild(mountChartDOM);

const updateChartDOM = document.createElement("div");
updateChartDOM.style.width = "100%";
updateChartDOM.style.height = "800px";
document.body.appendChild(updateChartDOM);

const mountChart = echarts.init(mountChartDOM);
const updateChart = echarts.init(updateChartDOM);

import("./data").then(({ default: data }) => {
  const mountDataMap = generatePhaseActualTimeSeriesMap({
    phase: "mount",
    xAxisData: TableSizeList,
    data,
  });

  const updateDataMap = generatePhaseActualTimeSeriesMap({
    phase: "update",
    xAxisData: TableSizeList,
    data,
  });

  mountChart.setOption(
    buildEChartConfig({
      title: "@cij-test/tests - mount",
      xAxisData: TableSizeList,
      seriesData: Array.from(mountDataMap.values()),
      legendData: Array.from(mountDataMap.keys()),
    })
  );

  updateChart.setOption(
    buildEChartConfig({
      title: "@cij-test/tests - update",
      xAxisData: TableSizeList,
      seriesData: Array.from(updateDataMap.values()),
      legendData: Array.from(updateDataMap.keys()),
    })
  );
});
