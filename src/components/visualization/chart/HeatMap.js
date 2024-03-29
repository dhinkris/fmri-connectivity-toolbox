import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';

class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
    updateHeatMap() {
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

       
        //Read the data
        let data=this.props.data
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
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Build color scale
        var myColor = d3.scaleLinear()
            .range(["white", "#A52A2A"])
            //.range(["blue","green"])
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
    componentDidMount() {
        this.updateHeatMap()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data!==this.props.data){
            this.updateHeatMap(this.props.data)
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

export default HeatMap