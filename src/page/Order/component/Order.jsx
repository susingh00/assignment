import React from "react";
import { Chart } from "../../../component/Chart";

export const Order = (props) => {
  return (
    <div>
      <div className="p-2 flex flex-row items-center border-b-2 border-gray-500">
        <i className="fa-solid fa-chevron-down text-gray-400 mr-2"></i>
        <h2>
          ORDER BOOK <span className="text-gray-400">BTC/USD</span>
        </h2>
      </div>
        {/* <Chart series={props.series} type={"area"}/> */}
      <div className="flex justify-center p-2">
        <table className="w-3/6 text-center">
          <thead>
            <tr>
              <td className="text-gray-400">COUNT</td>
              <td className="text-gray-400">AMOUNT</td>
              {/* <td className="text-gray-400">TOTAL</td> */}
              <td className="text-gray-400">PRICE</td>
            </tr>
          </thead>
          <tbody>
            {props.bids.map((bid, index) => (
              <tr className="p-5" key={index}>
                <td>{bid.count}</td>
                <td>{bid.amount}</td>
                <td>{bid.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-3/6 text-center">
          <thead>
            <tr>
              <td className="text-gray-400">PRICE</td>
              <td className="text-gray-400">AMOUNT</td>
              <td className="text-gray-400">COUNT</td>
              {/* <td className="text-gray-400">TOTAL</td> */}
            </tr>
          </thead>
          <tbody>
            {props.asks.map((ask, index) => (
              <tr className="p-5" key={index}>
                <td>{ask.price}</td>
                <td>{ask.amount}</td>
                <td>{ask.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
