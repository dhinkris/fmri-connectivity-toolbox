function* entries(obj) {//runs a for each loop through the dictionary object
    for (let key of Object.keys(obj)) {//returns a key-value pair
      yield [key, obj[key]];
    }  
  }
  module.exports={entries};