import React from "react";
import CSVReader from "./CSVReader";
import CustomLineChart from "./CustomLineChart";

class RadeonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: undefined,
            data2: undefined,
            data3: undefined,
            names: ["File 1", "File 2", "File 3"]
        };

        this.handleDataOneChange = this.handleDataOneChange.bind(this);
        this.handleDataTwoChange = this.handleDataTwoChange.bind(this);
        this.handleDataThreeChange = this.handleDataThreeChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
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

    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    <CSVReader className="Data1" onDataChange={this.handleDataOneChange} onNameChange={this.handleNameChange} idx={0}/>
                    {this.state.data1 !== undefined &&
                        <CSVReader className="Data2" onDataChange={this.handleDataTwoChange} onNameChange={this.handleNameChange} idx={1}/>
                    }
                    {this.state.data2 !== undefined &&
                        <CSVReader className="Data3" onDataChange={this.handleDataThreeChange} onNameChange={this.handleNameChange} idx={2}/>
                    }
                </div>
            
                {this.state.data1 !== undefined && 
                <div>
                    <CustomLineChart className="fps-timeline" data1={this.state.data1} data2={this.state.data2} data3={this.state.data3} names={this.state.names}/>
                </div>
                }
            </div>
        )
    }

}


export default RadeonChart;
