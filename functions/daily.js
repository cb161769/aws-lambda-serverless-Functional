'use strict';
const {dynamoDBConnection} = require("../connections/connections");
const {config} = require("../connections/config/config");

const {getTodaysDate,getYesterdayDate} = require("../helpers/dates/helpers");
const {calculateComsumedKhW,calculateKWhSummaryFromDevice} = require('../helpers/calculateKwh');
const {writeToDynamoDBTable,parseDynamoDBTableItemsToCSVFormat} = require("../helpers/dynamoDB/dynamoDBhelpers");

async function getYesterdayData() {
    try {
        const startDate = getYesterdayDate().timeStamp;
        const endDate = getTodaysDate().timeStamp;
        const deviceName =  config.deviceName;
        const data = await dynamoDBConnection.query({
            TableName: config.dynamoBB.deviceReadings.name,
            KeyConditionExpression:'#initial = :key and #end BETWEEN :start AND :end',
            ScanIndexForward:true,
            ConsistentRead:false,
            ExpressionAttributeNames:{
                '#initial':'primarykey',
                '#end':'sortkey'
            },
            ExpressionAttributeValues: {
                ':key': deviceName,
                ':start': startDate,
                ':end': endDate,
            },
        }).promise();
        return data;
        
    } catch (error) {
        return { Items: error};
        
    }
    
};
module.exports.handler = async(event,context,callback) =>{

    const data = await getYesterdayData();
    const csvFile = parseDynamoDBTableItemsToCSVFormat(data);
    const time = getYesterdayDate();
    
    const usageData = calculateKWhSummaryFromDevice(csvFile);
    await writeToDynamoDBTable(usageData);
};

