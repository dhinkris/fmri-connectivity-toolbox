import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class HeatMap extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {data:this.props.data, data2:this.props.data2};
        

        this.myRef = React.createRef()
        this.myRef2 = React.createRef()

    }

    componentDidMount() {
        // console.log(this.props.data);
        
    }

    componentDidUpdate() {
        let ww = 200;
        var fileContentArray = this.props.data;
        var timebase = []
        for (var i = 0; i < fileContentArray.length; i++) {
            var troi = fileContentArray[i].split('  ')
            for (var j = 0; j < ww; j++) {
                troi[j] = parseFloat(troi[j])
            }
            troi.pop()
           
            timebase.push(troi)
        }
        
        var roibase = []
        for(var i = 0; i<ww; i++){
            var temp = [];
            roibase.push(temp);
        }
        for(var i = 0; i<timebase.length; i++){
            for(var j = 0; j<ww; j++){
                roibase[j].push(timebase[i][j]) 
            }
        }
        // console.log("HEHE")
        // console.log(roibase[199])
        
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
      
      
        for (var i = 0; i < ww; i++) {//for every timepoint
            var h = []
            for (var x =0; x < ww; x++) {//arrange each ROI in an array as a float
                var temp = []
                temp.push(roibase[i])
                temp.push(roibase[x])
                h.push(pearsonCorrelation(temp, 0 , 1))
            }
            correlation_array.push(h)
        }
        // console.log("WHW")

        // console.log(correlation_array)
        var finalArray = []
        var count = 0
        var min = 1000000;
        var max = -10000000;

        for (var i = 0; i < ww; i++) {//for every timepoint
            var temp = []
            var splitstring = correlation_array[i]
            for (var x = 0; x < ww; x++) {//arrange each ROI in an array as a float
                finalArray.push({ "group": "r" + i, variable: "c" + x, "value": splitstring[x] })
                temp.push(splitstring[x])
                count++;
                if(min>splitstring[x]){
                    min = splitstring[x];
                }
                if(max<splitstring[x]){
                    max = splitstring[x];
                }
            }
            // finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
        }
        this.state.data = finalArray;
        var tt = 0.8
        var bt = 0.2
        var diff = max - min;
        var tt = min + diff*tt;
        var bt = min + diff*bt;
        var aarray = []
        for(var i = 0; i<ww; i++){
            var temp = []
            for(var k = 0; k<ww; k++){
                if(finalArray[i*ww+k]["value"] <= tt && finalArray[i*ww+k]["value"]>= bt){
                    temp.push(1);
                    aarray.push({ "group2": "r" + i, variable2: "c" + k, "value2": 1 })

                }else{
                    temp.push(0);
                    aarray.push({ "group2": "r" + i, variable2: "c" + k, "value2": 0 })

                }
            }
        }
        this.state.data = finalArray;
        this.state.data2 = aarray;
        let data = this.state.data;

        // STOP
        // set the dimensions and margins of the graph
        const margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        const myGroups = Array.from(new Set(data.map(d => d.group)))
        const myVars = Array.from(new Set(data.map(d => d.variable)))

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(myGroups)
            .padding(0);
        svg.append("g")
            .style("font-size", 15)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(myVars)
            .padding(0);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("title")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");
        // Build color scale
        var myColor = d3.scaleLinear()
            .range(["#0000ff", "#00ff00"])
            .domain([-1, 1])
        
           

        svg.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.group) })
            .attr("y", function (d) { return y(d.variable) })
            .attr("width", x.bandwidth())
            .attr("height", x.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
// ADJACENCY MATRIX
// STOP
// console.log(this.props.data)

let data2 = this.state.data2;

// append the svg object to the body of the page
const svg2 = d3.select(this.myRef2.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data

// Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
const myGroups2 = Array.from(new Set(data2.map(d => d.group2)))
const myVars2 = Array.from(new Set(data2.map(d => d.variable2)))

// Build X scales and axis:
var x = d3.scaleBand()
    .range([0, width])
    .domain(myGroups2)
    .padding(0);
svg2.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

// Build X scales and axis:
var y = d3.scaleBand()
    .range([height, 0])
    .domain(myVars2)
    .padding(0);
svg.append("g")
    .call(d3.axisLeft(y));

svg2.append("title")
.attr("x", (width / 2))             
.attr("y", 0 - (margin.top / 2))
.attr("text-anchor", "middle")  
.style("font-size", "16px") 
.style("text-decoration", "underline")  
.text("Value vs Date Graph");
// Build color scale
var myColor = d3.scaleLinear()
    .range(["#0000ff", "#00ff00"])
    .domain([-1, 1])

   

svg2.selectAll()
    .data(data2, function (d) { return d.group2 + ':' + d.variable2; })
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.group2) })
    .attr("y", function (d) { return y(d.variable2) })
    .attr("width", x.bandwidth())
    .attr("height", x.bandwidth())
    .style("fill", function (d) { return myColor(d.value2) })

    }

    shouldComponentUpdate() {
    
        return (
            <>
                <Grid item xs={8} ref={this.myRef}>
                    </Grid>
                    <Grid item xs={8} ref={this.myRef2}>
                    </Grid>
            </>
        )
          }

    render() {
        return (
            <>
                <Grid item xs={4} ref={this.myRef}>
                    </Grid>
                    <Grid item xs={2} ref={this.myRef2}>
                    </Grid>
                    <Grid item xs={4} ref={this.myRef2}>
                    </Grid>
            </>
        )
    }
}

export default HeatMap