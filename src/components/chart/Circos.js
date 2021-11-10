// import * as Circoslib from 'circos';
// import * as d3 from 'd3';
// import React from 'react';
// import Grid from '@mui/material/Grid'

// class Circos extends React.Component{
//     state = {
//         data: []
//     }
//     constructor(props){
//         super(props);
//         this.myRef = React.createRef()
//     }
//     componenetDidMount(){
//         console.log("circos initialized")
//     }
//     componenetDidUpdate(){
//         console.log('Circos updated')
//         //let data = this.props.data
//         /*var data = [
//             { len: 31, color: "#8dd3c7", label: "January", id: "january" },
//             { len: 28, color: "#ffffb3", label: "February", id: "february" },
//             { len: 31, color: "#bebada", label: "March", id: "march" },
//             { len: 30, color: "#fb8072", label: "April", id: "april" },
//             { len: 31, color: "#80b1d3", label: "May", id: "may" },
//             { len: 30, color: "#fdb462", label: "June", id: "june" },
//             { len: 31, color: "#b3de69", label: "July", id: "july" },
//             { len: 31, color: "#fccde5", label: "August", id: "august" },
//             { len: 30, color: "#d9d9d9", label: "September", id: "september" },
//             { len: 31, color: "#bc80bd", label: "October", id: "october" },
//             { len: 30, color: "#ccebc5", label: "November", id: "november" },
//             { len: 31, color: "#ffed6f", label: "December", id: "december" }
//           ]
//           var configuration = {
//             innerRadius: 250,
//             outerRadius: 300,
//             cornerRadius: 10,
//             gap: 0.04, // in radian
//             labels: {
//               display: true,
//               position: 'center',
//               size: '14px',
//               color: '#000000',
//               radialOffset: 20,
//             },
//             ticks: {
//               display: true,
//               color: 'grey',
//               spacing: 10000000,
//               labels: true,
//               labelSpacing: 10,
//               labelSuffix: 'Mb',
//               labelDenominator: 1000000,
//               labelDisplay0: true,
//               labelSize: '10px',
//               labelColor: '#000000',
//               labelFont: 'default',
//               majorSpacing: 5,
//               size: {
//                 minor: 2,
//                 major: 5,
//               }
//             },
//             events: {}
//           }
//         var Circos = new Circos({
//             container: '#chart',
//             width: 500,
//             height: 500,
//         });
//         Circos.layout(data, configuration)*/
//         var layout = d3.chord()
//         .padding(.04)
//         .sortSubgroups(d3.descending)
//         .sortChords(d3.ascending);

//         var arc = d3.svg.arc()
//         .innerRadius(250)
//         .outerRadius(300);
//         const margin = { top: 0, right: 0, bottom: 0, left: 0 },
//             width = 500 - margin.left - margin.right,
//             height = 500 - margin.top - margin.bottom;
//         const svg = d3.select(this.myRef.current)
//             .append("svg")
//             .attr("width", (width+margin.left+margin.right))
//             .attr("height", (height+margin.top+margin.bottom))
//             .append("g")
//             .attr("id","circle")
//             .attr("transform", `translate(${margin.left}, ${margin.top})`);
//         svg.append("circle")
//         .attr("r",300);
//         var data = [
//             { len: 31, color: "#8dd3c7", label: "January", id: "january" },
//             { len: 28, color: "#ffffb3", label: "February", id: "february" },
//             { len: 31, color: "#bebada", label: "March", id: "march" },
//             { len: 30, color: "#fb8072", label: "April", id: "april" },
//             { len: 31, color: "#80b1d3", label: "May", id: "may" },
//             { len: 30, color: "#fdb462", label: "June", id: "june" },
//             { len: 31, color: "#b3de69", label: "July", id: "july" },
//             { len: 31, color: "#fccde5", label: "August", id: "august" },
//             { len: 30, color: "#d9d9d9", label: "September", id: "september" },
//             { len: 31, color: "#bc80bd", label: "October", id: "october" },
//             { len: 30, color: "#ccebc5", label: "November", id: "november" },
//             { len: 31, color: "#ffed6f", label: "December", id: "december" }
//           ]
//         layout.matrix(data);
//         var group = svg.selectAll(".group")
//         .data(layout.groups)
//         .enter().append("g")
//         .attr("class", "group");


//     }
//     render(){
//         return (
//             <>
//                 <Grid item xs={8} ref={this.myRef}>
//                     </Grid>
//             </>
//         )
//     }
// }
// export default Circos;


import React from 'react';
import * as d3 from 'd3';
import Circos, { CHORDS } from 'react-circos';
// import layout from './examples/GRCh37.json';
// import chords from './examples/chords.json';
import { range } from 'd3-array';

const size = 800;




class ChordsTest extends React.Component{
    state={
        layout:[],
        chords:[]
    }
    componentDidMount(){
        var _layout = []
        const nodes = 2
        var myColor = d3.scaleLinear()
            .range(["#0000ff", "#00ff00"])
            .domain([0, nodes])
        for (var roi = 1; roi <= nodes; roi++) {
            var end = 2*Math.PI*roi/nodes
            var start = (end)-2*Math.PI/nodes
            console.log(end,start)
            _layout.push({
                "id":roi.toString(),
                "label":roi.toString(),
                "color":myColor(roi),
                "len":1,
                "offset":0,
                "start":start,
                "end":end})
        }
        console.log("testing")
        console.log(_layout)
        this.setState({
            layout: _layout
        })
        console.log(_layout)

    }
    render(){
        const { layout, chords} = this.state
        console.log("from file")
        console.log(layout)
        
        return(
            <>
                {
                    layout.length /*& chords.length*/>0?
                    <Circos
                    layout={layout}
                    config={{
                      innerRadius: size / 2 - 80,
                      outerRadius: size / 2 - 30,
                      ticks: {
                        display: false,
                      },
                      labels: {
                        position: 'center',
                        display: true,
                        size: 14,
                        color: '#000',
                        radialOffset: 15,
                      },
                    }}
                    /*tracks={[{
                      type: CHORDS,
                      data: chords,
                      config: {
                        radius: (d) => {
                          if (d.source.id === 'chr1') {
                            return 0.5;
                          }
                          return null;
                        },
                        logScale: false,
                        opacity: 0.7,
                        color: '#ff5722',
                      },
                    }]}*/
                    size={800}
                  />: null
                }
            </>
            
        )
    }
}



export default ChordsTest

