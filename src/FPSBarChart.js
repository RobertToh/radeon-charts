import React from "react";
import {BarChart, Bar, XAxis, YAxis, Label, Legend} from "recharts";
import HookedChart from "./HookedChart";
import Button from "react-bootstrap/Button";
const FileSaver = require('file-saver');

const colors = ["#c32123", "#c2520f", "#cba32f"];
class FPSBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
    }

    async handleDownload() {
        let [getPng, { ref, isLoading }] = this.props.dlHook;
        const png = await getPng();

        // Verify that png is not undefined
        if (png) {
            // Download with FileSaver
            FileSaver.saveAs(png, 'Average Frames Per Second.png');
        }
    }

    formatData(props) {
        let data = [];
        if (props.data1) {
            let obj = {};
            obj["Name"] = props.names[0];
            obj["Avg FPS"] = (Number.isNaN(props.data1[1])) ? 0 : props.data1[1];
            obj["1% Low"] = (Number.isNaN(props.data1[2])) ? 0 : props.data1[2];
            obj["0.1% Low"] = (Number.isNaN(props.data1[3])) ? 0 : props.data1[3];
            data.push(obj);
        }
        if (props.data2) {
            let obj = {};
            obj["Name"] = props.names[1];
            obj["Avg FPS"] = (Number.isNaN(props.data2[1])) ? 0 : props.data2[1];
            obj["1% Low"] = (Number.isNaN(props.data2[2])) ? 0 : props.data2[2];
            obj["0.1% Low"] = (Number.isNaN(props.data2[3])) ? 0 : props.data2[3];
            data.push(obj);
        }
        if (props.data3) {
            let obj = {};
            obj["Name"] = props.names[2];
            obj["Avg FPS"] = (Number.isNaN(props.data3[1])) ? 0 : props.data3[1];
            obj["1% Low"] = (Number.isNaN(props.data3[2])) ? 0 : props.data3[2];
            obj["0.1% Low"] = (Number.isNaN(props.data3[3])) ? 0 : props.data3[3];
            data.push(obj);
        }

        return data;
    }

    render() {
        let data = this.formatData(this.props);
        let [getPng, { ref, isLoading }] = this.props.dlHook;
        let render = this.props.r;
        return(
        <>{render ?
            <>
                <BarChart layout="vertical" width={900} height={460} data={data} margin={{ top: 5, right: 40, bottom: 35, left: 30 }} ref={ref}>
                    <XAxis type="number" stroke="#a8a8a8"> 
                        <Label value="Frames Per Second" position="bottom" fill="#a8a8a8" />
                        <Label value="Average Frames Per Second" position="top" offset={365} fill="#a8a8a8" />
                    </XAxis>
                    <YAxis type="category" dataKey="Name" stroke="#a8a8a8" />
                    <Bar dataKey="Avg FPS" fill={colors[0]} label={{position:"right", fill:"white"}} />
                    <Bar dataKey="1% Low" fill={colors[1]} label={{ position:"right", fill:"white" }}/>
                    <Bar dataKey="0.1% Low" fill={colors[2]} label={{ position:"right", fill:"white" }}/>
                    <Legend verticalAlign="top" align="center" layout="vertical" wrapperStyle={{right: "50px", top: "10px"}}/>
                </BarChart>
                <Button className="line-chart-dl-btn shadow-none" variant="outline-light" size="sm" onClick={this.handleDownload}>
                        {isLoading ? 'Downloading...' : 'Download Chart'}
                </Button>
            </>
        : null}</>
        )
    }
}

export default React.memo(HookedChart(FPSBarChart));