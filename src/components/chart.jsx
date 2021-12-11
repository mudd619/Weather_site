import React, { Component, useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";

class App11 extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.dim,"aaaa")
  }

  render() {
    

    // this.state.options.xaxis.categories = 
    // this.state.series[0].data = [`${(Number(this.props.vall[0].min)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].morn)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].day)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].max)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].eve)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].night)-273.15).toFixed(2).split(".")[0]}° C`]

    var options = {
      chart: {
          toolbar: {
              show: false
            },
        id: "basic-bar",
      },
      xaxis: {
        categories: [`${(Number(this.props.vall[0].min)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].morn)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].day)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].max)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].eve)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].night)-273.15).toFixed(2).split(".")[0]}° C`],
        
      },
      
    }

    var series = [
      {
        name: "series-1",
        data: [`${(Number(this.props.vall[0].min)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].morn)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].day)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].max)-273.15).toFixed(2).split(".")[0]}° C`, `${(Number(this.props.vall[0].eve)-273.15).toFixed(2).split(".")[0]}° C`,`${(Number(this.props.vall[0].night)-273.15).toFixed(2).split(".")[0]}° C`]
      }
    ]

    
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="line"
              width={this.props.dim[0]-48 > 1300 ? `${this.props.dim[0]-808}`  : this.props.dim[0]-48 > 750 ?`${this.props.dim[0]-548}` : `${this.props.dim[0]-48}`||"315"}
              height= {this.props.dim[0]-48 > 1100 ? `${this.props.dim[0]-1048}` : this.props.dim[0]-185 > 610 ?`${this.props.dim[0]-648}` : `${this.props.dim[0]-185}`||"162"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App11;