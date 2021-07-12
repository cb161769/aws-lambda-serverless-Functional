/*
expedted datased 
["day",night]
*/
const {getWeeklyHelper} = require('../../helpers/weeklyHelper');
const {getMonthlyHelper} = require('../../helpers/monthlyHelper');
const {getByMonth} = require('../../helpers/getByMonthHelper');
const {dailyHelper} = require('../../helpers/dailyHelper');
/**
 * @function DeviceWattsDayNightHelper
 * @param {*} dynamoDBArray 
 * @returns array[]
 */
module.exports.DeviceWeeklyWattsDayNightHelper = async function (dynamoDBArray){
    const helper = await getWeeklyHelper(dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        label: 'Consumo semanal en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }]
    return dataset;


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
        label: 'Consumo semanal en KiloWatts',
        backgroundColor:['blue','red'],
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
        label: 'Consumo semanal en Watts',
        backgroundColor:['blue','red'],
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
        label: 'Consumo Mensual en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }]
    return dataset;
};
/**
 * @function DeviceMonthlyYearlyWattsDayNight
 * @param {*} dynamoDBArray 
 */
module.exports.DeviceMonthlyYearlyWattsDayNight = async function(dynamoDBArray){
    const helper = await getByMonth(dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        label: 'Consumo Anual en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    return dataset;
};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.DeviceMonthlyYearlyKiloWattsDayNight = async function(dynamoDBArray){
    const helper = await getByMonth(dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        label: 'Consumo Anual en KiloWatts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    return dataset;
};
/**
 * @function DeviceDailyWattsDayNight
 * @param {*} dynamoDBArray 
 */
 module.exports.DeviceDailyWattsDayNight = async function(dynamoDBArray){
    const helper = await dailyHelper(dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        label: 'Consumo Diario en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    return dataset;
};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.DeviceDailyKiloWattsDayNight = async function(dynamoDBArray){
    const helper = await dailyHelper(dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        label: 'Consumo Diario en KiloWatts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    return dataset;
};







