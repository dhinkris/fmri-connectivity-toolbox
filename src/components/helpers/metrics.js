const degree=(nodes, regions, threshold)=>{
    var degree_dict = {};
    nodes.map((node, i)=>{
        if(node["value"]>=threshold && node["value"]<=1){
            if(node["row"] in degree_dict){degree_dict[node["row"]]+=1}
            else{
                degree_dict[node["row"]] = 1
            }
        }
    })
    var sorted_by_region = {};//key=region #, value=ROI
    for(var index=0; index<200;index++){
        var cur_region = regions[index]
        if(cur_region in sorted_by_region){
            sorted_by_region[cur_region].push(index)
        }
        else{
            sorted_by_region[cur_region] = []
            sorted_by_region[cur_region].push(index)
        }
    }
    var _degree = []
    for (var reg in sorted_by_region) {//region #
        for (var index = 0; index < sorted_by_region[reg].length; index++) {//index in region array
            if(sorted_by_region[reg][index] in degree_dict){
                _degree.push({//this will have to be done post-regions calculation
                "block_id": reg.toString(),
                "start": index,
                "end": index + 1,
                "value": degree_dict[sorted_by_region[reg][index]]
                })
            }
            else{
                _degree.push({//this will have to be done post-regions calculation
                    "block_id": reg.toString(),
                    "start": index,
                    "end": index + 1,
                    "value": 0
                    })
            }
        }
      }
    return _degree;
}

const betweeness_centrality=(nodes, edges) => {

}

export { degree, betweeness_centrality }