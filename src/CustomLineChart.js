import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label} from "recharts";

class CustomLineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let ticks = [];
        // for (let i = 0; i < this.props.data.length; i+=10) {
        //     ticks.push(i);
        // }
        let interval = Math.floor(this.props.data.length / 10);

        return (
            <div>
                <LineChart width={1500} height={450} data={this.props.data} margin={{ top: 5, right: 35, bottom: 25, left: 20 }}>
                    {/* <XAxis padding={{left: 10, right: 10}} type="number" domain={[0, this.props.data.length]} ticks={ticks} dataKey="Time"/> */}
                    <XAxis padding={{ left: 10, right: 10 }} interval={interval} dataKey="Time">
                        <Label value="Time(s)" position="bottom"/>
                    </XAxis>
                    <YAxis>
                        <Label value="FPS" position="left" angle={-90} />
                    </YAxis>
                    <CartesianGrid stroke="#eee" vertical={false}/>
                    <Line type="monotone" dataKey="FPS" stroke="#8884d8" dot={false} />
                    <Tooltip content={<CustomTooltip />} viewBox={{ x: 0, y: 0, width: 200, height: 200 }}/>
                    {/* <Tooltip/> */}
                </LineChart>
            </div>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    
    if (active && payload && payload.length) {
        let items = [<p className="label">{`Time : ${label}`}</p>];
        for (let i = 0; i < payload.length; i++) {
            items.push(<p className="label">{`${payload[i].dataKey} : ${payload[i].value}`}</p>);
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