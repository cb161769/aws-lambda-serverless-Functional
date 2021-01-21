'use strict';
/**
 * Calculates how many Kwh has been used given the parameter
 * @param {*} data 
 * @returns {*} object
 */

module.exports.calculateComsumedKhW = (data) =>{
const {dateFare} = require('./DateFare');
const KhwOutput = {
    day:0,
    night:0
};
for (let i = 0; i < data.length; i++) {
    const currentTime = data[i];
    const next = data[i +1];
    
    const secods = 
    (next[0].getTime() - currentTime[0].getTime())/1000;

    const kwh = (currentTime[1] * secods * (1/(60*60))) / 1000 ;

    if (dateFare(currentTime[0])) {
        KhwOutput.night += kwh;
    } else {
        KhwOutput.day += kwh
    }
}
return KhwOutput;
}