import React from "react";
import * as d3 from 'd3';

class StackedLinePlot extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    updateStackedLinePlot() {
        // set the dimensions and margins of the graph
        const data=this.props.data
        const margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;
        const turtles=[...Array(89 - 1 + 1).keys()].map((i)=> 't'+i)
        const colors=[...Array(89 - 1 + 1).keys()].map(i=>"#ef9a9a")
        // append the svg object to the body of the page
        // append the svg object to the body of the page
        const svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
            var x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]);
        
        var series = svg.selectAll(".area")
          .data(data)
          .enter()
          .append("g")
          .attr("class", "area")
          
        
        series.append("path")
          .attr("stroke", (d, i) => colors[i])
          .attr("stroke-width", 1.5)
          .attr("fill", "#FFFFFF")
        
        // series.append("text")
        //   .attr("dy", 5)
        //   .text(d => d);
        
        var xg = svg.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0 " + height + ")");

        var yg = svg.append("g")
          .attr("class", "axis y");
        
        var stack = d3.stack().keys(turtles);
        
        var line = d3.line()
          .curve(d3.curveMonotoneX);
        
        randomize(data);
        
        function randomize(_data) {
        
          var data = [];
        
          // Random walk
          for (var i = 0; i < 200; i++) {
            data[i] = {};
            turtles.forEach(function(turtle){
                // console.log(Math.abs(_data[i][turtle]))
                data[i][turtle] = _data[i][turtle]
            //   data[i][turtle] = _data
            });
          }
          var stacked = stack(data);
        
          x.domain([0, data.length - 1]);
          y.domain([0,d3.max(stacked[stacked.length - 1].map(d => d[1]))]);
        
          series.data(stacked)
            .select("path")
            .attr("d", getPath);
        
        //   series.select("text")
        //     .classed("hidden", false)
        //     .datum(getBestLabel)
        //     .classed("hidden", d => !d)
        //     .filter(d => d)
        //     .attr("x", d => d[0])
        //     .attr("y", d => d[1]);
        
          xg.call(d3.axisBottom(x).tickSizeOuter(0));
          yg.call(d3.axisLeft(y).tickSizeOuter(0));
        
        //   setTimeout(randomize, 750);
        
        }
        
        function getPath(area) {
          var top = area.map((f, j) => [x(j), y(f[1])]),
              bottom = area.map((f, j) => [x(j), y(f[0])]).reverse();
        
          return line(top) + line(bottom).replace("M", "L") + "Z";
        }
        
    }
    componentDidMount() {
        this.updateStackedLinePlot()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data!==this.props.data){
            this.updateStackedLinePlot(this.props.data)
        }
    }

    render() {
        return (
            <>
                <svg item xs={8} ref={this.myRef} width={this.props.width} height={this.props.height}> </svg>
            </>
        )
    }
}

export default StackedLinePlot
