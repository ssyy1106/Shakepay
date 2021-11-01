import React, { Component } from "react";
import "./style.css";
//import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import axios from "axios";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      graph: [],
      rateBtc: 0,
      rateEth: 0
    };
    this.getRate();
    this.getUiData();
  }

  getRate = async () => {
    const api = "https://api.shakepay.co/rates"
    const data = await axios
      .get(api)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
          console.log(err)
          return {BTC_CAD:76260.2, ETH_CAD:5374.03}
      });
    this.setState({ rateBtc: data["BTC_CAD"] });
    this.setState({ rateEth: data["ETH_CAD"] });
    return data;
  }

  getUiData = async () => {
    const api = "https://shakepay.github.io/programming-exercise/web/transaction_history.json"
    const data = await axios
      .get(api)
      .then((res) => {
        return res.data.reverse();
      })
      .catch((err) => console.log(err));
    // normalize data
    const nomalizedData = data.reduce((acc, s) => {
        let amountBTC = 0.0
        let amountETH = 0.0
        let amountCAD = 0.0
        if (acc.length>0) {
            amountBTC = acc[acc.length-1]["amountBTC"]
            amountETH = acc[acc.length-1]["amountETH"]
            amountCAD = acc[acc.length-1]["amountCAD"]
        }
        switch (s.type) {
            case "conversion":
                switch (s.from.currency) {
                    case "BTC":
                        amountBTC -= s.from.amount
                        break
                    case "ETH":
                        amountETH -= s.from.amount
                        break
                    case "CAD":
                        amountCAD -= s.from.amount
                        break
                    default:
                        console.log(s.from.currency)
                }
                switch (s.to.currency) {
                    case "BTC":
                        amountBTC += s.to.amount
                        break
                    case "ETH":
                        amountETH += s.to.amount
                        break
                    case "CAD":
                        amountCAD += s.to.amount
                        break
                        default:
                            console.log(s.to.currency)
                }
                break
            default:
                if (s.direction === "credit") {
                    switch (s.currency) {
                        case "BTC":
                            amountBTC += s.amount
                            break
                        case "ETH":
                            amountETH += s.amount
                            break
                        case "CAD":
                            amountCAD += s.amount
                            break
                        default:
                            console.log(s.direction)
                    }
                } else {
                    switch (s.currency) {
                        case "BTC":
                            amountBTC -= s.amount
                            break
                        case "ETH":
                            amountETH -= s.amount
                            break
                        case "CAD":
                            amountCAD -= s.amount
                            break
                        default:
                            console.log(s.direction)
                    }
                }
        }
        acc.push({
            createdAt: s.createdAt,
            amount: amountBTC * this.state.rateBtc + amountETH * this.state.rateEth + amountCAD,
            amountBTC,
            amountETH,
            amountCAD
        })
        return acc
    }, [])

    this.setState({ data: nomalizedData });
    return nomalizedData;
  };

  extractDataToList = (arg) => {
    const data = this.state.data;
    const res = [];
    for (let i in data) {
      let item = data[i][arg];
      if (arg === "createdAt") {
        let i =
          item.toString().slice(0, 4) +
          "-" +
          item.toString().slice(5, 7) +
          "-" +
          item.toString().slice(8, 10);
        res.unshift(i);
      } else {
        res.unshift(data[i][arg]);
      }
    }
    return res.reverse();
  };

  componentDidMount = () => {
    document.title = "Covid USA";
  };

  render() {
    const dates = this.extractDataToList("createdAt");
    const netWorth = this.extractDataToList("amount");

    const data = {
      tooltip: {
        trigger: "net worth",
        axisPointer: {
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["NetWorth"]
      },
      dataZoom: [
        {
          type: "slider",
          height: 8,
          bottom: 20,
          borderColor: "transparent",
          backgroundColor: "#e2e2e2",
        //   handleIcon:
        //     "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
          handleSize: 20,
          handleStyle: {
            shadowBlur: 6,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            shadowColor: "#aaa"
          }
        },
        {
          type: "inside"
        }
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: dates,
        show: true,
        axisLabel: {
          color: "gray",
          fontWeight: "bold",
          rotate: 90,
          interval: 6
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "gray",
          inside: true
        }
      },
      series: [
        {
          name: "Infected",
          type: "bar",
          smooth: true,
          data: netWorth,
          symbol: "none",
          color: "#0000ff"
        }
      ]
    };
    return (
      <div className="App">
        <h2>Net worth(Canadien dollar)</h2>
        <ReactEcharts
          style={{
            height: "600px",
            width: "100%"
          }}
          option={data}
        />
      </div>
    );
  }
}

export default Chart;