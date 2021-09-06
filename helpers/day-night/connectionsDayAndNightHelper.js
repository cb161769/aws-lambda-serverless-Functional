const {connectionsDailyHelper} = require('../../helpers/connectionHelpers/ConnectionDailyHelper');
const {dailyHelperFromConnections} = require('../../helpers/connectionHelpers/dailyHelper');
const {getByMonthConnections} = require('../../helpers/connectionHelpers/getByMonthHelper');
/**
 * 
 * @param {*} ConnectionName connectionName
 * @param {*} dynamoDBArray data to be processed
 * @returns 
 */
module.exports.ConnectionsDailyWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  connectionsDailyHelper(ConnectionName,dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        label: 'Consumo Diario en Watts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }
   
};
/**
 * @function ConnectionsWeekKiloWattsDayNight     
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsWeekKiloWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].nightKhwProms;
    const dataset = [{
        label: 'Consumo Diario en KiloWatts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }

};
module.exports.ConnectionsWeeklyWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayWattsProms;
    const night = helper[0].nightWattsProms;
    const dataset = [{
        label: 'Consumo Diario en Watts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }

};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsWeeklyKiloWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        label: 'Consumo Diario en KiloWatts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }
 
};
//monthly
module.exports.ConnectionsMonthlyWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  getByMonthConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].detail.DayWatts;
    const night = helper[0].detail.NightWatts;
    const dataset = [{
        label: 'Consumo Mensual en Watts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }
   
};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsMonthlyKiloWattsDayNight =  function(ConnectionName,dynamoDBArray){
    const helper =  getByMonthConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].detail.DayKiloWatts;
    const night = helper[0].detail.NightKiloWatts;
    const dataset = [{
        label: 'Consumo Mensual en KiloWatts',
        backgroundColor:['rgb(255, 99, 132)','rgb(54, 162, 235)'],
        data:[days,night],
        hoverOffset: 4
    }];
    return{
        labels: ['Analisis de consumo de dia','Analisis de consumo de noche'],
        datasets:dataset
    }

};