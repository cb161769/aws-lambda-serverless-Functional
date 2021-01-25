'use strict';
/**
 * Calculates how many Kwh has been used given the parameter
 * input data [
 * {} 
 * ]
 * @param {*} data 
 * @returns {*} object
 */
module.exports.calculateConsumedKhW = (data) =>{
    const {dateFare} = require('../dateFare');
    const KhwOutput = {
        day:0,
        night:0
    };
    for (let i = 0; i < data.length; i++) {
        const currentTime = data[i];
        const next = data[i +1];
        
        const secods = 
        (next[0].ttl.getTime() - currentTime[0].ttl.getTime())/1000;
    
        const kwh = (currentTime[1] * secods * (1/(60*60))) / 1000 ;
    
        if (dateFare(currentTime[0].ttl)) {
            KhwOutput.night += kwh;
        } else {
            KhwOutput.day += kwh
        }
    }
    return KhwOutput;
};

module.exports.calculateKWhSummaryFromDevice = (data) =>{
    const measurements = [];
    for (const jsonObject of data) {
        if(jsonObject.length >= 1) continue;
        if(jsonObject[0] === true) continue;
        measurements.push(
            []
        )
        
    }
    return this.calculateConsumedKhW(measurements);
}