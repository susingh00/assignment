import React, { useEffect, useState } from "react";
import { OHLC } from "./component/OHLC";
import { socket_url } from "../../utils/socket";
import useWebSocket from "react-use-websocket";
import { series as constant, epochTime } from "../../utils/constant";
import moment from "moment";
import { apiCall } from "../../utils/apiCall";
import { endpoint } from "../../utils/endPoints";
export const OhlcChart = () => {
  const [series, setSeries] = useState([]);
  const [timeFrame, setTimeFrame] = useState("1h");
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
    onMessage: (_msg) => {
      ohlcParser();
    },
  });
  useEffect(() => {
    fecthCandle("1h");
  }, []);
  const fecthCandle = async (time) => {
    try {
      setTimeFrame(time);
      let subtractTime = { num: 1, time: "hour" };
      switch (time) {
        case "6h":
          subtractTime.num = 6;
          break;
        case "1d":
          subtractTime.num = 1;
          subtractTime.time = "day";
          break;
        case "3d":
          subtractTime.num = 3;
          subtractTime.time = "day";
          break;
        case "7d":
          subtractTime.num = 7;
          subtractTime.time = "day";
          break;
        case "1m":
          subtractTime.num = 1;
          subtractTime.time = "month";
        case "3m":
          subtractTime.num = 3;
          subtractTime.time = "month";
          break;
        case "1y":
          subtractTime.num = 1;
          subtractTime.time = "year";
          break;
        case "3y":
          subtractTime.num = 3;
          subtractTime.time = "year";
          break;
        default:
          break;
      }
      const startTime = moment()
        .utc()
        .subtract(subtractTime.num, subtractTime.time)
        .valueOf();
      const endTime = moment().utc().valueOf();
      const limit = epochTime[time].limit;
      const tradeTime = epochTime[time].timeFrame;
      const path = `${endpoint.candles}:${tradeTime}:tBTCUSD/hist?start=${startTime}&end=${endTime}&limit=${limit}`;
      const res = await apiCall("GET", path);
      if (res.status === 200) {
        let timeStamp,
          mappedArr,
          final = [];
        res.data.map((item) => {
          timeStamp = item[constant.MTS];
          mappedArr = [];
          mappedArr.push(timeStamp);
          mappedArr.push(item.slice(1, 5));
          final.push(mappedArr);
        });
        setSeries([...final]);
        handleTimeFrame(epochTime[timeFrame].timeFrame);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const ohlcParser = () => {
    if (ws.lastJsonMessage?.length) {
      let timeStamp, mappedArr;
      const data = ws.lastJsonMessage[constant.DATA];
      if (data.length === 6) {
        timeStamp = data[constant.MTS];
        mappedArr = [];
        mappedArr.push(timeStamp);
        mappedArr.push(data.slice(1, 5));
        setSeries((prev) => [...prev, mappedArr]);
      }
    }
  };

  const handleTimeFrame = (time) => {
    let msg = {
      event: "subscribe",
      channel: "candles",
      key: `trade:${time}:tBTCUSD`,
    };
    ws.sendJsonMessage(msg);
  };
  return series.length ? (
    <OHLC series={series} fecthCandle={fecthCandle} timeFrame={timeFrame} />
  ) : null;
};
