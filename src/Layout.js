import Upload from './components/ui/Upload';
import HeatMap from './components/chart/HeatMap';
import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';

class Layout extends React.Component {
    constructor(props){
        super()
        console.log(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.setState({
            text: this.props.data
        })
    }

    updateData=(data)=>{
        this.setState({
            data: data
        })
    }
    render(){
        return(
            <StyledEngineProvider injectFirst>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Upload handleUpdate={this.updateData} />
                        </Grid>
                    </Grid>
                </Box>
                <HeatMap data={this.state.data} />

            </StyledEngineProvider>

        )
    }
}

export default Layout;