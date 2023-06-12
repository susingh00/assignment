import { seriesType } from "./OHLC.type";

export interface ChartType {
  type:
    | "candlestick"
    | "area"
    | "line"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | undefined;
  options: Object;
  series: seriesType;
}
