import useWebSocket from "react-use-websocket";
import { Order } from "./component/Order";
import { useEffect, useState } from "react";
import { socket_url } from "../../utils/socket";

export const OrderScreen = () => {
  const [bids, setbids] = useState([]);
  const [asks, setasks] = useState([]);
  const [series, setseries] = useState([])
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: (closeEvent) => true,
    onMessage: (_msg) => {
      if (ws?.lastJsonMessage?.length == 2) {
        let values = ws?.lastJsonMessage[1];
        if (values.length === 3) {
          handleMap(values);
        } else if(values.length>3){
          values.map((value) => {
            handleMap(value);
          });
        }
      }
    },
  });
  const handleMap = (values) => {
    if (values[1] > 0) {
      if (values[2] > 0) {
        let bid_payload = {
          count: values[1],
          amount: values[2],
          price: values[0],
        };
        let updated_bids = [];
        if (bids.length) {
          let _bids = [...bids];
          _bids.forEach((x) => {
            if (x.price === bid_payload.price) {
              updated_bids.push(bid_payload);
            } else {
              updated_bids.push(x);
            }
          });
          let data=updated_bids.map(x=>{
            return [x.price,x.count]
          })
          setseries([...data])
          setbids(prev=>[...updated_bids]);
        } else {
          updated_bids.push(bid_payload);
          setbids(prev=>[...prev,bid_payload]);
        }
      } else {
        let ask_payload = {
          count: values[1],
          amount: values[2],
          price: values[0],
        };
        let updated_asks = [];
        if (asks.length) {
          let _asks = [...asks];
          _asks.forEach((x) => {
            if (x.price === ask_payload.price) {
              updated_asks.push(ask_payload);
            } else {
              updated_asks.push(x);
            }
          });
          setasks(prev=>[...updated_asks]);
        } else {
          // updated_asks.push(ask_payload);
          setasks(prev=>[...prev,ask_payload]);
        }
      }
    } else if (values[2] == 0) {
      if (values[2] == 1) {
        let remove_bids = [...bids];
        let filter_bids = remove_bids.filter((x) => x.price !== values[0]);
        setbids([...filter_bids]);
      } else if (values[2] == -1) {
        let remove_asks = [...asks];
        let filter_asks = remove_asks.filter((x) => x.price !== values[0]);
        setbids([...filter_asks]);
      }
    }
  };
  useEffect(() => {
    ws.sendJsonMessage({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    });
  }, []);

  return <Order bids={bids} asks={asks} series={series}/>;
};
