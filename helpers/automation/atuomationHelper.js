const {writeToDynamoDB} = require('../../functions/generalFunctions');
const {publishSNS} = require('../../sns/sns-helper');
const logger = require('../../helpers/log/logsHelper');
const {config} = require('../../connections/config/config');
const TOPIC_NAME = process.env.TOPIC_NAME;
const admin = require("firebase-admin");
var serviceAccount = require('../../connections/config/firebase.config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firebaseRegistrationToken = config.Firebase.registrationToken;

/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} date date Object
 * @returns boolean
 */
module.exports.isInCurrentMonth = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisWeek = (now.month() == input.month());
    return isThisWeek;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} watts watts
 * @param {*} seconds seconds       
 * @returns watts
 */
module.exports.calculateKwh = function(watts ,seconds){
    const kwh = (watts * seconds * (1/(60*60)) )/590;
    return Math.abs(kwh);
};
/**
 * @function calculateSeconds
 * @param {*} dateOne dateOne
 * @param {*} dateTwo dateTwo
 * @returns seconds
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateSeconds = function(dateOne,dateTwo){
    const seconds = (dateOne.getTime() - dateTwo.getTime())/1000;
    return Math.abs(seconds);
};
/**
 * @function convertEpochDateToHumanDate
 * @author Claudio Raul Brito Mercedes
 * @param {*} epochDate epochDate
 * @returns date
 */
module.exports.convertEpochDateToHumanDate = function (epochDate)   {
    var epoch = new Date(epochDate * 1000);
    return epoch;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} data 
 * @returns array
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateDeviceInSameWeek = function (data){
    const totalKwh = 0;
    const secondTotalKwh = 0;
    const moment = require('moment');
    for (let index = 0; index < data.length; index++) {
        var dataElement = data[index];
        var secondDataElement = data[index + 1];
        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = data[index].readings;
        var isInTheSameDay = IsInCurrentWeek(sortKeyEpoch);
        if (isInTheSameDay === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(readings2).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(readings2.device_watts,seconds);
            totalKwh +=kwh;
        }
        const seconds2 = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
        const kwh2 = module.exports.calculateKwh(readings2.device_watts,seconds2);
        secondTotalKwh+= kwh2;

    }
    return secondTotalKwh;
};
/**
 * @function calculateSameDay
 * @param {*} date date object
 * @returns date 
 * @author Claudio Raul Brito Mercedes
 */
module.exports.calculateSameDay = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isToday = (now.isSame(input,'day'));
    return isToday;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} date date
 * @returns date
 */
module.exports.isInCurrentMonth = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisWeek = (now.month() == input.month());
    return isThisWeek;
};
/**
 * 
 * @param {*} data data object
 * @param {*} connectionName connection Name
 * @returns array <any>
 */
module.exports.CalculateConnectionsInWeeklyConfig = function(data,connectionName){
    const totalKwh = 0;
    const filteredArray = data.filter(x => x.Relays[0].Name === connectionName);
    if(filteredArray === undefined) return;
    for (let index = 0; index < filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];
        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var readings2 = filteredArray[index].Relays;
        var isInCurrentWeek = module.exports.IsInCurrentWeek(sortKeyEpoch);
        var filteredReadings = readings2.filter(x => x.Name === connectionName);
        if (isInCurrentWeek === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(filteredReadings[0].CT1_Watts,seconds);
            totalKwh +=kwh;
            
        }
    }
    return totalKwh;
};
/**
 * 
 * @param {*} date date object
 * @returns date
 * @author Claudio Raul Brito Mercedes
 */
module.exports.IsInCurrentWeek = function(date){
    const moment = require('moment');
    var now = moment();
    var input = moment(date);
    var isThisWeek = (now.isoWeek() == input.isoWeek());
    return isThisWeek;
};
/**
 * 
 * @param {*} data automate Consumption helpers
 * @param {*} configuration data config
 */
