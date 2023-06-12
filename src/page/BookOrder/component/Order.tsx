import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";
import {
  BookOrderPropsType,
  BookOrderType,
} from "../../../utils/types/BookOrder.types";

export const Order = (props: BookOrderPropsType) => {
  return (
    <div>
      <div className="p-2 flex flex-row items-center border-b-2 border-gray-500">
        <Link className="mx-2" to={routes.ohlc}>
          <i className="fa-solid fa-circle-chevron-left text-xl"></i>
        </Link>
        <h2>
          ORDER BOOK <span className="text-gray-400">BTC/USD</span>
        </h2>
      </div>
      <div className="flex justify-center text-center p-10">
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400 w-2">COUNT</p>
            <p className="text-gray-400 w-2">AMOUNT</p>
            <p className="text-gray-400 w-2">TOTAL</p>
            <p className="text-gray-400 w-2">PRICE</p>
          </div>
          {props.bids.map((bid: BookOrderType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="green-box"
                style={{ width: (Number(bid.total) * 10) / 2 + "%" }}
              ></div>
              <p className="w-2">{bid.count}</p>
              <p className="w-2">{bid.amount}</p>
              <p className="w-2">{Number(bid.total).toFixed(4)}</p>
              <p className="w-2">{bid.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400 w-2">PRICE</p>
            <p className="text-gray-400 w-2">TOTAL</p>
            <p className="text-gray-400 w-2">AMOUNT</p>
            <p className="text-gray-400 w-2">COUNT</p>
          </div>
          {props.asks.map((ask: BookOrderType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="red-box"
                style={{ width: (Number(ask.total) * 10) / 2 + "%" }}
              ></div>
              <p className="w-2">{ask.price.toLocaleString()}</p>
              <p className="w-2">{Number(ask.total).toFixed(4)}</p>
              <p className="w-2">{ask.amount}</p>
              <p className="w-2">{ask.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
