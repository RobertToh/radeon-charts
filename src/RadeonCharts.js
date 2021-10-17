import React from "react";
import CSVReader from "./CSVReader";
import CustomLineChart from "./CustomLineChart";

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
                    <CustomLineChart data={this.state.data} />
                }
            </div>
        )
    }

}


export default RadeonChart;
