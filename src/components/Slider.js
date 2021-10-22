import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import {RangeStepInput} from 'react-range-step-input';

const forceNumber = function(n) {
    n = Number(n);
    if (isNaN(n) || typeof n === 'undefined') {
        n = 0;
    }
    return n;
};
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 50
        };
    }
    render() {
        return <div>
            <p>Here's an example RangeStepInput:</p>
            <RangeStepInput
                min={0} max={100}
                value={this.state.value} step={1}
                onChange={this.onChange.bind(this)}
            />
        </div>;
    };
    onChange(e) {
        const newVal = forceNumber(e.target.value);
        console.log(newVal);
        this.setState({value: newVal});
       
    }
}

export default Slider