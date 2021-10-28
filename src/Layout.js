import Upload from './components/ui/Upload';
import Timeseries from './components/ui/Timeseries';
import Correlation from './components/ui/Correlation';
import React from 'react';
import Testing from './components/ui/Testing';

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
                        <Grid item xs={12}>
                            <Correlation data={this.state.data} />
                        </Grid>
                    </Grid>
                </Box>
                <Timeseries data={this.state.data}/>

            </StyledEngineProvider>

        )
    }
}

export default Layout;