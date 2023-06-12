import useWebSocket from "react-use-websocket";
import { Order } from "./component/Order";
import { useEffect, useState } from "react";
import { socket_url } from "../../utils/socket";
import { orderBook } from "../../utils/constant";
import { BookOrderType } from "../../utils/types/BookOrder.types";

export const BookOrder = () => {
  const [bids, setBids] = useState<Array<BookOrderType>>([]);
  const [asks, setAsks] = useState<Array<BookOrderType>>([]);
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: () => true,
    onMessage: (_msg) => {
      if (ws.lastJsonMessage?.length === 2) {
        let eventData: any = ws.lastJsonMessage;
        const values: [] | any = eventData[orderBook.DATA];
        if (values.length === 3) {
          orderBookParser(values);
        } else if (values.length > 3) {
          values.forEach((value: number[]) => {
            orderBookParser(value);
          });
        }
      }
    },
  });
  const orderBookParser = (values: number[]) => {
    if (values[orderBook.COUNT] > 0) {
      if (values[orderBook.AMOUNT] > 0) {
        const bid_payload: BookOrderType = {
          count: values[orderBook.COUNT],
          amount: Number(values[orderBook.AMOUNT].toFixed(4)),
          price: values[orderBook.PRICE],
          total: Number(values[orderBook.AMOUNT].toFixed(4)),
        };
        let updated_bids: BookOrderType[] = [];
        if (bids.length) {
          let _bids = [...bids];
          let total_bid = 0;
          _bids.forEach((bid: BookOrderType) => {
            total_bid += Number(bid.amount);
            if (bid.price === bid_payload.price) {
              updated_bids.push(bid_payload);
            } else {
              bid.total = total_bid;
              updated_bids.push(bid);
            }
          });
          setBids([...updated_bids]);
        } else {
          updated_bids.push(bid_payload);
          setBids((prev) => [...prev, bid_payload]);
        }
      } else {
        const ask_payload = {
          count: values[orderBook.COUNT],
          amount: Math.abs(Number(values[orderBook.AMOUNT].toFixed(4))),
          price: values[orderBook.PRICE],
          total: Math.abs(Number(values[orderBook.AMOUNT].toFixed(4))),
        };
        let updated_asks: BookOrderType[] = [];
        if (asks.length) {
          let _asks = [...asks];
          let total_bid = 0;
          _asks.forEach((ask) => {
            total_bid += ask.amount;
            if (ask.price === ask_payload.price) {
              updated_asks.push(ask_payload);
            } else {
              ask.total = total_bid;
              updated_asks.push(ask);
            }
          });
          setAsks([...updated_asks]);
        } else {
          setAsks((prev) => [...prev, ask_payload]);
        }
      }
    } else if (values[orderBook.COUNT] === 0) {
      if (values[orderBook.AMOUNT] === 1) {
        let remove_bids = [...bids];
        let filter_bids = remove_bids.filter(
          (bid) => bid.price !== values[orderBook.PRICE]
        );
        setBids([...filter_bids]);
      } else if (values[orderBook.AMOUNT] === -1) {
        let remove_asks = [...asks];
        let filter_asks = remove_asks.filter(
          (ask) => ask.price !== values[orderBook.PRICE]
        );
        setBids([...filter_asks]);
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

  return <Order bids={bids} asks={asks} />;
};
