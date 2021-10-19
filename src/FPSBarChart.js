import React from "react";
import {BarChart, Bar, XAxis, YAxis, Label, Legend, Cell} from "recharts";

class FPSBarChart extends React.Component {
    constructor(props) {
        super(props);
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
        let colors = this.props.colors;
        let cells = data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
    
        return(
            <BarChart layout="vertical" width={1300} height={350} data={data}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="Name" />
                <Bar dataKey="Avg FPS" fill="#8884d8" label={{position:"right", fill:"white"}}>
                    {cells}
                </Bar>
                <Bar dataKey="1% Low" fill="#8884d8" label={{ position:"right", fill:"white" }}>
                    {cells}
                </Bar>
                <Bar dataKey="0.1% Low" fill="#8884d8" label={{ position:"right", fill:"white" }}>
                    {cells}
                </Bar>
                <Legend />
            </BarChart>
        )
    }
}

export default FPSBarChart;