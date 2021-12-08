import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import Heatmap from "../visualization/chart/HeatMap";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

import {computeCorrelation} from '../helpers/computeCorrelation'
class Correlation extends React.Component {
    state = {
        data: [],
        loading: false
    }
    constructor(props) {
        // console.log("Constructor")
        super(props);
        // this.myRef = React.createRef()
    }

    componentDidMount() {
        this.setState({ loading: true })
        let fileContentArray = this.props.data
        const finalArray = this.props.data.length>0?computeCorrelation(fileContentArray):[]
        this.setState({
            data: finalArray,
            minVal: Math.min(parseFloat(fileContentArray)),
            maxVal: Math.min(parseFloat(fileContentArray)),
            loading: false
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.setState({ loading: true })
            let fileContentArray = this.props.data
            const finalArray = computeCorrelation(fileContentArray)
            this.setState({
                data: finalArray,
                minVal: Math.min(parseFloat(fileContentArray)),
                maxVal: Math.min(parseFloat(fileContentArray)),
                loading:  false
            })
        }
    }
    render() {
        const {loading, value, valuetext}=this.state
        const label = { inputProps: { 'aria-label': 'Switch demo' } };

        return  (
            <>
                {
                    loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                        />
                    )}
                {
                    (this.state.data.length !== 0 && this.state.data) ?  
                    <>
                                      
                        <Box sx={{ width: 300 }} >
                            {/* <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={value}
                                onChange={this.handleSliderChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            /> */}
                            <Switch {...label} defaultChecked/>
                        </Box>    
                        <Heatmap
                            data={this.state.data}
                            width={500}
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

export default Correlation