module.exports.AutomateConsumption = async function(data,configuration){
    try{
        if (Array.isArray(data) && Array.isArray(configuration)) {
            for (let index = 0; index < configuration.length; index++) {
                const element = configuration[index];
                if (element === undefined) {
                    break;
                }
                // validate is it daily 
                if (element.isItDaily === true) {
                    // calculate maximumKilowatt in the device
                    const maximumKilowatt = element.configurationMaximumKilowattsPerDay;
                    var calculatedKilowatt = module.exports.calculateDeviceInTheSameDay(data);
                    // TODO send notification to user's Device
                    if (calculatedKilowatt >= parseInt(maximumKilowatt)) {
                        const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:true,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        const snsParams = {
                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                          };
                          const message = {
                              data:{
                                  test:'',
                                  time:'',
                              },
                              token:firebaseRegistrationToken
                          };
                          
                        try {
                            // evaluate if the device is already turned off
                            admin.messaging().send(message).then((response) =>{
                                //TODO send response successfully
                            }).catch((error) =>{
                                logger.log('error', `Requesting [PUSH NOTIFICATION]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUSH NOTIFICATION', table: config.dynamoBB.deviceConnection.name,error:error }});
                                //TODO log errors
                            })
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                            // const sns = await publishSNS(snsParams);
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        }
                        
                    }else{
                        // update Database Here
                        const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:false,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        
                        try {
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        }
    
                    }
                    if (element.connectionsConfigurations.length > 0) {
                        for (let index = 0; index < element.connectionsConfigurations.length; index++) {
                            const element2 = element.connectionsConfigurations[index];
                           if (element2.isItDaily === true) {
                             const connectionMaxPerDay = parseInt(element2.configurationMaximumKilowattsPerDay);
                             const calculatedConnectionKilowatt  = module.exports.calculateConnectionsInSameDay(data,element2.connectionName);
                             if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
                                 // update database here
                                 // send notification helper
                                 const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                             } 
                             else{
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                                  // update database here
                                 // send notification helper
                                // TODO check device Notification/Alerts configuration
    
                             } 
                           }
                           if (element2.isItWeekly === true){
                            const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerWeek);
                            const calculatedKilowatt = module.exports.CalculateConnectionsInWeeklyConfig(data,element2.ConnectionName);
                            if (calculatedKilowatt >= connectionMaxPerWeek) {
                                // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            } else {
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                           }
                           if (element2.isItMonthly === true) {
                            const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerMonth);
                            const calculatedKwh = module.exports.calculateConnectionsInMonthConfig(data,element2.ConnectionName);
                            if (connectionMaxPerWeek >= calculatedKwh ) {
                                // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                            else{
                                 // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                            if (element.connectionsConfigurations.length > 0) {
                                for (let index = 0; index < element.connectionsConfigurations.length; index++) {
                                    const element2 = element.connectionsConfigurations[index];
                                   if (element2.isItDaily === true) {
                                     const connectionMaxPerDay = parseInt(element2.configurationMaximumKilowattsPerDay);
                                     const calculatedConnectionKilowatt  = module.exports.calculateConnectionsInSameDay(data,element2.connectionName);
                                     if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
                                         // update database here
                                         // send notification helper
                                         const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:true,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
                                     } 
                                     else{
                                          // update database here
                                         // send notification helper
                                        // TODO check device Notification/Alerts configuration
                                        const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:false,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
            
                                     } 
                                   }
                                   if (element2.isItWeekly === true){
                                    const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerWeek);
                                    const calculatedKilowatt = module.exports.CalculateConnectionsInWeeklyConfig(data,element2.ConnectionName);
                                    if (calculatedKilowatt >= connectionMaxPerWeek) {
                                        // update database here
                                        // set notification helper
                                        const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:true,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
                                    } else {
                                        const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:false,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
                                    }
                                   }
                                   if (element2.isItMonthly === true) {
                                    const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerMonth);
                                    const calculatedKwh = module.exports.calculateConnectionsInMonthConfig(data,element2.ConnectionName);
                                    if (connectionMaxPerWeek >= calculatedKwh ) {
                                        // update database here
                                        // set notification helper
                                        const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:true,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
                                    }
                                    else{
                                         // update database here
                                        // set notification helper
                                        const device  = {
                                            deviceId: config.deviceName,
                                            isConnection:true,
                                            connectionName: element2.connectionName,
                                            turnOff:false,
                                            isDevice:false,
                                            deviceName: ''
                                        };
                                        const snsParams = {
                                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                          }
                                        try {
                                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                            // const sns = await publishSNS(snsParams);
                    
                                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        } catch (error) {
                                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                        }
                                    }
                                }
                                
                                  
                                }
                                
                            }
    
                        }
                        
                          
                        }
                        
                    }
                    
                    // calculate connections
                }
                // validate is it weekly
                if (element.isItWeekly === true) {
                    const maximumKilowatt = element.configurationMaximumKilowattsPerDay;
                    const calculatedKilowatt = module.exports.calculateDeviceInSameWeek(data);
                    if (calculatedKilowatt >= maximumKilowatt) {
                        const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:true,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        const snsParams = {
                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                          }
                        try {
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                            // const sns = await publishSNS(snsParams);
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        }
                        // update db here
                    } else {
                        const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:true,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        
                        try {
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        }
                          // update db here
                    }
                    if (element.connectionsConfigurations.length > 0) {
                        for (let index = 0; index < element.connectionsConfigurations.length; index++) {
                            const element2 = element.connectionsConfigurations[index];
                           if (element2.isItDaily === true) {
                             const connectionMaxPerDay = parseInt(element2.configurationMaximumKilowattsPerDay);
                             const calculatedConnectionKilowatt  = module.exports.calculateConnectionsInSameDay(data,element2.connectionName);
                             if (connectionMaxPerDay >= calculatedConnectionKilowatt) {
                                 // update database here
                                 // send notification helper
                                 const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                             } 
                             else{
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                                  // update database here
                                 // send notification helper
                                // TODO check device Notification/Alerts configuration
    
                             } 
                           }
                           if (element2.isItWeekly === true){
                            const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerWeek);
                            const calculatedKilowatt = module.exports.CalculateConnectionsInWeeklyConfig(data,element2.ConnectionName);
                            if (calculatedKilowatt >= connectionMaxPerWeek) {
                                // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            } else {
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                           }
                           if (element2.isItMonthly === true) {
                            const connectionMaxPerWeek = parseInt(element2.configurationMaximumKilowattsPerMonth);
                            const calculatedKwh = module.exports.calculateConnectionsInMonthConfig(data,element2.ConnectionName);
                            if (connectionMaxPerWeek >= calculatedKwh ) {
                                // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:true,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                            else{
                                 // update database here
                                // set notification helper
                                const device  = {
                                    deviceId: config.deviceName,
                                    isConnection:true,
                                    connectionName: element2.connectionName,
                                    turnOff:false,
                                    isDevice:false,
                                    deviceName: ''
                                };
                                const snsParams = {
                                    Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                                    TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                                  }
                                try {
                                    const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                                    logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                    // const sns = await publishSNS(snsParams);
            
                                    logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                } catch (error) {
                                    logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                                }
                            }
                        }
                        
                          
                        }
                        
                    }
                }
                if (element.isItMonthly === true) {
                    const maximumKilowatt = element.MaximumKilowattsPerMonth;
                    var calculatedKilowatt = module.exports.calculateDeviceInSameMonth(data);
                    if (calculatedKilowatt >= maximumKilowatt ) {
                        // update database here
                        // set notification helper
                        const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:true,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        const snsParams = {
                            Message: `triggering other Lambda(s). Send via ${TOPIC_NAME}`,
                            TopicArn: `arn:aws:sns:${config.region.name}:${config.sns.accountId}:${TOPIC_NAME}`
                          }
                        try {
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                            // const sns = await publishSNS(snsParams);
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name, error:error }});
                        }
                    } else {
                           // update database here
                           // set notification helper
                           const device  = {
                            deviceId: config.deviceName,
                            isConnection:false,
                            connectionName:'',
                            turnOff:true,
                            isDevice:true,
                            deviceName: config.deviceName
                        };
                        
                        try {
                            const data = await writeToDynamoDB(config.dynamoBB.deviceConnection.name,device);
                            logger.log('info', `Requesting [Write To DynamoDB]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
    
                            logger.log('info', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name }});
                        } catch (error) {
                            logger.log('error', `Requesting [Write To SNS]`, {tags: 'automationHelper', additionalInfo: {operation: 'AutomateConsumption',databaseOperation:'PUT', table: config.dynamoBB.deviceConnection.name, error:error }});
                        }
    
                    }
                } 
                // validate is it monthly
    
            }
        }
        else{
            throw new Error('error detected')
        }
    }catch(error){
        console.error(error);
    }
};
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateDeviceInTheSameDay
 * @param {*} data data
 * @returns array
 */
module.exports.calculateDeviceInTheSameDay = function(data){
    const totalKwh = 0;
    const secondTotalKwh = 0;
    const moment = require('moment');
    for (let index = 0; index < data.length; index++) {
        var dataElement = data[index];
        var secondDataElement = data[index + 1];
        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = data[index].readings;
        var isInTheSameDay = module.exports.calculateSameDay(sortKeyEpoch);
        if (isInTheSameDay === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(readings2).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(readings2.device_watts,seconds);
            totalKwh +=kwh;
        }
        const seconds2 = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
        const kwh2 = module.exports.calculateKwh(readings2.device_watts,seconds2);
        secondTotalKwh+= kwh2;

    }
    // const objects = {iteratedKwh:totalKwh,second:secondTotalKwh};
    return secondTotalKwh;
};

/**
 * @author Claudio Raul Brito Mercedes
 * @param {*} data data
 * @param {*} connectionName Connection's Name
 * @returns array
 */
module.exports.calculateConnectionsInMonthConfig = function(data,connectionName){
    const totalKwh = 0;
    const moment = require('moment');
    const filteredArray = data.filter(x => x.Relays[0].Name === connectionName);
    if (filteredArray === undefined) return;
    for (let index = 0; index < filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];
        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var readings2 = filteredArray[index].Relays;
        var isInCurrentMonth = module.exports.isInCurrentMonth(sortKeyEpoch);
        var filteredReadings = readings2.filter(x => x.Name === connectionName);
        if (isInCurrentMonth === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(filteredReadings[0].CT1_Watts,seconds);
            totalKwh +=kwh;
            
        }
    }
    return totalKwh;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateDeviceInSameMonth
 * @param {*} data data
 * @returns array <any>
 */
module.exports.calculateDeviceInSameMonth = function(data){
    const totalKwh = 0;
    const secondTotalKwh = 0;
    const moment = require('moment');
    for (let index = 0; index < data.length; index++) {
        var dataElement = data[index];
        var secondDataElement = data[index + 1];
        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = data[index].readings;
        var isInTheSameDay = module.exports.isInCurrentMonth(sortKeyEpoch);
        if (isInTheSameDay === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(readings2).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(readings2.device_watts,seconds);
            totalKwh +=kwh;
        }
        const seconds2 = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
        const kwh2 = module.exports.calculateKwh(readings2.device_watts,seconds2);
        secondTotalKwh+= kwh2;

    }
    return secondTotalKwh;
};
/**
 * @author Claudio Raul Brito Mercedes
 * @function calculateConnectionsInSameDay
 * @param {*} data data
 * @returns array <any>
 */
module.exports.calculateConnectionsInSameDay = function(data,ConnectionName){
    const moment = require('moment');
    const totalKwh = 0;
    const filteredArray = data.filter(x => x.Relays[0].Name == ConnectionName);
    if (filteredArray === undefined) {
        return;
    }
    for (let index = 0; index < filteredArray.length; index++) {
        var dataElement = filteredArray[index];
        var secondDataElement = filteredArray[index + 1];

        if (secondDataElement == undefined) {
            break;
        }
        var sortkeyDate = dataElement.sortkey;
        if (sortkeyDate === undefined) {
            break;
        }
        var secondkeyDate = secondDataElement.sortkey;
        if (secondkeyDate === undefined) {
           break; 
        }
        var sortKeyEpoch = module.exports.convertEpochDateToHumanDate(sortkeyDate);
        var secondSortKeyEpoch = module.exports.convertEpochDateToHumanDate(secondkeyDate);
        var LocalDate = moment(sortKeyEpoch);
        moment.locale('es-do');
        LocalDate.locale(false);
        var readings2 = filteredArray[index].Relays;
        var isInTheSameDay = module.exports.calculateSameDay(sortKeyEpoch);
        var filteredReadings = readings2.filter(x => x.Name === ConnectionName);
        if (isInTheSameDay === false) {
            break;
        }
        for (let j = 0; j <= Object.keys(filteredReadings).length; j++) {
            const seconds = module.exports.calculateSeconds(secondSortKeyEpoch,sortKeyEpoch);
            const kwh = module.exports.calculateKwh(filteredReadings[0].CT1_Watts,seconds);
            totalKwh +=kwh;
        }
        
    }
    return totalKwh;
}
