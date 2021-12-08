import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

function App(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [data, setData] = useState([]);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        const reader = new FileReader()
        reader.onload = async (e) => {//find and accept file
            const text = (e.target.result)
            alert('File Accepted')
        }
        reader.readAsText(selectedFile)
        reader.onload = function (e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
            // setData(finalArray)
            props.handleUpdate(fileContentArray)
        }
    };


    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
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
                    
                </Grid>
            </Box>

        </StyledEngineProvider>
    )
}
export default App;