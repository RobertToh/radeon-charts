import React from "react";
import CSVReader from "./CSVReader";
import {LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label} from "recharts";
import FormattedChart from "./FormattedChart";

class RadeonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            avgFPS: undefined,
            onePercentLow: undefined,
            pointOneLow: undefined
        };

        this.handleDataChange = this.handleDataChange.bind(this);
    }

    handleDataChange(data, avgFPS, onePercentLow, pointOneLow) {
        this.setState({
            data,
            avgFPS,
            onePercentLow,
            pointOneLow
        });
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <CSVReader onDataChange={this.handleDataChange}/>
                {this.state.data !== undefined && 
                    // <LineChart width={1500} height={400} data={this.state.data} margin={{ top: 5, right: 5, bottom: 5, left: 100 }}>
                    //     <XAxis tick={false}/>
                    //     <YAxis>
                    //         <Label value="FPS" position="left" angle={-90}/>
                    //     </YAxis>
                    //     <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    //     <Line type="monotone" dataKey="FPS" stroke="#8884d8" dot={false}/>
                    //     <Tooltip />
                    // </LineChart>
                    <FormattedChart data={this.state.data} />
                }
            </div>
        )
    }

}


export default RadeonChart;
