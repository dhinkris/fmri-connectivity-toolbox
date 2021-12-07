import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import Heatmap from "../chart/HeatMap";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import {computeCorrelation} from '../helpers/computeCorrelation'

class Correlation extends React.Component {
    state = {
        data: []
    }
    constructor(props) {
        // console.log("Constructor")
        super(props);
        // this.myRef = React.createRef()
    }

    componentDidMount() {
        // console.log(this.props.data)
    }

    componentDidMount() {
        let fileContentArray = this.props.data
        const finalArray = computeCorrelation(fileContentArray)
        this.setState({
            data: finalArray,
            minVal: Math.min(parseFloat(fileContentArray)),
            maxVal: Math.min(parseFloat(fileContentArray))
        })
        // console.log("Correlation data:")
        // console.log(this.state.data)
    }
    componentDidUpdate() {
        // this.state.data = correlationFunction.calculateCorrelation(this.props.data);
        // console.log('testing calculateCorrelation')
        // console.log(this.state.data)
    }
    render() {
        return ( (this.state.data.length > 0 && this.state.data) ?
            <Heatmap data={this.state.data} 
                    width={500} 
                    height={500} 
                    minVal={this.state.minVal}
                    maxVal={this.state.maxVal}
                    title="Correlation" />: 
            <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
        )
    }
}

export default Correlation