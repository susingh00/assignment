import React from "react";
import { Chart } from "../../../component/Chart";

export const Order = (props) => {
  let options = {
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
      },
    },
    tooltip: {
      theme: "dark",
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };
  return (
    <div>
      <div className="p-2 flex flex-row items-center border-b-2 border-gray-500">
        <i className="fa-solid fa-chevron-down text-gray-400 mr-2"></i>
        <h2>
          ORDER BOOK <span className="text-gray-400">BTC/USD</span>
        </h2>
      </div>
      {/* <Chart series={props.series} type={"area"} options={options} /> */}
      <div className="flex justify-center p-10">
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400">COUNT</p>
            <p className="text-gray-400">AMOUNT</p>
            <p className="text-gray-400">TOTAL</p>
            <p className="text-gray-400">PRICE</p>
          </div>
            {props.bids.map((bid, index) => (
              <div className="flex justify-evenly relative" key={index} style={{overflow:"hidden"}}>
                <div className="green-box" style={{width:(Number(bid.total)*10)/1.2+"%"}}></div>
                <p>{bid.count}</p>
                <p>{bid.amount}</p>
                <p>{Number(bid.total).toFixed(4)}</p>
                <p>{bid.price.toLocaleString()}</p>
              </div>
            ))}
        </div>
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400">COUNT</p>
            <p className="text-gray-400">AMOUNT</p>
            <p className="text-gray-400">TOTAL</p>
            <p className="text-gray-400">PRICE</p>
          </div>
            {props.asks.map((ask, index) => (
              <div className="flex justify-evenly relative" key={index} style={{overflow:"hidden"}}>
                <div className="red-box" style={{width:(Number(ask.total)*10)/2+"%"}}></div>
                <p>{ask.count}</p>
                <p>{ask.amount}</p>
                <p>{Number(ask.total).toFixed(4)}</p>
                <p>{ask.price.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
