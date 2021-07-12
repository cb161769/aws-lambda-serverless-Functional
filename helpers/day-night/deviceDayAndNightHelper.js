/*
expedted datased 
["day",night]
*/
const {getWeeklyHelper} = require('../../helpers/weeklyHelper');
const {getMonthlyHelper} = require('../../helpers/monthlyHelper');
/**
 * @function DeviceWattsDayNightHelper
 * @param {*} dynamoDBArray 
 * @returns array[]
 */
module.exports.DeviceWeeklyWattsDayNightHelper = async function (dynamoDBArray){
    const helper = await getWeeklyHelper(dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    return [
        days,night
    ];

};
/**
 * @function DeviceKiloWattsDayNightHelper
 * @param {*} dynamoDBArray 
 * @returns array[]
 */
module.exports.DeviceWeeklyKiloWattsDayNightHelper = async function (dynamoDBArray){
    const helper = await getWeeklyHelper(dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        label: 'S',
        backgroundColor:['',''],
        data:[days,night]
    }]
    return dataset;

};
/**
 * @function DeviceMonthlyWattsDayNightHelper
 * @param {*} dynamoDBArray dynamobdArray
 * @returns 
 */
module.exports.DeviceMonthlyWattsDayNightHelper = async function (dynamoDBArray){
    const helper = await getMonthlyHelper(dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        label: 'S',
        backgroundColor:['',''],
        data:[days,night]
    }];
    return dataset;
};
/**
 * 
 * @param {*} dynamoDBArray 
 */
module.exports.DeviceMonthlyKiloWattsDayNightHelper = async function(dynamoDBArray){
    const helper = await getMonthlyHelper(dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        label: 'S',
        backgroundColor:['',''],
        data:[days,night]
    }]
    return dataset;
};
/**
 * @function DeviceMonthlyYearlyWattsDayNight
 * @param {*} dynamoDBArray 
 */
module.exports.DeviceMonthlyYearlyWattsDayNight = async function(dynamoDBArray){

}




