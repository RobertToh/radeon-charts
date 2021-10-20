import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label, Legend} from "recharts";

class CustomLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    createLines(props) {
        let res = [];
        let numPoints = 0;
        let dataKey = props.dataKey;
        if (props.data1 && props.data1[0][0][dataKey]) {
            res.push(<Line data={props.data1[0]} name={props.names[0]} type="monotone" dataKey={dataKey} stroke={props.colors[0]} dot={false} key="data1" />);
            numPoints = Math.max(numPoints, props.data1[0].length);
        }
        if (props.data2 && props.data2[0][0][dataKey]) {
            res.push(<Line data={props.data2[0]} name={props.names[1]} type="monotone" dataKey={dataKey} stroke={props.colors[1]} dot={false} key="data2"/>);
            numPoints = Math.max(numPoints, props.data2[0].length);
        }
        if (props.data3 && props.data3[0][0][dataKey]) {
            res.push(<Line data={props.data3[0]} name={props.names[2]} type="monotone" dataKey={dataKey} stroke={props.colors[2]} dot={false} key="data3"/>);
            numPoints = Math.max(numPoints, props.data3[0].length);
        }
        return [res, numPoints];
    }

    render() {
        let [lines, numPoints] = this.createLines(this.props);
        let interval = Math.floor(numPoints / 10);
        let title = this.props.chartTexts.title;
        let yAxis = this.props.chartTexts.yAxis;
        let unit = this.props.chartTexts.unit;
        return (
            <div>
                <LineChart width={1300} height={450} margin={{ top: 25, right: 40, bottom: 25, left: 5 }}>
                    <XAxis padding={{ left: 10, right: 10 }} interval={interval} dataKey="Time" allowDuplicatedCategory={false} stroke="#a8a8a8">
                        <Label value="Time Elapsed (s)" position="bottom" fill="#a8a8a8"/>
                        <Label value={title} position="top" offset={360} fill="#a8a8a8"/>
                    </XAxis>
                    <YAxis stroke="#dbdbdb">
                        <Label value={yAxis} position="insideLeft" style={{textAnchor:"middle"}} angle={-90} offset={10} fill="#a8a8a8"/>
                    </YAxis>
                    <CartesianGrid stroke="#a8a8a8" vertical={false}/>
                    {lines}
                    <Tooltip content={<CustomTooltip unit={unit}/>} viewBox={{ x: 0, y: 0, width: 200, height: 200 }}/>
                    <Legend verticalAlign="bottom" wrapperStyle={{position: "relative", top: "-30px", right: "-35px"}} />
                </LineChart>
            </div>
        )
    }
}

const CustomTooltip = (props) => {
    let active = props.active;
    let payload = props.payload;
    let label = props.label;
    let unit = props.unit;
    if (active && payload && payload.length) {
        let items = [<p key="Time">{`Time Elapsed: ${label}s`}</p>];
        for (let i = 0; i < payload.length; i++) {
            items.push(<p key={payload[i].name}>{`${payload[i].name} : ${payload[i].value + unit}`}</p>);
        }
        return (
            <div className="custom-tooltip mt-3">
                {items}
            </div>
        );
    }

    return null;;
};

export default CustomLineChart;