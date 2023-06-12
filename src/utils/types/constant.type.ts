import { DurationInputArg1, DurationInputArg2 } from "moment";

interface tradeTime {
  timeFrame: string;
  limit: number;
}
export interface epochTimeType {
  [name: string]: tradeTime;
}
export interface subtractTimeType {
  num: DurationInputArg1;
  time: DurationInputArg2;
}
