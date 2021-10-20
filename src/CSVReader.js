import React from "react";
import { ChromePicker } from "react-color";
import CustomColorPicker from "./CustomColorPicker.js";

const Papa = require("papaparse");

const formatter = require("./format.js");

class CSVReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvfile: undefined,
            name: "File " + (props.idx + 1) 
        };
        this.formatData = this.formatData.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileChange(event) {
        this.setState({
            csvfile: event.target.files[0]
        }, this.importCSV);
    };

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        let idx = this.props.idx;
        this.props.onNameChange(this.state.name, idx);
        event.preventDefault();
    }

    importCSV() {
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
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        accept=".csv" className="csv-input" type="file"
                        // ref={input => {
                        //     this.filesInput = input;
                        // }}
                        name="file" placeholder={null} onChange={this.handleFileChange}
                    />
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </form>
                <CustomColorPicker color={this.props.color} onColorChange={this.props.onColorChange} idx={this.props.idx} />
            </div>
        );
    }
}

export default CSVReader;