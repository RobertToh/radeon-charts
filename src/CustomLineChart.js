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
            res.push(<Line data={props.data1[0]} name={props.names[0]} type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} key="data1" />);
            numPoints = Math.max(numPoints, props.data1[0].length);
        }
        if (props.data2 && props.data2[0][0][dataKey]) {
            res.push(<Line data={props.data2[0]} name={props.names[1]} type="monotone" dataKey={dataKey} stroke="#aaaaaa" dot={false} key="data2"/>);
            numPoints = Math.max(numPoints, props.data2[0].length);
        }
        if (props.data3 && props.data3[0][0][dataKey]) {
            res.push(<Line data={props.data3[0]} name={props.names[2]} type="monotone" dataKey={dataKey} stroke="#cccccc" dot={false} key="data3"/>);
            numPoints = Math.max(numPoints, props.data3[0].length);
        }
        return [res, numPoints];
    }

    render() {
        let [lines, numPoints] = this.createLines(this.props);
        let interval = Math.floor(numPoints / 10);
        let dataKey = this.props.dataKey;
        return (
            <div>
                <LineChart width={1300} height={450} margin={{ top: 5, right: 35, bottom: 25, left: 35 }}>
                    <XAxis padding={{ left: 10, right: 10 }} interval={interval} dataKey="Time" allowDuplicatedCategory={false}>
                        <Label value="Time(s)" position="bottom"/>
                    </XAxis>
                    <YAxis>
                        <Label value={dataKey} position="insideLeft" angle={-90} offset={10} />
                    </YAxis>
                    <CartesianGrid stroke="#eee" vertical={false}/>
                    {lines}
                    <Tooltip content={<CustomTooltip />} viewBox={{ x: 0, y: 0, width: 200, height: 200 }}/>
                    <Legend verticalAlign="bottom" wrapperStyle={{position: "relative", top: "-30px"}}/>
                </LineChart>
            </div>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        let items = [<p key="Time">{`Time : ${label}`}</p>];
        for (let i = 0; i < payload.length; i++) {
            items.push(<p key={payload[i].name}>{`${payload[i].name} : ${payload[i].value}`}</p>);
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