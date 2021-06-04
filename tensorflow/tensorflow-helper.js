/**
 * 
 * @param {*} data dynamoDBdATAaRRAY
 * @author Claudio Raul Brito Mercedes
 * @function mapDataToTensorFlow
 * @returns array (mapped)
 */
 module.exports.mapDataToTensorFlow = function(data) {
     if (data.length) {
        return data.map(x => ({
            y: x.readings.device_watts,
            x:  module.exports.convertEpochDateToHumanDate( new Date(x.sortkey *1000))
        })).filter(fill => fill.y >= 0);
     }
     else{
         return {x:0,y: new Date(),z:'No Data',data:data};
     }

};
module.exports.convertEpochDateToHumanDate = function(epochDate){
    return epochDate.getDate(epochDate);
}
// TODO : appply monthly logic
/**
 * 
 * @param {*} day {Date}
 * @returns {Date}
 */
module.exports.changeDates = function(day) {
    var dateOne = new Date();
    var dateTwo = new Date();
    dateOne.setMonth(dateOne.getMonth() - 4);
    let first = dateOne.setDate(day);

    let second = dateTwo.setDate(day);
   
    return {
        initialDate:Math.floor(first/1000),
        finalDate: Math.floor( second/1000)

    };
}