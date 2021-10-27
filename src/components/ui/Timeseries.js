import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class Timeseries extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    componentDidMount() {
        console.log(this.props.data)
    }

    componentDidUpdate() {
        console.log("Data given to Timeseries:")
        console.log(this.props.data)

        let roibase = this.props.data
        function pearsonCorrelation(prefs, p1, p2) {
            // good code
            // for(var i = 0; i<89; i<100)
            // bad code
            var si = [];
            for (var key in prefs[p1]) {
              if (prefs[p2][key]) {si.push(key)};
            }
            
            var n = si.length;
          
            if (n == 0) return 0;
          
            var sum1 = 0;
            for (var i = 0; i < si.length; i++){
                console.log('test')
                console.log(prefs)
                console.log(prefs[p1])
                console.log(prefs[p1][si[i]])
                sum1 += prefs[p1][si[i]];
            }
            console.log(typeof sum1)
          
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
            //console.log(pSum,sum1,sum2,n, pSum-(sum1*sum2/n))
            //console.log(sum1Sq, Math.pow(sum1,2)/n)
            //console.log(sum2Sq, Math.pow(sum2, 2)/n)
            var num = pSum - (sum1 * sum2 / n);
            var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
                (sum2Sq - Math.pow(sum2, 2) / n));
          
            if (den == 0) return 0;
            return num / den;
          }
            var correlation_array = []
      
      
        for (var i = 0; i < 1; i++) {//for every timepoint
            var h = []
            for (var x =0; x < 1; x++) {//arrange each ROI in an array as a float
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
        for (var i = 0; i < 1; i++) {//for every timepoint
            var temp = []
            var splitstring = correlation_array[i]
            for (var x = 0; x < 1; x++) {//arrange each ROI in an array as a float
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
        var data = finalArray
        console.log("Data timeseries displays:")
        console.log(data)

        // set the dimensions and margins of the graph
        const margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 700 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // append the svg object to the body of the page
        const svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //Read the data

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

        // Build color scale
        var myColor = d3.scaleLinear()
            //.range(["white", "#A52A2A"])
            .range(["blue","green"])
            .domain([-20, 20])

        svg.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.group) })
            .attr("y", function (d) { return y(d.variable) })
            .attr("width", x.bandwidth())
            .attr("height", x.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })

    }

    render() {
        return (
            <>
                <Grid item xs={8} ref={this.myRef}>
                    </Grid>
            </>
        )
    }
}

export default Timeseries