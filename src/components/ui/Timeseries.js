import React from "react";
import StackedLinePlot from '../visualization/chart/StackedLinePlot';
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider';

class Timeseries extends React.Component {
    state = {
        data: [],
        loading: false,
    }
    constructor(props) {
        super(props);
    }

    updateTimeSeries=()=>{
        this.setState({ loading: true })
        let fileContentArray = this.props.data
        var col = []
        let finalArray=[]
        for (var i = 0; i < fileContentArray.length; i++) {
            var splitstring = fileContentArray[i].split('  ')
            let row=[]
            for (var x = 0; x < splitstring.length - 1; x++) {
                row.push(parseFloat(splitstring[x]))
            }
            col.push(row)
        }
        
        const data=col[0].map((_, colIndex) => col.map(row => row[colIndex]));
        // const data=col
        const min=Math.min(...col[0])
        const max=Math.max(...col[0])
        console.log(data)
        data.map((row, rowIndex) =>{
            let newObj={}
            row.map((col, colIndex)=>{
                newObj["t"+ colIndex] = (col-min)/(max-min)
            })
            finalArray.push(newObj)
        })
        // for (var i = 0; i < fileContentArray.length; i++) {//for every timepoint
        //     var splitstring = fileContentArray[i].split('  ')//split ROIs
        //     var newObj={}
        //     for (var x = 0; x < splitstring.length - 2; x++) {//arrange each ROI in an array as a float
        //         // finalArray.push({ "group": "r" + i, variable: "c" + x, "value": c })
        //         newObj["group"+x]=splitstring[x]
        //     }
        //     finalArray.push(newObj)
        // }
        const minVal=Math.min(...finalArray.map(data => data.value));
        const maxVal=Math.max(...finalArray.map(data => data.value));
        console.log(minVal, maxVal);    
        this.setState({
            data: finalArray,
            loading: false,
            value: [0, maxVal]
        })
    }
    componentDidMount() {
        // this.updateTimeSeries()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data!==this.props.data){
            this.updateTimeSeries()
        }
    }

    handleSliderChange=(event, newValue)=>{
        console.log(newValue)
        this.setState({ 
            value: newValue
        })
    }
    render() {
        const {loading, value, valuetext}= this.state
        return (
            <>
            {loading && <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box> }
            {
                (this.state.data.length !== 0 && this.state.data) ?
                <>  
                    <Box sx={{ width: 300 }} >
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={this.handleSliderChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </Box>              
                    <StackedLinePlot
                        data={this.state.data}
                        width={1000}
                        height={500}
                        title="Correlation"
                    /> 

                </>
                : null
            }
        </>
        )
    }
}

export default Timeseries