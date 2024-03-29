export function computeCorrelation (fileContentArray) {
    var finalArray = []
    for (var i = 0; i < fileContentArray.length; i++) {
        var troi = fileContentArray[i].split('  ')
        for (var j = 0; j < troi.length - 1; j++) {
            troi[j] = parseFloat(troi[j])
        }
        troi.pop()

        finalArray.push(troi)
    }
    var timebase = finalArray
    var roibase = []
    for (var i = 0; i < 200; i++) {
        var temp = [];
        roibase.push(temp);
    }
    for (var i = 0; i < timebase.length; i++) {
        for (var j = 0; j < 200; j++) {
            roibase[j].push(timebase[i][j])
        }
    }
    function pearsonCorrelation(prefs, p1, p2) {
        // good code
        // for(var i = 0; i<89; i<100)
        // bad code
        var si = [];
        for (var key in prefs[p1]) {
            if (prefs[p2][key]) { si.push(key) };
        }

        var n = si.length;

        if (n == 0) return 0;

        var sum1 = 0;
        for (var i = 0; i < si.length; i++) {
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
        for (var x = 0; x < 200; x++) {//arrange each ROI in an array as a float
            var temp = []
            temp.push(roibase[i])
            temp.push(roibase[x])
            h.push(pearsonCorrelation(temp, 0, 1))
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
    return finalArray
}
