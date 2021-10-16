import React from "react";
const Papa = require("papaparse");

const formatter = require("./format.js");

class CSVReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvfile: undefined
        };
        this.formatData = this.formatData.bind(this);
    }

    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };

    importCSV = () => {
        const { csvfile } = this.state;
        if (csvfile == undefined) return;
        Papa.parse(csvfile, {
            complete: this.formatData,
            dynamicTyping: true,
            skipEmptyLines: true,
            header: true
        });
    };

    formatData(result) {
        let rawData = result.data;
        let [data, avgFPS, onePercentLow, pointOneLow] = formatter.format(rawData);
        this.props.onDataChange(data, avgFPS, onePercentLow, pointOneLow);
    }

    render() {
        return (
            <div className="App">
                <h2>Import CSV File!</h2>
                <input
                    accept=".csv"
                    className="csv-input"
                    type="file"
                    ref={input => {
                        this.filesInput = input;
                    }}
                    name="file"
                    placeholder={null}
                    onChange={this.handleChange}
                />
                <p />
                <button onClick={this.importCSV}> Upload now!</button>
            </div>
        );
    }
}

export default CSVReader;