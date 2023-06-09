import React from "react";
import { Chart } from "../../../component/Chart";
import { Link } from "react-router-dom";
import { routes } from "../../../utils/routes";

export const Order = (props) => {
  return (
    <div>
      <div className="p-2 flex flex-row items-center border-b-2 border-gray-500">
        <Link className="mx-2" to={routes.ohlc}>
          <i class="fa-solid fa-circle-chevron-left text-xl"></i>
        </Link>
        <h2>
          ORDER BOOK <span className="text-gray-400">BTC/USD</span>
        </h2>
      </div>
      <div className="flex justify-center p-10">
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400">COUNT</p>
            <p className="text-gray-400">AMOUNT</p>
            <p className="text-gray-400">TOTAL</p>
            <p className="text-gray-400">PRICE</p>
          </div>
          {props.bids.map((bid, index) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="green-box"
                style={{ width: (Number(bid.total) * 10) / 2 + "%" }}
              ></div>
              <p>{bid.count}</p>
              <p>{bid.amount}</p>
              <p>{Number(bid.total).toFixed(4)}</p>
              <p>{bid.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400">PRICE</p>
            <p className="text-gray-400">TOTAL</p>
            <p className="text-gray-400">AMOUNT</p>
            <p className="text-gray-400">COUNT</p>
          </div>
          {props.asks.map((ask, index) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="red-box"
                style={{ width: (Number(ask.total) * 10) / 2 + "%" }}
              ></div>
              <p>{ask.price.toLocaleString()}</p>
              <p>{Number(ask.total).toFixed(4)}</p>
              <p>{ask.amount}</p>
              <p>{ask.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
