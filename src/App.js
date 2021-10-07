import Header from "./components/Header";
import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';
import HeatMap from './components/chart/HeatMap';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});


function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [data, setData] = useState([]);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        console.log(selectedFile)
        const reader = new FileReader()
        reader.onload = async (e) => {//find and accept file
            const text = (e.target.result)
            alert('File Accepted')
        }
        reader.readAsText(selectedFile)
        reader.onload = function (e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
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
            var stringArray = reader.result.split('  ')
            var floatArray = []
            for (var i = 0; i < stringArray.length; i++) {
                floatArray.push(parseFloat(stringArray[i]));
            }
            setData(finalArray)
        }
    };


    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ flexGrow: 1 }}>
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
                        <Button onClick={handleSubmission}>Submit</Button>
                    </Grid>
                    <HeatMap data={data} />
                    
                    <Grid item xs={4}>
                        {/* <HeatMap data={data} /> */}
                    </Grid>
                </Grid>
            </Box>

        </StyledEngineProvider>
    )
}

export default App;
