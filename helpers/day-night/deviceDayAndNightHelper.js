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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }]
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;


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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }]
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;

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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
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
        label: 'Consumo Mensual en KiloWatts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }]
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
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
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    const returnObject ={
        labels: ['Analisis de consumo'],
        datasets:dataset
    }
    return returnObject;
};



/**
 * EXPECTED DATASET":
 * const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.rgb(54, 162, 235),
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.rgb(54, 162, 235), 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
    }
  ]
};
 * 
 */


