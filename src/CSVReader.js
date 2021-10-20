import React from "react";
import CustomColorPicker from "./CustomColorPicker.js";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
            <Container className="mt-2 mb-2">
                <Form>
                    <Row className="justify-content-md-center">
                        <Col xs={3}>
                            <Form.Label className="mb-1">File</Form.Label>
                            <Form.Control type="file" accept=".csv" onChange={this.handleFileChange}/>
                        </Col>
                        <Col xs={2}>
                            <Form.Label className="mb-1">Name</Form.Label>
                            <Form.Control type="input" value={this.state.name} onChange={this.handleNameChange} />
                        </Col>
                        <Col xs="auto">
                            <Form.Label className="mb-1">Color</Form.Label>
                            <CustomColorPicker color={this.props.color} onColorChange={this.props.onColorChange} idx={this.props.idx} />
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default CSVReader;