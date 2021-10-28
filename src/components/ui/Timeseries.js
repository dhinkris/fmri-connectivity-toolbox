import React from "react";
import Heatmap from '../chart/HeatMap';
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class Timeseries extends React.Component {
    state = {
        data: []
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    /*componentWillMount() {
        this.setState({data:this.props.data});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: this.props.data});
    }*/
    componentDidMount() {
        console.log(this.props.data)
    }

    componentDidUpdate() {
        let fileContentArray = this.props.data
        var finalArray = []
            for (var i = 0; i < fileContentArray.length; i++) {//for every timepoint
                var temp = []
                var splitstring = fileContentArray[i].split('  ')//split ROIs
                for (var x = 0; x < 200; x++) {//arrange each ROI in an array as a float
                    finalArray.push({ "group": "r" + i, variable: "c" + x, "value": splitstring[x] })
                    temp.push(parseFloat(splitstring[x]))
                }
                finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
            }
        /*console.log("Data to HeatMapfca:")
        console.log(fileContentArray)
        console.log(finalArray)*/
        this.state.data = finalArray
        console.log("Timeseries data:")
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

export default Timeseries