/**
 * 
 * @param {*} data dynamoDBdATAaRRAY
 * @author Claudio Raul Brito Mercedes
 * @function mapDataToTensorFlow
 * @returns array (mapped)
 */
 module.exports.mapDataToTensorFlow = function(data) {
    return data.map(x => ({
        y: x.readings.device_watts,
        x: new Date(x.sortkey *1000)
    })).filter(fill => fill.y >= 0);
};

module.exports.changeDates = function(dateOne, dateTwo,day) {
    var initialMonth =  (dateOne.setMonth(dateOne.getMonth() - 1));
    return {
        initialDate:initialMonth.setDay(day),
        finalDate: dateTwo.setDay(day)

    };
}