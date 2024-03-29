function calculateCorrelation(fileContentArray){
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
    // function partialCorrelation(p1, p2, n){
    //     let sum_X = 0, sum_Y = 0, sum_XY = 0;
    //     let squareSum_X = 0, squareSum_Y = 0;
    
    //     for (let i = 0; i < n; i++)
    //     {
    //         // sum of elements of array X.
    //         sum_X = sum_X + X[i];
    
    //         // sum of elements of array Y.
    //         sum_Y = sum_Y + Y[i];
    
    //         // sum of X[i] * Y[i].
    //         sum_XY = sum_XY + X[i] * Y[i];
    
    //         // sum of square of array elements.
    //         squareSum_X = squareSum_X + X[i] * X[i];
    //         squareSum_Y = squareSum_Y + Y[i] * Y[i];
    //     }
    
    //     // use formula for calculating correlation coefficient.
    //     let corr = (n * sum_XY - sum_X * sum_Y) 
    //                 / Math.sqrt((n * squareSum_X - sum_X * sum_X) 
    //                     * (n * squareSum_Y - sum_Y * sum_Y));
    
    //     return corr;
    // }
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
    //console.log('mulit calcs')
    //console.log(correlation_array)
    for (var i = 0; i < 200; i++) {//for every timepoint
        var temp = []
        var splitstring = correlation_array[i]//row
        for (var x = (i+1); x <= 199; x++) {//arrange each ROI in an array as a float
            finalArray.push({ "row": i, "column": x, "value": splitstring[x] })
            temp.push(splitstring[x])
            count++;
        }
        // finalArray.push(temp)//array of each timepoint; each cell is an array of ROIs(floats)
    }
    //console.log("how many: ", count)
    //console.log("in correlationFunction")
    //console.log(finalArray)
    return finalArray
}

module.exports={calculateCorrelation};