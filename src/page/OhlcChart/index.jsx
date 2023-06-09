import React, { useEffect, useState } from "react";
import { OHLC } from "./component/OHLC";
import { socket_url } from "../../utils/socket";
import useWebSocket from "react-use-websocket";
import { series as constant } from "../../utils/constant";
export const OhlcChart = () => {
  const [series, setSeries] = useState([]);
  const [timeFrame, setTimeFrame] = useState({ time: "1m", changed: false });
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
    onMessage: (_msg) => {
      ohlcParser();
    },
  });
  const ohlcParser = () => {
    if (ws.lastJsonMessage?.length) {
      if (timeFrame.changed) {
        setSeries([]);
      }
      setTimeFrame({ time: timeFrame.time, changed: false });
      const data = ws.lastJsonMessage[1];
      let timesTamp, mappedArr;
      if (data.length === 6) {
        timesTamp = data[constant.MTS];
        mappedArr = [];
        mappedArr.push(timesTamp);
        mappedArr.push(data.slice(1, 5));
        setSeries((prev) => [...prev, mappedArr]);
      }
      if (data.length > 6) {
        let final = [];
        data.map((item) => {
          timesTamp = item[constant.MTS];
          mappedArr = [];
          mappedArr.push(timesTamp);
          mappedArr.push(item.slice(1, 5));
          final.push(mappedArr);
        });
        setSeries((prev) => [...prev, ...final]);
      }
    }
  };
  useEffect(() => {
    handleTimeFrame(timeFrame.time);
  }, []);
  const handleTimeFrame = (time) => {
    let msg = {
      event: "subscribe",
      channel: "candles",
      key: `trade:${time}:tBTCUSD`,
    };
    ws.sendJsonMessage(msg);
    setTimeFrame({ time, changed: true });
  };
  return series.length ? (
    <OHLC series={series} handleTimeFrame={handleTimeFrame} />
  ) : null;
};
