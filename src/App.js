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
    const [data1, setData1] = useState([]);
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
            
            var timebase = []
            for (var i = 0; i < fileContentArray.length; i++) {
                var troi = fileContentArray[i].split('  ')
                for (var j = 0; j < 200; j++) {
                    troi[j] = parseFloat(troi[j])
                }
                troi.pop()
               
                timebase.push(troi)
            }
            
            var roibase = []
            for(var i = 0; i<200; i++){
                var temp = [];
                roibase.push(temp);
            }
            for(var i = 0; i<timebase.length; i++){
                for(var j = 0; j<200; j++){
                    roibase[j].push(timebase[i][j]) 
                }
            }
            console.log("HEHE")
            console.log(roibase[199])
            
            function pearsonCorrelation(prefs, p1, p2) {
                // good code
                // for(var i = 0; i<89; i<100)
                // bad code
                var si = [];
              
                for (var key in prefs[p1]) {
                  if (prefs[p2][key]) si.push(key);
                  
                }
              
                var n = si.length;
              
                if (n == 0) return 0;
              
                var sum1 = 0;
                for (var i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];
              
                var sum2 = 0;
                for (var i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];
              
                var sum1Sq = 0;
                for (var i = 0; i < si.length; i++) {
                  sum1Sq += Math.pow(prefs[p1][si[i]], 2);
                }
              
                var sum2Sq = 0;
                for (var i = 0; i < si.length; i++) {
                  sum2Sq += Math.pow(prefs[p2][si[i]], 2);
                }
              
                var pSum = 0;
                for (var i = 0; i < si.length; i++) {
                  pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
                }
              
                var num = pSum - (sum1 * sum2 / n);
                var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
                    (sum2Sq - Math.pow(sum2, 2) / n));
              
                if (den == 0) return 0;
              
                return num / den;
              }
              var correlation_array = []
          
          
            for (var i = 0; i < 200; i++) {//for every timepoint
                var h = []
                for (var x =0; x < 200; x++) {//arrange each ROI in an array as a float
                    var temp = []
                    temp.push(roibase[i])
                    temp.push(roibase[x])
                    h.push(pearsonCorrelation(temp, 0 , 1))
                }
                correlation_array.push(h)
            }
            console.log("WHW")

            console.log(correlation_array)
            var finalArray = []
            var count = 0
            for (var i = 0; i < 200; i++) {//for every timepoint
                var temp = []
                var splitstring = correlation_array[i]
                for (var x = 0; x < 200; x++) {//arrange each ROI in an array as a float
                    finalArray.push({ "group": "r" + i, variable: "c" + x, "value": splitstring[x] })
                    temp.push(splitstring[x])
                    count++;
                    if(count == 36009){
                        console.log("YOYOYO")
                        console.log(splitstring[x])
                    }
                }
                // finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
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
                    <HeatMap data={data}  />
                    <HeatMap data={data1}  />

                    
                    <Grid item xs={4}>
                        {/* <HeatMap data={data} /> */}
                    </Grid>
                </Grid>
            </Box>

        </StyledEngineProvider>
    )
}

export default App;
