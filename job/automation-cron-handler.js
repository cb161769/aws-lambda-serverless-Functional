const logger = require('../helpers/log/logsHelper');
const {config} = require('../connections/config/config');
const {getYesterdayDate,getTodaysDate,getTodaysDateWithMoreMinutes,changeDates} = require('../functions/generalFunctions');
const deviceName = config.deviceName;
const {dynamoDBConnection} = require('../connections/connections');
const {AutomateConsumption} =require('../helpers/automation/atuomationHelper');
async function fetchTodaysData(){
    try {
        const dates = changeDates(15,15);
        const data = await dynamoDBConnection.query({
            TableName : config.dynamoBB.deviceReadings.name,
            KeyConditionExpression: '#key = :key and #sortKey BETWEEN :start AND :end',
            ScanIndexForward: true, // DESC order
            ConsistentRead: false,
            ExpressionAttributeNames:{
                '#key': 'primarykey',
                '#sortKey': 'sortkey',
            },
            ExpressionAttributeValues: {
                ':key':  config.deviceName,
                ':start': dates.initialDate,
                ':end': dates.finalDate,
            },
        }).promise();
        logger.log('info', `Requesting [fetchTodaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET', table: config.dynamoBB.deviceReadings.name }});

        return data;
    } catch (error) {
        logger.log('error', `Requesting [fetchTodaysData]`, {tags: 'Method', additionalInfo: {operation: 'fetchYesterdaysData',databaseOperation:'GET',error:e, table: config.dynamoBB.deviceReadings.name }});
    }
}