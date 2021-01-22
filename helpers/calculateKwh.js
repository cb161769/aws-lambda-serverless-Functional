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
module.exports.calculateKWhSummaryFromDevice = (data) =>{
    const measurements = [];
    for(const line of data.split('\n')){
        if(line === '') continue;
        const parts = line.split(',');
        if (parts[0] === 'Timestamp') continue;
        measurements.push(
            [new Date (parseInt(parts[0]) * 1000), parseInt(parts[1])]
        ); 

    }
    return this.calculateComsumedKhW(measurements);
}