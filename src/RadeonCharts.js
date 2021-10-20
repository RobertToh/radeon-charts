import React from "react";
import CSVReader from "./CSVReader";
import CustomLineChart from "./CustomLineChart";
import FPSBarChart from "./FPSBarChart";

// array of objects, each object will have "title" and "yAxis" fields
const chartTexts = [
    {title:"FPS Timeline", yAxis:"Frames Per Second", unit:" FPS"},
    {title:"GPU Temperature", yAxis:"Temperature(\u00b0C)", unit:"\u00b0C"},
    {title:"GPU Hotspot", yAxis:"Temperature(\u00b0C)", unit:"\u00b0C"},
    {title:"GPU Core Clock", yAxis:"Clock Speed(MHz)", unit:" MHz"},
    {title:"GPU Utilization", yAxis:"Utilization(%)", unit:"%"},
    {title:"GPU Power Consumption", yAxis:"Power(W)", unit:" W"},
    {title:"GPU Fan Speed", yAxis:"Fan Speed(RPM)", unit:" RPM"}
];

class RadeonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: undefined,
            data2: undefined,
            data3: undefined,
            names: ["File 1", "File 2", "File 3"],
            colors: ["#c32123", "#c2520f", "#cba32f"]
        };
        //#de0032

        this.handleDataOneChange = this.handleDataOneChange.bind(this);
        this.handleDataTwoChange = this.handleDataTwoChange.bind(this);
        this.handleDataThreeChange = this.handleDataThreeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleDataOneChange(data1) {
        this.setState({data1});
    }

    handleDataTwoChange(data2) {
        this.setState({data2});
    }

    handleDataThreeChange(data3) {
        this.setState({data3});
    }

    handleNameChange(newName, idx) {
        let names = this.state.names;
        names[idx] = newName;
        this.setState({names});
    }

    handleColorChange(newColor, idx) {
        let colors = this.state.colors;
        colors[idx] = newColor;
        this.setState({colors});
    }

    validHeader(header) {
        if (this.state.data1 && this.state.data1[0][0][header]) return true;
        if (this.state.data2 && this.state.data2[0][0][header]) return true;
        if (this.state.data3 && this.state.data3[0][0][header]) return true;
        return false;
    }

    render() {
        //console.log(this.state);
        let {data1, data2, data3, names, colors} = this.state;
        return (
            <div>
                <div>
                    <CSVReader onDataChange={this.handleDataOneChange} onNameChange={this.handleNameChange} idx={0} onColorChange={this.handleColorChange} color={colors[0]}/>
                    {data1 !== undefined &&
                        <CSVReader onDataChange={this.handleDataTwoChange} onNameChange={this.handleNameChange} idx={1} onColorChange={this.handleColorChange} color={colors[1]}/>
                    }
                    {data2 !== undefined &&
                        <CSVReader onDataChange={this.handleDataThreeChange} onNameChange={this.handleNameChange} idx={2} onColorChange={this.handleColorChange} color={colors[2]}/>
                    }
                </div>

                {this.validHeader("FPS") &&
                    <FPSBarChart data1={data1} data2={data2} data3={data3} names={names} colors={colors} />
                }
                {this.validHeader("FPS") && 
                    <CustomLineChart dataKey="FPS" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[0]}/>
                }
                {this.validHeader("GPU TEMP") &&
                    <CustomLineChart dataKey="GPU TEMP" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[1]}/>
                }
                {this.validHeader("GPU Hotspot") &&
                    <CustomLineChart dataKey="GPU Hotspot" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[2]}/>
                }
                {this.validHeader("GPU SCLK") &&
                    <CustomLineChart dataKey="GPU SCLK" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[3]}/>
                }
                {this.validHeader("GPU UTIL") &&
                    <CustomLineChart dataKey="GPU UTIL" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[4]}/>
                }
                {this.validHeader("GPU PWR") &&
                    <CustomLineChart dataKey="GPU PWR" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[5]}/>
                }
                {this.validHeader("GPU FAN") &&
                    <CustomLineChart dataKey="GPU FAN" data1={data1} data2={data2} data3={data3} names={names} colors={colors} chartTexts={chartTexts[6]}/>
                }


            </div>
        )
    }

}


export default RadeonChart;
