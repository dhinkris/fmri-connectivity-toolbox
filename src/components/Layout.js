import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import HeatMap from './chart/HeatMap';
import BV from './chart/BV';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ReactSlider from "react-slider";
import {RangeStepInput} from 'react-range-step-input';

function Car() {
    const Input = styled('input')({
        display: 'none',
    });
    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [activeUpdate, setActiveUpdate] = useState();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [edge_data, setEdgeData] = useState([]);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        setActiveUpdate(1);
    };

    const handleSubmission_heatmap = () => {
        if(activeUpdate == 1){
            const reader = new FileReader()
        reader.onload = async (e) => {//find and accept file
            const text = (e.target.result)
            alert('File Accepted')
        }
        reader.readAsText(selectedFile)
        reader.onload = function (e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
            
            setData1(fileContentArray)
            setData2(fileContentArray)

        }}
    };
    const handleSubmission_bv = () => {
        
        const reader = new FileReader()
        reader.onload = async (e) => {//find and accept file
            const text = (e.target.result)
            alert('File Accepted')
            
        }
        reader.readAsText(selectedFile)
        reader.onload = function (e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
            setData3(fileContentArray)


        }
    };
    
    const handleSubmission_edges = () => {
        const reader = new FileReader()
        reader.onload = async (e) => {//find and accept file
            const text = (e.target.result)
            alert('File Accepted')
            
        }
        reader.readAsText(selectedFile)
        reader.onload = function (e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
            setEdgeData(fileContentArray)


        }
    };

return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <label htmlFor="contained-button-file">
                            {/* <Input type="file" name="file" accept=".1D, .txt" onChange={changeHandler} /> */}
                            <Input accept=".1D" id="contained-button-file" multiple type="file" onChange={changeHandler} />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        {isFilePicked ? (
                            <div>
                                nameOfFile = selectedFile.name
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.name.split('.').pop()}</p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleSubmission_heatmap}>Submit</Button>
                    </Grid>
                    <Grid item xs={8}>
                        <label htmlFor="contained-button-file">
                            {/* <Input type="file" name="file" accept=".1D, .txt" onChange={changeHandler} /> */}
                            <Input accept=".1D" id="contained-button-file" multiple type="file" onChange={changeHandler} />
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        {isFilePicked ? (
                            <div>
                                nameOfFile = selectedFile.name
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.name.split('.').pop()}</p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleSubmission_bv}>Submit BV</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleSubmission_edges}>Submit BV</Button>
                    </Grid>

                    <HeatMap data={data}  />
                    <HeatMap data={data1,data2}/>
                    <BV data={data3}/>
                    </Grid>
            </Box>

        </StyledEngineProvider>
    );  
}
  
  export default Car;
  