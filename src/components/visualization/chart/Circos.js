import React from 'react';
import * as d3 from 'd3';
import Circos, { CHORDS } from 'react-circos';
import regions from './examples/example_regions.json'
import layout from './examples/GRCh37.json';
import chords from './examples/chords.json';
import { range } from 'd3-array';
import { HEATMAP, TRACK_TYPES } from 'react-circos/build/tracks'
import correlationFunction from "../../helpers/correlationFunction"
import dictionaryForEach from "../../helpers/dictionaryForEach"
import { degree, betweeness_centrality } from "../../helpers/metrics"
const size = 800;//size of circle
const start_chord = 0.45//where the chords start on the edges(0-1)
const end_chord = .55//where the chords end on the edges(0-1)

class ChordsTest extends React.Component {
  state = {
    layout: [],
    chords: [],
    data: [],
  }
  constructor(props) {
    super(props);
  }

  updateCircos = () => {
    var _layout = []
    const nodes = 200
    var _regions = []
    //.domain([0-nodes/4, nodes/4, nodes-nodes/4])
    /*for (var roi = 1; roi <= nodes; roi++) {
        var end = 2*Math.PI*roi/nodes
        var start = (end)-2*Math.PI/nodes
        //console.log(end,start)
        _layout.push({
            "id":regions[roi-1].toString(),
            //"id":roi.toString(),
            "label":roi.toString(),
            "color":myColor(roi),
            "len":1//,
            //"start":region_start[regions[roi]],
            //"end":region_start[regions[roi]]+1,
            //"value":1
          })
    }//101 1s, 29 2s, 55 3s, 12 4s, 3 5s*/
    // { "len": 31, "color": "#8dd3c7", "label": "January", "id": "january" },
    var myColor = d3.scaleLinear()
      .range(["#8dd3c7", "#0000ff"])
      .domain([1, 5])
    _layout.push({ "len": 101, "color": myColor(1), "label": "1", "id": "1" })//each cell in layout is a region, with id
    _layout.push({ "len": 29, "color": myColor(2), "label": "2", "id": "2" })//len represents how many 'nodes' will be in the region
    _layout.push({ "len": 55, "color": myColor(3), "label": "3", "id": "3" })//this will have to be done post-regions calculation
    _layout.push({ "len": 12, "color": myColor(4), "label": "4", "id": "4" })
    _layout.push({ "len": 3, "color": myColor(5), "label": "5", "id": "5" })
    var regions_dict = {}//dictionary where keys are the regions, value is an array of ROIs corresponding to the region
    for (var index = 0; index < regions.length; index++) {
      if (regions[index] in regions_dict) { regions_dict[regions[index]].push(index) }
      else { regions_dict[regions[index]] = [index] }
    }
    var total = 0;
    for (let [key, value] of dictionaryForEach.entries(regions_dict)) {
      for (var index = 0; index < value.length; index++) {//sorts regions in order: in each region, ROIs are sorted ascending
        _regions.push({//this will have to be done post-regions calculation
          "block_id": key.toString(),
          "start": index,
          "end": index + 1,
          "value": value[index]
        })
        total++
      }
    }
    var correlation_array = correlationFunction.calculateCorrelation(this.props.data)
    const threshold = 0.9
    var degree_array = degree(correlation_array, regions, threshold);
    /*console.log("to tracks:")
    console.log(_regions)
    console.log(degree_array)*/
    var new_chords = []
    //console.log("testing correlation_array")
    //console.log(correlation_array.length)
    var regions_dict = {}//dictionary where keys are the regions, value is an array of ROIs corresponding to the region
    for (var index = 0; index < regions.length; index++) {
      if (regions[index] in regions_dict) { regions_dict[regions[index]].push(index) }
      else { regions_dict[regions[index]] = [index] }
    }
    const isEqual = (element) => element == 12;
    for (var index = 0; index < correlation_array.length; index++) {
      if (correlation_array[index]['value'] >= threshold && correlation_array[index]['value'] <= 1) {
        var temp = correlation_array[index]
        var startNode = correlation_array[index]["row"]
        var endNode = correlation_array[index]["column"]
        var startReg = 0;//start and end node's regions
        var endReg = 0;
        var startInd = 0;//start and end node's index in the regions_dict
        var endInd = 0;
        for (let [key, value] of dictionaryForEach.entries(regions_dict)) {
          if (value.indexOf(startNode) >= 0) {
            startReg = key;
            startInd = value.indexOf(startNode);
          }
          if (value.indexOf(endNode) >= 0) {
            endReg = key;
            endInd = value.indexOf(endNode);
          }
        }
        new_chords.push({
          "source": {
            "id": startReg.toString(),
            "start": startInd + 0.4,
            "end": startInd + 0.6
          },
          "target": {
            "id": endReg.toString(),
            "start": endInd + 0.4,
            "end": endInd + 0.6
          }
        })
      }
    }

    this.setState({
      layout: _layout,
      regions: _regions,
      chords: new_chords,
      degrees: degree_array
    })
  }
  componentDidMount() {
    this.updateCircos()
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState.data, prevProps.data)
    //console.log(this.props.data)
    if (prevProps.data !== this.props.data) {
      this.updateCircos()
    }
  }
  render() {
    const { layout, chords, regions, degrees } = this.state
    //console.log("from file")
    //console.log(layout)
    //console.log(chords)

    return (
      <>
        {
          layout.length > 0 & chords.length > 0 ?
            <Circos
              layout={layout}
              config={{
                innerRadius: size / 2 - 150,
                outerRadius: size / 2 - 100,
                ticks: {
                  display: false,
                },
                cornerRadius: 3,
                gap: 0.04,
                labels: {
                  labelSpacing: 5,
                  label_rotate: false,
                  position: 'center',
                  display: true,
                  size: 12,
                  color: '#000',
                  radialOffset: 30,
                  label_rotate: "no",
                },
              }}
              tracks={[{
                type: CHORDS,
                data: chords,
                config: {
                  logScale: false,
                  opacity: 0.7,
                  color: '#ff5722',
                },
              },
              {
                type: HEATMAP,
                data: regions,
                config: {
                  innerRadius: 0.72,
                  outerRadius: 0.88,
                  logScale: false,
                  color: 'YlGnBu',
                  //tooltipContent: {"block_id":"id "},
                },
              },
              {
                type: HEATMAP,
                data: degrees,
                config: {
                  innerRadius: 0.90,
                  outerRadius: 0.98,
                  logScale: false,
                  color: 'YlGnBu',
                  //tooltipContent: {"block_id":"id "},
                },
              }]}
              size={900}
            /> : null
        }
      </>

    )
  }
}



export default ChordsTest

