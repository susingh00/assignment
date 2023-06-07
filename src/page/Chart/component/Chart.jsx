import React, { useEffect, useRef, useState } from "react";
import { Chart } from "../../../component/Chart";
import moment from "moment";
import { Link } from "react-router-dom";

export function ChartComponent(props) {
  const [currentPrice, setcurrentPrice] = useState(
    props.series[props.series.length - 1][1]
    );
    useEffect(() => {
      setcurrentPrice(props.series[props.series.length - 1][1]);
    }, [props.series]);

  return (
    <div>
      <div className="flex justify-between p-2 border-gray-400 border-b-2">
        <h3>
          CHART <span className="text-gray-400">BTC/USD</span>
        </h3>
        <div className="flex items-center">
          <p className="text-gray-400 text-sm">SHOW LIQUIDATIONS</p>
          <i className="fa-solid fa-arrows-rotate text-gray-200 ms-2 text-sm"></i>
          <Link className="mx-2 border-2 p-2 rounded" to={"/order"}>Book Order's</Link>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between px-2">
          <div>
            <div>
              <button className="p-2">
                <p className="text-sm text-gray-400">30m</p>
              </button>
              <button className="p-2">
                <p className="text-sm  text-gray-400">-</p>
              </button>
              <button className="p-2">
                <p className="text-sm  text-gray-400">Indicators</p>{" "}
              </button>
            </div>
            <div>
              <h5>
                BTC/USD 30 Bitfinex{" "}
                <span className="text-gray-400 mx-1">O</span>
                <span className="text-green-600">
                  {currentPrice[0]}
                </span>
                <span className="text-gray-400 mx-1">H</span>
                <span className="text-green-600">
                  {currentPrice[1]}
                </span>
                <span className="text-gray-400 mx-1">L</span>
                <span className="text-green-600">
                  {currentPrice[2]}
                </span>
                <span className="text-gray-400 mx-1">C</span>
                <span className="text-green-600">
                  {currentPrice[3]}
                </span>
              </h5>
            </div>
          </div>
          {/* <div>
            <button className="p-2">
              <i className="fa-solid fa-maximize text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-maximize text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-download text-gray-400"></i>
            </button>
          </div> */}
        </div>
        <div className="flex">
          <div
            style={{
              flex: "0.05",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <button className="p-2">
              <i className="fa-solid fa-crosshairs text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-paintbrush text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-pen text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-paintbrush text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-bacon text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-paintbrush text-gray-400"></i>
            </button>
            <button className="p-2">
              <i className="fa-solid fa-lock text-gray-400"></i>
            </button>
          </div>
          <div style={{ flex: "0.95" }}>
            <Chart series={props.series}/>
            <div className="flex justify-between items-center">
              <div>
                <button className="p-2" onClick={()=>props.handleTimeFrame("1m")}>
                  <p className="text-sm text-gray-400">1m</p>
                </button>
                <button className="p-2" onClick={()=>props.handleTimeFrame("5m")}>
                  <p className="text-sm text-gray-400">5m</p>
                </button>
                <button className="p-2" onClick={()=>props.handleTimeFrame("1D")}>
                  <p className="text-sm text-gray-400">1D</p>
                </button>
                <button className="p-2" onClick={()=>props.handleTimeFrame("1W")}>  
                  <p className="text-sm text-gray-400">1w</p>
                </button>
                <button className="p-2" onClick={()=>props.handleTimeFrame("1M")}>
                  <p className="text-sm text-gray-400">1M</p>
                </button>
              </div>
              <div className="flex">
                <p className="text-sm text-gray-400">
                  {moment().format("hh:mm:ss (UTC)")}
                </p>
                <div
                  className="text-gray-400 mx-2"
                  style={{ borderLeft: " solid 0.5px", height: "20px" }}
                />
                <p className="text-sm text-gray-400">%</p>
                <p className="text-sm text-gray-400 mx-2">log</p>
                <p className="text-sm">auto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
