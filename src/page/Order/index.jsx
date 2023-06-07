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
      console.log('ws?.lastJsonMessage: ', ws?.lastJsonMessage);
      if (ws?.lastJsonMessage?.length == 2) {
        let values = ws?.lastJsonMessage[1];
        if (values.length === 3) {
          handleMap(values);
        } else if(values.length>3){
          values.forEach((value) => {
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
          amount: values[2].toFixed(4),
          price: values[0],
          total: values[2].toFixed(4)
        };
        let updated_bids = [];
        if (bids.length) {
          let _bids = [...bids];
          let total_bid=0
          _bids.forEach((bid) => {
            total_bid+=Number(bid.amount)
            if (bid.price === bid_payload.price) {
              updated_bids.push(bid_payload);
            } else {
              bid.total=total_bid
              updated_bids.push(bid);
            }
          });
          let data=updated_bids.map(bid=>{
            return [bid.price,bid.amount]
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
          amount:Math.abs(values[2].toFixed(4)),
          price: values[0],
          total: Math.abs(values[2].toFixed(4))
        };
        let updated_asks = [];
        if (asks.length) {
          let _asks = [...asks];
          let total_bid=0
          _asks.forEach((ask) => {
            total_bid+=ask.amount
            if (ask.price === ask_payload.price) {
              updated_asks.push(ask_payload);
            } else {
              ask.total=total_bid
              updated_asks.push(ask);
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
        let filter_bids = remove_bids.filter((bid) => bid.price !== values[0]);
        setbids([...filter_bids]);
      } else if (values[2] == -1) {
        let remove_asks = [...asks];
        let filter_asks = remove_asks.filter((ask) => ask.price !== values[0]);
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
