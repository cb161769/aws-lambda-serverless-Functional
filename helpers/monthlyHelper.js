/**
 * this Function determines if the user consumed 
 * @param {*} epochDate date 
 */
module.exports.convertEpochDateToHumanDate = function(epochDate){
    var epoch = new Date(epochDate);
    return epoch;
}
/**
 * This function determines if the given date is in the current year
 * @function isInCurrentYear
 * @param {*} date date Object
 * @returns boolean
 */
module.exports.isInCurrentYear = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisYear = (now.year() == input.year());
    return isThisYear;
}