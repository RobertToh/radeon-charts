import React from "react";
import CSVReader from "./CSVReader";
import CustomLineChart from "./CustomLineChart";

class RadeonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: undefined,
            data2: undefined,
            data3: undefined
        };

        this.handleDataOneChange = this.handleDataOneChange.bind(this);
        this.handleDataTwoChange = this.handleDataTwoChange.bind(this);
        this.handleDataThreeChange = this.handleDataThreeChange.bind(this);
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

    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    <CSVReader className="Data1" onDataChange={this.handleDataOneChange} />
                    {this.state.data1 !== undefined &&
                        <CSVReader className="Data2" onDataChange={this.handleDataTwoChange} />
                    }
                    {this.state.data2 !== undefined &&
                        <CSVReader className="Data3" onDataChange={this.handleDataThreeChange} />
                    }
                </div>
            
                {this.state.data1 !== undefined && 
                    <CustomLineChart className="fps-timeline" data1={this.state.data1} data2={this.state.data2} data3={this.state.data3} />
                }
            </div>
        )
    }

}


export default RadeonChart;
