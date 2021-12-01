import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import Heatmap from "../chart/HeatMap";
const correlationFunction = require("./correlationFunction");

class Correlation extends React.Component {
    state = {
        data: []
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    componentDidMount() {
        console.log(this.props.data)
    }

    componentDidUpdate() {
        this.state.data = correlationFunction.calculateCorrelation(this.props.data);
        console.log('testing calculateCorrelation')
        console.log(this.state.data)
    }
    render() {
        return (
            <>
                <Grid item xs={8} ref={this.myRef}>
                    <Heatmap data={this.state.data}/>
                </Grid>
            </>
        )
    }
}

export default Correlation