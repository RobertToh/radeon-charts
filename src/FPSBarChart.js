import React from "react";
import {BarChart, Bar, XAxis, YAxis, Label, Legend } from "recharts";

class FPSBarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    formatData(props) {
        let data = [];
        if (props.data1) {
            let obj = {};
            obj["Name"] = props.names[0];
            obj["Avg FPS"] = props.data1[1];
            obj["1% Low"] = props.data1[2];
            obj["0.1% Low"] = props.data1[3]
            data.push(obj);
        }
        if (props.data2) {
            let obj = {};
            obj["Name"] = props.names[1];
            obj["Avg FPS"] = props.data2[1];
            obj["1% Low"] = props.data2[2];
            obj["0.1% Low"] = props.data2[3]
            data.push(obj);
        }
        if (props.data3) {
            let obj = {};
            obj["Name"] = props.names[2];
            obj["Avg FPS"] = props.data3[1];
            obj["1% Low"] = props.data3[2];
            obj["0.1% Low"] = props.data3[3]
            data.push(obj);
        }

        return data;
    }

    render() {
        let data = this.formatData(this.props);
        return(
            <BarChart layout="vertical" width={1300} height={350} data={data}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="Name" />
                <Bar dataKey="Avg FPS" fill="#8884d8" label={{position: "right"}} />
                <Bar dataKey="1% Low" fill="#8884d8" label={{ position: "right" }} />
                <Bar dataKey="0.1% Low" fill="#8884d8" label={{ position: "right" }} />
                <Legend />
            </BarChart>
        )
    }
}

export default FPSBarChart;