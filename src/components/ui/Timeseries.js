import React from "react";
import Heatmap from '../chart/HeatMap';
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

class Timeseries extends React.Component {
    state = {
        data: []
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let fileContentArray = this.props.data
        var finalArray = []
            for (var i = 0; i < fileContentArray.length; i++) {//for every timepoint
                var splitstring = fileContentArray[i].split('  ')//split ROIs
                for (var x = 0; x < splitstring.length-2; x++) {//arrange each ROI in an array as a float
                    finalArray.push({ "group": "r" + i, variable: "c" + x, "value": parseFloat(splitstring[x]) })
                }
            }
  
        this.setState({
            data : finalArray
        })


    }
    render() {
        return (
            (this.state.data.length > 0 && this.state.data) ?
            <Heatmap 
                data={this.state.data} 
                width={1000} 
                height={500} 
                title="Correlation" 
            />: <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
        )
    }
}

export default Timeseries