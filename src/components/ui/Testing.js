import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class Testing extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    componentDidMount() {
        // console.log(this.props.data)
    }

    componentDidUpdate() {
        // console.log("Data given to Testing:")
        // console.log(this.props.data)

        let fileContentArray = this.props.data
        var finalArray = []
        for (var i = 0; i < fileContentArray.length; i++) {
            var troi = fileContentArray[i].split('  ')
            for (var j = 0; j < 200; j++) {
                troi[j] = parseFloat(troi[j])
            }
            troi.pop()
               
            finalArray.push(troi)
        }
        var timebase = finalArray
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
                sum1 += prefs[p1][si[i]];
            }
          
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
        var finalArray = []
        var count = 0
        for (var i = 0; i < 200; i++) {//for every timepoint
            var temp = []
            var splitstring = correlation_array[i]
            for (var x = 0; x < 200; x++) {//arrange each ROI in an array as a float
                finalArray.push({ "group": "r" + i, variable: "c" + x, "value": splitstring[x] })
                temp.push(splitstring[x])
                count++;
            }
            // finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
        }
        var data = finalArray
        // console.log("Final data to heatmap(testing):")
        // console.log(data)

        const margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
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

export default Testing