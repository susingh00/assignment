export type seriesType = number[] | any;

export interface OHLCType {
  series: seriesType;
  timeFrame: string;
  fecthCandle: (time: string) => Promise<void>;
}
