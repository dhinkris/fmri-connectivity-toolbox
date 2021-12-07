import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class HeatMap extends React.Component {
    state = {
        data: []
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    renderElement=(data)=>{
        console.log(data.length)
        // set the dimensions and margins of the graph
        const margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // append the svg object to the body of the page
        const svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var tooltip = d3.select(this.myRef.current)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        var mouseover = function(d) {
            tooltip
                .style("opacity", 1)
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
            }
        var mousemove = function(d) {
            tooltip
                .html("The exact value of<br>this cell is: " + d.value)
                .style("left", (d3.pointer(this)[0]+70) + "px")
                .style("top", (d3.pointer(this)[1]) + "px")
            }
        var mouseleave = function(d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
            }
            
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
        const myGroups = Array.from(new Set(data.map(d => d.group)))
        const myVars = Array.from(new Set(data.map(d => d.variable)))

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(myGroups)
            .padding(0.01);
        svg.append("g")
            .style("font-size", 15)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(myVars)
            .padding(0.01);
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
            .data(data, function (d) { return d.row + ':' + d.column; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.row) })
            .attr("y", function (d) { return y(d.column) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .style("fill", function (d) { return myColor(d.value) })
        
        svg.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "left")
            .style("font-size", "22px")
            .text(this.props.title);   
        
    }
    componentDidMount() {
        this.renderElement(this.props.data)
    }

    componentDidUpdate(prevProps, prevState) {
        this.myRef = React.createRef()
        if (prevProps.data!==this.props.data){
            this.renderElement(this.props.data)
        }
    }
    render() {
        return (<svg ref={this.myRef} width={this.props.width} height={this.props.height}></svg>)
    }
}

export default HeatMap