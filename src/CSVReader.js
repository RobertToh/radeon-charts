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

    handleFileChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        }, this.importCSV);
    };

    handleNameChange = event => {
        let newName = event.target.value;
        let idx = this.props.idx;
        this.props.onNameChange(newName, idx);
    }

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
        let res = formatter.format(rawData);
        this.props.onDataChange(res);
        // let idx = this.props.idx;
        // this.props.onNameChange(this.state.csvfile.name, idx);
    }

    render() {
        return (
            <div>
                <input
                    accept=".csv" className="csv-input" type="file"
                    // ref={input => {
                    //     this.filesInput = input;
                    // }}
                    name="file" placeholder={null} onChange={this.handleFileChange}
                />
                <input type="text" onChange={this.handleNameChange}/>
                {/* <button onClick={this.importCSV}> Upload now!</button> */}
            </div>
        );
    }
}

export default CSVReader;