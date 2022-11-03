import Upload from './components/ui/Upload';
import Timeseries from './components/ui/Timeseries';
import Correlation from './components/ui/Correlation';
import React from 'react';
import Testing from './components/ui/Testing';
import BrainVolume from './components/ui/BrainVolume'
import Circos from './components/ui/CircosConnectivity'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function appBarLabel(label) {
    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                {label}
            </Typography>
        </Toolbar>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

class Layout extends React.Component {
    constructor(props) {
        super()
        // console.log(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.setState({
            text: this.props.data
        })
    }

    updateData = (data) => {
        this.setState({
            data: data
        })
    }
    render() {
        return (
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        {appBarLabel('Fetal Resting State Connectivity analysis')}
                    </AppBar>
                    <Container maxWidth={false}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Upload handleUpdate={this.updateData} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Timeseries data={this.state.data} />
                            </Grid>
                            <Grid item xs={4}>
                                <Correlation data={this.state.data} />
                            </Grid>
                            <Grid item xs={6}>
                                <Circos data={this.state.data}/> 
                            </Grid> 
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <BrainVolume data={this.state.data}/>
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
            </Stack>
        )
    }
}
//<Timeseries data={this.state.data}/>
//<Correlation data={this.state.data} />
export default Layout;