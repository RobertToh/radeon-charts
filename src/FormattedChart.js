import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label} from "recharts";

class FormattedChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LineChart width={1500} height={400} data={this.props.data} margin={{ top: 5, right: 5, bottom: 5, left: 100 }}>
                    <XAxis tick={false} />
                    <YAxis>
                        <Label value="FPS" position="left" angle={-90} />
                    </YAxis>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="FPS" stroke="#8884d8" dot={false} />
                    <Tooltip content={<CustomTooltip/>}/>
                </LineChart>
            </div>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    
    if (active && payload && payload.length) {
        let items = [];
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

export default FormattedChart;