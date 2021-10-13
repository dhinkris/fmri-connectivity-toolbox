import Header from "./components/Header";
import React, {useState} from 'react';
import ReactFileReader from 'react-file-reader';
import ReactDOM from "react-dom";
// import { Navbar, Col } from "materialize";
import OneYearHeatMap from "./test_data/heatmaptest";
import HeatMapDate from "react-d3-heatmap";
import 'materialize-css/dist/css/materialize.min.css';

import "./App.css";

class data{
    constructor(date, number){
        this.date = date
        this.count = number
    }
}

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

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
        reader.onload = function(e) {
            var fileContentArray = this.result.split(/\n/)//split every line
            fileContentArray.pop()
            var finalArray = []
            for(var i=0; i<fileContentArray.length;i++){//for every timepoint
                var temp = []
                var splitstring = fileContentArray[i].split('  ')//split ROIs
                for(var x=0; x<200;x++){//arrange each ROI in an array as a float
                    temp.push(parseFloat(splitstring[x]))
                }
                finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
            }
            var stringArray = reader.result.split('  ')
            var floatArray = []
            console.log(finalArray)
            for(var i =0; i<stringArray.length;i++){
                floatArray.push(parseFloat(stringArray[i]));
            }

        }
    };


  return (
      <div>
          <input type="file" name="file" accept=".1D, .txt" onChange={changeHandler} />
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
          <div>
              <button onClick={handleSubmission}>Submit</button>
          </div>
          <Header title='Upload the time series data. The data must be in a .txt or .1D format.'/>
          
    <script src="https://d3js.org/d3.v4.js"></script>

    <div id="my_dataviz"></div>
    var input = document.getElementById("heatmap");
    input.value = 1;
    </div>
  )
}

export default App;
