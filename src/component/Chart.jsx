import React from "react";
import ReactApexChart from "react-apexcharts";
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
