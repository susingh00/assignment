import React from "react";
import ReactApexChart from "react-apexcharts";
import { ohlc } from "../utils/constant";
export const Chart = (props) => {
  return (
    <div style={{ height: "80vh" }}>
      <ReactApexChart
        options={props.options}
        series={[{ data: props.series }]}
        type={props.type}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};
Chart.defaultProps = {
  type: "candlestick",
  options: {
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: true,
        type: "x",
        resetIcon: {
          offsetX: -10,
          offsetY: 0,
          fillColor: "#fff",
          strokeColor: "#37474F",
        },
        selection: {
          background: "#90CAF9",
          border: "#0D47A1",
        },
      },
      events: {
        mouseMove: () => {
          let elements = document.querySelector(".apexcharts-tooltip-box");
          if (elements) {
            elements = elements.childNodes;
            if (elements.length) {
              const open = elements[ohlc.open].textContent.split(": ")[1];
              const high = elements[ohlc.high].textContent.split(": ")[1];
              const low = elements[ohlc.low].textContent.split(": ")[1];
              const close = elements[ohlc.close].textContent.split(": ")[1];
              const ids = document.querySelectorAll("#price-action");
              if (ids.length) {
                ids[ohlc.open].innerHTML = open;
                ids[ohlc.high].innerHTML = high;
                ids[ohlc.low].innerHTML = low;
                ids[ohlc.close].innerHTML = close;
              }
            }
          }
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: "#ccc",
    },
    xaxis: {
      type: "datetime",
      title: {
        style: {
          color: "#fff",
        },
      },
    },
    yaxis: {
      opposite: true,
      enabled: true,
    },
  },
};
