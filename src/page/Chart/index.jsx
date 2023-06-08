import React, { useEffect, useRef, useState } from "react";
import { ChartComponent } from "./component/Chart";
import { socket_url } from "../../utils/socket";
import useWebSocket from "react-use-websocket";
export const ChartScreen = () => {
  // const series = useRef([]);
  const [series, setseries] = useState([])
  const [timeFrame, settimeFrame] = useState({time:"1m",changed:false});
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
    onMessage: (_msg) => {
      if (ws?.lastJsonMessage?.length) {
        if(timeFrame.changed){
          setseries([])
        }
        settimeFrame({time:timeFrame.time,changed:false})
        const data = ws?.lastJsonMessage[1];
        let timestamp, mapped_arr;
        if (data.length == 6) {
          timestamp = data[0];
          mapped_arr = [];
          mapped_arr.push(timestamp);
          mapped_arr.push(data.slice(1, 5));
          setseries(prev=>[...prev,mapped_arr])
          // series.current.push(mapped_arr);
        }
        if (data.length > 6) {
          let final=[]
          data.map((item) => {
            timestamp = item[0];
            mapped_arr = [];
            mapped_arr.push(timestamp);
            mapped_arr.push(item.slice(1, 5));
            final.push(mapped_arr)
            // series.current.push(mapped_arr);
          });
          setseries(prev=>[...prev,...final])
        }
      }
    },
  });
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
    settimeFrame({time,changed:true});
  };
  return series.length ? (
    <ChartComponent
      series={series}
      handleTimeFrame={handleTimeFrame}
    />
  ) : null;
};
