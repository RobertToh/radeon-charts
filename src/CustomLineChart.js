import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label, Legend} from "recharts";

class CustomLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    createLines(props) {
        let res = [];
        let numPoints = 0;
        if (props.data1 !== undefined) {
            res.push(<Line data={props.data1[0]} type="monotone" dataKey="FPS" stroke="#8884d8" dot={false} />);
            numPoints = Math.max(numPoints, props.data1[0].length);
        }
        if (props.data2 !== undefined) {
            res.push(<Line data={props.data2[0]} type="monotone" dataKey="FPS" stroke="#aaaaaa" dot={false} />);
            numPoints = Math.max(numPoints, props.data2[0].length);
        }
        if (props.data3 !== undefined) {
            res.push(<Line data={props.data3[0]} type="monotone" dataKey="FPS" stroke="#8784d8" dot={false} />);
            numPoints = Math.max(numPoints, props.data3[0].length);
        }
        return [res, numPoints];
    }

    render() {
        // let ticks = [];
        // for (let i = 0; i < this.props.data.length; i+=10) {
        //     ticks.push(i);
        // }
        let [res, numPoints] = this.createLines(this.props);
        let interval = Math.floor(numPoints / 10);

        return (
            <div>
                <LineChart width={1500} height={450} margin={{ top: 5, right: 35, bottom: 25, left: 20 }}>
                    <XAxis padding={{ left: 10, right: 10 }} interval={interval} dataKey="Time" allowDuplicatedCategory={false}>
                        <Label value="Time(s)" position="bottom"/>
                    </XAxis>
                    <YAxis>
                        <Label value="FPS" position="left" angle={-90} />
                    </YAxis>
                    <CartesianGrid stroke="#eee" vertical={false}/>
                    {res}
                    <Tooltip content={<CustomTooltip />} viewBox={{ x: 0, y: 0, width: 200, height: 200 }}/>
                    {/* <Tooltip/> */}
                    <Legend verticalAlign="top"/>
                </LineChart>
            </div>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        let items = [<p key="Time">{`Time : ${label}`}</p>];
        for (let i = 0; i < payload.length; i++) {
            items.push(<p key={payload[i].name}>{`${payload[i].dataKey} : ${payload[i].value}`}</p>);
        }
        return (
            <div className="custom-tooltip">
                {items}
            </div>
        );
    }

    return null;;
};

export default CustomLineChart;