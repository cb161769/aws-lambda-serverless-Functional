const {connectionsDailyHelper} = require('../../helpers/connectionHelpers/ConnectionDailyHelper');
const {dailyHelperFromConnections} = require('../../helpers/connectionHelpers/dailyHelper');

/**
 * 
 * @param {*} ConnectionName connectionName
 * @param {*} dynamoDBArray data to be processed
 * @returns 
 */
module.exports.ConnectionsDailyWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await connectionsDailyHelper(ConnectionName,dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        labels: 'Consumo Diario en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};
/**
 * @function ConnectionsWeekKiloWattsDayNight     
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsWeekKiloWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        labels: 'Consumo Diario en KiloWatts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};
module.exports.ConnectionsWeeklyWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        labels: 'Consumo Diario en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsWeeklyKiloWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        labels: 'Consumo Diario en KiloWatts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};
//monthly
module.exports.ConnectionsMonthlyWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayWattsProm;
    const night = helper[0].NightWattsProm;
    const dataset = [{
        labels: 'Consumo Diario en Watts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};
/**
 *      
 * @param {*} dynamoDBArray dynamoDBArray 
 * @returns Array<any>
 */
module.exports.ConnectionsMonthlyKiloWattsDayNight = async function(ConnectionName,dynamoDBArray){
    const helper = await dailyHelperFromConnections(ConnectionName,dynamoDBArray);
    const days= helper[0].dayKhwProms;
    const night = helper[0].NightsKhwProm;
    const dataset = [{
        labels: 'Consumo Diario en KiloWatts',
        backgroundColor:['blue','red'],
        data:[days,night]
    }];
    const returnObject ={
        labels: 'Analisis de consumo',
        datasets:dataset
    }
    return returnObject;
};